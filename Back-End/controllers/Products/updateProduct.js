import models from '../../db/models';

const updateProduct = async (req, res) => {
    const { id, code, name, description } = req.body;

    await models.sequelize.transaction(async (transaction) => {
        await models.Products.update({
            code,
            name,
            description,
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