import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { useSelector } from 'react-redux';

const AppRouter = () => {
    const { auth } = useSelector(state => state.auth);

    return (
        <Routes>
            <Route
                path='/'
                element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
                path='login'
                element={auth ? <Navigate to="/" /> : <Login />}
            />
        </Routes>
    )
}

export default AppRouter