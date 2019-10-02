$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var userNameInput = $("input#username-input");
  var fridgeNameInput =$("input#fridgeName-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      username: userNameInput.val().trim(),
      fridgename: fridgeNameInput.val().trim()
    };
    console.log(userData);
    if (!userData.email || !userData.password || !userData.username || !userData.fridgename) {
      //return;
      console.log("nothing returned");
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.username,userData.fridgename);
    emailInput.val("");
    passwordInput.val("");
    userNameInput.val("");
    fridgeNameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, username, fridgename) {
    console.log(email,password,username,fridgename);
    $.post("/api/signup", {
      email: email,
      password: password,
      username: username,
      fridgeName: fridgename
    })
      .then(function(data) {
        window.location.replace("/members");
        //res.render("members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err.responseJSON)
    $("#alert .msg").text(err.responseJSON.name);
    $("#alert").fadeIn(500);
  }
});
