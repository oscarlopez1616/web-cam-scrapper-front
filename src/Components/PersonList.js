import React from "react";
import Person from "./Person";

const PersonList = ({json}) => {

let webCamsHost = process.env.REACT_APP_WEB_CAM_URL;
let thumbsCDN = process.env.REACT_APP_THUMB_CDN;

function createSmallPeople(peopleAmount,currentPerson,json,webCamsHost,thumbsCDN){

    let people = [];
    let jsonSliced = json.slice(currentPerson,currentPerson+peopleAmount);
    let i = 0;

    jsonSliced.map(function(person) {
        people.push(<Person
                    link={ webCamsHost+person["wbmer_permalink"]+"/?nats="+person["cum_louder_web_cams_tracking_code"]}
                    image={thumbsCDN+person["cam_unit_thumb"][1] }
                    personName={person["wbmer_nick"]}
                    isBigPerson={false}
                    isRightPerson={false}
                    key={i+currentPerson}
                    />);
        i++;
    });

    return people;
}

function createBigPerson(isRightPerson,currentPerson,jsonItem,webCamsHost,thumbsCDN){
   if(jsonItem !== undefined){
    return  <Person
                link={ webCamsHost+jsonItem["wbmer_permalink"]+"/?nats="+jsonItem["cum_louder_web_cams_tracking_code"]}
                image={thumbsCDN+jsonItem["cam_unit_thumb_big"] }
                personName={jsonItem["wbmer_nick"]}
                isBigPerson={true}
                isRightPerson={isRightPerson}
                key={currentPerson+1}
            />;
   }

}


return (

    <div>

        {createSmallPeople(5,0,json,webCamsHost,thumbsCDN)}

        {createBigPerson(false,6,json[6],webCamsHost,thumbsCDN)}

        {createSmallPeople(11,7,json,webCamsHost,thumbsCDN)}

        {createBigPerson(true,18,json[18],webCamsHost,thumbsCDN)}

        {createSmallPeople(11,19,json,webCamsHost,thumbsCDN)}

        {createBigPerson(false,20,json[20],webCamsHost,thumbsCDN)}

        {createSmallPeople(6,21,json,webCamsHost,thumbsCDN)}

    </div>
);
};

export default PersonList
