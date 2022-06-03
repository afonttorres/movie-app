import { useEffect, useState } from "react";
import '../components/profileForm.css';

export const ProfileForm = (props) => {

    const [profile, setProfile] = useState({ name: '', avatar: '', isLogged: false });

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProfile({ ...profile, [name]: value.toLowerCase() });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addProfile(profile)
        setProfile({ name: '', avatar: '', isLogged: false });
    }

    return (
        <main className="profile-formAndPreview-opacity">
            <section className="profile-formAndPreview-container">
                <p className='profile-formAndPreview-closeButton' onClick={() => props.closeForm(false)}><i className="fa-solid fa-x"></i></p>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <input style={{ textTransform: 'capitalize' }} type="text" name="name" onChange={handleInputChange} value={profile.name} placeholder="Type your name!" className="profile-input" />
                    <input type="text" name="avatar" onChange={handleInputChange} value={profile.avatar} placeholder="Type your avatar url!" className="profile-input" />
                    <button type="submit" className="profile-form-button">CREATE !</button>
                </form>
                <article className="profile-preview-container">
                    <img className={!profile.avatar ? "profile-preview-img visibility" : "profile-preview-img"} src={profile.avatar} alt="" />
                    <p className="profile-preview-name">
                        {profile.name}
                    </p>
                </article>
            </section>
        </main>
    )
}