function showOutput(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

let reqHeaders = {
  "Content-Type": "application/json",
  Authorization: String,
};

let data = {
  user: String,
  password: String,
  token: String,
};

// Store local storage
function storeLocalStorage(token) {
  return new Promise((resolve, reject) => {
    if (token) {
      if (!localStorage.getItem("authToken")) {
        localStorage.setItem("authToken", token);
      } else {
        console.log("Token has been stored");
      }
    } else {
      console.log("Invalid Token");
    }
    resolve("Done1");
  });
}

function getStoredAuthToken() {
  return new Promise((resolve, reject) => {
    resolve(localStorage.getItem("authToken"));
  });
}

function getToken(data) {
  return new Promise((resolve, reject) =>
    resolve(
      axios.post("http://localhost:3000/api/login", {
        user: data.user,
        pass: data.password,
        completed: false,
      })
    )
  );
}

function sendAuthToken() {
  return new Promise((resolve, reject) =>
    resolve(
      axios.get("http://localhost:3000/api/login/token", {
        headers: reqHeaders,
      })
    )
  );
}

function getRoot() {
  axios
    .get("http://localhost:3000", {
      timeout: 5000,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

async function submitEventHandler(e) {
  // Now you can use formData.get('foo'), for example.
  // Don't forget e.preventDefault() if you want to stop normal form.
  e.preventDefault();
  const formData = new FormData(e.target);
  data.user = formData.get("user");
  data.password = formData.get("pass");
  const result = await getToken(data);
  console.log(result.data);
  const dataStored = await storeLocalStorage(result.data);
  console.log(dataStored);
  const getAuthToken = await getStoredAuthToken();
  console.log(getAuthToken);
  reqHeaders.Authorization = `Bearer ${getAuthToken}`;
  const res = await sendAuthToken();
  console.log(reqHeaders);
  showOutput(res);
}

document
  .getElementById("myForm")
  .addEventListener("submit", async (e) => submitEventHandler(e));
