import React, { } from "react";
import uuid from "uuid/v1";

function NewsTeams({ teams }) {
    console.log("NewsTeams");
    console.log("NewsTeams teams", teams);
    const teamID = 57;
    // const newTeams = teams.filter((team) => {
    //     return team.teamID == teamID;
    // });

    const standingsArray = [{ "teamID": 57, "tla": "ARS" }, { "teamID": 58, "tla": "AST" }]

    const board = standingsArray.map((standing) => {
        const teamWithSameID = teams.find((team) => {
            return team.teamID === standing.teamID;
        });
        if (teamWithSameID != undefined) { standing.tla = teamWithSameID.tla; }
        return standing;
    })
    console.log("board", board)

    return (
        <div>
            <h2>Teams</h2>
            <br />
            <div>
                {board.map((team) => (

                    <p key={uuid()}>{team.teamID} {team.name} {team.tla}</p>
                ))}


                {/* <h1>Searching for team ID 57</h1>
                {newTeams.map((team) => (
                    <p key={uuid()}>{team.teamID} {team.name} {team.tla}</p>
                ))} */}
            </div>
        </div>
    )
}

export default NewsTeams;