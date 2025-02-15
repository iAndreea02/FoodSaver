import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../page/home';
import ListFood from '../page/ListFood';
import Contact from '../page/Contact';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foods" element={<ListFood />}>
        </Route>
        <Route path="/contact" element={<Contact />} />
    </Routes>
);

export default AppRoutes;
