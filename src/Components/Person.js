import React from "react";

const Person = ({link,image,personName,isBigGirl,isRightGirl}) => {
    return(
        <div className={"chica " + (isBigGirl ? 'chica-grande ' : '')+ (isRightGirl ? 'grande-derecha' : '')}>
            <a className="link" href={link} title="">
                <span className="thumb"><img src={image} width="175" height="150" alt="" title=""/></span>
                <span className="nombre-chica"> <span className="ico-online" /> {personName}</span>
                <span id="favorito" className="ico-favorito" />
            </a>
        </div>
        )

}

export default Person
