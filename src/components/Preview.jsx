import { Component } from "react";
import '../components/preview.css'

export class Preview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewData: this.props.previewData,
            preview: this.props.movieToPreview
        }
    }

    componentDidUpdate() {
        this.state.previewData = this.props.previewData;

        let preview = { ...this.state.preview };
        Object.keys(preview).forEach(key => preview[key] = this.state.previewData[key]);

        this.state.preview = preview;

        console.log('update state:',this.state.preview)
    }

    render() {
        console.log('render state:', this.state.preview)
        return (
            <article className='preview'>
                <div className="img-container">
                    <img className="img" src={this.state.preview.imgUrl} alt="" />
                </div>
                <div className="info-row font preview-font-size">
                    <div className="info-text-container">
                        <p className="name preview-font-size">{this.state.preview.name}</p>
                        <p className="year preview-font-size">{this.state.preview.year}</p>
                        <p className="genre preview-font-size">{this.state.preview.genre}</p>
                    </div>
                    <div className="info-ix-container">
                        <p className="valoration preview-font-size">{this.state.preview.valoration}</p>
                        <div className="fav-icon-container">
                            <i className="fa-solid fa-star fav-icon-border"><i className="fa-solid fa-star fav-icon-background"></i></i>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}