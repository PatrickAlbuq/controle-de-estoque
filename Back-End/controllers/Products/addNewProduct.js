import models from '../../db/models';
const addNewProduct = async (req, res) => {
    const { code, name, description, quantity } = req.body;

    await models.sequelize.transaction(async (transaction) => {
        await models.Products.create({
            code,
            name,
            description,
            quantity,
        }, {
            transaction,
        }).then((data) => {
            return res.status(200).json({
                message: "Produto criado com sucesso!",
                data
            })
        }).catch((err) => {
            return res.status(500).json({
                message: "Erro ao criar produto!",
                err
            })
        });
    });
};


export default addNewProduct