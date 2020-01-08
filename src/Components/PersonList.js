import React from "react";
import Person from "./Person";

const PersonList = ({json}) => {

let webCamsHost = 'https://webcams.cumlouder.com/chica/';
let thumbsCDN = 'https://w0.imgcm.com/modelos/';

function createSmallGirls(girlsAmount,currentGirl,json,webCamsHost,thumbsCDN){

    let girls = [];
    let jsonSliced = json.slice(currentGirl,currentGirl+girlsAmount);
    let i = 0;

    jsonSliced.map(function(girl) {
        girls.push(<Person
                    link={ webCamsHost+girl["wbmer_permalink"]+"/?nats="+girl["cum_louder_web_cams_tracking_code"]}
                    image={thumbsCDN+girl["cam_unit_thumb"][1] }
                    isBigGirl={false}
                    isRightGirl={false}
                    key={i+currentGirl}
                    />);
        i++;
    });

    return girls;
}

function createBigGirl(isRightGirl,currentGirl,jsonItem,webCamsHost,thumbsCDN){
   if(jsonItem !== undefined){
    return  <Person
                link={ webCamsHost+jsonItem["wbmer_permalink"]+"/?nats="+jsonItem["cum_louder_web_cams_tracking_code"]}
                image={thumbsCDN+jsonItem["cam_unit_thumb_big"] }
                isBigGirl={true}
                isRightGirl={isRightGirl}
                key={currentGirl+1}
            />;
   }

}


return (

    <div>

        {createSmallGirls(5,0,json,webCamsHost,thumbsCDN)}

        {createBigGirl(false,6,json[6],webCamsHost,thumbsCDN)}

        {createSmallGirls(11,7,json,webCamsHost,thumbsCDN)}

        {createBigGirl(true,18,json[18],webCamsHost,thumbsCDN)}

        {createSmallGirls(11,19,json,webCamsHost,thumbsCDN)}

        {createBigGirl(false,20,json[20],webCamsHost,thumbsCDN)}

        {createSmallGirls(6,21,json,webCamsHost,thumbsCDN)}

    </div>
);
}

export default PersonList
