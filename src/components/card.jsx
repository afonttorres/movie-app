import '../components/card.css';
const { Component } = require('react');


export class Card extends Component {
    constructor(props) {
        super(props)
        
    }
    delete = (id)=> {
        this.props.deleteItem(id)
    }
    render() {
        //console.log(this.props)
        return (
            <div className="card">
                <div className="img-container line">
                    <img className='img' src={this.props.movie.imgUrl} alt="" />
                    <button className='deleteButton' onClick={()=> this.delete(this.props.movie.id)}><i className="fa-solid fa-trash-can"></i></button>
                </div>
                <div className="info-row font line">
                    <div className="info-text-container line">
                        <p className="name">{this.props.movie.name}</p>
                        <p className="year">{this.props.movie.year}</p>
                        <p className="genre">{this.props.movie.genre}</p>
                    </div>
                    <div className="info-ix-container line">
                        <p className="valoration">{this.props.movie.valoration}</p>
                        <div className="fav-icon-container">
                            <i className="fa-solid fa-star fav-icon-border"><i className="fa-solid fa-star fav-icon-background"></i></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}