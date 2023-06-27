import React from "react";
import axios from "axios";


export default function Logout({handleLogout, username, BASE_URL}) {
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