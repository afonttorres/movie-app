import { useEffect, useState } from 'react';
import { AddProfile } from '../components/AddProfile';
import { Avatar } from '../components/Avatar';
import { ProfileButton } from '../components/ProfileButton';
import profileData from '../profiles.json';
import '../views/chooseProfile.css';

export const ChooseProfile = (props) => {

    const [profiles, setProfiles] = useState(profileData);


    return (
        <section className='chooseProfile-container line'>
            <div className="chooseProfile-profile-button-container">
                <ProfileButton />
            </div>
            <p className="chooseProfile-title line">¿Quién eres?</p>
            <main className="chooseProfile-avatar-container line">{profiles ? profiles.map((profile, key) => (
                <Avatar profile={profile} />
            )) : null}
                <AddProfile />
            </main>
        </section>
    )
}