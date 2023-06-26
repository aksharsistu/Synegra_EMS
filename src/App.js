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


function App() {
  const [superuser, setSuperuser] = useState(false)
  const [username, setUsername] = useState('')
  let html = []
  html.push(<Route path="/users" element={<User/>}/>)
  html.push(<Route path="/products" element={<Product/>}/>)
  html.push(<Route path="/processes" element={<Process/>}/>)
  html.push(<Route path="/stages" element={<Stage/>}/>)
  html = superuser ? html : <></>
  let homepage
    if(username.length > 0){
        homepage = <Route path="/home" element={<Home username={username}/>}/>
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
                <Route path="/logout" element={<Logout handleLogout={handleLogout} username={username}/>}/>
                <Route path="*" element={<NoPage/>}/>
                <Route index element={<Login handleAccess={handleAccess}/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  </div>
}

export default App;
