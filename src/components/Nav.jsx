import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profilesData from '../profiles.json';
import '../components/nav.css'
import { movieServices } from "../services/movieServices";

export const Nav = () => {
    const [path, setPath] = useState(window.location.pathname.slice(1, window.location.pathname.length));
    const [profile, setProfile] = useState();

    useEffect(() => {
        setPath(window.location.pathname.slice(1, window.location.pathname.length))

        movieServices.getProfiles().then(res => {
            if (res) {
                let selectedProf = res.filter(profile => profile.isLogged === true)
                setProfile(selectedProf[0]);
            }
        })
    }, [])

    return (
        <nav className="nav">
            <div className="nav-opacity">
                <ul className="nav-item-container">
                    <li className="nav-item main-nav-item"><i className="fa-solid fa-skull"></i></li>
                    <li className={(path === 'home') || (path !== 'login' && path !== 'search' && path !== 'profile' && path !== 'new-in') ? 'nav-item mobile current-nav' : 'nav-item mobile'}> <Link to='/home'>HOME</Link></li>
                    <li className={path === 'search' ? 'nav-item mobile current-nav' : 'nav-item mobile'}> <Link to='/search'>SEARCH <i className="fa-solid fa-magnifying-glass"></i></Link></li>
                    <li className={path === 'new-in' ? 'nav-item mobile current-nav' : 'nav-item mobile'}> <Link to='/new-in'>NEW IN </Link></li>
                    <li className={path === 'login' ? 'nav-item mobile current-nav' : 'nav-item mobile'}> <Link to='/login'>LOGIN</Link></li>
                    <>{profile ? <Link to='/profile'>
                        <article className="nav-avatar">
                            <span className="font mobile">{profile.name}</span>
                            <img className="nav-avatar-img mobile" src={profile.avatar} alt="" />
                        </article>

                    </Link> : null}</>
                </ul>

            </div>
        </nav>
    )
}