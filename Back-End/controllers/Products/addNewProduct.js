import _ from 'lodash';
import models from '../../db/models';

const addNewProduct = async (req, res) => {
    try {
        const { code, name, description, quantity } = req.body;

        if (_.isNil(code) || _.isNil(name) || _.isNil(description)) {
            throw new Error("Todos os dados são necessários.");
        }

        await models.sequelize.transaction(async (transaction) => {
            // Cria o novo produto
            const newProduct = await models.Product.create({
                code,
                name,
                description,
            }, {
                transaction,
            });

            if (_.isNil(newProduct)) {
                throw new Error("Houve um erro ao criar seu produto.");
            }

            let productEntry;
            // Adiciona um registro de entrada com a quantidade inicial, se aplicável
            if (!_.isNil(quantity) && quantity > 0) {
                productEntry = await models.ProductEntry.create({
                    productId: newProduct.id,
                    quantity,
                }, {
                    transaction,
                });

                if (_.isNil(productEntry)) {
                    throw new Error("Houve um erro ao registrar a quantidade inicial.");
                }
            }

            return res.status(200).json({
                message: "Produto criado com sucesso!",
                data: {
                    ...newProduct.toJSON(),
                    initialQuantity: productEntry ? productEntry.quantity : 0
                }
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: "Houve um erro ao criar o produto.",
            error: err.message
        });
    }
};

export default addNewProduct;
