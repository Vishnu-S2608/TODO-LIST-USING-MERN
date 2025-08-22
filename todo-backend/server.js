//Express
const express = require('express');
const { getDatabase, todoModel } = require('./database');
const cors = require('cors')

//create a instance of express
const app = express();

app.use(express.json());//use key word is used for passing middlewares her it is for postMan requset to know this is a string
app.use(cors())// this will say that incoming data is in json format
//conecting mongodb  that is db impo
getDatabase();


/* define a route */
//Create a new todo items in DB
app.post('/todos',async (req,res)=>{
     const {title,description} = req.body;
    // const newTodo = {
    //     id : todos.length+1,//for unique ids
    //     title,  //title = title;
    //     description
    // }
    // todos.push(newTodo);
    // console.log(todos);

    /* Always USE TRY and CATCH blocks while in DB operations */
    try {
        const newtodo = new todoModel({title,description});
        await newtodo.save();//it will save in Database
        res.status(201).json(newtodo);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message});//if title an description is not there then error message will occur
    }

})

//Get all items from DB
app.get('/todos',async(req,res) =>{
    try {
        const todos = await todoModel.find();
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
})

//update todo Item from Db
//in postman there is no required fieds
app.put("/todos/:id",async(req,res) =>{
    try {
        const {title,description} = req.body;
        const id = req.params.id;//this is how we can get an id of that particular data..
        const updatedTodo = await todoModel.findByIdAndUpdate(
            id,//in url what u are gn that should be same
            { title , description },
            { new: true}
        )
        if(!updatedTodo) {
            return req.status(404).json({message:"Todos not found"})
        }else{
            res.json(updatedTodo)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
})//here we need to desscribe a url with unique valu that is ID in MongoDb so that we can easy to update and delete

//Delete a todo item
app.delete('/todos/:delid',async(req,res) => {
    try {
        const delid= req.params.delid;
        const deletedtodo = await todoModel.findByIdAndDelete(delid);
        if(!deletedtodo){
            return req.status(504).json({message:"no such id existe then what the thing can I delete"})
        }else{
            res.status(200).json({message:"To do deleted Successfully",deletedtodo}).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
})

//start the server
const port =8000;
app.listen(port,() => {
    console.log('server is running in port '+port);
})