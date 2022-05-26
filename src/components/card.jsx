import { Link } from "react-router-dom";
import '../components/card.css';

export const Card = (props) =>{
    const movie = props.movie;

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

    return(
        <div className="card" id={movie.id}>
                <div className="img-container line">
                    <img className='img' src={movie.imgUrl} alt="" />
                    <button className='deleteButton' onClick={() => deleteMovie(movie.id)}><i className="fa-solid fa-trash-can"></i></button>
                    <button className='editButton' onClick={() => editMovie(movie)}><i className="fa-solid fa-pen-to-square"></i></button>
                    <Link to={`/card-info/${movie.id}`}><button className='infoButton' ><i className="fa-solid fa-info"></i></button></Link>
                </div>
                <div className="info-row font line">
                    <div className="info-text-container line">
                        <p className="name">{movie.name}</p>
                        <p className="year">{movie.year}</p>
                        <p className="genre">{movie.genre}</p>
                    </div>
                    <div className="info-ix-container line">
                        <p className="valoration">{movie.valoration}</p>
                        <div className="fav-icon-container" onClick={() => favMovie(movie)}>
                            <i className="fa-solid fa-star fav-icon-border"><i className={`fa-solid fa-star fav-icon-background ${!movie.isFav ? 'fav-icon-background-unfav' : 'fav-icon-background-fav'}`}></i></i>
                        </div>
                    </div>
                </div>
            </div>
    )
}