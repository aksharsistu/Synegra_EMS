import React, {useState} from 'react';
import './user.css';
import axios from "axios";


const UserDeleteForm = ({BASE_URL}) => {
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        const data = {username: username}
        axios.post(BASE_URL + '/session/delete/', data).then(r => {
            setMessage('Successfully deleted ' + username)
        }).catch(err => {
            setMessage('Delete failed:' + err)
        })
        setUsername('')
    }

    return <div className="delete-container">
        <h2>User Delete Form</h2>
        <span className="message">{message}</span>
        <form id="deleteForm" onSubmit={handleSubmit}>
            <div className="delete-form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="delete-form-group">
                <input type="submit" className="btn-delete" value="Delete"/>
            </div>
        </form>
    </div>
}

const UserRegistrationForm = ({BASE_URL}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [superuserAccess, setSuperuserAccess] = useState(false);
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform registration logic here or send data to backend
        let data = {
            firstname: firstName,
            lastname: lastName,
            username: username,
            password: password,
            employeeId: employeeId,
            superuser: superuserAccess
        }
        axios.post(BASE_URL + '/session/register/', data)
            .then((res) => {
                setMessage(res.data)

            })
            .catch((err) => {
                setMessage('Error: ' + err)
            })
        // Reset form fields
        setFirstName('');
        setLastName('');
        setUsername('');
        setPassword('');
        setEmployeeId('');
        setSuperuserAccess(false);
    };

    return (<div className="page">
            <div className="registration-form-container">
                <h2>User Registration</h2>
                <span className="message">{message}</span>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="employeeId">Employee ID</label>
                        <input
                            type="text"
                            id="employeeId"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <span>Superuser Access:  </span>
                        <input
                            type="checkbox"
                            id="superuserAccess"
                            checked={superuserAccess}
                            onChange={(e) => setSuperuserAccess(e.target.checked)}
                        />
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
            <UserDeleteForm BASE_URL={BASE_URL}/>
        </div>
    );
};

export default UserRegistrationForm;
