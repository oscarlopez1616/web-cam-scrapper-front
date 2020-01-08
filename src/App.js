import React from 'react';
import './App.css';
import TemplateSelector from "./Components/TemplateSelector";

function App() {


    return (
        <div className="App" style={{backgroundColor: '#E1E1E1'}}>
            <TemplateSelector hostname={window.location.hostname} />
        </div>
    );
}

export default App;
