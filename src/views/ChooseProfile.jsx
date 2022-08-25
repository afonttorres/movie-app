import { useEffect, useState } from 'react';
import { AddProfile } from '../components/AddProfile';
import { Avatar } from '../components/Avatar';
import { ProfileButton } from '../components/ProfileButton';
import '../views/chooseProfile.css';
import { ProfileForm } from '../components/ProfileForm';
import { EditProfile } from './EditProfie';

export const ChooseProfile = (props) => {

    const [profiles, setProfiles] = useState(props.profiles);
    const [isFormActive, setIsFormActive] = useState(false);
    const [isEditMode, setIsEditMode] = useState();

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

    const updatePorfile = (profile) => {
        setIsFormActive(false);
        props.updatePorfile();
    }

    return (
        <section className='chooseProfile-container line'>
            <>{isEditMode ? <EditProfile profiles={profiles}  closeForm={setIsFormActive} /> : null}</>
            {isFormActive ? <><ProfileForm addProfile={addProfile} closeForm={setIsFormActive} updatePorfile={updatePorfile} /></> : null}
            <div className="chooseProfile-profile-button-container">
                <ProfileButton isEditMode={setIsEditMode} setIsEditMode={props.setIsEditMode}/>
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