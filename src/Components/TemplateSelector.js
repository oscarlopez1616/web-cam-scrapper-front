import React from "react";

import Template from "./Template";

const TemplateSelector = () => {

    const hostname= window.location.hostname;

    switch (hostname) {
        case 'www.babosas.com':
            require("../template/babosas/css/estilos.css");
            require("../template/babosas/css/reset.css");
            return (<Template affiliateName="Babosas"/>);
        case 'www.cerdas.com':
            require("../template/cerdas.com/css/estilos.css");
            require("../template/cerdas.com/css/reset.css");
            return (<Template affiliateName="Cerdas"/>);
        case 'conejox.com':
            require("../template/conejox.com/css/estilos.css");
            require("../template/conejox.com/css/reset.css");
            return (<Template affiliateName="Conejox"/>);
        default:
            require("../template/babosas/css/estilos.css");
            require("../template/babosas/css/reset.css");
            return (<Template affiliateName="CumLouderAffiliate"/>);
    }
};

export default TemplateSelector;
