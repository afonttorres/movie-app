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
import { movieServices } from '../services/movieServices';
import { Loader } from '../components/Loader';

export const Profile = (props) => {

    const [profiles, setProfiles] = useState();
    const [settings, setSettings] = useState(profileSettings);
    const [isLoading, setIsLoading] = useState(false);
    const [logged, setLogged] = useState();

    useEffect(() => {
        getProfData();
    }, [])

    useEffect(() => {
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

    const loggin = (profile) => {

        profile.isLogged = true;
        movieServices.loggProfile(profile, profile.id).then(res => {
            if (res) {
                getProfData();
                setIsLoading(true);
                setTimeout(() => {
                    window.location.assign('/home');
                }, 2000);
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000)
            }
        });
    }

    const getProfData = () => {
        movieServices.getProfiles().then(res => {
            if (res) {
                setProfiles(res);
                let loggedProf = res.filter(profile => profile.isLogged === true);
                setLogged(loggedProf[0]);
            }
        })
    }

    return (
        <section className="wrapper">
            <Nav logged={logged} />
            <main className="container">
                {isLoading ? <Loader /> : null}
                {!isLoading ?
                    <>
                        <section className='avatar-container line'>{profiles ? profiles.map((profile, key) => (
                            <Avatar key={profile.id} profile={profile} loggin={loggin} />))
                            : null}
                        </section>
                        <section className="profile-button-container line">
                            <ProfileButton />
                        </section>
                        <section className="profile-options-container line">{settings ? settings.map((setting, key) => (
                            <Setting key={key} setting={setting} />))
                            : null}
                        </section>
                    </>
                    : null}
            </main>

            <Footer logged={logged} />
        </section>
    )
}

