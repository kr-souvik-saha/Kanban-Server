const express = require('express');
const {
    getAllContainer,
    createContainer,
    updateContainer,
    delateContainer
} = require('../Controller/containerController');
const {
    authMiddleware
} = require('../../Auth/middleware/authMiddleware');


const router = express.Router();

router.use(authMiddleware)
router.get('/', getAllContainer);
router.post('/', createContainer);
router.patch('/:id', updateContainer);
router.delete('/:id', delateContainer);


exports.router = router;