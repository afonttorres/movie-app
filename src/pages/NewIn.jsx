import { useEffect } from "react"
import { Footer } from "../components/Footer"
import { Nav } from "../components/Nav"

export const NewIn = () => {

    useEffect(()=>{
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
            <Nav />
            <main className="container">

            </main>
            <Footer />
        </section>
    )
}