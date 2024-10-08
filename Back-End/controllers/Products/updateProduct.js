import models from '../../db/models';

const updateProduct = async (req, res) => {
    const { id, name, description, quantity } = req.body;

    await models.sequelize.transaction(async (transaction) => {
        await models.Products.update({
            name,
            description,
            quantity,
        }, {
            where: {
                id,
                deletedAt: null
            },
        }, {
            transaction
        }
        ).then((data) => {
            return res.status(200).json({
                message: "Produto atualizado com sucesso!",
                data
            })
        }).catch((err) => {
            return res.status(500).json({
                message: "Erro ao atualizar produto!",
                err
            })
        });
    });
};

export default updateProduct