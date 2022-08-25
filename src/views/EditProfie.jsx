import { useEffect, useState } from 'react';
import { AddProfile } from '../components/AddProfile';
import { Avatar } from '../components/Avatar';
import '../views/chooseProfile.css';
import '../views/editProfile.css';
import { ProfileForm } from '../components/ProfileForm';

export const EditProfile = (props) => {
    const [profiles, setProfiles] = useState(props.profiles);
    const [isFormActive, setIsFormActive] = useState(false);
    const [profile, setProfile] = useState();

    useEffect(() => {
        swipeBack();
    })

    useEffect(() => {
        setProfiles(props.profiles);
    }, [props.profiles])

    const openForm = () => {
        setIsFormActive(true);
    }

    const editProfile = (profile) => {
        setIsFormActive(true);
        setProfile(profile);
    }

    const updateProfile = (profile) => {
        setIsFormActive(false);
        props.updateProfile(profile);
    }

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
            if (start > end && touched > 0) props.closeEditProfile();
            else return;
        }
    }

    return (
        <main className="container">

            <p className='editProfile-closeButton font' onClick={() => props.closeEditProfile()}>LISTO</p>
            <section className='chooseProfile-container line'>

                {isFormActive ? <><ProfileForm closeForm={setIsFormActive} profile={profile} updateProfile={updateProfile} addProfile={props.addProfile}/></> : null}
                <p className="chooseProfile-title line">EDITAR PERFILES</p>
                <div className="chooseProfile-avatar-container line">{profiles ? profiles.map((profile, key) => (
                    <Avatar key={profile.id} profile={profile} loggin={props.loggin} editProfile={editProfile} isEditMode={props.isEditMode} />
                )) : null}
                    <AddProfile openForm={openForm} />
                </div>

            </section>
        </main>
    )
}