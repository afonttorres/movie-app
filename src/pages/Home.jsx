import { Component } from "react";
import { List } from '../components/List';
import { Nav } from "../components/Nav";

export class Home extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <section className="wrapper">
                <Nav />
                <List />
            </section>
        )
    }
}