import { Component } from "react";
import '../components/preview.css'

export class Preview extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let preview = this.props.preview;
        let movieToUpdate = this.props.movie;
        // console.log(this.props)
        return (
            <article id={movieToUpdate.id} className='preview'>
                <div className="img-container">
                    <img className="img" src={preview ? preview.imgUrl : movieToUpdate.imgUrl} alt="" />
                </div>
                <div className="info-row font preview-font-size">
                    <div className="info-text-container">
                        <p className="name preview-font-size">{preview ? preview.name : movieToUpdate.name}</p>
                        <p className="year preview-font-size">{preview ? preview.year : movieToUpdate.year}</p>
                        <p className="genre preview-font-size">{preview ? preview.genre : movieToUpdate.genre}</p>
                    </div>
                    <div className="info-ix-container">
                        <p className="valoration preview-font-size">{preview ? preview.valoration : movieToUpdate.valoration}</p>
                        <div className="fav-icon-container">
                            <i className="fa-solid fa-star fav-icon-border"><i className="fa-solid fa-star fav-icon-background"></i></i>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}