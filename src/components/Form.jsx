import '../components/form.css';
import { Component } from 'react';
import { Preview } from './Preview';

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: this.props.isEditMode,
            movie: this.props.movieToPreview,
        }
    }

    handleInputChange = (e) => {

        let name = e.target.name;
        let value = e.target.value.toLowerCase();

        this.setState({ movie: { ...this.state.movie, [name]: value } });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let submitter = e.nativeEvent.submitter.value;

        if (submitter === 'add' && this.props.isEditMode === false) {
            this.addItem(this.state.movie);
            return;
        }
        else {
            this.updateItem(this.state.movie);
            return;
        }
    }

    emptyInput = () => {
        this.setState({ movie: { id: '', name: '', genre: '', year: '', valoration: '', imgUrl: '' } })
    }

    sanitize = (obj) => {
        for (let key in obj) {
            if (obj[key] === '' || obj[key] === undefined || obj[key] === null) return;
            if (typeof obj[key] !== 'string') return;
        }
    }

    addItem = (state) => {
        this.setState(null);
        let newItem = state;
        this.sanitize(newItem);
        this.props.addItem(newItem);
        this.emptyInput();
    }

    updateItem = (state) => {
        let movie = state;
        let changesCount = 0;
        this.sanitize(movie);
        for (let key in movie) {
            if (movie[key] !== this.props.movieToPreview[key]) changesCount++;
        }
        if (changesCount > 0) this.props.updateItem(movie, this.props.movieToPreview.id);
        else {
            let confirmation = window.confirm('Did not found any changes, do you want to save your movie without changes?');
            if(!confirmation) return;
            else this.props.updateItem(movie, this.props.movieToPreview.id);
        }
        this.emptyInput();
    }

    render() {
        console.log(this.state.movie)
        let val = this.state.isEditMode === false ? 'add' : 'edit';

        return (
            <form className='form' onSubmit={this.handleSubmit}>
                {this.state.isEditMode === false ?
                    <p className='closeButton' onClick={() => this.props.toggleForm()}><i className="fa-solid fa-x"></i></p>
                    : null}

                <div className={`input-container ${this.state.movie && this.state.isEditMode === true ? 'preview-active' : ''}`}>
                    <input name="name" type="text" onChange={this.handleInputChange} value={this.state.movie.name} placeholder='name'></input>
                    <input name="genre" type="text" onChange={this.handleInputChange} value={this.state.movie.genre} placeholder='genre'></input>
                    <input name="year" type="text" onChange={this.handleInputChange} value={this.state.movie.year} placeholder='year'></input>
                    <input name="imgUrl" type="text" onChange={this.handleInputChange} value={this.state.movie.imgUrl} placeholder='img url'></input>
                    <input name="valoration" type="text" onChange={this.handleInputChange} value={this.state.movie.valoration} placeholder='valoration'></input>
                </div>

                <div className={`button-container ${this.state.movieToPreview && this.state.isEditMode ? 'preview-active' : ''}`}>
                    <button type="submit" className="add-button" value={val}>{val.toLocaleUpperCase()}</button>
                </div>

                {this.state.movie && this.state.isEditMode ?
                    <div className='preview-container'>
                        <Preview movieToPreview={this.state.movie} previewData={this.state.movie} />
                    </div>
                    : null}

            </form>
        )

    }
}

//També es podria fer sense el bind
// Per fer-ho caldria eliminar el handleInputChange i treballar només amb el handleSubmit
// A la funció handleSubmit li passaríem l'event i li direm que dins de l'event agafés cadascún
// dels nostres inputs pel nom (e.target.name, e.target.year,...)
//Aleshores caldria modificar l'state i dir-li que cada clau de l'state és un dels valors dels nostres
//inputs. Després caldira citar la nostra funció del props i passar-li l'objecte que hem creat amb el valor
//dels inputs perquè l'afegís a l'state del List Component.

//this.handleInputChange = this.handleInputChange.bind(this);

// handleSubmit = (e) => {
//     e.preventDefault();
//     let name = e.target.name.value;
//     let year = e.target.year.value;
//     let genre = e.target.genre.value;
//     let imgUrl = e.target.genre.value;
//     let valoration = e.target.valoration.value;

//     this.setState({'name': name, 'year': year, 'genre': genre, 'imgUrl': imgUrl, 'valoration': valoration});

//     this.addItem(this.state);
// }