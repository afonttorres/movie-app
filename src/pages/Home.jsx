import { Component } from "react";
import { List } from '../components/List';
import { Nav } from "../components/Nav";

export const Home = () => {
    return (
        <section className="wrapper">
            <Nav />
            <List />
        </section>
    )
}