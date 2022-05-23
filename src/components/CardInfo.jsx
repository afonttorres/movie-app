import { Component } from "react";
import { Nav } from '../components/Nav'
import '../components/cardinfo.css';
import { Link, useParams } from "react-router-dom";
import { movieServices } from "../services/movieServices";

export class CardInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        let pathname = window.location.pathname;
        let id = pathname.split('/')[2];
        movieServices.getMovie(id).then(res => {
            if (res) this.setState({ movie: res })
        })
    }

    render() {
        return (
            <section className="wrapper ">
                <Nav />
                <div className="container">
                    {this.state.movie ?
                        <article className='card-info-container' style={{ 'backgroundImage': `url(${this.state.movie.imgUrl})`, 'backgroundSize': 'cover' }}>
                            <h1 className='font info'>{this.state.movie.name}</h1>
                            <h1 className='font info'>{this.state.movie.year}</h1>
                            <h1 className='font info'>{this.state.movie.genre}</h1>
                            <h1 className='font info'>{this.state.movie.valoration}</h1>
                        </article>
                        : null}

                    <Link to='/home' className="link"><i className="fa-solid fa-rotate-left backButton"></i></Link>
                </div>
            </section>
        )
    }
}