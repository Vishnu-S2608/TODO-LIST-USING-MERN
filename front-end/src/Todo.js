import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";

const Todo = () => {
  const [title,setTitle]=useState("");
  const [description,setDescription ]=useState("");
  const [todos, setTodos] = useState([])
  const [error,setError] = useState('')
  const [message,setMessage] =useState('')
  const [editId,setEditId] =useState(-1)
  const apiUrl = "http://localhost:8000"

  //edit states
  const [editTitle,setEditTitle] =useState('')
  const [editDescription , setEditDescription] = useState("")

    const handleSubmit = () =>{
        setError('')//while submitting no error message is there
        // check input is correct "test"
        if(title.trim() !== '' && description.trim() !== ''){
          fetch(apiUrl+"/todos",{
            method:"POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({title,description})
          }).then((res) =>{
            if (res.ok) { 
              //add item to list now
              setTodos([...todos,{title,description}])
              setTitle('');
              setDescription('');
              setMessage("Item Added Successfully");
              setTimeout(()=>{
                setMessage('');
              },2000)
            }else{
            //set error
            setError("Unable to create Todo Item")
            }
          }).catch(()=>{
            setError('Network error Unable to create a todo item')
          })
        }
    }
    //we will get items when page reloads
    useEffect(() =>{
      getItems()
    },[]) // this empty array [] is used --> becoz when page reloads it call only ones
 
    const getItems =() =>{
      fetch(apiUrl+"/todos")
      .then((res) => res.json())
      .then((res) => {
        setTodos(res)
      })
    }

    const handleEdit = (item)=> {
      setEditId(item._id);
      setEditTitle(item.title);
      setEditDescription(item.description)
    }

    const handleUpdate = () =>{
      setError('')//while submitting no error message is there
      // check input is correct "test"
      if(editTitle.trim() !== '' && editDescription.trim() !== ''){
        fetch(apiUrl+"/todos/"+editId,{
          method:"PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({title:editTitle,description:editDescription})
        }).then((res) =>{
          if (res.ok) { 
            //update item to list now
            const updatedTodos = todos.map((item) =>{
              if(item._id == editId) {
                item.title = editTitle;
                item.description = editDescription;
              }
              return item;
            })
            setTodos(updatedTodos)
            setEditTitle('');
            setEditDescription('');
            setMessage("Item Updated Successfully")
            setTimeout(()=>{
              setMessage('');
            },2000)

            setEditId(-1)
          }else{
          //set error
          setError("Unable to create Todo Item")
          }
        }).catch(()=>{
          setError('Network error Unable to create a todo item')
        })
      }
    }

    const handleEditCancel = ()=>{
      setEditId(-1)
    }

    const handleDelete = (id)=>{
      if(window.confirm('Are Sure Want to delete')){
        fetch(apiUrl+'/todos/'+id, {
          method: "DELETE"
        })
        .then(()=>{
          const updatedTodos = todos.filter((item) => item._id !== id)
          setTodos(updatedTodos)
        })
      }
    }


    return (
      <div style={{ minHeight: '100vh', background: '#1F1D2B', padding: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass text-white p-4 mb-4"
        >
          <h1 className="text-center display-4" style={{ color: '#A66CFF' }}>
            ToDo App With <b className="text-warning">MERN</b> Stack ✨
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-4 mb-4 text-white"
        >
          <h3 className="mb-3" style={{ color: '#FFD93D' }}>➕ Add Item</h3>

          {message && <motion.p animate={{ opacity: 1 }} className='text-success'>{message}</motion.p>}

          <div className='form-group d-flex flex-wrap gap-3'>
            <input
              className='form-control glass text-white'
              style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none' }}
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className='form-control glass text-white'
              style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none' }}
              placeholder="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='btn px-4'
              style={{
                backgroundColor: '#A66CFF',
                color: '#fff',
                borderRadius: '25px',
                border: 'none',
                boxShadow: '0 0 10px #A66CFF'
              }}
              onClick={handleSubmit}
            >
              Submit
            </motion.button>
          </div>

          {error && <p className='text-danger mt-2'>{error}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-4 text-white"
        >
          <h3 style={{ color: '#58E070' }}>📋 Tasks</h3>
          <ul className='list-group mt-3'>
            <AnimatePresence>
              {todos.map((item) => (
                <motion.li
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -100 }}
                  className='glass list-group-item my-2 text-white d-flex justify-content-between align-items-center'
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: 'none' }}
                >
                  <div className='me-3'>
                    {editId === item._id ? (
                      <div className='form-group d-flex gap-2 flex-wrap'>
                        <input
                          className='form-control glass text-white'
                          style={{ background: 'rgba(255,255,255,0.05)', border: 'none' }}
                          placeholder="Title"
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <input
                          className='form-control glass text-white'
                          style={{ background: 'rgba(255,255,255,0.05)', border: 'none' }}
                          placeholder="Description"
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        />
                      </div>
                    ) : (
                      <>
                        <span className='fw-bold fs-5'>{item.title}</span>
                        <br />
                        <span className='text-light'>{item.description}</span>
                      </>
                    )}
                  </div>

                  <div className='d-flex gap-2 flex-wrap'>
                    {editId === item._id ? (
                      <>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className='btn btn-warning rounded-pill'
                          onClick={handleUpdate}
                        >
                          Update
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className='btn btn-secondary rounded-pill'
                          onClick={handleEditCancel}
                        >
                          Cancel
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className='btn btn-outline-light rounded-pill'
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className='btn btn-outline-danger rounded-pill'
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </motion.button>
                      </>
                    )}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      </div>
    );

}

export default Todo;