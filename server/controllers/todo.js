import { Todo } from "../models/todo.js";

export const createtodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }
        const todo = new Todo({
            title,
            description
        })
        todo.save()

        return res.status(201).json({
            success: true,
            message: "Todo created",
            todo
        })
    } catch (error) {
        console.log(error)
    }
}


export const getAllTodo = async (req, res) => {
    try {
        const todos = await Todo.find();
        console.log(todos)

        return res.status(200).json({
            success: true,
            todos: todos
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const { title, description } = req.body;
        const todo = await Todo.findByIdAndUpdate(todoId, {
            title,
            description
        },{new:true})

        return res.status(200).json({
            success:true,
            todo,
            message:"Todo updated"
        })
    } catch (error) {
        console.log(error)
    }
}


export const deletetodo = async (req,res) =>{
    try {
        const todoId = req.params.todoId;
        console.log(todoId)
        const deletedTodo = await Todo.findByIdAndDelete(todoId)

        return res.status(200).json({
            success:true,
            deletedTodo,
            message:"Todo deleted successfully"
        })
    } catch (error) {
        console.log(error)
    }
}