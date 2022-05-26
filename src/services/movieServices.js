// import movies from '../data.json';
import axios from 'axios';

const baseURL = 'https://6286352d96bccbf32d713c70.mockapi.io'

export const movieServices = {
    getAllMovies() {
        const movies = axios.get(`${baseURL}/movies`).then(res => {
            return res.data
        })
        return movies;
    },

    deleteMovie(id) {
        const deleteMovie = axios.delete(`${baseURL}/movies/${id}`).then(res => {
            return res.data
        })

        return deleteMovie;
    },

    postMovie(movie) {
        const postMovie = axios.post(`${baseURL}/movies`, movie).then(res => {
            return res.data;
        })

        return postMovie;
    },

    updateMovie(movie, id) {
        const updatMovie = axios.put(`${baseURL}/movies/${id}`, movie).then(res => {
            return res.data
        })

        return updatMovie;
    },

    getMovie(id){
        const getMovie = axios.get(`${baseURL}/movies/${id}`).then(res =>{
            return res.data;
        })
        return getMovie;
    }
}