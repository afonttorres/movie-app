import { Component } from "react";
import { Link } from "react-router-dom";
import '../components/nav.css'

export class Nav extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <nav className="nav">
                <div className="nav-item-container">
                    <Link to='/login'><p className='font nav-item'>LOGIN</p></Link>
                </div>
            </nav>
        )
    }
}