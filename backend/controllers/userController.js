import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from '../utils/datauri.js'
import cloudinary from '../utils/cloudinary.js';

export const register = async (req, res) => {
    try {
        const {fullname,email,phoneNumber,password,role} = req.body
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({message:'Please fill all the fields',success:false})
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message:'User already exists',success:false})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        })

        return res.status(201).json({
            message:'User registered successfully',
            success:true,
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const {email,password,role} = req.body;
        if (!email || !password || !role) {
            return res.json({message:'Please fill all the details',success:false})
        }

        let user = await User.findOne({email})
        if (!user) {
            return res.json({message:'Incorrect Email or Password',success:false})
        }


        const isPasswordMatched = await bcrypt.compare(password,user.password)
        if (!isPasswordMatched) {
            return res.json({message:'Incorrect Password',success:false})
        }
        // verify role
        if (role !== user.role) {
            return res.status(400).json({message:"Account doesn't exist with current role.",success:false})
        }
        
        // Generate token with userId
        const tokenData = {UserId:user._id}
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})
        
        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
        }


        return res.status(200).cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
                message: `Welcome back ${user.fullname}`,
                success: true,
                user
            });
        } catch (error) {
        console.log(error);
        
    }
}

export const logout = async (req,res) =>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:'Logged out successfully',
            success:true, 
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req,res) => {
    try {
        const {fullname,email,phoneNumber,bio,skills} = req.body
        const file = req.file

         // cloudinaty upload
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        

        let skillsArray;
        if(skills){
            skillsArray = skills.split(',')
        }
        
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({message:'User not found',success:false})
        }

        //updating data
        if(fullname) user.fullname = fullname
        if(email)user.email = email
        if(phoneNumber)user.phoneNumber = phoneNumber
        if(bio)user.profile.bio = bio
        if(skills)user.profile.skills = skillsArray

        //resume comes below
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url // save the cloudinary
            user.profile.resumeOriginalName = file.originalname //save in original file name
        }
        await user.save();

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
        }

        return res.status(200).json({
            message:'Profile updated successfully',
            success:true,
            user,
        })

    } catch (error) {
        console.log(error);
    }
}