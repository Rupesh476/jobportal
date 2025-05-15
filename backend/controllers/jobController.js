import { Job } from "../models/jobModel.js" 

// for admin craete job
export const postJob = async(req,res) =>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId){
            return res.status(400).json({message:'Please fill all the fields',success:false})
        }
        const newJob = await Job.create({
            title,description,requirements:requirements.split(","),salary:Number(salary),location,jobType,experience,position,company:companyId,created_by:userId
        })
        return res.status(200).json({message:'Job Created Successfully',success:true,Job})
    } catch (error) {
        console.log(error);
        ``
    }
}

// for students
export const getAllJobs = async(req,res) =>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:'company'
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({message:'No Jobs Found',success:false})
        }
        return res.status(200).json({message:'Jobs Found',success:true,jobs})
    } catch (error) {
        console.log(error);
        
    }
}

// for students
export const getJobById = async(req,res) =>{
    try {
        const jobId = req.params.id;
        const getJob = await Job.findById(jobId).populate({
            path:"applications"
        })
        if(!Job){
            return res.status(404).json({message:'Job Not Found',success:false})
        }
        return res.status(200).json({message:'Job Found',success:true,getJob})
    } catch (error) {
        console.log(error);
    }
}

//for admin to check he creted jobs
export const getAdminJobs = async (req,res) =>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        })
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({message:'No Jobs Found',success:false})
        }
        return res.status(200).json({message:'Jobs Found',success:true,jobs})
    } catch (error) {
        console.log(error);
    }
}