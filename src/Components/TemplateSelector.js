import React from "react";

import Template from "./Template";
import {getJoinPage, requestApi, services} from "./RestClient"

const TemplateSelector = () => {

    const hostname= window.location.hostname;

    const requestGetJoinPage = () => (dispatch) => {
        const request = requestApi(services.getJoinPage());
        dispatch(getJoinPage(request));
    };

    switch (hostname) {
        case 'babosas':
            require("../template/babosas/css/estilos.css");
            require("../template/babosas/css/reset.css");
            return (<Template affiliateName="Babosas"/>);
        case 'cerdas':
            require("../template/cerdas.com/css/estilos.css");
            require("../template/cerdas.com/css/reset.css");
            return (<Template affiliateName="Cerdas"/>);
        case 'conejox':
            require("../template/conejox.com/css/estilos.css");
            require("../template/conejox.com/css/reset.css");
            return (<Template affiliateName="Conejox"/>);
        default:
            require("../template/conejox.com/css/estilos.css");
            require("../template/conejox.com/css/reset.css");
            return (
                <Template affiliateName="CumLouderAffiliate"/>
                );
    }
}

export default TemplateSelector;
