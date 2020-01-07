import React, { } from "react";
import uuid from "uuid/v1";

const Search = ({
  URL,
  teamName,
  updateTeamName,
  crestURL,
  updateCrestURL,
  teamID,
  teams,
  updateTeamID,
  updateTeamDates,
  updateTeamMatches,
  chosenTeam
}) => {
  console.log("Search");
  console.log("teamName", teamName);

  const updateTeamData = (teamID) => {
    console.log("updateTeamData");
    console.log("teamID", teamID);

    const url = URL + "/api/fb/allteammatchdates/" + teamID;
    console.log("updateTeamData - dates-url", url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("data---allteammatchdates--------_>", data);
        updateTeamDates(data);
      })
      .catch(err => { throw err });

    const url2 = URL + "/api/fb/allteammatchresults/" + teamID;
    console.log("updateTeamData - result-url2", url2);
    fetch(url2)
      .then(res => res.json())
      .then(data => {
        console.log("data--allteammatchresults---_>", data);
        updateTeamMatches(data);
      })
      .catch(err => { throw err });
  }

  const handleChange = (evt) => {
    console.log("handleChange");
    console.log("teams", teams);
    const target = evt.target;
    const id = evt.target.id;
    console.log("target.value", target.value);
    const splitting = target.value.split(" - ");
    console.log("splitting", splitting);
    const c1 = splitting[1];
    const c2 = teams[splitting[0]].crestUrl;
    const c3 = Number(splitting[2]);
    console.log("c1", c1);
    console.log("c2", c2);
    console.log("c3", c3);
    updateTeamID({ ...teamID, ["teamID"]: c3 });
    updateTeamName({ ...teamName, [id]: c1 });
    updateCrestURL({ ...crestURL, ["crestURL"]: c2 });
    updateTeamData(c3);
  }

  console.log("teams", teams, "lklk");
  return (
    <div>
      {
        chosenTeam
          ?
          <select></select>
          :
          <select onChange={handleChange} id="teamName">
            <option> - select a team - </option>
            {teams.map((team, index) => {
              return <option key={uuid()}>{index} - {team.name} - {team.teamID}</option>;
            })};
        </select>
      }
    </div >
  );
}
export default Search;
