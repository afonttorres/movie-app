import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../components/card.css';

export const Card = (props) => {
    const [movie, setMovie] = useState(props.movie);

    useEffect(() => {
        setMovie(props.movie)
    }, [props.movie])

    const deleteMovie = (id) => {
        props.askConfirmation('Are you sure?', { id: id, action: 'delete' });
    }
    const editMovie = (movieToEdit) => {
        props.toggleForm();
        props.nextMovieToPreview(movieToEdit);
    }
    const favMovie = (movieToFav) => {
        props.fav(movieToFav)
    }

    return (
        <div className={movie ? 'card' : 'card skeleton'} style={movie ? { backgroundImage: `url(${movie.imgUrl})` } : null} id={movie ? `${movie.id}` : null}>
            <div className="card-opacity">
                <div className={movie ? 'card-button-container line' : 'button-container skeleton'}>
                    <button className='deleteButton' onClick={() => deleteMovie(movie.id)}><i className={movie ? "fa-solid fa-trash-can" : 'd-none'}></i></button>
                    <button className='editButton' onClick={() => editMovie(movie)}><i className={movie ? "fa-solid fa-pen-to-square" : 'd-none'}></i></button>
                    <Link style={{ display: 'contents' }} to={`/movie-info/${movie.id}`}><button className='infoButton' ><i className={movie ? "fa-solid fa-info" : 'd-none'}></i></button></Link>
                </div>
                <div className={movie ? "info-row card-font line" : 'info-row card-font skeleton'}>
                    <div className={movie ? "info-text-container line" : 'd-none'}>
                        <p>{movie.name}</p>
                        <p>{movie.year}</p>
                        <p>{movie.genre}</p>
                    </div>
                    <div className={movie ? "info-ix-container line" : 'd-none'}>
                        <p className="valoration">{movie.valoration}</p>
                        <i onClick={() => favMovie(movie)} className={`fa-solid fa-star fav-icon ${!movie.isFav ? 'fav-icon-unfav' : 'fav-icon-fav'}`}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}