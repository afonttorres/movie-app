import '../components/list.css'
import { Form } from './Form';
import { movieServices } from '../services/movieServices';
import { Card } from './Card';
import { FavMovies } from './FavMovies';
import { Slider } from './Slider';
import { Modal } from './Modal';
import { Loader } from './Loader';


const { useEffect, useState, useCallback, useMemo } = require("react");

export const List = (props) => {

    const [movies, setMovies] = useState([]);
    const [formIsActive, setFormIsActive] = useState(false);
    const [movieToPreview, setMovieToPreview] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [favMovies, setFavMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    //MODAL//
    const [isModalActive, setIsModalACtive] = useState(false);
    const [msg, setMsg] = useState();
    const [modalData, setModalData] = useState();



    useEffect(() => {
        getData();
        getFavMovies();
    }, [])

    const getData = () => {
        movieServices.getAllMovies().then(res => {
            setMovies(res)
            let s = .5;
            let ms = s * 1000;
            if (res) setTimeout(() => setIsLoading(false), ms)
        })
    }

    const getFavMovies = () => {
        movieServices.getFavMovies().then(res => {
            setFavMovies(res)
        })
    }


    const deleteItem = (id) => {
        movieServices.deleteMovie(parseInt(id)).then(res => {
            if (res) {
                console.log(res)
                getData();
                openModal(`Movie: ${res.name} erased`);
            }
        })
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
            openModal(`${res.name} added! Movie id: ${res.id}`);
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
        console.log(movie, id)
        movieServices.updateMovie(movie, parseInt(id)).then(res => {
            if (res) getData();
            openModal(`${res.name} updated! Movie id: ${res.id}`);
        })
    }


    const fav = (movie) => {
        if (movie.isFav) movie.isFav = !movie.isFav;
        else movie = { ...movie, isFav: true };
        movieServices.updateMovie(movie, movie.id).then(res => {
            if (res) getData();
            exitEditMode();
            getFavMovies();
        })
    }

    const toggleForm = () => {
        setFormIsActive(!formIsActive);
    }

    const openModal = (data) => {
        setIsModalACtive(true);
        setMsg(data);
    }

    const closeModal = () => {
        exitEditMode();
        setFormIsActive(false);
        setIsModalACtive(false);
        setMsg();
    }

    const askConfirmation = (text, data) => {
        openModal(text);
        setModalData(data);
    }

    const confirm = (data) => {
        let action = data.action;
        let id = parseInt(data.id);
        let movie = data.movie;
        let s = 0;
        let ms = s * 1000;
        
        switch (action) {
            case 'delete':
                setTimeout(() => deleteItem(id), ms);
                break;
            case 'update':
                setTimeout(() => updateItem(movie, id), ms);
                break;
            case 'add':
                setTimeout(() => addItem(movie), ms);
                break;
        }
    }

    return (
        <div className='container'>
            {isModalActive ? <Modal msg={msg} confirm={confirm} closeModal={closeModal} modalData={modalData} /> : null}
            {favMovies.length > 0 ? <Slider favMovies={favMovies} /> : <div className='fav-slider skeleton'></div>}
            <>{!formIsActive ? <div className='list'> {movies.map((movie, key) => (
                <>{!isLoading ? <Card key={key} movie={movie} deleteItem={deleteItem} toggleForm={toggleForm} nextMovieToPreview={nextMovieToPreview} fav={fav} askConfirmation={askConfirmation} /> : null}</>
            )).reverse()}
            </div> : null}
                <>{isLoading ? <Loader /> : null}</>
            </>
            {!formIsActive ?
                <button className='form-button' onClick={() => { toggleForm(); exitEditMode() }}>ADD</button>
                : null}

            {formIsActive ?
                < Form addItem={addItem} toggleForm={toggleForm} movieToPreview={movieToPreview} updateItem={updateItem} isEditMode={isEditMode} confirm={confirm} closeModal={closeModal}/>
                : null}

        </div>
    )
}

// let fetchConf = useCallback(async () => {
//     return confirmation
// }, [confirmation])

// let promiseConf = useCallback(async () => {
//     let data = await fetchConf();
//     return data;
// }, [confirmation])

// let promise = new Promise((resolve, reject) => {
//     if (confirmation !== undefined) return resolve(confirmation);
//     else {
//         let timer = setInterval(()=>{
//             console.log(confirmation)
//         },1000)
//     }
// })

//favMovies with scroll => {/* {favMovies.length > 0 ? <FavMovies favMovies={favMovies} /> : <div className='fav-slider skeleton'></div>} */}