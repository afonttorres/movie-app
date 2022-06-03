import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddProfile } from '../components/AddProfile';
import { Avatar } from '../components/Avatar';
import { ProfileButton } from '../components/ProfileButton';
import profileData from '../profiles.json';
import { movieServices } from '../services/movieServices';
import '../views/chooseProfile.css';
import { ProfileForm } from '../components/ProfileForm';
import { Loader } from '../components/Loader';

export const ChooseProfile = (props) => {

    const [profiles, setProfiles] = useState(props.profiles);
    const [isFormActive, setIsFormActive] = useState(false);

    useEffect(() => {
        setProfiles(props.profiles);
    }, [props.profiles])

    const openForm = () => {
        setIsFormActive(true);
    }

    const addProfile = (profile) => {
        setIsFormActive(false);
        props.addProfile(profile);
    }

    console.log(isFormActive);
    return (
        <section className='chooseProfile-container line'>

            {isFormActive ? <><ProfileForm addProfile={addProfile} closeForm={setIsFormActive} /></> : null}
            <div className="chooseProfile-profile-button-container">
                <ProfileButton />
            </div>
            <p className="chooseProfile-title line">¿Quién eres?</p>
            <main className="chooseProfile-avatar-container line">{profiles ? profiles.map((profile, key) => (
                <Avatar key={profile.id} profile={profile} loggin={props.loggin} />
            )) : null}
                <AddProfile openForm={openForm} />
            </main>

        </section>
    )
}