import { List } from '../components/List';
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { useEffect, useState } from 'react';
import { movieServices } from '../services/movieServices';

export const Home = () => {

    const [logged, setLogged] = useState();

    useEffect(() => {
        movieServices.getProfiles().then(res => {
            if (res) {
                let loggedProf = res.filter(profile => profile.isLogged === true);
                setLogged(loggedProf[0]);
            }
        })

    }, [])

    return (
        <section className="wrapper">
            <Nav logged={logged} />
            <List />
            <Footer logged={logged} />
        </section>
    )
} 