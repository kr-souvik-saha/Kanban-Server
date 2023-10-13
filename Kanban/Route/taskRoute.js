const express = require('express');
const {
    getAllTask,
    createTask,
    updateTask,
    deleteTask,
} = require('../Controller/taskController');
const {
    authMiddleware
} = require('../../Auth/middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', getAllTask);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);


exports.router = router;