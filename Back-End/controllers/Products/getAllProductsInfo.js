import models from "../../db/models"
import _ from "lodash"

const getAllProductInfo = async (req, res) => {
    try {
        await models.sequelize.transaction(async (transaction) => {
            const data = await models.Products.findAll({
                where: {
                    deletedAt: null
                }
            },{
                transaction,
            })

            if (_.isNil(data)) throw new Error("Houve um erro ao buscar seus produtos.")
            if (data.length < 1) throw new Error("Não há nenhum produto na sua lista.")

            return res.status(200).json({
                message: "Produtos localizado!",
                data
            })
    })
    } catch (err) {
        return res.status(500).json({
            message: "Houve um erro ao buscar os dados dos produtos.",
            error: err.message
        })
    }
}

export default getAllProductInfo;