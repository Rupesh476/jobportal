import {Application} from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js"

export const applyJob = async (req,res) =>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(404).json({message:'Job id required',success:false})
        }

        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({job:jobId, applicant:userId});
        if(existingApplication){
            return res.status(400).json({message:'You have already applied for this job',success:false})
        }

        // check if the job exists
        const applyJob = await Job.findById(jobId);
        if(!applyJob){
            return res.status(404).json({message:'Job not found',success:false})
        }

        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        applyJob.applications.push(newApplication._id);
        await applyJob.save();
        return res.status(200).json({message:'Job Applied Successfully',success:true,application:newApplication})
    } catch (error) {
        console.log(error);
        
    }
}

export const getAppliedJobs = async (req,res) =>{
    try {
        const userId = req.id;
        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{path:'company',options:{sort:{createdAt:-1}}}
        })
        if(!applications || applications.length === 0){
            return res.status(404).json({message:'No Applications Found',success:false})
        }
        return res.status(200).json({message:'Applications Found',success:true,applications})
    } catch (error) {
        console.log(error);
    }
}

//to check all the applicants for a job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id; // Correctly extract the job ID from req.params
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: { path: 'applicant', options: { sort: { createdAt: -1 } } }
        });

        if (!job || job.applications.length === 0) {
            return res.status(404).json({ message: 'No Applications Found', success: false });
        }

        return res.status(200).json({ message: 'Applications Found', success: true, applications: job.applications });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

export const updateStatus = async(req,res) =>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({ message: 'Status is required', success: false });
        }
        //find the application By application id
        const application = await Application.findOne({_id:applicationId});
        if (!application) {
            return res.status(404).json({ message: 'Application not found', success: false });
        }
        //update the status of the application
        const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });
        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found', success: false });
        }
        return res.status(200).json({ message: 'Application status updated successfully', success: true, application: updatedApplication });

    } catch (error) {
        console.log(error);
    }
}