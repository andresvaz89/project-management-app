// src/components/AddProject.js

import { useState } from "react";
import axios from "axios";
import.meta.env.VITE_API_URL


/* const API_URL = "http://localhost:5005"; */
function AddProject({getAllProjects}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        // send a Post request to our server to create a newProject
        const newProject = {title,description}
        axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, newProject)
        .then(response =>{
            setTitle("");
            setDescription("");
            getAllProjects();
        }).catch(err=>console.log(err))
        
        
    }
    
    return (
        <div className="AddProject">
        
      <h3>Add Project</h3>

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
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProject;
