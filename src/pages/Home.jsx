import { Component } from "react";
import { List } from '../components/List';
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const Home = () => {
    return (
        <section className="wrapper">
            <Nav />
            <List />
            <Footer />
        </section>
    )
}