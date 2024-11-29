import models from "../../db/models";
import _ from "lodash";

const getAllProductInfo = async (req, res) => {
    try {
        await models.sequelize.transaction(async (transaction) => {
            // Busca todos os produtos não deletados
            const products = await models.Product.findAll({
                where: {
                    deletedAt: null
                }
            }, {
                transaction,
            });

            if (_.isNil(products)) throw new Error("Houve um erro ao buscar seus produtos.");
            if (products.length < 1) throw new Error("Não há nenhum produto na sua lista.");

            // Para cada produto, calcula a quantidade com base nas entradas e saídas
            const data = await Promise.all(products.map(async (product) => {
                // Busca a quantidade total de entradas
                const totalEntries = await models.ProductEntry.sum('quantity', {
                    where: {
                        productId: product.id,
                        deletedAt: null
                    }
                }, {
                    transaction,
                });

                // Busca a quantidade total de saídas
                const totalRemovals = await models.ProductRemoval.sum('quantity', {
                    where: {
                        productId: product.id,
                        deletedAt: null
                    }
                }, {
                    transaction,
                });

                // Calcula a quantidade atual
                const currentQuantity = (totalEntries || 0) - (totalRemovals || 0);

                return {
                    ...product.toJSON(),
                    quantity: currentQuantity
                };
            }));

            return res.status(200).json({
                message: "Produtos localizados!",
                data
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: "Houve um erro ao buscar os dados dos produtos.",
            error: err.message
        });
    }
};

export default getAllProductInfo;
