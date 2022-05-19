import { Component } from "react";
import '../components/preview.css'

export class Preview extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let preview;
        let lastMovie = this.props.lastMovie;
        let movieToUpdate = this.props.movie;

        if(this.props.preview && this.props.preview !== lastMovie) preview = this.props.preview;
        else preview = {};
        
        let movie = {...movieToUpdate};
        console.log(preview)
        for (let key in preview) {
            if (!lastMovie) {
                if (preview[key] !== movieToUpdate[key]) movie[key] = preview[key];
            } else {
                if (preview[key] !== movieToUpdate[key] && preview[key] !== lastMovie[key]) {
                    console.log(lastMovie[key], preview[key]);
                    movie[key] = preview[key]
                }
            }
        }
        preview = {};
        // console.log(movie)
        return (
            <article className='preview'>
                <div className="img-container">
                    <img className="img" src={movie.imgUrl} alt="" />
                </div>
                <div className="info-row font preview-font-size">
                    <div className="info-text-container">
                        <p className="name preview-font-size">{movie.name}</p>
                        <p className="year preview-font-size">{movie.year}</p>
                        <p className="genre preview-font-size">{movie.genre}</p>
                    </div>
                    <div className="info-ix-container">
                        <p className="valoration preview-font-size">{movie.valoration}</p>
                        <div className="fav-icon-container">
                            <i className="fa-solid fa-star fav-icon-border"><i className="fa-solid fa-star fav-icon-background"></i></i>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}