//+++++++++++++++++++++++++++++++++++Login HTML+++++++++++++++++++++++++++++++++++++++++++++++++++++++

//* Tooltip
function createTooltip() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  return [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}

function setTooltipAttributes(elementId, text, type) {
  $(`#${elementId}`)
    .removeAttr(
      "data-bs-toggle data-bs-placement data-bs-custom-class data-bs-title aria-describedby"
    )
    .removeClass("is-danger");

  $(`#${elementId}`).attr({
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "top",
    "data-bs-custom-class": `${type}`,
    "data-bs-title": `${text}`,
  });
  createTooltip();
}

// end tooltip

//* Switch Panel
function panel_right_in() {
  $("#container").removeClass("right-panel-active");
  $("#help-id-login").removeClass("is-danger").empty();
  $("#help-password-login").removeClass("is-danger").empty();
}

function panel_right_out() {
  $("#container").addClass("right-panel-active");
  $("#help-id-login").removeClass("is-danger").empty();
  $("#help-password-login").removeClass("is-danger").empty();
}
// End Switch Panel

//* Sign in sign up
function sign_in() {
  let username = $("#input-username").val();
  let password = $("#input-password").val();

  if (username === "" || password === "") {
    if (username === "") {
      setTooltipAttributes(
        "input-username",
        "Please enter your username",
        "danger-tooltip"
      );
      $("#input-username").addClass("is-danger");
    } else {
      setTooltipAttributes(
        "input-username",
        "nicee",
        "success-tooltip"
      );
      $("#input-username").removeClass("is-danger");
    }

    if (password === "") {
      setTooltipAttributes(
        "input-password",
        "Please input correct your password.",
        "danger-tooltip"
      );
      $("#input-password").addClass("is-danger");
      $("#help-password-login")
        .addClass("is-danger");
    } else {
      setTooltipAttributes(
        "input-password",
        "nicee",
        "success-tooltip"
      );
      $("#input-password").removeClass("is-danger");
    }

    $(`#input-${username === "" ? "username" : "password"}`).focus();
    return;
  }

  $.ajax({
    type: "POST",
    url: "/sign_in",
    data: {
      username_give: username,
      password_give: password,
    },
    success: function (response) {
      if (response["result"] === "success") {
        $.cookie("mytoken", response["token"], { path: "/" });
        window.location.replace("/");
      } else {
        alert(response["msg"]);
      }
    },
  });
}

function sign_up() {
  const username = $("#input-username-signup").val();
  const password = $("#input-password-signup").val();
  const password2 = $("#input-password2-signup").val();

  if (!validateUsername(username)) {
    return;
  }

  if (!validatePassword(password)) {
    return;
  }

  if (password2 === "") {
    setTooltipAttributes(
      "input-password2-signup",
      "Please enter your password",
      "danger-tooltip"
    );
    $("#input-password-signup").removeClass("is-safe")
    .addClass("is-danger")
    .focus();;
    return;
  }else if (password2 !== password) {
    setTooltipAttributes(
      "input-password2-signup",
      "Your passwords do not match",
      "danger-tooltip"
    );
    $("#input-password-signup").removeClass("is-safe")
    .addClass("is-danger")
    .focus();
    return;
  }

  setTooltipAttributes(
    "input-password2-signup",
    "Your passwords match!!!",
    "success-tooltip"
  );

  console.log(username, "+", password);
  $.ajax({
    type: "POST",
    url: "/sign_up/save",
    data: {
      username_give: username,
      password_give: password,
    },
    success: function (response) {
      alert("Your are signed up! Nice!");
      window.location.replace("/login");
    },
  });
}

// Check Username
function checkUsernameAvailability(user) {
  let username = user;
  if (username === "") {
    setTooltipAttributes(
      "input-username-signup",
      "Your username is empty",
      "danger-tooltip"
    );

    $("#input-username-signup")
      .removeClass("is-safe")
      .addClass("is-danger")
      .focus();
    return;
  }
  if (!is_nickname(username)) {
    setTooltipAttributes(
      "input-username-signup",
      "Please check your username. For your username, please enter 2-10 English characters, numbers, or the following special characters (._-)",
      "danger-tooltip"
    );
    $("#input-username-signup")
      .removeClass("is-safe")
      .addClass("is-danger")
      .focus();

    return;
  }

  $.ajax({
    type: "POST",
    url: "/sign_up/check_dup",
    data: {
      username_give: username,
    },
    success: function (response) {
      if (response["exists"]) {
        setTooltipAttributes(
          "input-username-signup",
          "Your username has use",
          "danger-tooltip"
        );

        $("#input-username-signup")
          .removeClass("is-safe")
          .addClass("is-danger")
          .focus();
      } else {
        setTooltipAttributes(
          "input-username-signup",
          "Succes yeaa!",
          "success-tooltip"
        );
        $("#input-username-signup").removeClass("is-danger");
      }
    },
  });
  return true;
}

// Validate Username
function validateUsername(username) {
  if (username === "") {
    setTooltipAttributes(
      "input-username-signup",
      "Your username is empty",
      "danger-tooltip"
    );
    $("#input-username-signup")
      .removeClass("is-safe")
      .addClass("is-danger")
      .focus();
    return false;
  }

  if (!is_nickname(username)) {
    setTooltipAttributes(
      "input-username-signup",
      "Please check your username",
      "danger-tooltip"
    );
    $("#input-username-signup")
      .removeClass("is-safe")
      .addClass("is-danger")
      .focus();
    return false;
  }

  checkUsernameAvailability(username);

  return true;
}

// Validate Password
function validatePassword(password) {
  if (password === "") {
    setTooltipAttributes("input-password-signup", "Your password is empty", "danger-tooltip");
    $("#input-password-signup").removeClass("is-safe").addClass("is-danger").focus();
    return false;
  }

  if (!is_password(password)) {
    setTooltipAttributes("input-password-signup", "Please check your password", "danger-tooltip");
    $("#input-password-signup").removeClass("is-safe").addClass("is-danger").focus();
    return false;
  }

  setTooltipAttributes("input-password-signup", "This password can be used!", "success-tooltip");

  return true;
}

//* end Sign in sign up

function is_nickname(asValue) {
  let regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{8,20}$/;
  return regExp.test(asValue);
}

function is_password(asValue) {
  let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
  return regExp.test(asValue);
}

function clearInputs() {
  $("#input-username").val("");
  $("#input-password").val("");
  $("#input-password-signup").val("");
}
