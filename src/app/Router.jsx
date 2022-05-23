import * as React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from '../App';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { CardInfo } from '../components/CardInfo';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/card-info/:id' element={<CardInfo />}></Route>
            </Routes>
        </BrowserRouter>
    )
}