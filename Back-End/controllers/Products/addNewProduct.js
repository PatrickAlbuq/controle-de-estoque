import _ from 'lodash';
import models from '../../db/models';
const addNewProduct = async (req, res) => {
    try {
        const { code, name, description, quantity } = req.body;

        if (_.isNil(code) || _.isNil(name) || _.isNil(description) || _.isNil(quantity)) throw new Error("Todos os dados são necessários.")

        await models.sequelize.transaction(async (transaction) => {
            const data = await models.Products.create({
                code,
                name,
                description,
                quantity,
            }, {
                transaction,
            })

            if (_.isNil(data)) throw new Error("Houve um erro ao criar seu produto.")

            return res.status(200).json({
                message: "Produto criado com sucesso!",
                data
            })
        });
    } catch (err) {
        return res.status(500).json({
            message: "Houve um erro ao criar o produto.",
            error: err.message
        })
    }
};


export default addNewProduct