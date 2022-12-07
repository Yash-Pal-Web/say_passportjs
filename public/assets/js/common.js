function myFunction() {
  var x = document.getElementById("yourPassword");
  var y = document.getElementById("showHideButton");
  if (x.type === "password") {
    x.type = "text";
    y.innerHTML = "Hide";
  } else {
    x.type = "password";
    y.innerHTML = "Show";
  }
}
const signup = async () => {
  console.log("you are here");

  let name = document.getElementById("yourName").value;
  let phoneNo = document.getElementById("yourPhone").value;
  let email = document.getElementById("yourEmail").value;
  let address = document.getElementById("yourAddress").value;

  let password = document.getElementById("yourPassword").value;

  const res = await fetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
       role: "driver",
      name,
      phoneNo,
      email,
      address,
      deviceType: 1,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  let data = await res.json();

  if (data.statusCode === 200) {
    window.location.href = "/admin";
  } else {
    if (data.message == "email must be a valid email") {
    }
    console.log(data.message);
  }
};

// Signin

const signin = async () => {
  console.log("you are here");

  let email = document.getElementById("yourEmail").value;
  let password = document.getElementById("yourPassword").value;

  const res = await fetch("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  let data = await res.json();

  if (data.statusCode === 200) {
    window.location.href = "/admin";
  } else {
    if (data.message == "email must be a valid email") {
    }
    console.log(data.message);
  }
};

// Add new User

