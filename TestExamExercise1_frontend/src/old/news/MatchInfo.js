import React, { } from "react";
import uuid from "uuid/v1";

function MatchInfo({
  teamDates,
  flightDate,
  flightHomeCity,
  flightAwayCity
}) {

  return (
    <div id="futureMatches">
      <h2>Match Details</h2>
      <h3>
        <hr />
        <br></br>- {flightDate} -<br></br>
        {flightHomeCity} -VS- {flightAwayCity}
      </h3>
      <br></br>
      <h2>
        - Upcoming matches - <br></br>
      </h2>
      <h3>
        Home Team --- Away Team <br></br>
      </h3>
      <h5>
        {teamDates.slice(0, 10).map(date => (
          <div>
            <p key={uuid()}>{date.utcDate}</p>
            <p key={uuid()}>
              {date.homeCity} - {date.awayCity}
            </p>
            <hr />
          </div>
        ))}
      </h5>
    </div>
  );
}

export default MatchInfo;
