import React from "react";
import Girl from "./Girl";

const GirlsList = ({json}) => {

let webCamsHost = 'https://webcams.cumlouder.com/chica/';
let thumbsCDN = 'https://w0.imgcm.com/modelos/';

return (

    <div className="listado-chicas">

        {console.log(json[0])}

        {createSmallGirls(5,0,json,webCamsHost,thumbsCDN)}

        {createBigGirl(false,json[6],webCamsHost,thumbsCDN)}

        {createSmallGirls(11,7,json,webCamsHost,thumbsCDN)}

        {createBigGirl(true,json[18],webCamsHost,thumbsCDN)}

        {createSmallGirls(11,19,json,webCamsHost,thumbsCDN)}

        {createBigGirl(false,json[20],webCamsHost,thumbsCDN)}

        {createSmallGirls(6,21,json,webCamsHost,thumbsCDN)}

        <div className="clear"></div>

        <a className="btn-mas-modelos" href="#" title="Mostrar más modelos">Siguiente Página</a>

    </div>
);
}


function createSmallGirls(girlsAmount,currentGirl,json,webCamsHost,thumbsCDN){
    let girls = [];

      for (let i = 0; i < girlsAmount; i++) {
        girls.push(<Girl
                    link={ webCamsHost+json[i+currentGirl]["wbmer_permalink"]+"/?nats="+json[i+currentGirl]["cum_louder_web_cams_tracking_code"]}
                    image={thumbsCDN+json[i+currentGirl]["cam_unit_thumb"][ (Math.floor(Math.random() * 3) + 1) ] }
                    isBigGirl={false}
                    isRightGirl={false}
                    />);
      }

      return girls;
}

function createBigGirl(isRightGirl,jsonItem,webCamsHost,thumbsCDN){
    return  <Girl
                link={ webCamsHost+jsonItem["wbmer_permalink"]+"/?nats="+jsonItem["cum_louder_web_cams_tracking_code"]}
                image={thumbsCDN+jsonItem["cam_unit_thumb_big"] }
                isBigGirl={true}
                isRightGirl={isRightGirl}
            />
}

export default GirlsList
