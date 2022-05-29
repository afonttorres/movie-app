import '../components/footer.css';
import { Link } from 'react-router-dom';

export const Footer = (props) => {

    return (
        <footer className="footer">
            <ul className='footer-item-container'>
                <Link to='/home'> <li onClick={() => console.log('go home')} className='footer-item'><i className="fa-solid fa-house"></i></li></Link>
                <li onClick={() => console.log('go searcher')} className='footer-item'><i className="fa-solid fa-magnifying-glass"></i></li>
                <li onClick={() => console.log('go new in')} className='footer-item'><i className="fa-solid fa-newspaper"></i></li>
                <li onClick={() => console.log('go profile')} className='footer-item'><i className="fa-solid fa-skull-crossbones"></i></li>
            </ul>
        </footer>
    )
}