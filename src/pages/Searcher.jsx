import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import '../pages/searcher.css'
import { useEffect, useState } from "react";
import { movieServices } from "../services/movieServices";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";



export const Searcher = () => {

    const [search, setSearch] = useState('');
    const [suggetions, setSuggestions] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        swipeBack();
    })

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


    const handleSubmit = (e) => {
        e.preventDefault();
        let s = 3;
        let ms = s * 1000;
        setisLoading(true);
        setTimeout(() => setisLoading(false), ms)
    }

    const handleInputChange = (e) => {
        let value = e.target.value.toLowerCase();
        setSearch(value);
        console.log(value);
        if (value !== '') movieServices.getSearch(value).then(res => {
            if (res) {
                setSuggestions(res)
                setSearch('')
            }
            
        });
        else setSuggestions([]);
    }

    return (
        <section className="wrapper">
            <Nav />
            <div className="container">
                <form className="searcher-form" onSubmit={handleSubmit}>
                    <input onChange={handleInputChange} name='searcher' value={search} className="font searcher-input" type="text" placeholder="Type your search!" />
                    <button className="searcher-button"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <>{isLoading ? <Loader /> : null}</>
                <div className='suggestions-container'>{!isLoading ? suggetions.map((suggestion, key) => (
                    <Link to={`/movie-info/${suggestion.id}`}> <img src={suggestion.imgUrl} alt="" className="card-font suggestion" key={key} /></Link>

                )) : null}
                </div>
            </div>
            <Footer />
        </section >
    )
}