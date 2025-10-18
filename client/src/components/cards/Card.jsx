import './Card.css';
import React from 'react';

function Card({ school, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState({ ...school });

    const handleClose = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(school.id,formData);
        handleClose();
    };

    

    return (
        <div className="card_container">
            {isEditing && (
                <div className="popup">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                        <input type="text" name="city" value={formData.city} onChange={handleChange} />
                        <input type="text" name="state" value={formData.state} onChange={handleChange} />
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleClose}>Cancel</button>
                    </form>
                </div>
            )}
            <div className='card_img'>
              <img src={school.image} alt="school image" />

            </div>
            <div className='card_info'>
                <h3>{school.name}</h3>
                <p>{school.email}</p>
                <p>{school.contact}</p>
                <p>{school.address} {school.city} {school.state}</p>
            </div>
            <div className='card_actions'>
                <button type="button" onClick={() => setIsEditing(true)} className="card_btn">Edit</button>
                <button type="button" onClick={onDelete} className="card_btn">Delete</button>
            </div>
        </div>
    );
}

export default Card;
