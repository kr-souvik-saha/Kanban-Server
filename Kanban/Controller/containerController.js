const Container = require('../Model/Container');
const ObjectId = require('mongoose').Types.ObjectId;

const createContainer = async (req, res) => {
    console.log(req);
    try {
        const userId = req.user.userId;

        const {
            title
        } = req.body;

        const container = await Container.create({
            title,
            userId
        });

        const resContainer = {
            id: container._id,
            title: container.title
        }
        res.status(201).json(resContainer);
    } catch (err) {
        res.status(401).json({
            message: 'Some error occoured'
        })
    }
}

const getAllContainer = async (req, res) => {
    try {
        const userId = req.user.userId;
        const containers = await Container.find({
            userId
        });

        const updatedContainers = containers.map((item) => {
            return {
                id: item._id,
                title: item.title
            }
        })

        res.status(200).json(updatedContainers)
    } catch (err) {
        res.status(401).json({
            message: 'Some Error occoured'
        })
    }
}

const updateContainer = async (req, res) => {
    try {
        const userId = req.user.userId;

        const _id = new ObjectId(req.params.id);

        const {
            title
        } = req.body;

        const findContainer = await Container.findOne({
            _id
        });

        if (!findContainer) {
            res.status(401).json({
                message: "Some Error Occoured"
            });
        }

        if (findContainer.userId.toString() !== userId) {
            res.status(401).json({
                message: "Unauthorised"
            });
        } else {
            const updatedContainer = await Container.findByIdAndUpdate(_id, req.body);

            const resContainer = {
                id: updatedContainer._id,
                title: updatedContainer.title
            }


            res.status(201).json(resContainer);
        }
    } catch (err) {
        res.status(401).json({
            message: 'Some Error occouredd'
        })
    }
}

const delateContainer = async (req, res) => {
    try {
        const userId = req.user.userId;

        const _id = new ObjectId(req.params.id);

        const findContainer = await Container.findOne({
            _id
        });

        if (!findContainer) {
            res.status(401).json({
                message: "Some Error Occoured"
            });
        }
        if (findContainer.userId.toString() != userId) {
            res.status(401).json({
                message: "Unauthorised"
            });
        } else {
            await Container.findByIdAndRemove(_id);

            const resContainer = {
                id: findContainer._id,
                title: findContainer.title
            }

            res.status(200).json(resContainer)
        }


    } catch (err) {
        res.status(401).json({
            message: "Some Error Occoured"
        });
    }

}

module.exports = {
    createContainer,
    getAllContainer,
    updateContainer,
    delateContainer

}