import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({})
import connectDB from './utils/db.js'
import userRoute from './routes/userRoute.js'
import companyRoute from './routes/companyRoute.js'
import jobRoute from './routes/jobRoute.js'
import applicationRoute from './routes/applicationRoute.js'
const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    origin:['http://localhost:5173',
        'https://jobportal-mksi.onrender.com'
    ],
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use(cookieParser())

// api
app.use("/api/user",userRoute)
app.use("/api/company",companyRoute)
app.use("/api/job",jobRoute)
app.use("/api/application",applicationRoute)

app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running at port ${PORT}`);
    
})
