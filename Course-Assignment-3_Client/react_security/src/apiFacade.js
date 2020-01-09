import MAINURL from "./settings";

//The two methods below, are the utility-methods introduced here (use them if you like):
//https://docs.google.com/document/d/1hF9P65v_AJKCjol_gFkm3oZ1eVTuOKc15V6pcb3iFa8/edit?usp=sharing

function makeOptions(method, addToken, body, loggedIn) {
  console.log('ApiFacade makeOptions');
  console.log('ApiFacade makeOptions method', method);
  console.log('ApiFacade makeOptions addToken', addToken);
  console.log('ApiFacade makeOptions body', body);

  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: 'application/json'
    }
  };
  if (addToken && loggedIn) {
    opts.headers['x-access-token'] = localStorage.getItem('jwtToken');
  }
  if (body) {
    opts.body = body;
  }
  console.log('opts', opts);
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
    console.log("MAINURL + url", MAINURL + url);
    const data = Promise.resolve(fetch(MAINURL + url))
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

  async function addEditItem(itemBody, loggedIn) {
    console.log("addEditItem itemBody", itemBody);
    console.log("addEditItem loggedIn", loggedIn);

    if (itemBody.id === 0) {
      console.log("POST");
      const options = makeOptions("POST", true, itemBody, loggedIn);
      console.log("addEditItem POST url", MAINURL);
      console.log("addEditItem options",options);
      const data = await fetch(MAINURL, options).then(handleHttpErrors);
      return data;
    } else {
      console.log("PUT");
      const options = makeOptions("PUT", true, itemBody, loggedIn);
      console.log("addEditItem PUT url", MAINURL + "/" + itemBody.body.id);
      console.log("addEditItem options",options);
      const data = await fetch(MAINURL + "/" + itemBody.id, options).then(handleHttpErrors);
      return data;
    }
  };

  async function deleteItem(id) {
    const options = makeOptions("DELETE");
    const data = await fetch(MAINURL + "/" + id, options).then(handleHttpErrors);
    return data;
  };

function putFunc() {
    console.log("put function");
    let options = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": 2,
            "firstName": "Hans",
            "lastName": "Pan",
            "phone": "545555555"
        })
    }

    fetch("http://localhost:8080/the-facade-and-the-matching-endpoints/api/person/2", options);
};

function deleteFunc() {
    console.log("delete function");
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch("http://localhost:8080/the-facade-and-the-matching-endpoints/api/person/3", options);
};


  return {
    getData,
    getDataAsync,
    addEditItem,
    deleteItem
  };
}

export default apiFacade();

