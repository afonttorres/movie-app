import '../components/form.css';
import React, { Component } from 'react';

export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            genre: '',
            year: '',
            imgUrl: '',
            valoration: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value.toLowerCase();

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.addItem(this.state);
        this.emptyInput();
    }

    emptyInput = () =>{
        this.setState({
            name: '',
            genre: '',
            year: '',
            imgUrl: '',
            valoration: ''
        })
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

    render() {
        return (
            <form className='form' onSubmit={this.handleSubmit}>
                <div className="input-container">
                    <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} placeholder="name"></input>
                    <input name="genre" type="text" value={this.state.genre} onChange={this.handleInputChange} placeholder="genre"></input>
                    <input name="year" type="text" value={this.state.year} onChange={this.handleInputChange} placeholder="year"></input>
                    <input name="imgUrl" type="text" value={this.state.imgUrl} onChange={this.handleInputChange} placeholder="url"></input>
                    <input name="valoration" type="text" value={this.state.valoration} onChange={this.handleInputChange} placeholder="valoration"></input>
                </div>
                <div className="button-container">
                    <input type="submit" className="add-button" value="ADD" />
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