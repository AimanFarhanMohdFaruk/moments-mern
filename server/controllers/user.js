import mongoose from 'mongoose'
import User from "../models/user"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signIn = async (req,res) => {

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({message: "User not found"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.TOKEN_KEY, { expiresIn: "1h" })

        res.status(200).json({result: existingUser, token })

    } catch (error) {
        res.status(500).json( {message: "Something went wrong, try again"})
    }
};

export const signUp = async (req,res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body


    try {
        if(!(email && password && firstName && lastName)){
            res.status(400).json({message: "All inputs are required for sign up."})
        }

        const existingUser = await User.findOne({email});

        if (existingUser) return res.status(400).json({message: "User already exists, please sign in"})

        if(password !== confirmPassword) return res.status(500).json({message:"Passwords do not match"})

        const encryptPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            name: `${firstName} ${lastName}`, email, password: encryptPassword,
        });

        const token = jwt.sign(
            {id : newUser._id, email: newUser.email}, process.env.TOKEN_KEY, {expiresIn: "1h"});

        res.status(200).json({ newUser, token })

    } catch (error) {
        res.status(500).json( {message: error.message})
    }
};