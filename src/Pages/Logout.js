import React from "react";
import axios from "axios";

const BASE_URL = 'http://localhost:8000'

export default function Logout({handleLogout, username}) {
    function logout() {
        axios.post(BASE_URL + '/session/logout/', {username: username})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        return "Logout data sent.."
    }

    return <>
        <h2>Please wait while you are logged out...</h2>
        {logout()}
        {handleLogout()}
    </>
}