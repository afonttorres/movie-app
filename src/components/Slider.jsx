import { useEffect, useState } from 'react'
import '../components/slider.css'
export const Slider = (props) => {

    const [favMovies, setFavMovies] = useState(props.favMovies);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setFavMovies(props.favMovies);
    }, [props.favMovies]);

    useEffect(() => {
        let milisecs = 3000;
        let timerID = setInterval(goNext, milisecs);
        return () => clearInterval(timerID);
    }, [index])

    const goBack = () => {
        if (index < 1) setIndex(favMovies.length - 1);
        else setIndex(index - 1);
    }

    const goNext = () => {
        if (index === favMovies.length - 1) setIndex(0);
        else setIndex(index + 1);
    }

    const changeIndex = (i) => {
        setIndex(i);
    }

    return (
        <div className="slider">
            <span onClick={goBack} className='slider-button'><i className="fa-solid fa-angle-left"></i></span>
            <div className='slider-container'>
                {favMovies ? favMovies.map((movie, key) =>
                    <>{key === index ?
                        <div className='slider-text-container'>
                            <img className='slider-img' key={key} src={movie.imgUrl} />
                            <p className='slider-text font'>{movie.name}</p>
                        </div> : null}</>
                ) : null}
                <ul className='dot-container'>{favMovies ? favMovies.map((movie, key) => <li onClick={() => changeIndex(key)} className='dot'><i className={key === index ? "fa-solid fa-circle selected-dot" : 'fa-solid fa-circle'}></i></li>) : null}</ul>
            </div>
            <span onClick={goNext} className='slider-button'><i className="fa-solid fa-angle-right"></i></span>
        </div>
    )
}