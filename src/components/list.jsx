import '../components/list.css'
import { Card } from '../components/card';
const { Component } = require("react");

export class List extends Component {
    constructor() {
        super();

        this.state = {
            movies: [
                {
                    name: 'shrek',
                    genre: 'animación, aventura, comedia',
                    year: 2001,
                    valoration: 9.5,
                    imgUrl: 'https://enfilme.com/img/content/schrek_poster_Enfilme_v3024_675_489.jpeg'
                },
                {
                    name: 'shrek 2',
                    genre: 'animación, aventura, comedia',
                    year: 2004,
                    valoration: 10,
                    imgUrl: 'http://4.bp.blogspot.com/-fmMmqjMfDRY/VNjYGCtNjkI/AAAAAAAAdio/klRWhQid5LQ/s1600/rD8SvOTCCJ2VIpIV7GUwUKD1Kzc.jpg'
                },
                {
                    name: 'Piratas del Caribe',
                    genre: 'animación, aventura, comedia',
                    year: 2003,
                    valoration: 10,
                    imgUrl: 'https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'
                },
            ]
        }
    }
    render() {
        // return <section>
        //     <ul>{this.state.movies.map((movie, key) =>
        //     (<li key={key}>
        //         {key + 1} - {movie.title}
        //     </li>)
        //     )}
        //     </ul>
        // </section>

        return (
            <div className='list'>{this.state.movies.map((movie, key) => (
                <Card key={key} dataParentToChild={[movie, key]} />
            ))}
            </div>
        )
    }
}