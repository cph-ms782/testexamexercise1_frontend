import React, { } from "react";
import NewsFlightsRender from "./NewsFlightsRender";
import MatchInfo from "./MatchInfo"

function NewsFlights({ teams, teamDates, teamMatches, airports, flightHomeCity, flightAwayCity, flightTime, flightDate, updateTicketURL, updateShowBuyImage, dummyAir }) {
    console.log("NewsFlights");
    console.log("flightHomeCity ======== " + flightHomeCity);

    return (
        <div>
            {flightDate && <div className='sidebyside'>
                <div id="flightinfo">
                    <NewsFlightsRender
                        airports={airports}
                        flightHomeCity={flightHomeCity}
                        flightTime={flightTime}
                        flightDate={flightDate}
                        updateTicketURL={updateTicketURL}
                        updateShowBuyImage={updateShowBuyImage}
                        dummyAir={dummyAir}
                    />
                </div>
                <div id="matchinfo">
                <MatchInfo teams={teams} teamDates={teamDates} teamMatches={teamMatches} flightDate={flightDate} flightHomeCity={flightHomeCity} flightAwayCity={flightAwayCity}/>
                </div>
            </div>}
        </div>
    )

}

export default NewsFlights;