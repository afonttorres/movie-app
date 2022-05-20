import '../components/list.css'
import { Card } from './Card';
import { Form } from './Form';
import { movieServices } from '../services/movieServices';
const { Component } = require("react");

export class List extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            formIsActive: false,
            movieToPreview: {},
            isEditMode: false
        }
    }

    getData() {
        movieServices.getAllMovies().then(res => {
            this.setState({ movies: res })
        })
    }

    componentDidMount() {
        this.getData();
    }

    deleteItem = (id) => {
        let confirmation = window.confirm('Are you sure?');
        if (!confirmation) return;
        movieServices.deleteMovie(parseInt(id)).then(res => {
            if (res.name) this.getData();
            alert(`Movie: ${res.name} erased`);
        })
    }

    addLoop = () => {
        let movie = {
            name: "shrek",
            genre: "animación, aventura, comedia",
            year: "2001",
            valoration: "9.5",
            imgUrl: "https://enfilme.com/img/content/schrek_poster_Enfilme_v3024_675_489.jpeg"
        }
        for (let i = 0; i < 5; i++) {
            this.addItem(movie)
        }
    }

    addItem = (item) => {
        movieServices.postMovie(item).then(res => {
            if (res.id) this.getData();
            alert(`${res.name} added! Movie id: ${res.id}`);
            this.setState({ movieToPreview: {}, formIsActive: false, isEditMode: false, lastUpdatedMovie: res });

        })
        console.log('inside addItem:', this.state);
        // let lastId = parseInt(this.state.movies[this.state.movies.length - 1].id);
        // let newItem = { id: lastId + 1, ...item };
        // let moviesAdded = [...this.state.movies, newItem];
        // this.setState({ movies: moviesAdded, movieToPreview: '', formIsActive: false, isEditMode: false, lastUpdatedMovie: newItem })
        // alert('Movie added')
    }

    nextMovieToPreview = (movie) => {
        this.setState({ movieToPreview: movie, isEditMode: true });
    }

    exitEditMode = () => {
        this.setState({ isEditMode: false })
    }

    updateItem = (movieToUpdate) => {
        let movieIndex = this.state.movies.findIndex(movie => movie.id === movieToUpdate.id);
        let updatedMovies = [...this.state.movies];
        updatedMovies[movieIndex] = movieToUpdate;
        this.setState({ movies: updatedMovies, movieToPreview: '', formIsActive: false, isEditMode: false, lastUpdatedMovie: movieToUpdate });
        alert('Movie updated');
        return;
    }

    toggleForm = () => {
        this.setState({ formIsActive: !this.state.formIsActive });
    }


    render() {
        console.log('On render:', this.state);
        return (
            <div className='container'>
                <div className='list'>{this.state.movies.map((movie, key) => (
                    <Card key={key} movie={movie} deleteItem={this.deleteItem} toggleForm={this.toggleForm} nextMovieToPreview={this.nextMovieToPreview} />
                ))}
                </div>
                <button className={`form-button ${this.state.formIsActive ? 'form-button-inactive' : 'form-button-active'}`} onClick={() => { this.toggleForm(); this.exitEditMode() }}>Add</button>
                <Form addItem={this.addItem} toggleForm={this.toggleForm} formIsActive={this.state.formIsActive} movieToPreview={this.state.movieToPreview} updateItem={this.updateItem} isEditMode={this.state.isEditMode} lastMovie={this.state.lastUpdatedMovie} />
            </div>
        )
    }
}