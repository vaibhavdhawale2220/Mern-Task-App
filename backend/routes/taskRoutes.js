const express = require('express');
const { CreateTask, getTasks, getTask, deleteTask, updateTask} = require('../controllers/taskController');
const Task = require ("../model/taskModel");
const router = express.Router();

// API's
router.post('/', CreateTask);
router.get('/', getTasks); 
router.get('/:id', getTask);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTask); 

module.exports = router;