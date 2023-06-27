import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import User from "./Pages/SuperUser/User";
import Product from "./Pages/SuperUser/Product";
import Process from "./Pages/SuperUser/Process";
import Stage from "./Pages/SuperUser/Stage";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import NoPage from "./Pages/NoPage";
import {useState} from "react";


function App({BASE_URL}) {
    const [superuser, setSuperuser] = useState(false)
    const [username, setUsername] = useState('')
    let html = []
    html.push(<Route path="/users" element={<User BASE_URL={BASE_URL}/>}/>)
    html.push(<Route path="/products" element={<Product BASE_URL={BASE_URL}/>}/>)
    html.push(<Route path="/processes" element={<Process BASE_URL={BASE_URL}/>}/>)
    html.push(<Route path="/stages" element={<Stage BASE_URL={BASE_URL}/>}/>)
    html = superuser ? html : <></>
    let homepage
    if (username.length > 0) {
        homepage = <Route path="/home" element={<Home username={username} superuser={superuser} BASE_URL={BASE_URL}/>}/>
    }

    function handleAccess(user, access) {
        setUsername(user)
        setSuperuser(access)
    }

    function handleLogout() {
        setUsername('')
        setSuperuser(false)
        window.location.href = "/"
        return <h4>Logged out successfully</h4>
    }

    return <div className="container">
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Layout superuser={superuser} username={username}/>}>
                    {homepage}
                    {html}
                    <Route path="/logout" element={<Logout handleLogout={handleLogout} username={username} BASE_URL={BASE_URL}/>}/>
                    <Route path="*" element={<NoPage/>}/>
                    <Route index element={<Login handleAccess={handleAccess} BASE_URL={BASE_URL}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
}

export default App;
