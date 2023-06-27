import React, {useState} from 'react';
import './login.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Login = ({handleAccess, BASE_URL}) => {
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const handleLogin = (event) => {
        event.preventDefault();
        const data = {
            username: event.currentTarget.elements.username.value,
            password: event.currentTarget.elements.password.value
        }
        axios.post(BASE_URL + '/session/login/', data)
            .then((res) => {
                console.log(res)
                if (res.data.message === "success") {
                    setMessage("Login Successful")
                    handleAccess(data.username, res.data.access)
                    navigate('/home')
                } else {
                    setMessage("Login failed. Check Username/Password.")
                }
            })
            .catch((err) => {
                const mes = "Login failed " + err.toString()
                setMessage(mes)
                console.log(err)
            })

    };
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <span className="message">{message}</span>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    maxLength={10}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    maxLength={10}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
