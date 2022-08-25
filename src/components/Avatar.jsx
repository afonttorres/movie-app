import { useEffect, useState } from "react";
import '../components/avatar.css';

export const Avatar = (props) => {
    const [profile] = useState(props.profile)
    const [name, setName] = useState(props.profile.name);
    const [avatar, setAvatar] = useState(props.profile.avatar);
    const [isLogged, setIsLogged] = useState(props.profile.isLogged);

    useEffect(() => {
        setName(props.profile.name);
        setAvatar(props.profile.avatar);
        setIsLogged(props.profile.isLogged)
    }, [props.profile])

    const updateProfile = (profile) => {
        props.loggin ? props.loggin(profile) : props.editProfile(profile);
    }

    return (
        <article className="avatar line" onClick={() => updateProfile(profile)} >
            <div className={isLogged ? "avatar-img-container line logged" : "avatar-img-container"}>
                <img className="avatar-img" src={avatar} alt="" />
                {props.isEditMode ? <p className="editMode-button"><i className="fa-solid fa-pencil"></i></p> : null}
            </div>
            <div className="avatar-name-container line">
                <span className="font avatar-font">{name}</span>
            </div>
        </article>
    )
}