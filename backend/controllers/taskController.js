const Task = require ("../model/taskModel");

const CreateTask = async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

};

const getTasks = async(req, res) => {
    try {
        const task = await Task.find()
        res.status(200).json(task)
    } catch (error) {
        res.status(500) .json({msg: error.msg})   
    }

};

const getTask = async (req, res) => {
    try {
        const {id} = req.params
        const task = await Task.findById(id);
        if(!task){
            return res.status(404).json(`NO Task With ID ${id}`)
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
    console.log(req.params);
};

const deleteTask = async(req, res) => {
    try {
        const {id} = req.params
        const task = await Task.findByIdAndDelete(id)
        if(!task){
            return res.status(404).json(`NO Task With ID ${id}`)
        }
        res.status(200).send("Task Deleted")
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndUpdate(
            { _id: id }, req.body,{ 
                new: true,
                runValidators: true
             });
        if(!task){
            return res.status(404).json(`NO Task With ID ${id}`)
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};


module.exports = {
    CreateTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}