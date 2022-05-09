import '../components/card.css'
const { Component } = require('react');


export class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.dataParentToChild[0].name,
            year: this.props.dataParentToChild[0].year,
            genre: this.props.dataParentToChild[0].genre,
            valoration: this.props.dataParentToChild[0].valoration,
            imgUrl: this.props.dataParentToChild[0].imgUrl,
            id: parseInt(this.props.dataParentToChild[1]) + 1
        }
    }
    render() {
        return (
            <div className="card">
                <div className="img-container line">
                    <img className='img' src={this.state.imgUrl} alt="" />
                </div>
                <div className="info-row font line">
                    <div className="info-text-container line">
                        <p className="name">{this.state.name}</p>
                        <p className="year">{this.state.year}</p>
                        <p className="genre">{this.state.genre}</p>
                    </div>
                    <div className="info-ix-container line">
                        <p className="valoration">{this.state.valoration}</p>
                        <div className="fav-icon-container">
                            <i className="fa-solid fa-star fav-icon-border"><i className="fa-solid fa-star fav-icon-background"></i></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}