import React, { useState } from 'react'
import '../styles/AddList.css'

import { adduser } from '../services/api';
import { useNavigate  } from 'react-router-dom';

const initialvalues = {
    name: "",
    email: "",
    phone: ""
}

const AddList = () => {
    const navigate = useNavigate();
    const [user, setuser] = useState(initialvalues)
    const [error, setError] = useState('');
    

    const validatePhoneNumber = (phone) => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
      };

    const onvaluechange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validatePhoneNumber(user.phone))
        {
            setError("Invalid Phone number");
            return;
        }

        if (user.name && user.email && user.phone) {
             adduserdetails();
          } else {
            setError('Please fill out all the fields.');
          }
    }

    const adduserdetails = async () => {
        try {
            await adduser(user);
            setuser(initialvalues);
            navigate('/');
        } catch (error) {
            setError("Fail to add user")
        }
    }

  

    return (

        <>
                <h1>Welcome :) ,Let's Add You in List! </h1>
            <div className="container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h2>Add User</h2>
                    {error && <div className="error">{error}</div>}
                    <div className="form-group">
                        <label for="name">Name</label>
                        <input onChange={(e) => onvaluechange(e)} type="text" id="name" name="name"  value={user.name} required />
                    </div>
                    <div className="form-group">
                        <label for="email">Email:</label>
                        <input onChange={(e) => onvaluechange(e)} type="email" id="email" name="email"  value={user.emai} required />
                    </div>
                    <div className="form-group">
                        <label for="phone">Phone:</label>
                        <input onChange={(e) => onvaluechange(e)} type="tel" id="phone" name="phone" value={user.phone} required />
                    </div>
                  <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddList