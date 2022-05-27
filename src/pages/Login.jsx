import { Component } from "react";
import '../pages/login.css';
import { Link } from "react-router-dom";

export const Login = () =>{
    return (
        <section className="wrapper login-container">
                <h1 className='font'>Hi, I'm Login</h1>
                <Link to='/home'><i className="fa-solid fa-rotate-left backButton"></i></Link>
            </section>
    )
}