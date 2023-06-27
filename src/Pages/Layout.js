import {Outlet} from "react-router-dom";
import React from 'react'
import NavBar from "../Components/NavBar";
import './layout.css'

export default function Layout({superuser, username}) {
    return <>
        <NavBar superuser={superuser} username={username}/>
        <Outlet/>
        <footer>Software made for Synegra EMS</footer>
    </>
}