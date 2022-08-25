import '../components/profileButton.css';

export const ProfileButton = (props) => {
    return (<button onClick={() => props.setIsEditMode(true)} className="font edit-profile-button" >EDITAR PERFILES</button>)
}