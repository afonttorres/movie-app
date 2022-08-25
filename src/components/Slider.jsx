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
    }, [index, props.favMovies])

    useEffect(() => {
        swipe();
    })

    const goBack = () => {
        (index < 1) ? setIndex(favMovies.length - 1) : setIndex(index - 1);
    }

    const goNext = () => {
        (index === favMovies.length - 1) ? setIndex(0) : setIndex(index + 1);
    }

    const changeIndex = (i) => {
        setIndex(i);
    }


    const swipe = () => {
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

            console.log('start:', start, 'end:', end, touched)

            if (start > end && touched === 2) (index < 1) ? setIndex(favMovies.length - 1) : setIndex(index - 1);
            else if (end > start && touched === 2) (index === favMovies.length - 1) ? setIndex(0) : setIndex(index + 1);
            else return;
        }
    }

    return (
        <div className="slider">
            <span onClick={goBack} style={{ left: '7%' }} className='slider-button'><i className="fa-solid fa-angle-left"></i></span>

            <div className='slider-container'>
                {favMovies ? favMovies.map((movie, key) =>
                    <>{key === index ?
                        <div key={key} className='slider-text-container'>
                            <img className='slider-img' src={movie.imgUrl} alt='Movie' key={key}/>
                            <p className='slider-text font' key={key}>{movie.name}</p>
                        </div> : null}</>
                ) : null}
                <ul className='dot-container'>{favMovies ? favMovies.map((movie, key) => <li key={movie.id} onClick={() => changeIndex(key)} className='dot'><i className={key === index ? "fa-solid fa-circle selected-dot" : 'fa-solid fa-circle'}></i></li>) : null}</ul>
            </div>

            <span onClick={goNext} style={{ right: '7%' }} className='slider-button'><i className="fa-solid fa-angle-right"></i></span>
        </div>
    )
}