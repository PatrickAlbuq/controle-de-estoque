import { EmptyResultError } from "sequelize";
import models from "../../db/models"
import _ from 'lodash'

const getProductInfo = async (req, res) => {
    try {
        const { id } = req.body;

        if (_.isNil(id)) throw new Error("É necessário um ID de produto")

        await models.sequelize.transaction(async (transaction) => {
            const data = await models.Products.findOne({
                where: {
                    id: id,
                    deletedAt: null
                },
            }, {
                transaction,
            })

            if (_.isNil(data)) throw new Error("Não foi possível encontrar um produto com os dados recebidos.")


            return res.status(200).json({
                message: "Produto localizado!",
                data
            })
        })
    } catch (err) {
        return res.status(500).json({
            message: "Houve um erro ao buscar os dados do produto.",
            error: err.message
        })
    }
}

export default getProductInfo