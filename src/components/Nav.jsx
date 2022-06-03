import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profilesData from '../profiles.json';
import '../components/nav.css'
import { movieServices } from "../services/movieServices";

export const Nav = (props) => {
    const [path, setPath] = useState(window.location.pathname.slice(1, window.location.pathname.length));
    const [logged, setLogged] = useState(props.logged);

    useEffect(() => {
        setPath(window.location.pathname.slice(1, window.location.pathname.length));
    }, [])

    useEffect(() => {
        setLogged(props.logged);
    }, [props.logged])

    return (
        <nav className="nav">
            <div className="nav-opacity">
                <ul className="nav-item-container">
                    <li className="nav-item main-nav-item"><i className="fa-solid fa-skull"></i></li>
                    <li className={(path === 'home') || (path !== 'login' && path !== 'search' && path !== 'profile' && path !== 'new-in') ? 'nav-item mobile current-nav' : 'nav-item mobile'}> <Link to='/home'>HOME</Link></li>
                    <li className={path === 'search' ? 'nav-item mobile current-nav' : 'nav-item mobile'}> <Link to='/search'>SEARCH <i className="fa-solid fa-magnifying-glass"></i></Link></li>
                    <li className={path === 'new-in' ? 'nav-item mobile current-nav' : 'nav-item mobile'}> <Link to='/new-in'>NEW IN </Link></li>
                    <li className={path === 'login' ? 'nav-item mobile current-nav' : 'nav-item mobile'}> <Link to='/login'>LOGIN</Link></li>
                    <>{logged ? <Link to='/profile'>
                        <article className="nav-avatar">
                            <span className="font mobile">{logged.name}</span>
                            <img className="nav-avatar-img mobile" src={logged.avatar} alt="" />
                        </article>

                    </Link> : null}</>
                </ul>

            </div>
        </nav>
    )
}