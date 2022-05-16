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
            ],
            formIsActive: false,
            movieToPreview: '',
        }
    }
    deleteItem = (id) => {
        let confirmation = window.confirm('Are you sure?');
        if (!confirmation) return;
        console.log(id)
        let newMovies = this.state.movies.filter(movie => movie.id !== id);
        this.setState({ movies: newMovies });
    }
    addItem = (item) => {
        let lastId = parseInt(this.state.movies[this.state.movies.length - 1].id);
        let newItem = { id: lastId + 1, ...item };
        let moviesAdded = [...this.state.movies, newItem];
        this.setState({ movies: moviesAdded , formIsActive: false})
    }

    movieToPreview = (movie) => {
        this.setState({ movieToPreview: movie });
    }

    updateItem = (movieToUpdate) => {
        //console.log(movieToUpdate)
        let movieIndex = this.state.movies.findIndex(movie => movie.id === movieToUpdate.id);
        let updatedMovies = [...this.state.movies];
        updatedMovies[movieIndex] = movieToUpdate;
        this.setState({ movies: updatedMovies, movieToPreview: '' , formIsActive: false});

    }

    toggleForm = () => {
        if (this.state.formIsActive) this.setState({ formIsActive: false })
        else this.setState({ formIsActive: true })
    }

    render() {
        // console.log(this.state)
        return (
            <div className='wrapper'>
                <div className='list'>{this.state.movies.map((movie, key) => (
                    <Card key={key} movie={movie} deleteItem={this.deleteItem} toggleForm={this.toggleForm} movieToPreview={this.movieToPreview} />
                ))}
                </div>
                <button className={`form-button ${this.state.formIsActive ? 'form-button-inactive' : 'form-button-active'}`} onClick={this.toggleForm}>Add</button>
                <Form addItem={this.addItem} formIsActive={this.state.formIsActive} movieToPreview={this.state.movieToPreview} updateItem={this.updateItem} />
            </div>
        )
    }
}