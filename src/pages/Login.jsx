import { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { ChooseProfile } from "../views/ChooseProfile";
import { Loader } from "../components/Loader";

export const Login = () => {


    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        //swipeBack();
        setTimeout(() => setIsLoading(false), 2000)
    }, [])

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
                <>{!isLoading ? <ChooseProfile /> : <Loader />}</>
            </main>
            <Footer />
        </section>
    )
}