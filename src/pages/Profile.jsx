
import profileSettings from '../profile-settings.json';
import '../pages/profile.css';
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import { Setting } from '../components/Setting';
import { ProfileButton } from '../components/ProfileButton';
import { movieServices } from '../services/movieServices';
import { Loader } from '../components/Loader';
import { ProfileForm } from '../components/ProfileForm';
import { EditProfile } from '../views/EditProfie';

export const Profile = (props) => {

    const [profiles, setProfiles] = useState();
    const [settings] = useState(profileSettings);
    const [isLoading, setIsLoading] = useState(false);
    const [logged, setLogged] = useState();
    const [isFormActive, setIsFormActive] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getProfData();
    }, [])

    useEffect(() => {
        swipeBack();
    })

    useEffect(() => {
    }, [isEditMode])

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

    const addProfile = (profile) => {
        movieServices.postProfile(profile).then(res => {
            if (res) {
                getProfData();
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000)
            }
        })
    }

    const updateProfile = (profile) => {
        movieServices.updateProfile(profile, profile.id).then(res => {
            if (res) {
                getProfData();
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000)
            }
        })
    }

    const closeEditProfile = () => {
        setIsEditMode(false);
    }

    return (
        <section className="wrapper">
            <Nav logged={logged} />
            <main className="container">
                {isLoading ? <Loader /> : null}
                {!isLoading ? <>

                    <>{isFormActive ? <><ProfileForm closeForm={setIsFormActive} uppdateProfile={updateProfile} addProfile={addProfile}/></> : null}</>

                    {!isEditMode ?
                        <>
                            <section className='avatar-container line'>{profiles ? profiles.map((profile, key) => (
                                <Avatar key={profile.id} profile={profile} loggin={loggin} />))
                                : null}
                            </section>
                            <section className="profile-button-container line">
                                <ProfileButton setIsEditMode={setIsEditMode} />
                            </section>
                            <section className="profile-options-container line">{settings ? settings.map((setting, key) => (
                                <Setting key={key} setting={setting} />))
                                : null}
                            </section>
                        </>

                        : <EditProfile profiles={profiles} isEditMode={isEditMode} closeEditProfile={closeEditProfile} updateProfile={updateProfile} />
                    }

                </>
                    : null}
            </main>

            <Footer logged={logged} />
        </section>
    )
}

