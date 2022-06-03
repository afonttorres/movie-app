import '../components/footer.css';
import profilesData from '../profiles.json';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Avatar } from './Avatar';
import { movieServices } from '../services/movieServices';

export const Footer = (props) => {
    const [path, setPath] = useState(window.location.pathname.slice(1, window.location.pathname.length));
    const [logged, setLogged] = useState(props.logged);

    useEffect(() => {
        setPath(window.location.pathname.slice(1, window.location.pathname.length))
    }, [])

    useEffect(() => {
        setLogged(props.logged);
    }, [props.logged])

    return (
        <footer className="footer">
            <div className='footer-opacity'>
                <ul className='footer-item-container'>
                    <Link to='/home'> <li className={(path === 'home') || (path !== 'login' && path !== 'search' && path !== 'profile' & path !== 'new-in') ? 'footer-item current-footer' : 'footer-item'}><i className="fa-solid fa-house"></i></li></Link>
                    <Link to='/search'><li className={path === 'search' ? 'footer-item current-footer' : 'footer-item'}><i className="fa-solid fa-magnifying-glass"></i></li></Link>
                    <Link to='/new-in'><li className={path === 'new-in' ? 'footer-item current-footer' : 'footer-item'}><i className="fa-solid fa-newspaper"></i></li></Link>
                    <Link to='/profile'>{logged ? <img className='footer-avatar' src={logged.avatar} alt="" /> : <span className='footer-noAvatar'></span>}</Link>

                </ul>
            </div>
        </footer>
    )
}