import * as React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from '../App';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { MovieInfo } from '../pages/MovieInfo';
import { Searcher } from '../pages/Searcher';
import { Profile } from '../pages/Profile';
import { NewIn } from '../pages/NewIn';
import { EditProfile } from '../views/EditProfie';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/search' element={<Searcher />}></Route>
                <Route path='/movie-info/:id' element={<MovieInfo />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/new-in' element={<NewIn />}></Route>
                <Route path='/edit-profile' element={<EditProfile />}></Route>
            </Routes>
        </BrowserRouter>
    )
}