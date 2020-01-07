import React from "react";

function NewsNodes() {
    console.log("NewsNodes");
    return (
        <div>
            <h2>React Nodes</h2>
            <br />
            {/* <img src={require("../images/ReactNodes.png")} alt="nodes png" /> */}
            <hr />
            <img
                src={require('../../images/ReactNodes.svg')}
                alt="nodes svg" />
        </div>
    )
}

export default NewsNodes;