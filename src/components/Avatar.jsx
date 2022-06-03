import { useEffect, useState } from "react";
import '../components/avatar.css';
import { movieServices } from "../services/movieServices";

export const Avatar = (props) => {
    const [name, setName] = useState(props.profile.name);
    const [avatar, setAvatar] = useState(props.profile.avatar);
    const [isLogged, setIsLogged] = useState(props.profile.isLogged);

    // useEffect(()=>{
    //     setName(props.profile.name);
    //     setAvatar(props.profile.avatar);
    //     setIsLogged(props.profile.isLogged)
    // },[props.profile])

    // const updateProfile = () => {

    //     console.log('hi')

    //     movieServices.getProfiles().then(res => {
    //         if (res) {
    //             let selectedProf = res.filter(profile => profile.isLogged === true)
    //             let lastSelected = selectedProf[0];
    //             lastSelected.isLogged = false;
    //             movieServices.updateProfile(lastSelected, lastSelected.id).then(res => {
    //                 console.log(res)
    //             })
    //         }
    //     })

    //     let data = props.profile;
    //     data.isLogged = true;
    //     movieServices.updateProfile(data, data.id).then(res => {
    //         if (res) {
    //             console.log(res)
    //         }
    //     })

    
    return (
        <article className="avatar line" >
             {/* onClick={() => updateProfile()} */}
            <div className={isLogged ? "avatar-img-container line logged" : "avatar-img-container"}>
                <img className="avatar-img" src={avatar} alt="" />
            </div>
            <div className="avatar-name-container line">
                <span className="font avatar-font">{name}</span>
            </div>
        </article>
    )
}