import { useState } from "react";
import '../components/profileForm.css';

export const ProfileForm = (props) => {

    const [profile, setProfile] = useState(props.profile ? props.profile : { name: '', avatar: '', isLogged: false });

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProfile({ ...profile, [name]: value.toLowerCase() });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.profile ? props.updateProfile(profile) : props.addProfile(profile);
        setProfile({ name: '', avatar: '', isLogged: false });
    }

    return (
        <main className="profile-formAndPreview-opacity">
            <section className="profile-formAndPreview-container">
                <p className='profile-formAndPreview-closeButton' onClick={() => props.closeForm(false)}><i className="fa-solid fa-x"></i></p>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <input style={{ textTransform: 'capitalize' }} type="text" name="name" onChange={handleInputChange} value={profile.name} placeholder="Type your name!" className="profile-input" />
                    <input type="text" name="avatar" onChange={handleInputChange} value={profile.avatar} placeholder="Type your avatar url!" className="profile-input" />
                    <button type="submit" className="profile-form-button">{props.profile ? 'UPDATE' : 'CREATE !'}</button>
                </form>
                <article className="profile-preview-container">
                    <img className={!profile.avatar ? "profile-preview-img visibility" : "profile-preview-img"} src={profile.avatar} alt="" />
                    {props.profile ? <p style={{ bottom: ' 6vh', right: '20vh'}} className="editMode-button"><i className="fa-solid fa-pencil"></i></p> : null}
                    <p className="profile-preview-name">
                        {profile.name}
                    </p>
                </article>
            </section>
        </main>
    )
}