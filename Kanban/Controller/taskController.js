const Task = require('../Model/Task')
const ObjectId = require('mongoose').Types.ObjectId;


const createTask = async (req, res) => {
    try {
        const userId = req.user.userId;

        const {
            content,
            columnId
        } = req.body;

        const task = await Task.create({
            content,
            columnId,
            userId
        });

        const resTask = {
            id: task._id,
            columnId: task.columnId,
            content: task.content
        }
        res.status(201).json(resTask);
    } catch (err) {
        res.status(401).json({
            message: 'Some error occoured'
        })
    }
}


const getAllTask = async (req, res) => {
    try {
        const userId = req.user.userId;
        const task = await Task.find({
            userId
        });

        const updatedTask = task.map((item) => {
            return {
                id: item._id,
                columnId: item.columnId,
                content: item.content
            }
        })

        res.status(200).json(updatedTask)
    } catch (err) {
        res.status(401).json({
            message: 'Some Error occoured'
        })
    }
}


const updateTask = async (req, res) => {

    try {
        const userId = req.user.userId;
        const _id = req.param.id;
        const {
            containerId,
            content
        } = req.body;

        const findTask = await Task.findOne({
            _id
        });

        if (!findTask) {
            res.status(401).json({
                message: "Some Error Occoured"
            });
        }
        if (findTask.userId !== userId) {
            res.status(401).json({
                message: "Unauthorised"
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(_id, req.body);

        const resTask = {
            id: updatedTask._id,
            content: updatedTask.content,
            columnId: updatedTask.columnId
        };

        res.status(201).json(resTask);
    } catch (err) {
        res.status(401).json({
            message: 'Some Error occoured'
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const userId = req.user.userId;
        const _id = new ObjectId(req.params.id);
        const findTask = await Task.findOne({
            _id
        });

        if (!findTask) {
            res.status(401).json({
                message: "Some Error Occoured"
            });
        }

        if (findTask.userId.toString() !== userId) {

            res.status(401).json({
                message: "Unauthorised"
            });
        } else {
            await Task.findByIdAndRemove(_id);

            const resTask = {
                id: findTask._id,
                content: findTask.content,
                columnId: findTask.columnId
            };

            res.status(200).json(resTask)
        }


    } catch (err) {
        res.status(401).json({
            message: "Some Error Occoured"
        });
    }
}


module.exports = {
    createTask,
    getAllTask,
    updateTask,
    deleteTask
}