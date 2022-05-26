import { useEffect } from "react";
import '../components/preview.css'

export const Preview = (props) =>{
    let preview = props.movieToPreview;

    useEffect(()=>{
        preview = props.previewData;
    }, [props])

    return(
        <article className='preview'>
                <div className="img-container">
                    <img className="img" src={preview.imgUrl} alt="" />
                </div>
                <div className="info-row font preview-font-size">
                    <div className="info-text-container">
                        <p className="name preview-font-size">{preview.name}</p>
                        <p className="year preview-font-size">{preview.year}</p>
                        <p className="genre preview-font-size">{preview.genre}</p>
                    </div>
                    <div className="info-ix-container">
                        <p className="valoration preview-font-size">{preview.valoration}</p>
                        <div className="fav-icon-container">
                            <i className="fa-solid fa-star fav-icon-border"><i className="fa-solid fa-star fav-icon-background"></i></i>
                        </div>
                    </div>
                </div>
            </article>
    )
}