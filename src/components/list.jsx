import '../components/list.css'
import { Card } from './Card';
import { Form } from './Form';
const { Component } = require("react");

export class List extends Component {
    constructor() {
        super();

        this.state = {
            movies: [
                {
                    id: 1,
                    name: 'shrek',
                    genre: 'animación, aventura, comedia',
                    year: 2001,
                    valoration: 9.5,
                    imgUrl: 'https://enfilme.com/img/content/schrek_poster_Enfilme_v3024_675_489.jpeg'
                },
                {
                    id: 2,
                    name: 'shrek 2',
                    genre: 'animación, aventura, comedia',
                    year: 2004,
                    valoration: 10,
                    imgUrl: 'http://4.bp.blogspot.com/-fmMmqjMfDRY/VNjYGCtNjkI/AAAAAAAAdio/klRWhQid5LQ/s1600/rD8SvOTCCJ2VIpIV7GUwUKD1Kzc.jpg'
                },
                {
                    id: 3,
                    name: 'Piratas del Caribe',
                    genre: 'animación, aventura, comedia',
                    year: 2003,
                    valoration: 10,
                    imgUrl: 'https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'
                },
            ]
        }
    }
    deleteItem = (id) => {
        let confirmation = window.confirm('Are you sure?');
        if (!confirmation) return;
        console.log(id)
        let newMovies = this.state.movies.filter(movie => movie.id !== id);
        console.log(newMovies);
        this.setState({ movies: newMovies });
    }
    addItem = (item) => {
        let lastId = parseInt(this.state.movies[this.state.movies.length - 1].id);
        let newItem = { id: lastId + 1, ...item };
        let moviesAdded = [...this.state.movies, newItem];
        this.setState({ movies: moviesAdded })
    }
    render() {
        return (
            <div className='wrapper'>
                <div className='list'>{this.state.movies.map((movie, key) => (
                    <Card key={key} movie={movie} deleteItem={this.deleteItem} />
                ))}
                </div>
                <Form addItem={this.addItem} />
            </div>
        )
    }
}