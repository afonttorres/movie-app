import '../components/form.css';
const { Component } = require('react');

export class Form extends Component {
    constructor(props) {
        super(props)
    }
    addItem = () => {
        let isAble = false;
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
            if (input.value === '') return;
            console.log(typeof input.value)
            if (typeof input.value !== 'string') return;
            let key = keys.find(key => key === input.id);
            newItem[key] = input.value;
            console.log(newItem)
            isAble = true;
            }
        )

        if(isAble) this.props.addItem(newItem);
    }
    render() {
        return (<form className="form" action="">
            <div className="input-container">
                <input id="name" type="text" placeholder="name"></input>
                <input id="genre" type="text" placeholder="genre"></input>
                <input id="year" type="text" placeholder="year"></input>
                <input id="imgUrl" type="text" placeholder="url"></input>
                <input id="valoration" type="text" placeholder="valoration"></input>
            </div>
            <div className="button-container">
                <button type="submit" className="add-button" onClick={() => this.addItem(this)}>ADD</button>
            </div>
        </form>)
    }
}