import { useEffect, useState } from "react";
import '../components/preview.css'

export const Preview = (props) => {
    const [state, setState] = useState(props.movieToPreview);

    useEffect(() => {
        setState(props.previewData)
    }, [props])

    return (
        <article className='preview' style={{ backgroundImage: `url(${state.imgUrl})` }}>
            <div className="card-opacity">
                <div className="card-button-container">
                    {/* <img className="img" src={state.imgUrl} alt="" /> */}
                </div>
                <div className="info-row card-font">
                    <div className="info-text-container">
                        <p>{state.name}</p>
                        <p>{state.year}</p>
                        <p>{state.genre}</p>
                    </div>
                    <div className="info-ix-container">
                        <p className="valoration">{state.valoration}</p>
                        <i className={`fa-solid fa-star fav-icon ${!state.isFav ? 'fav-icon-unfav' : 'fav-icon-fav'}`}></i>
                    </div>
                </div>
            </div>
        </article>
    )
}