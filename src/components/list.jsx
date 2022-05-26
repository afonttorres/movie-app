import '../components/list.css'
import { Form } from './Form';
import { movieServices } from '../services/movieServices';
import { Card } from './Card';
const { Component } = require("react");

export class List extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            formIsActive: false,
            movieToPreview: {},
            isEditMode: false,
            movieDetail: {},
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
            if (res) this.getData();
            alert(`Movie: ${res.name} erased`);
        })
        this.exitEditMode();
        this.setState({ formIsActive: false });
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
            if (res) this.getData();
            alert(`${res.name} added! Movie id: ${res.id}`);
            this.exitEditMode();
            this.setState({ formIsActive: false });
        })
        console.log('inside addItem:', this.state);
    }

    nextMovieToPreview = (movie) => {
        this.setState({ movieToPreview: movie, isEditMode: true });
    }

    exitEditMode = () => {
        this.setState({ isEditMode: false, movieToPreview: {} })
    }

    updateItem = (movie) => {
        let data = movie;
        let id = movie.id;
        delete data.id;
        movieServices.updateMovie(parseInt(id), data).then(res => {
            if (res) this.getData();
            alert(`${res.name} updated! Movie id: ${res.id}`)
            this.exitEditMode();
            this.setState({ formIsActive: false });
        })
        console.log('inside updateItem:', this.state)
    }

    fav = (movie) => {
        let data = movie;
        let id = movie.id;
        delete data.id;

        if (data.isFav) data.isFav = !data.isFav;
        else data = { ...data, isFav: true }

        movieServices.updateMovie(parseInt(id), data).then(res => {
            if (res) this.getData();
            this.exitEditMode();
            console.log(res.isFav)
        })
    }

    toggleForm = () => {
        this.setState({ formIsActive: !this.state.formIsActive });
    }


    render() {
        // console.log('on render:', this.state)
        return (
            <div className='container'>
                <div className='list'>{this.state.movies.map((movie, key) => (
                    <Card key={key} movie={movie} deleteItem={this.deleteItem} toggleForm={this.toggleForm} nextMovieToPreview={this.nextMovieToPreview} fav={this.fav} />
                )).reverse()}
                </div>
                {!this.state.formIsActive ?
                    <button className='form-button' onClick={() => { this.toggleForm(); this.exitEditMode() }}>Add</button>
                    : null}

                {this.state.formIsActive ?
                    <Form addItem={this.addItem} toggleForm={this.toggleForm} formIsActive={this.state.formIsActive} movieToPreview={this.state.movieToPreview} updateItem={this.updateItem} isEditMode={this.state.isEditMode} />
                    : null}

            </div>

        )
    }
}

