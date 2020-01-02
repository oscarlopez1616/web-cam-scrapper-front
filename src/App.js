import React from 'react';
import './App.css';
import "../src/template/babosas/css/estilos.css"
import "../src/template/babosas/css/reset.css"
import TemplateSelector from "./Components/TemplateSelector";

function App() {


    return (
        <div className="App">
            <TemplateSelector hostname={window.location.hostname} />
        </div>
    );
}

export default App;
