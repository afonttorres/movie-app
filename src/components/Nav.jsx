import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../components/nav.css'

export const Nav = () => {
    const [path, setPath] = useState(window.location.pathname.slice(1, window.location.pathname.length));

    useEffect(() => {
        setPath(window.location.pathname.slice(1, window.location.pathname.length))
    }, [])

    console.log(path === 'home' || path !== 'login' && path !== 'search')
    return (
        <nav className="nav">
            <div className="nav-opacity">
                <ul className="nav-item-container">
                    <li className="nav-item main-nav-item"><i className="fa-solid fa-skull"></i></li>
                    <li className={(path === 'home') || (path !== 'login' && path !== 'search') ? 'font nav-item mobile current-nav' : 'font nav-item mobile'}> <Link to='/home'>HOME</Link></li>
                    <li className={path === 'login' ? 'font nav-item mobile current-nav' : 'font nav-item mobile'}> <Link to='/login'>LOGIN</Link></li>
                    <li className={path === 'search' ? 'font nav-item mobile current-nav' : 'font nav-item mobile'}> <Link to='/search'>SEARCH <i className="fa-solid fa-magnifying-glass"></i></Link></li>
                </ul>
            </div>
        </nav>
    )
}