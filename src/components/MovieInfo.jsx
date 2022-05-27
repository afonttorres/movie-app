import { Component, useEffect, useState } from "react";
import { Nav } from './Nav'
import '../components/movieinfo.css';
import { Link, useParams } from "react-router-dom";
import { movieServices } from "../services/movieServices";


export const MovieInfo = () => {
    const [movieInfo, setMovieInfo] = useState();
    const [id, setId] = useState(parseInt(useParams().id))

    console.log(id)

    useEffect(() => {
        movieServices.getMovie(id).then(res => {
            if (res) setMovieInfo(res)
        })
    }, [id])

    return (
        <section className="wrapper ">
            <Nav />
            <div className="container">
                {movieInfo ?
                    <article className='card-info-container' style={{ 'backgroundImage': `url(${movieInfo.imgUrl})`, 'backgroundSize': 'cover' }}>
                        <h1 className='font info'>{movieInfo.name}</h1>
                        <h1 className='font info'>{movieInfo.year}</h1>
                        <h1 className='font info'>{movieInfo.genre}</h1>
                        <h1 className='font info'>{movieInfo.valoration}</h1>
                    </article>
                    : null}

                <Link to='/home' className="link"><i className="fa-solid fa-rotate-left backButton"></i></Link>
            </div>
        </section>
    )
}