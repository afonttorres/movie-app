import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import '../pages/searcher.css'
import { useEffect, useState } from "react";
import { movieServices } from "../services/movieServices";
import { Link } from "react-router-dom";



export const Searcher = () => {

    const [search, setSearch] = useState('');
    const [suggetions, setSuggestions] = useState([]);

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
        let suggCont = document.querySelector('.suggestions-container');
        let cont = document.querySelector('.container');
        let spinner = `<div class="spinner-align"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>`;
        cont.removeChild(suggCont);
        cont.insertAdjacentHTML('beforeend', spinner);
        setTimeout(() => {
            cont.removeChild(cont.childNodes[1]);
            cont.appendChild(suggCont);
            setSearch('');
        }, 3000)
    }

    const handleInputChange = (e) => {
        let value = e.target.value.toLowerCase();
        setSearch(value);
        console.log(value);
        if (value !== '') movieServices.getSearch(value).then(res => {
            if (res) setSuggestions(res)
        });
        else setSuggestions([]);
    }


    console.log(suggetions);

    return (
        <section className="wrapper">
            <Nav />
            <div className="container">
                <form className="searcher-form" onSubmit={handleSubmit}>
                    <input onChange={handleInputChange} value={search} className="searcher-input" type="text" name="searcher" placeholder="Type your search!" />
                    <button className="searcher-button"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <div className="suggestions-container">{suggetions.map((suggestion, key) => (

                    <Link to={`/movie-info/${suggestion.id}`}> <img src={suggestion.imgUrl} alt="" className="card-font suggestion" key={key} /></Link>

                ))}
                </div>
            </div>
            <Footer />
        </section>
    )
}