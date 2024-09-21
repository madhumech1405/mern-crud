/* eslint-disable react/jsx-key */
import {useEffect, useState} from "react"

function Todo() {
 const [title,setTilte]= useState("");
 const [descrption,setDescrption]=useState("")
 const [todo,setTodo]=useState([])
 const [error,setError]=useState('')
const [message,setMessage]=useState('')
const [editId,setEditId]=useState(-1)
//edit
const [editTitle,setEditTitle]=useState("")
const[editDescrption,setEditDescrption]=useState("")
const apiUrl="http://localhost:8000"
   const handleSumit=()=>{
    if(title.trim()!== " "&&descrption.trim()!== " "){
      fetch(apiUrl+"/todo",{
        method:"POST",
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify({title,descrption})
      }).then((res)=>{
        if(res.ok){
        setTodo([...todo,{title,descrption}])
        setTilte("");
        setDescrption('');
        setMessage("item success added")
        setTimeout(()=>{
          setMessage("")
        },3000)
        }else{
          setError("unale to created item server perbelom and refresh")
          setTimeout(()=>{
            setMessage("")
          },3000)
        }
      })


    }

   }

   useEffect(()=>{
    getItem()
   },[])
   const getItem=()=>{
    fetch(apiUrl+"/todo")
    .then((res)=>res.json())
    .then((res)=>{
      setTodo(res)
    })
   }
   const handleEdit=(item)=>{
    setEditId(item._id)
    setEditDescrption(item.title)
    setEditDescrption(item.descrption)
   }
  
   const handleUpdate=()=>{
  setError('')
      if(editTitle.trim()!== " "&&editDescrption.trim()!== " "){
      fetch(apiUrl+"/todo/"+editId,{
        method:"PUT",
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify({title:editTitle,descrption:editDescrption})
      }).then((res)=>{
        if(res.ok){
       const updateTodo=todo.map((item)=>{
            if(item._id== editId){
              item.title=editTitle
              item.descrption=editDescrption
            }
            return item
          })
        setTodo(updateTodo)
      setEditTitle('')
      setDescrption('')
        setMessage("item success update ")
        setTimeout(()=>{
          setMessage("")
        },3000)
        setEditId(-1)
        }else{
          setError("unale to created item server perbelom and refresh")
          setTimeout(()=>{
            setMessage("")
          },3000)
        }
      }).catch(()=>{
        setError('unable to create todo item')
      })
      
    }
    

   }
   const handleDelete=(id)=>{
    if(window.confirm('are you want to delete')){
      fetch(apiUrl+'/todo/'+id,{
        method:'DELETE'
      })
      .then(()=>{
 const updateTodo= todo.filter((item)=> item._id !==id)
 setTodo(updateTodo)
      })
    }

   }
   const handleEditCancel=()=>{
    setEditId(-1)
     }
  return (
    <>
    <div className="row p-3 bg-success text-light">
        <h1>Todo projecte witn mern stack</h1>
    </div>
    <div className="row">
        <h3>add item</h3>
     {message&&   <p className="text-lg-start">{message}</p>}
   
    
    <div className="form-group d-flex gap-2 ">
         <input  placeholder="title" onChange={(e)=>setTilte(e.target.value)} value={title} className="form-control" type="text"/>
         <input placeholder="descrption" onChange={(e)=>setDescrption(e.target.value)} value={descrption} className="form-control" type="text"/>
         <button className="btn btn-dark" onClick={handleSumit} >sumbit</button>
        

        </div>
     {error  &&   <p className="text-danger">{error}</p>}
    </div>
    <div className=" row mt-3">
      <h1>TASK</h1>
      <ul className="list-group">
      
        {todo.map((item)=>  <li className="'list-group-item bg-info d-flex justify-content-between align-items-center my-2">
       
       <div className="d-flex flex-column me-2"> 
        {
        editId == -1||editId!==item._id ?<>        
         <span className="fw-bold">{item.title}</span>
          <span >{item.descrption}</span>
          </>:<>
          <div className="form-group d-flex gap-2">
            <input  placeholder="title" onChange={(e)=>setEditTitle(e.target.value)} value={editTitle} className="form-control" type="text"/>
         <input placeholder="descrption" onChange={(e)=>setEditDescrption(e.target.value)} value={editDescrption} className="form-control" type="text"/>
          </div>
          </>
          } 

          </div>
          <div className="d-flex gap-2">
         {editId ==-1 ?<button className="btn btn-warning" onClick={()=>handleEdit(item)}>edit</button>:<button onClick={handleUpdate}>Update</button>}
          {editId==-1?<button className="btn btn-danger" onClick={()=>handleDelete(item._id)}>delete</button>:
          <button className="btn btn-danger " onClick={handleEditCancel}>cancel</button>}

          </div>

        </li>
        )}
        
        </ul>
        
       
    </div>
    </>
  )
}

export default Todo