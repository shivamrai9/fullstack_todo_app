
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/login", loginData,{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
      });
      if(res.data.success){
        toast("successfully logedin")
      }
      console.log("Login Success:", res.data);
      setOpen(false); 
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
        const res = await axios.get("http://localhost:8000/api/v1/user/logout",{
          headers:{
              "Content-Type":"application/json"
          },
          withCredentials:true
        });
        if(res.data.success){
          toast(res.data.message)
        }
      } catch (error) {
        toast("Login Failed:", error);
      }
  };

  return (
    <div className="w-full bg-amber-300">
      <nav className="container max-w-7xl flex justify-between items-center p-4 mx-auto text-white">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <div className="flex gap-4">
          {/* Login Dialog */}
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Login</Button>
            </DialogTrigger>
            <DialogContent  className="p-6">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription >
                  Enter your credentials to access your account.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleChange}
                  />
                </div>
                <Button className="w-full" onClick={handleLogin}>Login</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Logout Button */}
          <Button onClick={handleLogout}>Logout</Button>
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
