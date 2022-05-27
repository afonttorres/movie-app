import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../components/card.css';

export const Card = (props) => {
    const [movie, setMovie] = useState(props.movie);

    useEffect(() => {
        setMovie(props.movie)
    }, [props.movie])

    const deleteMovie = (id) => {
        props.deleteItem(id);
    }
    const editMovie = (movieToEdit) => {
        props.toggleForm();
        props.nextMovieToPreview(movieToEdit);
    }
    const favMovie = (movieToFav) => {
        props.fav(movieToFav)
    }

    return (
        <div className={movie ? 'card' : 'card skeleton'} id={movie ? `${movie.id}` : null}>
            <div className={movie ? 'img-container line' : 'img-container skeleton'}>
                <img className={movie ? 'img' : 'd-none'} src={movie.imgUrl} alt="" />
                <button className='deleteButton' onClick={() => deleteMovie(movie.id)}><i className={movie ? "fa-solid fa-trash-can" : 'd-none'}></i></button>
                <button className='editButton' onClick={() => editMovie(movie)}><i className={movie ? "fa-solid fa-pen-to-square" : 'd-none'}></i></button>
                <Link to={`/movie-info/${movie.id}`}><button className='infoButton' ><i className={movie ? "fa-solid fa-info" : 'd-none'}></i></button></Link>
            </div>
            <div className={movie ? "info-row font line" : 'info-row font skeleton'}>
                <div className={movie ? "info-text-container line" : 'd-none'}>
                    <p className="name">{movie.name}</p>
                    <p className="year">{movie.year}</p>
                    <p className="genre">{movie.genre}</p>
                </div>
                <div className={movie ? "info-ix-container line" : 'd-none'}>
                    <p className="valoration">{movie.valoration}</p>
                    <div className="fav-icon-container" onClick={() => favMovie(movie)}>
                        <i className="fa-solid fa-star fav-icon-border"><i className={`fa-solid fa-star fav-icon-background ${!movie.isFav ? 'fav-icon-background-unfav' : 'fav-icon-background-fav'}`}></i></i>
                    </div>
                </div>
            </div>
        </div>
    )
}