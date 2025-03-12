import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { toast } from "sonner"
import Navbar from './pages/Navbar'
import axios from 'axios'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './components/ui/dialog'

function App() {
  const [todoContant, setTodoContent] = useState({
    title: "",
    description: ""
  })
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);



  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/todo/alltodos", { withCredentials: true });
      console.log(res.data.todos)
      setTodos(res.data.todos); // Assuming response is an array of todos
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoContent((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    console.log(todoContant)

    try {
      const res = await axios.post("http://localhost:8000/api/v1/todo/create", todoContant, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message)
        fetchTodos();
      }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/todo/delete/${id}`, { withCredentials: true });
      toast.success("Todo deleted!");
      fetchTodos();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete todo.");
    }
  };

  // ✅ Open edit dialog
  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setIsDialogOpen(true);
  };

  // ✅ Update a todo
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/v1/todo/update/${editTodo._id}`, editTodo, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success("Todo updated!");
      fetchTodos();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update todo.");
    }
  };


  return (
    <>
      <Navbar />
      <div className='container max-w-5xl mx-auto p-4 justify-between flex bg-amber-100 rounded-2xl mt-5'>
        <div className='flex gap-4 border-2 p-2 rounded-xl'>

          <Input type="text" placeholder="Enter New Todo...." className="w-fit" name="title" value={todoContant.text} onChange={handleChange} />
          <Input type="text" placeholder="Enter New Description...." className="w-fit" name="description" value={todoContant.description} onChange={handleChange} />
        </div>
        <Button onClick={handleSubmit}>Add</Button>
      </div>


      <div className="max-w-6xl mx-auto h-[calc(80vh-100px)] overflow-y-scroll p-4 ">
          {todos.map((todo) => (
            <div key={todo._id} className="flex justify-between items-center p-2 border rounded-md my-2">
              <div>
                <h3 className="text-lg font-bold">{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEditClick(todo)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(todo._id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        
      </div>


      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>Modify your todo details below.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Update Title"
              value={editTodo?.title || ""}
              onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Update Description"
              value={editTodo?.description || ""}
              onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


    </>
  )
}

export default App
