import '../components/card.css';
import { Link } from 'react-router-dom';
import { Component } from 'react';



export class Card extends Component {
    constructor(props) {
        super(props)
    }
    delete = (id)=> {
        this.props.deleteItem(id);
    }
    edit = (movie) =>{
        this.props.toggleForm();
        this.props.nextMovieToPreview(movie);
    }
    render() {
        return (
            <div className="card">
                <div className="img-container line">
                    <img className='img' src={this.props.movie.imgUrl} alt="" />
                    <button className='deleteButton' onClick={()=> this.delete(this.props.movie.id)}><i className="fa-solid fa-trash-can"></i></button>
                    <button className='editButton' onClick={()=> this.edit(this.props.movie)}><i className="fa-solid fa-pen-to-square"></i></button>
                    <Link to='/card-info'><button className='infoButton' ><i className="fa-solid fa-info"></i></button></Link>
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