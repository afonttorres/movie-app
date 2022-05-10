import '../components/form.css';
const { Component } = require('react');

export class Form extends Component {
    constructor() {
        super()
    }
    addItem = () => {
        let newItem = {
            name: '',
            genre: '',
            year: '',
            imgUrl: '',
            valoration: ''
        }

        let keys = Object.keys(newItem);
        let inputs = document.querySelectorAll('input')
        inputs.forEach(input => {
            if ((typeof input.value !== String || typeof input.value !== Number) && input.value === '') return;
            let key = keys.find(key => key === input.id);
            newItem[key] = input.value;
        })

        this.props.addItem(newItem);
    }
    render() {
        return (<form className="form" action="">
            <div className="input-container">
                <input id="name" type="text" placeholder="name"></input>
                <input id="genre" type="text" placeholder="genre"></input>
                <input id="year" type="number" placeholder="year"></input>
                <input id="imgUrl" type="text" placeholder="url"></input>
                <input id="valoration" type="number" placeholder="valoration"></input>
            </div>
            <div className="button-container">
                <button type="submit" className="add-button" onClick={() => this.addItem(this)}>ADD</button>
            </div>
        </form>)
    }
}