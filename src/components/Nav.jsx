import { Link } from "react-router-dom";
import '../components/nav.css'

export const Nav = () => {
    return (
        <nav className="nav">
            <ul className="nav-item-container">
                <li className="nav-item main-nav-item"><i className="fa-solid fa-skull"></i></li>
                <li className='font nav-item mobile'> <Link to='/home'>HOME</Link></li>
                <li className='font nav-item mobile'> <Link to='/login'>LOGIN</Link></li>
                <li className='font nav-item mobile'> <Link to='/login'>SEARCH <i className="fa-solid fa-magnifying-glass"></i></Link></li>
            </ul>
        </nav>
    )
}