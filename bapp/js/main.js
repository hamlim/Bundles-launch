// // Router

//router doesn't work yet

//App code

//handle login and signup forms
// login -> login.js  Signup -> signup.js
var d = document, w = window;
//this file is for whole app code
$(d).ready(function() {

    // ------------------------------------------------------------------------
    //first we want to verify that the user is logged in
    if(localStorage.length = 0){
        //they are not logged in or the localStorage was cleared
        w.location.href = "./index.html";
    } else {
        var user = JSON.parse(localStorage.getItem("currentUser"));
        // the user is logged in
        // --------------------------------------------------------------------
        // render the top navbar properly
        var navbar = d.getElementById('navbar-mustache');
        var template = "<i class='fa fa-bars'></i> {{ username }} ";
        var rendered = Mustache.render(template, user);
        navbar.innerHTML = rendered;

        // --------------------------------------------------------------------
        // need a for loop to get each of the bunldes the user has
        var allUsersBundles = [];

    }
});

function logoutUser() {
    //user clicked on the logout button/link
    //we want to redirect to the index page, and also clear the localStorage
    //first remove the data
    localStorage.removeItem("currentUser");
    user = "";
    w.location.href = "./index.html";
}
