import models from "../../db/models";

const removeProductQuantity = async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({
            message: "Por favor, forneça o ID do produto e a quantidade."
        });
    }

    try {
        await models.sequelize.transaction(async (transaction) => {
            // Verifica se o produto existe
            const product = await models.Product.findOne({
                where: { id: productId, deletedAt: null },
                transaction,
            });

            if (!product) {
                throw new Error("Produto não encontrado.");
            }

            // Adiciona um novo registro de remoção
            const productRemoval = await models.ProductRemoval.create({
                productId,
                quantity,
            }, { transaction });

            return res.status(201).json({
                message: "Quantidade removida com sucesso!",
                data: productRemoval
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: "Houve um erro ao remover a quantidade.",
            error: err.message
        });
    }
};

export default removeProductQuantity;
