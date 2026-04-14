const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');

router.use(auth); // Protect all routes below
router.get('/', getTasks);
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
