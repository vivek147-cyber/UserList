import React, { useState , useEffect  } from 'react'
import '../styles/AddList.css'

import { getupdateuser,updateuser } from '../services/api';
import { useNavigate, useParams  } from 'react-router-dom';

const initialvalues = {
    name: "",
    email: "",
    phone: ""
}

const UpdateList = () => {
    const navigate = useNavigate();
    const [user, setuser] = useState(initialvalues)
    const [error, setError] = useState('');
    const {id} =useParams();
    
    useEffect(() => {
        getuserdata();
    }, [])

    const getuserdata= async()=>{
         let response = await getupdateuser(id);
         setuser(response.data);
    }

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
             updateuserdetails();
          } else {
            setError('Please fill out all the fields.');
          }
    }

    const updateuserdetails = async () => {
        try {
            await updateuser(user,id);
            setuser(initialvalues);
            navigate('/');
        } catch (error) {
            setError("Fail to update user")
        }
    }

  

    return (

        <>
             <h1>OOps! Let's update Your Info. </h1>
            <div className="container">

                <form onSubmit={(e) => handleSubmit(e)}>
                    <h2>Edit User</h2>
                    {error && <div className="error">{error}</div>}
                    <div className="form-group">
                        <label for="name">Name</label>
                        <input onChange={(e) => onvaluechange(e)} type="text" id="name" name="name"  value={user.name} required />
                    </div>
                    <div className="form-group">
                        <label for="email">Email:</label>
                        <input onChange={(e) => onvaluechange(e)} type="email" id="email" name="email"  value={user.email} required />
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

export default UpdateList