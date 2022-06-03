import data from '../profiles.json';
import profileSettings from '../profile-settings.json';
import '../pages/profile.css';

import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import { Setting } from '../components/Setting';
import { ProfileButton } from '../components/ProfileButton';
import { Link } from 'react-router-dom';

export const Profile = (props) => {

    const [profiles, setProfiles] = useState(data);
    const [settings, setSettings] = useState(profileSettings);


    useEffect(()=>{
        swipeBack();
    })

    const swipeBack = () => {
        let start;
        let end;
        let touched = 0;

        window.ontouchstart = (e) => {
            touched++
            start = e.changedTouches[0].clientX;
        }

        window.ontouchend = (e) => {
            touched++
            end = e.changedTouches[0].clientX;

            if (start > end && touched > 0) window.location.assign('/home');
            else return;
        }
    }

    return (
        <section className="wrapper">
            <Nav />
            <main className="container">
                <section className='avatar-container line'>{profiles ? profiles.map((profile, key) => (
                    <Link to={'/home'}><Avatar key={profile.id} profile={profile} /></Link>))
                    : null}
                </section>
                <section className="profile-button-container line">
                    <ProfileButton />
                </section>
                <section className="profile-options-container line">{settings ? settings.map((setting, key) => (
                    <Setting key={key} setting={setting} />))
                    : null}
                </section>
            </main>

            <Footer />
        </section>
    )
}

