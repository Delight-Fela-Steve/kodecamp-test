const { response } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const DataModel = require("./models/data");
require('dotenv').config();

const url = process.env['DB'];
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use(express.json());

// creates new data
app.post('/data', async (req,res)=>{
    const data = new DataModel(req.body);
    try{
        await data.save();
        res.send(data)
    }catch(error){
        res.status(500).send(error);
    }
});


// gets the list of data that have been created
app.get('/data', async (req,res)=>{
    const data = await DataModel.find({});
    try{
        res.send(data);
    }catch(error){
        res.status(500).send(error);
    }
});

// gets info about a particular data
app.get('/data/:id', async(req,res)=>{
    try{
        const data = await DataModel.findById(req.params.id);
        res.send(data);
    }catch(err){
        res.status(500).send(error);
    }

});

// updates the message of a particular data
app.put('/data/:id', async(req,res)=>{
    try{
        const data = await DataModel.findByIdAndUpdate(req.params.id, req.body);
        await data.save();
        const updated_data = await DataModel.findById(req.params.id);
        res.send(updated_data);
    }catch(err){
        res.status(500).send(err);
    }
});

// deletes a user
app.delete('/data/:id', async(req,res)=>{
    try{
        const data = await DataModel.findByIdAndDelete(req.params.id);
        if (!data){
            res.status(404).send("Item Not Found");
        }else{
            res.status(200).send(data)
        }
    }catch(err){
        res.status(500).send(err);
    }
});



app.listen(3000,()=>{
    console.log('Listening on port 3000...')
})




// This project does the following:
// Allows you to make a post request with name, age, message
// Allows you to make a put request to update the message
// Allows you to view all the data that was created
// Allows you to view a particular data that was created
// Allows you to delete a particular data that was created
// *One should be able to update message only*

// Steps:
// Create a model or whatever to validate data
// Connect to database
// Read, create and update to the database
// Store  database configuration files safely


// VJK1S23aUhmVgrOx
// mongodb+srv://Delight_Fela:VJK1S23aUhmVgrOx@cluster0.g65hs.mongodb.net/kodecamp?retryWrites=true&w=majority