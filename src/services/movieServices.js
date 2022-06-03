import axios from 'axios';
// import jsonfile from 'jsonfile';
// const file = '../profiles.json'

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

    getMovie(id) {
        const getMovie = axios.get(`${baseURL}/movies/${id}`).then(res => {
            return res.data;
        })
        return getMovie;
    },
    getFavMovies() {
        const fav = axios.get(`${baseURL}/movies`).then(res => {
            return res.data.filter(movie => movie.isFav === true)
        })
        return fav;
    },

    getSearch(data) {
        const search = axios.get(`${baseURL}/movies`).then(res => {
            return res.data.filter(movie => {
                let cut = data.length;
                return movie.name.slice(0, cut) === data;
            })
        })
        return search;
    },
    readFile() {
        // jsonfile.readFile(file, function (err, data) {
        //     if (err) console.error(err)
        //     console.dir(data)
        //   })
    },
    writeFile(obj) {
        // jsonfile.writeFile(file, obj, function (err) {
        //     if (err) console.error(err)
        // })
    },
    getProfiles() {
        const profiles = axios.get(`https://6299dd976f8c03a9784ba7b0.mockapi.io/profiles`).then(res => {
            return res.data;
        })
        return profiles;
    },
    updateProfile(profile, id) {
        const profiles = axios.put(`https://6299dd976f8c03a9784ba7b0.mockapi.io/profiles/${id}`, profile).then(res => {
            return res.data;
        })
        return profiles;
    },
    loggProfile(profile, id) {
        const isLogged = this.getProfiles().then(res => {
            if (res) {
                let loggedProfile = res.filter(profile => profile.isLogged === true)
                let lastLogged = loggedProfile[0];
                if (lastLogged) {
                    lastLogged.isLogged = false;
                    this.updateProfile(lastLogged, lastLogged.id).then(res => {
                        if (res) {
                            this.updateProfile(profile, id).then(res => {
                                if (res) {
                                    console.log(`${res.name} logged succesfully`)
                                    return true;
                                }
                            })
                            return true;
                        }
                    })
                    return true;
                } else {
                    this.updateProfile(profile, id).then(res => {
                        if (res) {
                            console.log(`${res.name} logged succesfully`)
                            return true;
                        }
                    })
                    return true;
                }
            }
        })
        return isLogged;
    }
}