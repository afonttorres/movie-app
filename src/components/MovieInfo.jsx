import { Component, useEffect, useState } from "react";
import { Nav } from './Nav';
import { Footer } from './Footer';
import '../components/movieinfo.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { movieServices } from "../services/movieServices";


export const MovieInfo = () => {
    const [movieInfo, setMovieInfo] = useState();
    const [id, setId] = useState(parseInt(useParams().id))

    useEffect(() => {
        movieServices.getMovie(id).then(res => {
            if (res) setMovieInfo(res)
        })
        swipeBack();
    }, [id])

    const swipeBack = () => {
        let start;
        let end;
        let touched = 0;

        window.ontouchstart = (e) => {
            touched++
            start = e.changedTouches[0].clientX;
        }
        
        window.ontouchend = (e) => {
            touched++
            end = e.changedTouches[0].clientX;

            if (start > end && touched > 0) window.location.assign('/home');
            else return;
        }
    }

    return (
        <section className="wrapper ">
            <Nav />
            <div className="container">
                {movieInfo ?
                    <article className='movie-info-container'>
                        <img className="movie-info-img" src={movieInfo.imgUrl} alt="" />
                        <div className="movie-info-row">
                            <div className="movie-info-col">
                                <h1 className='card-font info'>{movieInfo.name}</h1>
                                <h1 className='card-font info'>{movieInfo.year}</h1>
                                <h1 className='card-font info'>{movieInfo.genre}</h1>
                            </div>
                            <div className="movie-info-col">
                                <h1 className='card-font info info-val'>{movieInfo.valoration}</h1>
                            </div>
                        </div>
                        <p className="card-font info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </article>
                    : null}
            </div>
            <Footer />
        </section>
    )
}

// style={{ 'backgroundImage': `url(${movieInfo.imgUrl})`, 'backgroundSize': 'cover' }}