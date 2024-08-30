import models from "../../db/models"

const getAllProductInfo = async (req, res) => {
    const { id } = req.body;

    await models.sequelize.transaction(async (transaction) => {
        await models.Products.findAll({
            where: {
                deletedAt: null
            }
        },{
            transaction,
        }).then((data) => {
            return res.status(200).json({
                message: "Produto localizado!",
                data
            })
        }).catch((err) => {
            return res.status(500).json({
                message: "Ouve um erro ao buscar os dados do produto.",
                err
            })
        })
    })
}

export default getAllProductInfo;