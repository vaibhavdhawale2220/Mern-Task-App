const dotenv = require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const Task = require ("./model/taskModel");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false}));
app.use("/api/tasks", taskRoutes);

// Routes
app.get("/", (req, res) => {
    res.send("Home page");
});

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
    
        console.log(`MongoDB Connected ${connect.connection.host}`);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error) 
    }
};

startServer();
