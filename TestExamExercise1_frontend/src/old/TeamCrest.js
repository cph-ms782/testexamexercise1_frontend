import React, { } from "react";

function TeamCrest({ teamName, crestURL }) {
  console.log("TeamCrest");
  console.log("crestURL", crestURL);
  console.log("teamName", teamName);
  const chosenTeam = localStorage.getItem("chosenTeam");
  const chosenTeamCrestUrl = localStorage.getItem("chosenTeamCrestUrl");
  return (
    <div className="team">
      {!teamName ?
        <p style={{ fontSize: 20 }}>select team</p> :
        <div>

          {!chosenTeam ? <div><img alt="teamIcon" src={crestURL.crestURL} className="thumbnail" /></div> :
            <div><img alt="teamIcon" src={chosenTeamCrestUrl} className="thumbnail" /></div>}

        </div>
      }
    </div >
  );
}

export default TeamCrest;