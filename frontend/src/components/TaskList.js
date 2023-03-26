import TaskForm from "./TaskForm"
import Task from "./Task"
import axios from "axios";
import { createRef, useEffect, useState } from "react"
import { toast } from "react-toastify";
import { FaSlideshare } from "react-icons/fa";
import loadingImg from "../assets/loader.gif"
const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedtasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    Completed: false
  })

  const {name} = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value })
  };

  const getTasks = async () => {
    setIsLoading(true)
    try {
      const {data} = await axios.get("http://localhost:5000/api/tasks")
      setTasks(data)
      setIsLoading(false)
    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  };
  useEffect(() => {
    getTasks()
  }, [])


  const createTask = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (name === "") {
      return toast.error("Input Field Cannot Be Empty")
    }
    try{
      await axios.post("http://localhost:5000/api/tasks", formData)
      toast.success("Task Added Successfully")
      setFormData({...formData, name: ""})
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  };

  const deleteTask = async(id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`)
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm name={name} 
      handleInputChange={handleInputChange} 
      createTask={createTask}
      />
      <div className="--flex-between --pb">
          <p>
            <b>Total Task:</b> 0 
          </p>
          <p>
            <b> Completed Task:</b> 0
          </p>
      </div>
      <hr/>  
      { isLoading && (
          <div className="--flex-center">
              <img src={loadingImg}
              alt="Loading" />
          </div>
        )}
        {
          !isLoading  && tasks.length === 0 ? (
            <p className="-py"> No task added.
            Please add a task </p>
          ) : (
            <>
              {tasks.map((task, index) => {
                return (
                  <Task 
                    key={task._id} 
                    task={task} 
                    index={index}
                    deleteTask={deleteTask}
                    />
                )
              })}
            </>
          )
        }
    </div>
  );
};

export default TaskList