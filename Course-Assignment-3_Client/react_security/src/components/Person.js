import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import FillDB from "./FillDB.js";
import EmptyDB from "./EmptyDB.js";

function Person({
}) {
  console.log("Person");
  return (
    <div>
      <Router>
        <div className="newsContainer">
          <div className="newsContent">
            <Switch>
              <Route exact path="/fill">
                <FillDB />
              </Route>
              <Route exact path="/empty">
                <EmptyDB />
              </Route>
              {/* <Route>
                <NoMatch />
              </Route> */}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default Person;
