import React, { useState, useEffect } from "react";
import uuid from "uuid/v1";

function NewsFlightsRender({ airports, flightHomeCity, flightTime, flightDate, updateTicketURL, updateShowBuyImage, dummyAir }) {
    console.log("NewsFlightsRender");
    console.log("NewsFlightsRender flightHomeCity", flightHomeCity);
    console.log("NewsFlightsRender flightTime", flightTime);
    console.log("NewsFlightsRender flightDate", flightDate);
    console.log("NewsFlightsRender airports", airports);
    console.log("NewsFlightsRender dummyAir", dummyAir);
    const [numberOfTickets, SetNumberOfTickets] = useState(1);
    const [flights, setFlights] = useState(dummyAir);
    const [flightDestination, setFlightDestination] = useState("LHR");
    // const arrival = "2019-11-30T15:35:00";
    const latestFlightArrival = reverseDateOrder(flightDate) + "T" + removeHours(flightTime, 3) + ":00";
    console.log("NewsFlightsRender latestFlightArrival", latestFlightArrival);

    // Fetching live flight data is suspended and dummy data is used instead
    // useEffect(() => {
    //     console.log("NewsFlightsRender useEffect");
    //     console.log("flightDate", flightDate);
    //     console.log("flightDestination", flightDestination);
    //     console.log("numberOfTickets", numberOfTickets);
    //     let urlFlight = "https://www.leafmight.dk/security/api/info/flightdata2/" + reverseDateOrder(flightDate) + "/economy/" + flightDestination + "-sky/" + numberOfTickets;
    //     console.log("NewsFlights - useEffect - flights-urlFlight", urlFlight);
    //     fetch(urlFlight).then(handleHttpErrors).then(data => {
    //         console.log("NewsFlights - useEffect - flights-data", data);
    //         setFlights(data); //.sort((a, b) => a.name.localeCompare(b.name)));
    //     }).catch(console.log.bind(console));

    // }, [], flightDate, flightDestination, numberOfTickets);
    useEffect(() => {
        console.log("NewsFlightsRender useEffect");
        console.log("NewsFlightsRender useEffect flightTime", flightTime);
        console.log("NewsFlightsRender useEffect flightDate", flightDate);
        console.log("NewsFlightsRender useEffect flightHomeCity", flightHomeCity);
        updateShowBuyImage(false);
        updateTicketURL("");
    }, flightTime, flightDate, flightHomeCity);

    const updateURL = (evt) => {
        console.log("NewsFlightsRender updateURL");
        const ticketURL = evt.target.parentElement.lastChild.firstChild; // id should contains tickets URL - the deeplink
        console.log("NewsFlightsRender ticketURL", ticketURL);
        updateShowBuyImage(true);
        updateTicketURL(ticketURL);
    };

    const formatPrice = price => {
        let newPrice = "" + price;
        if (newPrice.indexOf(".") == -1) {
            newPrice = "" + newPrice + ".00";
        }
        return newPrice;
    }

    const formatDate = fullDate => {
        //2019-11-30T10:25:00
        let newFullDate = fullDate.split("T");
        const date = newFullDate[0].split("-");
        const time = newFullDate[1].split(":");
        return date[2] + "/" + date[1] + "/" + date[0] + " - kl." + time[0] + ":" + time[1];
    }

    const formatDestination = dest => {
        //LHR-sky
        let newDest = dest.split("-sky");
        return newDest[0];
    }

    if (flights.length == 0) {
        return (
            <div>
                <p>Server pending</p>
            </div>
        )
    } else {
        console.log("flightsBeforeTime latestFlightArrival", latestFlightArrival);
        const flightsBeforeTime = flights.filter((flight) => {
            console.log("flightsBeforeTime flight.arrival", flight.arrival);
            return flight.arrival < latestFlightArrival
        })
        console.log("flightsBeforeTime", flightsBeforeTime);
        console.log("flights.code", flights.code);
        return (
            <div onClick={updateURL} className="centring">
                <h2>Flights</h2>
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>Dato</th>
                            <th>Lufthavn</th>
                            <th>Rejse Agent</th>
                            <th>Pris</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flightsBeforeTime.slice(-17).map((flight) => (
                            <tr key={uuid()}>
                                <td>{formatDate(flight.arrival)}</td>
                                <td>{formatDestination(flight.endDestination)}</td>
                                <td>{flight.agentsName}</td>
                                <td>kr. {formatPrice(flight.price)}</td>
                                <td style={{ 'display': 'none' }}>{flight.deeplinkUrl}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
}

const reverseDateOrder = (dateString) => {
    const tempdate = dateString.split("/");
    console.log("tempdate", tempdate);
    const newDate = tempdate[2] + "-" + tempdate[1] + "-" + tempdate[0];
    console.log("newDate", newDate)
    return newDate;
};

const removeHours = (timeString, hours) => {
    const tempTime = timeString.split(":");
    console.log("tempTime", tempTime);
    const newHours = Number(tempTime[0]) - hours;
    console.log("newHours", newHours);
    const newTime = newHours + ":" + tempTime[1];
    console.log("newTime", newTime)
    return newTime;
};

export default NewsFlightsRender;