import URL from "./settings";

//The two methods below, are the utility-methods introduced here (use them if you like):
//https://docs.google.com/document/d/1hF9P65v_AJKCjol_gFkm3oZ1eVTuOKc15V6pcb3iFa8/edit?usp=sharing

function makeOptions(method, body) {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json"
    }
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

// function makeOptionsCORS(method) {
//   var opts = {
//     method: method,
//     headers: {
//       "Access-Control-Request-Method": URL,
//       "Access-Control-Request-Headers": "Content-Length,API-Key"
//     }
//   };
//   return opts;
// }

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {

  //OBSERVE This returns a promise, NOT the actual data, you must handle asynchronicity by the client
  // async function getData() {
  //   const options = makeOptionsCORS("OPTIONS");
  //   const data = await fetch(URL, options).then(handleHttpErrors);
  //   return data;
  // }
  function getData(url) {
    console.log("apiFacade - getData");
    const data = Promise.resolve(fetch(url))
      .then(handleHttpErrors)
      .then(data => {
        console.log("apifacade - getData data", data);
        return data;
      })
      .catch(console.log.bind(console));
    return data;
  }

  async function getDataAsync(url) {
    console.log("apiFacade - getDataAsync");
    const data = await fetch(url)
      .then(handleHttpErrors)
      .then(data => {
        console.log("apiFacade - getDataAsync - data", data);
        return data;
      })
      .catch(console.log.bind(console));
    console.log("apiFacade - getDataAsync - data", data);
    return data;
  }

  // function getData(url) {
  //   console.log("apiFacade - getData");
  //   const data = fetch(url)
  //     .then(res => res.json())
  //     .then(dat => {
  //       console.log("apiFacade - getData - dat", dat);
  //       return dat;
  //     });
  //   console.log("apiFacade - getData - data", data);
  //   return data;
  // }

  // async function getDataAsync(url) {
  //   console.log("apiFacade - getData");
  //   const data = await fetch(url).then(handleHttpErrors);
  //   console.log("apiFacade - getDataAsync - data", data);
  //   return data;
  // }

  async function addEditPerson(person) {
    if (person.id === undefined) {
      const options = makeOptions("POST", person);
      const data = await fetch(URL, options).then(handleHttpErrors);
      return data;
    } else {
      const options = makeOptions("PUT", person);
      const data = await fetch(URL + "/" + person.id, options).then(handleHttpErrors);
      return data;
    }
  }

  async function deletePerson(id) {
    const options = makeOptions("DELETE");
    const data = await fetch(URL + "/" + id, options).then(handleHttpErrors);
    return data;
  }

  return {
    getData,
    getDataAsync,
    addEditPerson,
    deletePerson
  };
}

export default apiFacade();

