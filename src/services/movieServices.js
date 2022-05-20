import movies from '../data.json';
import axios from 'axios';

export const movieServices = {
    getAllMovies() {
        return movies
    }
}