import models from '../../db/models';

const deleteProduct = async (req, res) => {
    const { id } = req.body;

    await models.sequelize.transaction(async (transaction) => {
        await models.Products.destroy({
            where: {
                id,
            },
        }, {
            transaction
        }
        ).then((data) => {
            return res.status(200).json({
                message: "Produto deletado com sucesso!",
                data
            })
        }).catch((err) => {
            return res.status(500).json({
                message: "Erro ao deletar produto!",
                err
            })
        });
    });
};

export default deleteProduct