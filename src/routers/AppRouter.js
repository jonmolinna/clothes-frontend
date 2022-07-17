import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Category from '../pages/Category';
import Color from '../pages/Color';
import Gender from '../pages/Gender';
import Size from '../pages/Size';

const AppRouter = () => {
    const { auth } = useSelector(state => state.auth);

    return (
        <Routes>
            <Route
                path='/'
                element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
                path='category'
                element={auth ? <Category /> : <Navigate to="/login" />}
            />
            <Route
                path='color'
                element={auth ? <Color /> : <Navigate to="/login" />}
            />
            <Route
                path='gender'
                element={auth ? <Gender /> : <Navigate to="/login" />}
            />
            <Route
                path='size'
                element={auth ? <Size /> : <Navigate to="/login" />}
            />
            <Route
                path='login'
                element={auth ? <Navigate to="/" /> : <Login />}
            />
        </Routes>
    )
}

export default AppRouter