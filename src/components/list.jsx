import '../components/list.css'
import { Form } from './Form';
import { movieServices } from '../services/movieServices';
import { Card } from './Card';
import { FavMovies } from './FavMovies';
const { useEffect, useState } = require("react");

export const List = (props) => {

    const [movies, setMovies] = useState([]);
    const [formIsActive, setFormIsActive] = useState(false);
    const [movieToPreview, setMovieToPreview] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [favMovies, setFavMovies] = useState([])


    useEffect(() => {
        getData();
        getFavMovies();
    }, [])

    const getData = () => {
        movieServices.getAllMovies().then(res => {
            setMovies(res)
        })
    }

    const getFavMovies = () => {
        movieServices.getFavMovies().then(res => {
            setFavMovies(res)
        })
    }

    const deleteItem = (id) => {
        let confirmation = window.confirm('Are you sure?');
        if (!confirmation) return;
        movieServices.deleteMovie(parseInt(id)).then(res => {
            if (res) getData();
            alert(`Movie: ${res.name} erased`);
        })
        exitEditMode();
        setFormIsActive(false);
    }

    const addLoop = () => {
        let movie = {
            name: "shrek",
            genre: "animación, aventura, comedia",
            year: "2001",
            valoration: "9.5",
            imgUrl: "https://enfilme.com/img/content/schrek_poster_Enfilme_v3024_675_489.jpeg"
        }
        for (let i = 0; i < 5; i++) {
            addItem(movie)
        }
    }

    const addItem = (item) => {
        movieServices.postMovie(item).then(res => {
            if (res) getData();
            alert(`${res.name} added! Movie id: ${res.id}`);
            exitEditMode();
            setFormIsActive(false);
        })
    }

    const nextMovieToPreview = (movie) => {
        setMovieToPreview(movie);
        setIsEditMode(true);
    }

    const exitEditMode = () => {
        setMovieToPreview({});
        setIsEditMode(false);
    }

    const updateItem = (movie, id) => {
        console.log(id)
        movieServices.updateMovie(movie, parseInt(id)).then(res => {
            if (res) getData();
            alert(`${res.name} updated! Movie id: ${res.id}`)
            exitEditMode();
            setFormIsActive(false);
        })
    }

    const fav = (movie) => {

        if (movie.isFav) movie.isFav = !movie.isFav;
        else movie = { ...movie, isFav: true }

        movieServices.updateMovie(movie, movie.id).then(res => {
            console.log(res.isFav)
            if (res) getData();
            exitEditMode();
            getFavMovies();
        })

    }

    const toggleForm = () => {
        setFormIsActive(!formIsActive);
    }

    return (
        <div className='container'>
            {favMovies.length > 0 ? <FavMovies favMovies={favMovies} /> : <div className='fav-slider skeleton'></div>}
            <div className='list'> {movies.map((movie, key) => (
                <Card key={key} movie={movie} deleteItem={deleteItem} toggleForm={toggleForm} nextMovieToPreview={nextMovieToPreview} fav={fav} />
            )).reverse()}
            </div>
            {!formIsActive ?
                <button className='form-button' onClick={() => { toggleForm(); exitEditMode() }}>Add</button>
                : null}

            {formIsActive ?
                < Form addItem={addItem} toggleForm={toggleForm} movieToPreview={movieToPreview} updateItem={updateItem} isEditMode={isEditMode} />
                : null}

        </div>
    )
}