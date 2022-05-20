import '../components/form.css';
import React, { Component } from 'react';
import { Preview } from './Preview';

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { movie: this.props.movieToPreview, isEditMode: this.props.isEditMode }
        //this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (e) => {
        this.setState({});

        let name = e.target.name;
        let value = e.target.value.toLowerCase();

        this.setState({ [name]: value });
        //this.setState({ movie: { ...this.state.movieToPreview, [name]: value } });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let submitter = e.nativeEvent.submitter.value;
        console.log(e.nativeEvent.submitter)

        this.emptyInput(e);

        if (submitter === 'add' && this.props.isEditMode === false) {
            this.addItem(this.state);
            console.log(submitter, this.props.isEditMode);
            return;
        }
        else {
            console.log(submitter, this.props.isEditMode);
            this.updateItem(this.state);
            return;
        }
    }

    emptyInput = (e) => {
        let inputs = document.querySelectorAll('input')
        for (let input of inputs) {
            input.value = '';
        }
        //this.setState({ movie: { id: '', name: '', genre: '', year: '', valoration: '', imgUrl: '' } })
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
    }

    updateItem = (state) => {
        this.setState(null);
        let movie = { ...state, id: this.props.movieToPreview.id };
        this.sanitize(movie);
        for (let key in movie) {
            if (movie[key] !== this.props.movieToPreview[key]) this.props.updateItem(movie);
            else alert('Changes not found'); return;
        }
    }

    render() {
        console.log(this.state)
        console.log(this.props)

        let val = this.props.isEditMode === false ? 'add' : 'edit';
        return (
            <form className={`form ${this.props.formIsActive ? 'form-active' : 'form-inactive'}`} onSubmit={this.handleSubmit}>
                {this.props.isEditMode === false ? <p className='closeButton' onClick={() => this.props.toggleForm()}><i className="fa-solid fa-x"></i></p> : null}
                <div className={`input-container ${this.props.movieToPreview && this.props.isEditMode === true ? 'preview-active' : ''}`}>
                    <input name="name" type="text" onChange={this.handleInputChange} placeholder={this.props.movieToPreview && this.props.isEditMode === true ? this.props.movieToPreview.name : 'name'}></input>
                    <input name="genre" type="text" onChange={this.handleInputChange} placeholder={this.props.movieToPreview && this.props.isEditMode === true ? this.props.movieToPreview.genre : 'genre'}></input>
                    <input name="year" type="text" onChange={this.handleInputChange} placeholder={this.props.movieToPreview && this.props.isEditMode === true ? this.props.movieToPreview.year : 'year'}></input>
                    <input name="imgUrl" type="text" onChange={this.handleInputChange} placeholder={this.props.movieToPreview && this.props.isEditMode === true ? this.props.movieToPreview.imgUrl : 'img url'}></input>
                    <input name="valoration" type="text" onChange={this.handleInputChange} placeholder={this.props.movieToPreview && this.props.isEditMode === true ? this.props.movieToPreview.valoration : 'valoration'}></input>
                </div>

                <div className={`button-container ${this.props.movieToPreview && this.props.isEditMode === true ? 'preview-active' : ''}`}>
                    <button type="submit" className="add-button" value={val}>{val.toLocaleUpperCase()}</button>
                </div>

                <div className={`preview-container ${this.props.movieToPreview && this.props.isEditMode === true ? 'preview-container-active' : 'preview-container-inactive'}`}>
                    <Preview movie={this.props.movieToPreview} preview={this.state} lastMovie={this.props.lastMovie} />
                </div>
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