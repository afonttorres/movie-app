import { useEffect, useState } from "react";
import '../components/preview.css'

export const Preview = (props) => {
    const [state, setState] = useState(props.movieToPreview);

    useEffect(() => {
        setState(props.previewData)
    }, [props])

    return (
        <article className='preview'>
            <div className="img-container">
                <img className="img" src={state.imgUrl} alt="" />
            </div>
            <div className="info-row font preview-font-size">
                <div className="info-text-container">
                    <p className="name preview-font-size">{state.name}</p>
                    <p className="year preview-font-size">{state.year}</p>
                    <p className="genre preview-font-size">{state.genre}</p>
                </div>
                <div className="info-ix-container">
                    <p className="valoration preview-font-size">{state.valoration}</p>
                    <div className="fav-icon-container">
                        <i className="fa-solid fa-star fav-icon-border"><i className="fa-solid fa-star fav-icon-background"></i></i>
                    </div>
                </div>
            </div>
        </article>
    )
}