import React from 'react';
import './App.css';
import TemplateSelector from "./Components/TemplateSelector";

function App() {


    return (
        <div className="App">
            <TemplateSelector hostname={window.location.hostname} />
        </div>
    );
}

export default App;
