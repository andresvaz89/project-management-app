// src/pages/EditProjectPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import.meta.env.VITE_API_URL

/* const API_URL = "http://localhost:5005"; */

function EditProjectPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {projectId} =useParams()
  const navigate = useNavigate()

  const deleteProject = () => {                    //  <== ADD
    // Make a DELETE request to delete the project
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`)
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        navigate("/projects");
      })
      .catch((err) => console.log(err));
  };  

  const handleSubmit = (e)=>{
    e.preventDefault()
    // send a Post request to our server to create a newProject
    const updatedProject = {title,description}
    axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, updatedProject)
    .then(()=> navigate(`/projects/${projectId}`))
    .catch(err=>console.log(err))
    
    
}


  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`)
    .then(response => {
        setTitle(response.data.title)
    setDescription(response.data.description)})
    .catch(err => console.log(err))
},[projectId])
  
return (
  <div className="EditProjectPage">
    <h3>Edit the Project</h3>

    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <label>Description:</label>
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Update Project</button>
    </form>
    

    <button onClick={deleteProject}>Delete Project</button>
  </div>
);
}

export default EditProjectPage;
