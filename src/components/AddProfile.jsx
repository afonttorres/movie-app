import { useState } from "react";
import '../components/addProfile.css';

export const AddProfile = () => {

    return (
        <article className="addProfile line">
            <div className="addProfile-img-container line">
                <span className="addProfile-button">+</span>
            </div>
            <div className="addProfile-name-container line">
                <span className="font addProfile-font line">Add profile</span>
            </div>
        </article>
    )
}