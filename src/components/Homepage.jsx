import React, { useState } from 'react'
import '../styles/Homepage.css'
import { useEffect } from 'react'
import { getuser, deleteuser } from '../services/api'
import { Link } from 'react-router-dom'

const Homepage = () => {
    const [user, setuser] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        getuserDetails();
    }, [])

    const getuserDetails = async () => {
        try {
            let response = await getuser();
            setuser(response.data);
            setError('');
        } catch (error) {
            setError("Fail to show user details");
        }
    }

    const deletinguser = async (id) => {
        try {
            await deleteuser(id);
            getuserDetails();
            setError('');
        } catch (error) {
            setError("Fail to show user details");
        }
    }

    return (
        <>
           
                <center><h1>Welcome :) , Start Adding users! </h1>
               <Link to="/adduser"><button className="add-btn">Add User</button></Link></center>
            <div className="table-container ">
                {error && <div className="error">{error}</div>}
                <table>
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>phone Number</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user?.map((i,count) => (
                            <tr>
                                <td>{count+1}</td>
                                <td>{i.name}</td>
                                <td>{i.email}</td>
                                <td>{i.phone}</td>
                                <td class="update"><Link to={`/updateuser/${i.id}`}><button className="update-btn">Edit</button></Link></td>
                                <td class="delete"><button className="delete-btn" onClick={() => deletinguser(i.id)}>Delete</button></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Homepage