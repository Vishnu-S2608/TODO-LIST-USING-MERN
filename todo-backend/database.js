const mongoose = require('mongoose');

async function getDatabase(){
      mongoose.connect('mongodb://127.0.0.1:27017/Todo-App')
      .then(() =>{
          console.log('Database Connected')
      }).catch((err)=>{
          console.log(err)
      })
  }

  const todoSchema = new mongoose.Schema({
    title:
    {
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    }
  })

  const todoModel = mongoose.model('Todo',todoSchema)
  
  module.exports={
      getDatabase,todoModel
  
  };