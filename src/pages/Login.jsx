import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ChooseProfile } from "../views/ChooseProfile";
import { Loader } from "../components/Loader";
import { movieServices } from "../services/movieServices";
import { EditProfile } from "../views/EditProfie";

export const Login = () => {


    const [isLoading, setIsLoading] = useState(true);
    const [profiles, setProfiles] = useState();
    const [logged, setLogged] = useState();
    const [isEditMode, setIsEditMode] = useState(false);



    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
        getProfData();
    }, [])

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

    const closeEditProfile = () =>{
        setIsEditMode(false);
    }


    return (
        <section className="wrapper">
            <Nav logged={logged} />
            <main className="container">
                <>{isLoading ? <Loader /> : <>{!isEditMode ? <ChooseProfile profiles={profiles} logged={logged} loggin={loggin} addProfile={addProfile} updateProfile={updateProfile} setIsEditMode={setIsEditMode} /> : <EditProfile profiles={profiles} isEditMode={isEditMode} updateProfile={updateProfile} closeEditProfile={closeEditProfile} />}</>}</>
            </main>
            <Footer logged={logged} />
        </section>
    )
}