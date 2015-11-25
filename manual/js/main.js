// Backup of old login system
var status = {
    loggedin: false
}; //this will be used to track the user on the client side
var userinfo = {};
var alldb, alert = {};
//handle login
document.addEventListener("DOMContentLoaded", function(event) {
  //dom loaded
  console.log("we are here!");
  document.getElementById('login-btn').onclick = function(){
      console.log("Login click!");
      //user clicked the login button
      //need to check all the input fields to make sure they are valid
      var loginEmail = document.getElementById('login-email'), loginAnimal = document.getElementById('login-animal'), loginLove = document.getElementById('login-love'),
        loginNumber = document.getElementById('login-number'), loginRemember = document.getElementById('login-remember');
      // Now we want to make sure they all have non-null values
      if (loginEmail.value != "" && loginAnimal.value != "" && loginLove.value != "" && loginNumber.value != "") {
          //Now we need to sanitize things
          var password = loginAnimal.value + loginLove.value + loginNumber.value;
          console.log("login succeded");
          var lEmail = loginEmail.value;
          //now we want to make a call to the db and see if the email and the password matches
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
                console.log("inside xhttp");
                console.log(JSON.parse(xhttp.responseText));
                alldb = JSON.parse(xhttp.responseText);
                //now we want to sort through the returned data and find out if the user is in the db
                var rows = alldb.result;
                console.log("hello? Is it me youre looking for?");
                for (var it = 0; it<rows.length; it++) {
                    if (rows[it].email == lEmail) {
                        console.log("hello? Adele");
                        if (rows[it].password == password ) {
                            //correct user login
                            //redirect to main app page app.html
                            // first we want to add the user information to local storage
                            var user = rows[it];
                            localStorage.setItem("user-data", JSON.stringify(user));
                            //now we want to push to /app.html
                            document.location.href = './app.html';
                        } else {
                            //the password was incorrect
                            alert.password = false;
                            break;
                        }
                    } else {
                        // there is no email in the db/ could have been a typo
                        alert.email = false;
                        break;
                    }
                }
                if(!alert.password) {
                    //kindly post an alert that the password was wrong
                    //show the wrong password modal
                    $('#wrongpasswordmodal').modal('toggle');
                }
                if(!alert.email) {
                    //fire the wrong email modal
                    $('#wrongemailmodal').modal('toggle');
                }
            }
          }
          xhttp.open("GET", "https://sheetsu.com/apis/91b78bca", true);
          xhttp.send();

      } else {
          console.log("login failed");
          $('#login-failed').modal('toggle');

      }


  };
//handle signup
document.getElementById('signup-btn').onclick = function(){
  console.log("signup click!");
  //user clicked the login button
  //need to check all the input fields to make sure they are valid
  var signupEmail = document.getElementById('signup-email'), signupAnimal = document.getElementById('signup-animal'), signupLove = document.getElementById('signup-love'),
    signupNumber = document.getElementById('signup-number'), signupFirstName = document.getElementById('signup-first-name'), signupLastName = document.getElementById('signup-last-name');
  // Now we want to make sure they all have non-null values
  if (signupEmail.value != "" && signupAnimal.value != "" && signupLove.value != "" && signupNumber.value != "" && signupFirstName.value != "" && signupLastName.value != "") {
      //Now we need to sanitize things
      var fName = signupFirstName.value, lName = signupLastName.value;
      var password = signupAnimal.value + signupLove.value + signupNumber.value;
      var email = signupEmail.value;
      console.log("signup succeded");
      //we want to add that info to the db and login the person
      var userdata = {};
      userdata.email = "test";
      userdata.first_name = "fName";
      userdata.last_name = "lName";
      userdata.password = "password";
      userdata.num_of_lists = 0;
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "https://sheetsu.com/apis/1a02fee2", false);
      xhttp.send(userdata);
      https://sheetsu.com/apis/91b78bca


      https://sheetsu.com/apis/1a02fee2

  } else {
      console.log("signup failed");
      $('#signup-failed').modal('toggle');
  }
};





});
