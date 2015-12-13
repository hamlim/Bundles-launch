$(document).ready(function (){
    //the document has loaded
    var d = document;
    d.getElementById('login-submit').onclick = function() {
        var emailelem = d.getElementById('login-email'),
            passwordelem = d.getElementById('login-password');
        var req = new XMLHttpRequest();
        req.open("GET", "https://api.airtable.com/v0/appqxUoD7s3dL1gtc/Users?limit=100&view=Main%20View", true);
        req.setRequestHeader("Authorization", "Bearer keyIye3zskPSBMQ6Q");
        req.onreadystatechange = function () {
            if (req.readyState != 4 || req.status != 200) return;
            // console.log("Success: " + req.responseText);
            //req.responseText
            var allusers = JSON.parse(req.responseText).records;
            var len = allusers.length;
            for(var i=0; i<len; i++) {
                if(allusers[i].fields.email == emailelem.value) {
                    //correct user email
                    if(allusers[i].fields.password == passwordelem.value) {
                        //correct email and password
                        //redirect to main App
                        localStorage.setItem("currentUser", JSON.stringify(allusers[i].fields));
                        window.location.href = "./app.html";
                    } else {
                        //password was incorrect
                        //want to add a class to the password field and the email field
                        passwordelem.className = passwordelem.className + " uk-form-danger";
                        emailelem.className = emailelem.className + " uk-form-success";
                    }
                }
            }
            //err no user email in db
            passwordelem.className = passwordelem.className + " uk-form-danger";
            emailelem.className = emailelem.className + " uk-form-danger";
        };
        req.send();
    }
});
