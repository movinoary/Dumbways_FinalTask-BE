const {category} = require("../../models");

exports.addCategory = async (req, res) => {
    try {
        await category.create(req.body);

        res.send({
            status: 'success',
            message: 'Add Category Success..'
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
};

exports.getCategory = async (req, res) => {
    // code here
    try {
        const data = await category.findAll();

        res.send({
            status: "success",
            data: {
                data
            }
        });
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        });
    }
};

exports.getCategorybyId = async (req, res) => {
    try {
        const { id } = req.params

        const data = await category.findOne({
            where: {
                id: id
            }
        });

        res.send({
            status: "success",
            data: {
                data
            }
        });

    } catch (error) {
        res.send({
            status: 'failed',
            message: 'Server Error'
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params

        await category.update(req.body, {
            where: {
                id
            }
        });

        res.send({
            status: 'success',
            message: `Update product id: ${id}`,
            data: req.body
        });
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        await category.destroy({
            where: {
                id
            }
        });

        res.send({
            status: "success",
            message: `Delete product id:${id}`
        });
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        });
    }
};
