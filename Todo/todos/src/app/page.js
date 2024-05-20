'use client';
import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Button, Container, Modal, NavItem } from 'react-bootstrap';
import axios from 'axios';
function page() {
  const [show, setShow] = useState(false);
  const [update, setupdate] = useState(false);
  const [todos, setTodos] = useState([]);
  const handleClose = () => {setShow(false)
    setupdate(false)};
  const [todoitem,setTodoItem]=useState({
    Activityname: '',
    id:'',
  })
  const [formData, setFormData] = useState({
    
    Activityname: '',
  
  });
  useEffect(() => {
    fetchData()
  }, [])
  const handleShow = (todo) => {
    setShow(true);
  };
 
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4002/get');
      setTodos(response.data,() => {
      });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  const deleteItem =async(todoId)=>{
    try {
        console.log(todoId);
      let result= await axios.delete(`http://localhost:4002/delete/${todoId}`);
    
       if(result){
         fetchData()
       }
     } catch (error) {
      console.log(error);
       console.error('Error deleting id:', error);
     }
    
    }
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    const handleSubmit= async(event)=>{
      event.preventDefault();
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const {Activityname} = formData;
        
        const value = await axios.post(
          "http://localhost:4002/add",
          { Activityname},
          config
        );
    
          if(value){
            fetchData();
            setShow(false)
          }
      } 
      catch (error) {
        console.log(error);
      }
      setShow(false)
      setFormData({ Activityname:''})
    }
    const modalshow= (item)=>{
      
    setTodoItem({...todoitem,Activityname:item.Activityname,id:item._id})
    setupdate(true);
    }
const handleupdateChange=(e)=>{
  const { name, value } = e.target;
  setTodoItem({ ...todoitem, [name]: value });
}
const updateProduct=async(id)=>{
  try {
    const config={
      headers:{
        "Content-type":"application/json"
      }
    }
    const { Activityname }=todoitem
    const value=await axios.put(`http://localhost:4002/edit/${id}`,{Activityname},config)
    if(value)
    {
      fetchData();
      setTodoItem({
        Activityname:''
      })
      setupdate(false);
    }
  } catch (error) {
    console.log(error);
  }
  }
  return (
   <>
   <div>
   <h1 className='bg-black text-white font-bold text-center'>My Todo List</h1>
   <div>
 
      <Container >
        <h1 className="mb-4">Table List</h1>
        <div className="mb-3">
          
            <a className="btn btn-success" onClick={handleShow}>Add Activity</a>
      
        </div>
        <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th >Activity Name</th>
                <th >Edit</th>
                <th >Delete</th>
              </tr>
            </thead>
            <tbody>
            
                {
                  todos.map((todo,key)=>
                  <>
                  <tr>
                  <th>{todo.Activityname}</th>
                <th>
                  <button className="btn btn-warning" onClick={()=>modalshow(todo)}>
                    <CiEdit />
                  </button>
                </th>
                <th>
                  <button className="btn btn-danger" onClick={()=>deleteItem(todo._id)} >
                 < MdDelete/>
                  </button>
                </th>
                </tr>
                  </>
                  )
                }
      
             
            </tbody>
          </table>
        </Container>

   </div>
   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label  className='signup-label' htmlFor="Activityname">Enter</label>
        <input  autoComplete="off"  className='w100' type="text" name='Activityname' value={formData.Activityname} onChange={handleChange} placeholder="Here" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add todo
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={update} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
        <input  autoComplete="off"   type="text"  onChange={handleupdateChange} name='Activityname' value={todoitem.Activityname} placeholder={todoitem.Activityname}/>
        
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>updateProduct(todoitem.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

   </div>
   </>
  )
}

export default page