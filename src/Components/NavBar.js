import React from 'react'
import './navbar.css'
import {Link} from "react-router-dom";

export default function NavBar({superuser, username}) {
    let logout = <li><Link to="/logout" className="link">Logout</Link></li>
    logout = username ? logout : <li><Link to="/" className="link">Login</Link></li>
    const u = <ul className="nav-links">
        {logout}
    </ul>

    const su = <ul className="nav-links">
        <li><Link to="/home" className="link">Home</Link></li>
        <li><Link to="/users" className="link">Modify Users</Link></li>
        <li><Link to="/products" className="link">Modify Products</Link></li>
        <li><Link to="/processes" className="link">Modify Processes</Link></li>
        <li><Link to="/stages" className="link">Modify Stages</Link></li>
        {logout}
    </ul>

    let html = superuser ? su : u
    return <nav className="navbar">
        <div className="user"><strong>User:</strong> {username}</div>
        <div className="logo">Shopfloor Traceability System</div>
        {html}
    </nav>
}

