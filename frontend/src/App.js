// src/App.js
import React from 'react';
import MonumentsList from './components/MonumentsList';
import AddMonument from './components/AddMonument';

const App = () => {
    return (
        <div className="App">
            <MonumentsList />
            <AddMonument />
        </div>
    );
};

export default App;
