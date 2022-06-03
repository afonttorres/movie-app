import { useEffect, useState } from "react";
import '../components/avatar.css';
import { movieServices } from "../services/movieServices";

export const Avatar = (props) => {
    const [name, setName] = useState(props.profile.name);
    const [avatar, setAvatar] = useState(props.profile.avatar);
    const [isLogged, setIsLogged] = useState(props.profile.isLogged);

    return (
        <article className="avatar line">
            <div className={isLogged ? "avatar-img-container line logged" : "avatar-img-container"}>
                <img className="avatar-img" src={avatar} alt="" />
            </div>
            <div className="avatar-name-container line">
                <span className="font avatar-font">{name}</span>
            </div>
        </article>
    )
}