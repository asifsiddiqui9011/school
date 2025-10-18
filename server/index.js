const port = 8000
import express from 'express' 
import cors from 'cors' 

import schoolRoutes from './routes/schoolRoutes.js'
import createSchoolTable from './models/schoolModel.js'


const app = express() 
app.use(express.json());
app.use(cors()); 

createSchoolTable()

app.use('/api', schoolRoutes);


app.listen(port, (error)=>{

    if(!error){
       console.log("app is listening on port: ",port)
    }
    else
    {
    console.log(error)
    }
})
