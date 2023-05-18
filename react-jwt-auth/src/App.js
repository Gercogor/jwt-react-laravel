import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Public from "./pages/index/Public";
import Login from "./pages/login/Login";
import User from "./pages/user/User";
import RequireAuth from "./components/layouts/RequireAuth";
import Register from "./pages/register/Register";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/*public routes*/}
        <Route index element={<Public/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        {/*private routes*/}
        <Route element={<RequireAuth/>}>
          <Route path="/user" element={<User/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
