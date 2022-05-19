import { Component } from "react";
import '../components/cardinfo.css';
import { Link } from "react-router-dom";

export class CardInfo extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <article className="wrapper card-info-container">
                <h1 className='font'>Hi, I'm card info</h1>
                <Link to='/home'><i className="fa-solid fa-rotate-left backButton"></i></Link>
            </article>
        )
    }
}