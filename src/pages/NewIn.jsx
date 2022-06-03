import { useEffect, useState } from "react"
import { Footer } from "../components/Footer"
import { Nav } from "../components/Nav"
import { movieServices } from "../services/movieServices";

export const NewIn = () => {

    const [logged, setLogged] = useState();

    useEffect(() => {
        movieServices.getProfiles().then(res => {
            if (res) {
                let loggedProf = res.filter(profile => profile.isLogged === true);
                setLogged(loggedProf[0]);
            }
        })

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

    return (
        <section className="wrapper">
            <Nav logged={logged} />
            <main className="container">

            </main>
            <Footer logged={logged} />
        </section>
    )
}