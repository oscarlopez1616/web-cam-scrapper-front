import React from "react";

const Girl = ({link,image,isBigGirl,isRightGirl}) => {
    return(
        <div className={"chica " + (isBigGirl ? 'chica-grande ' : '')+ (isRightGirl ? 'grande-derecha' : '')}>
            <a className="link" href={link} title="">
                <span className="thumb"><img src={image} width="175" height="150" alt="" title=""/></span>
                <span className="nombre-chica"> <span className="ico-online"></span> Nombre de la chica</span>
                <span id="favorito" className="ico-favorito"></span>
            </a>
        </div>
        )

}

export default Girl
