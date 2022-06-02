import '../components/footer.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Footer = (props) => {
    const [path, setPath] = useState(window.location.pathname.slice(1, window.location.pathname.length));

    useEffect(() => {
        setPath(window.location.pathname.slice(1, window.location.pathname.length))
    }, [])

    return (
        <footer className="footer">
            <div className='footer-opacity'>
                <ul className='footer-item-container'>
                    <Link to='/home'> <li className={(path === 'home') || (path !== 'login' && path !== 'search') ? 'footer-item current-footer' : 'footer-item'}><i className="fa-solid fa-house"></i></li></Link>
                    <Link to='/search'><li className={path === 'search' ? 'footer-item current-footer' : 'footer-item'}><i className="fa-solid fa-magnifying-glass"></i></li></Link>
                    <li className={path === 'new-in' ? 'footer-item current-footer' : 'footer-item'}><i className="fa-solid fa-newspaper"></i></li>
                    <li className={path === 'profile' ? 'footer-item current-footer' : 'footer-item'}><i className="fa-solid fa-skull-crossbones"></i></li>
                </ul>
            </div>
        </footer>
    )
}