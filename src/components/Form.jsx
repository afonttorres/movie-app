import '../components/form.css';
import React, { Component } from 'react';
import { Preview } from './Preview';

export class Form extends Component {
    constructor(props) {
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (e) => {
        this.setState({});

        const target = e.target;
        let name = target.name;
        let value = target.value.toLowerCase();

        this.setState({ [name]: value });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let submitter = e.nativeEvent.submitter.value;

        this.emptyInput(e);

        if (submitter === 'ADD') this.addItem(this.state);
        else this.updateItem(this.state);

    }

    emptyInput = (e) => {
        for (let input of e.target.firstElementChild.children) {
            input.value = '';
        }
    }

    addItem = (state) => {
        let newItem = state
        for (let key in newItem) {
            if (newItem[key] === '') return;
            if (typeof newItem[key] !== 'string') return;
        }
        this.props.addItem(newItem);
        alert('Movie added');
    }

    updateItem = (state) => {
        let movie = { ...state, id: this.props.movieToPreview.id }
        this.props.updateItem(movie);
    }

    render() {
        //console.log(this.props)
        return (
            <form className={`form ${this.props.formIsActive ? 'form-active' : 'form-inactive'}`} onSubmit={this.handleSubmit}>
                <div className={`input-container ${this.props.movieToPreview ? 'preview-active' : ''}`}>
                    <input name="name" type="text" onChange={this.handleInputChange} placeholder={this.props.movieToPreview ? this.props.movieToPreview.name : 'name'}></input>
                    <input name="genre" type="text" onChange={this.handleInputChange} placeholder={this.props.movieToPreview ? this.props.movieToPreview.genre : 'genre'}></input>
                    <input name="year" type="text" onChange={this.handleInputChange} placeholder={this.props.movieToPreview ? this.props.movieToPreview.year : 'year'}></input>
                    <input name="imgUrl" type="text" onChange={this.handleInputChange} placeholder={this.props.movieToPreview ? this.props.movieToPreview.imgUrl : 'img url'}></input>
                    <input name="valoration" type="text" onChange={this.handleInputChange} placeholder={this.props.movieToPreview ? this.props.movieToPreview.valoration : 'valoration'}></input>
                </div>
                <div className={`button-container ${this.props.movieToPreview ? 'preview-active' : ''}`}>
                    <input type="submit" className="add-button" value={this.props.movieToPreview ? 'EDIT' : 'ADD'} />
                </div>
                <div className={`preview-container ${this.props.movieToPreview ? 'preview-container-active' : 'preview-container-inactive'}`}>
                    <Preview movie={this.props.movieToPreview} preview={this.state} />
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

        // const target = event.target;
        // const name = target.name;
        // const value = target.value.toLowerCase();