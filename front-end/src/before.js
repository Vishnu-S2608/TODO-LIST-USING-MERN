return (
    <>
        <div className="row p-3 bg-success text-light">
           <h1>ToDo App With <b>MERN</b> Stack</h1> 
        </div>
        <div className='row'>
            <h3>Add Item</h3>
            {message && <p className='text-success'>{message}</p>} {/* if message is there then P tag will show */}
            {/* this BOOTSTRAP is for form */}
            <div className='form-group d-flex gap-2 '>
                <input 
                  className='form-control'
                  placeholder="Title"
                  type="text"
                  value={title}//initial value "nothing" in title then after changing value by value
                  onChange={(e)=> setTitle(e.target.value)} //after changing value by value it stores in settitle

                 />
                <input 
                  className='form-control'
                  placeholder="Description"
                  type="text"
                  value={description}
                  onChange={(e)=> setDescription(e.target.value)}
                />
                <button className='btn btn-dark' onClick={handleSubmit} >Submit</button>
            </div>
            {error && <p className='text-danger'>{error}</p>}{/* if error is not empty then it will show */}
        </div>



        <div className='row mt-2' >
          <h3>Tasks</h3>
          <div className='col-md-6'>
            <ul className='list-group'>
            {//check here
              todos.map((item)=> 
              <li className='list-group-item bg-info d-flex justify-content-between align-items-center my-2' >
                <div className='d-flex flex-column me-2'>
                  {
                    editId == -1 || editId !== item._id ? <>
                      <span className='fw-bold'>{item.title}</span>
                      <span>{item.description}</span>
                    </> : <> 
                      <div className='form-group d-flex gap 2 '> 
                        <input 
                          className='form-control me-2'
                          placeholder="Title"
                          type="text"
                          value={editTitle}
                          onChange={(e) =>setEditTitle(e.target.value)}

                        />
                        <input 
                          className='form-control me-2'
                          placeholder="Description"
                          type="text"
                          value={editDescription}
                          onChange={(e)=> setEditDescription(e.target.value)}
                        />
                      </div>  
                    </>
                  }
                  
                </div>
                <div className='d-flex gap-2'>
                  {editId == -1 || editId !== item._id ? <button className='btn btn-secondary' onClick={() => handleEdit(item)}>Edit</button> : <button className='btn btn-warning' onClick={handleUpdate}>Update</button>}

                  { editId == -1 ? <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>delete</button> :<button className='btn btn-danger' onClick={handleEditCancel}>Cancel</button>}
                </div>
              </li> )
            }
            </ul>
          </div>
        </div>

    </>
  )