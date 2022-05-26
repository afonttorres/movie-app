import { Link } from "react-router-dom";
import '../components/nav.css'

export const Nav = () =>{
    return(
        <nav className="nav">
                <div className="nav-item-container">
                    <Link to='/login'><p className='font nav-item'>LOGIN</p></Link>
                </div>
            </nav>
    )
}