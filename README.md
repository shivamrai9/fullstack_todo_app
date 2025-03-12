# **Todo App 📝 | MERN Stack with ShadCN UI**  

A **full-stack Todo App** built using **React, Node.js, Express, and MongoDB**, featuring authentication with cookies, CRUD operations, and a sleek UI powered by **ShadCN UI**.  

## **Features 🚀**  
- ✅ **User Authentication** (Token stored in cookies)  
- ✅ **Create, Read, Update, Delete (CRUD) Todos**  
- ✅ **Responsive UI** using **ShadCN UI**  
- ✅ **Axios for API Requests**  
- ✅ **Toast Notifications** using `sonner`  
- ✅ **Modal Dialog** for Editing Todos  
- ✅ **State Management** with `useState` and `useEffect`  

## **Tech Stack 🛠️**  
- **Frontend**: React, ShadCN UI, Axios  
- **Backend**: Node.js, Express.js, MongoDB  
- **Database**: MongoDB  
- **Styling**: Tailwind CSS  

## **Setup Instructions 📉**  
### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Start the Development Server**  
```sh
npm run dev
```

### **4️⃣ Backend Setup**  
Make sure the backend is running at `http://localhost:8000/` with the following APIs:  
- `POST /api/v1/user/login` → Stores auth token in cookies  
- `GET /api/v1/todo/alltodos` → Fetches all todos  
- `POST /api/v1/todo/create` → Creates a new todo  
- `PUT /api/v1/todo/update/:id` → Updates a todo  
- `DELETE /api/v1/todo/delete/:id` → Deletes a todo  

## **Usage 📋**  
1️⃣ **Login** to store the auth token in cookies.  
2️⃣ **Add Todos** by entering a title and description.  
3️⃣ **Edit Todos** using the edit button (opens a modal).  
4️⃣ **Delete Todos** instantly.  

## **Screenshots 📸**  
*(Add screenshots here for better visibility)*  

## **Contributing 🤝**  
Feel free to fork the repo, create a new branch, and submit a pull request!  

## **License 📚**  
MIT License 📝  

---
🚀 **Happy Coding!** 🎯

