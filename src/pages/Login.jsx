import { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { ChooseProfile } from "../views/ChooseProfile";
import { Loader } from "../components/Loader";
import { movieServices } from "../services/movieServices";

export const Login = () => {


    const [isLoading, setIsLoading] = useState(true);
    const [profiles, setProfiles] = useState();
    const [logged, setLogged] = useState();



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


    return (
        <section className="wrapper">
            <Nav logged={logged} />
            <main className="container">
                <>{!isLoading ? <ChooseProfile profiles={profiles} logged={logged} loggin={loggin} /> : <Loader />}</>
            </main>
            <Footer logged={logged} />
        </section>
    )
}