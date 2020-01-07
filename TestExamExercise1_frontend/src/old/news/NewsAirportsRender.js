import React, { } from "react";
import uuid from "uuid/v1";

function NewsAirportsRender({ airports }) {
    console.log("NewsAirportsRender");
    console.log("airports", airports);

    return (
        <div>
            <br />
            {airports.map((airport) => {
                return <p key={uuid()}>{airport}</p>
            })}
        </div>
    )
}

export default NewsAirportsRender;