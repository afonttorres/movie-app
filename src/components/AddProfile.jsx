import { useState } from "react";
import '../components/addProfile.css';

export const AddProfile = (props) => {

    return (
        <article className="addProfile line" onClick={() => props.openForm()}>
            <div className="addProfile-img-container line">
                <span className="addProfile-button">+</span>
            </div>
            <div className="addProfile-name-container line">
                <span className="font addProfile-font line">Add profile</span>
            </div>
        </article>
    )
}