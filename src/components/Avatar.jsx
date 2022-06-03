import { useEffect, useState } from "react";
import '../components/avatar.css';
import { movieServices } from "../services/movieServices";

export const Avatar = (props) => {
    const [profile, setProfile] = useState(props.profile)
    const [name, setName] = useState(props.profile.name);
    const [avatar, setAvatar] = useState(props.profile.avatar);
    const [isLogged, setIsLogged] = useState(props.profile.isLogged);
    const [id, setId] = useState(props.profile.id);

    useEffect(() => {
        setName(props.profile.name);
        setAvatar(props.profile.avatar);
        setIsLogged(props.profile.isLogged)
    }, [props.profile])

    const updateProfile = () => {
        props.loggin(profile)
    }

    return (
        <article className="avatar line" onClick={() => updateProfile()} >
            <div className={isLogged ? "avatar-img-container line logged" : "avatar-img-container"}>
                <img className="avatar-img" src={avatar} alt="" />
            </div>
            <div className="avatar-name-container line">
                <span className="font avatar-font">{name}</span>
            </div>
        </article>
    )
}