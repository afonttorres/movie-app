import { useEffect, useState } from "react"
import { movieServices } from "../services/movieServices";
import '../components/favMovies.css';

export const FavMovies = (props) => {
    const [favMovies, setFavMovies] = useState([]);
    const [displayedMovie, setDisplayedMovie] = useState([]);

    useEffect(() => {
        loadData();
    }, [props.favMovies])

    const loadData = () => {
        setFavMovies(props.favMovies)
        setDisplayedMovie(props.favMovies[1])
    }
    const slideImg = (e) => {
        let lastMovieIndex = favMovies.findIndex(movie => movie === displayedMovie);
        if (e.target.id === 'backButton') {
            if (lastMovieIndex < 1) setDisplayedMovie(favMovies[favMovies.length - 1])
            else setDisplayedMovie(favMovies[lastMovieIndex - 1])
        } else {
            if (lastMovieIndex >= favMovies.length - 1) setDisplayedMovie(favMovies[0])
            else setDisplayedMovie(favMovies[lastMovieIndex + 1])
        }
    }
    
    return (
        <div className="fav-slider">
            <p id='backButton' className="slide-button" onClick={slideImg}>-</p>
            <img src={displayedMovie.imgUrl} alt="" />
            <p id="nextButton" className="slide-button" onClick={slideImg}>+</p>
        </div>
    )
}