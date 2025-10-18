import { useState } from "react"
import './AddSchool.css'



function Add() { 

    const [data,setData] = useState({

    })  

    let url = 'https://school-e2op.onrender.com/api'

    const dataHandler = (event)=>{ 
       setData((prev)=>({...prev,[event.target.name]:event.target.value}))
    } 

    const handleSubmit = async (event) => {  
        event.preventDefault();
        try {
            const response = await fetch(`${url}/school`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert('School added successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add school. Please try again.');
        }
    }



    return (
        <div className="add_container">
            <h1>Add School</h1> 
            <form onSubmit={handleSubmit} className="form_container" >
                <span className="form_inputs">
                    <h3>Name</h3>
                    <input type="text" placeholder="Enter School Name " name="name" id="name" value={data.name} onChange={dataHandler} />
                </span> 
                <span className="form_inputs">
                    <h3>Email</h3>
                    <input type="email" placeholder="Enter valid email address" name="email" id='email' value={data.email} onChange={dataHandler}  />
                </span>
                
                <span className="form_inputs">
                    <h3>Address</h3>
                    <input type="text" placeholder="Enter Address" name="address" id="address" value={data.address}  onChange={dataHandler}/>
                </span>
                <span className="form_inputs">
                    <h3>city</h3>
                    <input type="text" placeholder="Enter city name" name="city" id='city' value={data.city}  onChange={dataHandler} />
                </span>
                <span className="form_inputs">
                    <h3>State</h3>
                    <input type="text" placeholder="Enter state" name="state" id="state" value={data.state}  onChange={dataHandler} />
                </span>
                <span className="form_inputs">
                    <h3>Contact</h3>
                    <input type="phone" placeholder="Enter valid contact number"  name='contact' id="contact"  value={data.contact}  onChange={dataHandler} />
                </span>
                <span className="form_inputs">
                    <h3>Image</h3>
                    <input type="text" placeholder="Enter Image Url" name="image" id="image"   value={data.image} onChange={dataHandler} />
                </span>
               
                <button className="submit_btn" type="submit">Add</button>
            </form>
        </div>
    )
} 

export default Add;