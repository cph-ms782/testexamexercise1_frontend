import React from "react";

function NewsApi() {
    console.log("NewsApi");
    return (
        <div>

            <h2>Endpoints</h2>
            <br />
            {/* <p><strong>All</strong> </p>
                <p>/api/info </p>
                <p>/api/info/all </p>
                <p>/api/login </p>
                <p>/api/info/fill </p>
            <br /> */}

            <p><strong>City</strong> </p>
            <p>/api/city - dummy data</p>
            <p>/api/city/cities - dummy data</p>
            <p>/api/air/airports</p>
            <p>/api/air/nearestairport/<b>team</b> --&gt; ie. for Wolverhampton: <b>team = Wolverhampton Wanderers FC </b></p>
            <p>/api/air/nearestteam/<b>airport-code</b> --&gt; ie. for London Gatwick: <b>airport = LGW </b></p>
            <p>/api/air/nearestmatch/<b>airport-code</b> --&gt; ie. 10 days forward for London Gatwick: <b>airport = LGW </b></p>
            <br />
            <p><strong>Match</strong> </p>
            <p>/api/match </p>
            <p>/api/match/<b>city</b> --&gt; ie. for Liverpool: <b>city = Liverpool </b> - dummy data</p>
            <p>/api/fb/teams </p>
            <p>/api/fb/allteammatchdates/<b>id</b> --&gt; ie. for Arsenal: <b>id = 57 </b></p>
            <p>/api/fb/allteammatchresults/<b>id</b> --&gt; ie. for Arsenal: <b>id = 57  </b></p>
            <p>/api/fb/teammembers/<b>id</b> --&gt; ie. for Arsenal: <b>id = 57  </b></p>
            <br />

            {/* <p><strong>User</strong> </p>
            <ul>
                <li>/api/info/user </li>
            </ul>
            <br />
            <p><strong>Admin</strong> </p>
            <ul>
                <p>/api/info/user </p>
                <p>/api/info/admin </p>
            </ul> */}
        </div>
    )
}

export default NewsApi;