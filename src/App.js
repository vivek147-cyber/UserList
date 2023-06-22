import React from 'react'

import { Route, Routes } from 'react-router-dom';
import { AddList, UpdateList , Homepage } from './components';
import './styles/App.css';
const App = () => {
    return (
        <div className="app">

            <Routes>
                <Route exact path="/" element={<Homepage />} />

                <Route exact path="/adduser" element={<AddList />} />

                <Route exact path="/updateuser/:id" element={<UpdateList />} />

            </Routes>
          
        </div>
    )
}

export default App