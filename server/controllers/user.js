import jwt from "jsonwebtoken"
import { User } from "../models/user.js"
import bcrypt from "bcrypt"
export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // finding user with this email id is already registerd or not 
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "This email is already Registered"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "Use created Successfuly"
        })


    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {

        console.log(req.headers)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }
        const ispasswordMatch = await bcrypt.compare(password, user.password)
        if (!ispasswordMatch) {
            return res.status(400).json({
                success: fase,
                message: "Incorrect email or password"
            })
        }

        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" })

        return res.status(200).cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 }).json({
            success: true,
            message: `welocme back ${user.fullName} you are loged In`
        })
    } catch (error) {
        console.log(eror)
    }
}

export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true,
            message:"logout successefuly"
        })
    } catch (error) {
        console.log(error)
    }
}