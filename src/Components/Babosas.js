import React from "react";
import GirlsList from "./GirlsList";

const Babosas = ({json}) => {
    return (

        <div>
            <div className="box-header">
                <div className="header">
                    <h1 className="logo-sitio"><a href="#" title="Babosas.biz">Babosas.biz</a></h1>
                    <div className="tit-webcams">Webcams</div>

                    <div className="logo-cum"><a href="#" title="Cumlouder.com">Cumlouder.com</a></div>

                    <div className="menu">
                        <a href="#" title="Acceso a las Chicas en Directo">Acceso a las Chicas en Directo</a>
                        <span>|</span>
                        <a href="#" title="Acceso Miembros">Acceso Miembros</a> <span>|</span>
                        <a href="#" title="Compra Créditos">Compra Créditos</a>
                    </div>

                    <div className="clear"></div>
                </div>
            </div>

            <GirlsList json ={json["cam_unit_content_with_affiliate_data_dto"]} />

            <div className="box-footer">
                <div className="menu">
                    <a href="#" title="Acceso a las Chicas en Directo">Acceso a las Chicas en Directo</a> <span>|</span>
                    <a href="#" title="Acceso Miembros">Acceso Miembros</a> <span>|</span>
                    <a href="#" title="Compra Créditos">Compra Créditos</a>
                </div>
            </div>

            <div className="box-copy">
                <div className="menu">
                    <p>Copyright © WAMCash Spain Todos los derechos reservados <span>|</span> <a href="#"
                                                                                                 title="Webmasters">Webmasters</a>
                    </p>
                    <p>Contenido para adultos <span>|</span> Tienes que tener mas de 18 años para poder visitarlo. Todas
                        las
                        modelos de esta web son mayores de edad.</p>
                </div>
            </div>

            <div className="box-data">
                <div className="menu">
                    <a href="#" title="Soporte Epoch">Soporte Epoch</a> <span>|</span>
                    <a href="#" title="18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement">18 U.S.C. 2257
                        Record-Keeping Requirements Compliance Statement</a> <span>|</span>
                    <a href="#" title="Contacto">Contacto</a> <span>|</span>
                    <a href="#" title="Please visit Epoch.com, our authorized sales agent">Please visit Epoch.com, our
                        authorized sales agent</a>
                </div>
            </div>

        </div>

    )


}
export default Babosas
