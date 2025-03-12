import express from "express"
import { createtodo, deletetodo, getAllTodo, updateTodo } from "../controllers/todo.js";
import { isAunthenticated } from "../middleware/isAuthenticated.js";
 

const router = express.Router();

router.route('/create').post(isAunthenticated,createtodo)
router.route('/alltodos').get(getAllTodo)
router.route('/update/:todoId').put(isAunthenticated,updateTodo);
router.route('/delete/:todoId').delete(isAunthenticated,deletetodo);

export default router;