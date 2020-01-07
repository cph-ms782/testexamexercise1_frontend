import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import uuid from "uuid/v1";

function UserInfo({
    teamName,
    chosenTeam,
    crestURL,
    teamMatches,
    teamDates,
    updateChosenTeam,
    updateFlightDate,
    updateFlightTime,
    updateFlightHomeCity,
    updateFlightAwayCity,
}) {
    console.log("UserInfo");
    console.log("UserInfo TEAM MATCHES " + teamMatches);
    console.log("UserInfo teamName.teamName", teamName.teamName);
    // console.log("UserInfo teamDates", teamDates);
    // console.log("UserInfo teamMatches", teamMatches);
    // console.log("UserInfo chosenTeam", chosenTeam);
    // console.log("UserInfo flightDate", flightDate);

    //reset flight data if this is second team selected
    useEffect(() => {
        console.log("UserInfo useEffect");
        updateFlightTime("");
        updateFlightDate("");
        updateFlightHomeCity("");
        updateFlightAwayCity("");
    }, []);

    const findFlights = (evt) => {
        console.log("findFlights");
        const target = evt.target;
        // console.log("target", target);
        const parentElement = target.parentElement;
        // console.log("parentElement", parentElement);
        const firstChild = target.parentElement.innerText;
        // console.log("findFlights firstChild", firstChild);
        const flightData = firstChild.split("\n\n");
        console.log("UserInfo findFlights flightData", flightData);
        const time = flightData[0].split(" ")[0];
        console.log("UserInfo findFlights time", time);
        const date = flightData[0].split(" ")[1];
        console.log("UserInfo findFlights date", date);
        const hCity = flightData[1];
        console.log("UserInfo findFlights flightHomeCity", hCity);
        const aCity = flightData[2];
        console.log("UserInfo findFlights flightAwayCity", aCity);
        updateFlightTime(time);
        updateFlightDate(date);
        updateFlightHomeCity(hCity);
        updateFlightAwayCity(aCity);
    }

    const willFollowTeam = (evt) => {
        console.log("UserInfo willFollowTeam");
        console.log("UserInfo teamName", teamName.teamName);
        const target = evt.target.checked;
        console.log("UserInfo target", target);
        if (target) {
            localStorage.setItem("chosenTeam", teamName.teamName);
            localStorage.setItem("chosenTeamCrestUrl", crestURL.crestURL);
            // localStorage.setItem("chosenTeamMatches", teamMatches);
            // localStorage.setItem("chosenTeamDates", teamDates);
            updateChosenTeam(teamName.teamName);
        } else {
            localStorage.clear();
            updateChosenTeam("");
        }
    };
    console.log("UserInfo teamDates.code", teamDates.code);
    console.log("UserInfo teamMatches.code", teamMatches.code);
    if (teamDates.code === 500 || teamMatches.code === 500) {
        return (
            <div>
                <p>Server not responding</p>
            </div>
        )
    } else {
        return (
            <div>

                {!teamName ?
                    <div></div>
                    :
                    <div>
                        {chosenTeam ?
                            <div>
                                <div>
                                    <label htmlFor="checkid">Follow </label>
                                    <input id="checkid" onChange={willFollowTeam} type="checkbox" name="chosenOne" checked value="true" /> <br />
                                </div>
                                <div>
                                    <b>{chosenTeam}</b>
                                </div>
                            </div>
                            :
                            <div>
                                <div>
                                    <label htmlFor="checkid">Follow </label>
                                    <input onChange={willFollowTeam} type="checkbox" name="chosenOne" /> <br />
                                </div>
                                <div>
                                    <b>{teamName.teamName}</b>
                                </div>
                            </div>
                        }
                    </div>
                }
                <hr />

                {teamName && <b><p>Next Match Dates</p></b>}
                {
                    teamDates.slice(0, 3).map((team) => (
                        <div onClick={findFlights} key={uuid()}>
                            <Link to="/flights" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                                <b><p key={uuid()}>{team.utcDate}</p></b>
                                <p key={uuid()}>{team.homeCity}</p>
                                <p key={uuid()}>{team.awayCity}</p>
                                <hr />
                            </Link>
                        </div>
                    ))
                }
                <hr />

                {teamName && <b><p>Match Scores</p></b>}
                {
                    teamMatches.slice(-3).map((team) => (
                        <div key={uuid()}>
                            <b><p key={uuid()}>{team.utcDate}</p></b>
                            <p key={uuid()}>{team.homeCity} - {team.homeScore}</p>
                            <p key={uuid()}>{team.awayCity} - {team.awayScore}</p>
                            <hr />
                        </div>
                    ))
                }
            </div >
        )
    }
}

export default UserInfo;
