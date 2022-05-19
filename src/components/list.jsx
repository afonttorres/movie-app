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
            movieToPreview: '',
            action: 'add'
        }
    }

    componentDidMount() {
        this.setState({
            movies: movieServices.getAllMovies()
        })
    }

    deleteItem = (id) => {
        let confirmation = window.confirm('Are you sure?');
        if (!confirmation) return;
        let newMovies = this.state.movies.filter(movie => movie.id !== id);
        this.setState({ movies: newMovies });
        alert('Movie erased');
    }
    addItem = (item) => {
        let lastId = parseInt(this.state.movies[this.state.movies.length - 1].id);
        let newItem = { id: lastId + 1, ...item };
        let moviesAdded = [...this.state.movies, newItem];
        this.setState({ movies: moviesAdded, movieToPreview: '', formIsActive: false, action: 'add', lastUpdatedMovie: newItem })
        alert('Movie added')
    }

    movieToPreview = (movie) => {
        this.setState({ movieToPreview: movie });
    }

    updateItem = (movieToUpdate) => {
        let movieIndex = this.state.movies.findIndex(movie => movie.id === movieToUpdate.id);
        let updatedMovies = [...this.state.movies];
        updatedMovies[movieIndex] = movieToUpdate;
        this.setState({ movies: updatedMovies, movieToPreview: '', formIsActive: false, action: 'add', lastUpdatedMovie: movieToUpdate });
        alert('Movie updated');
        return;
    }

    toggleForm = () => {
        this.setState({ formIsActive: !this.state.formIsActive });
    }

    decideAction = (action) => {
        this.setState({ action: action })
        if (action === 'add') this.setState({ movieToPreview: '' });
    }

    render() {
        // console.log(this.state)
        return (
            <div className='container'>
                <div className='list'>{this.state.movies.map((movie, key) => (
                    <Card key={key} movie={movie} deleteItem={this.deleteItem} toggleForm={this.toggleForm} movieToPreview={this.movieToPreview} decideAction={this.decideAction} action={this.state.action} />
                ))}
                </div>
                <button className={`form-button ${this.state.formIsActive ? 'form-button-inactive' : 'form-button-active'}`} onClick={this.toggleForm}>Add</button>
                <Form addItem={this.addItem} toggleForm={this.toggleForm} formIsActive={this.state.formIsActive} movieToPreview={this.state.movieToPreview} updateItem={this.updateItem} onClick={() => this.decideAction('add')} action={this.state.action} lastMovie={this.state.lastUpdatedMovie} />
            </div>
        )
    }
}