$(document).ready(function (){
    //the document has loaded
    var d = document;
    d.getElementById('signup-submit').onclick = function() {
        var emailelem = d.getElementById('signup-email'),
            passwordelem = d.getElementById('signup-password'),
            firstnameelem = d.getElementById('signup-first-name'),
            lastnameelem = d.getElementById('signup-last-name'),
            verifypasselem = d.getElementById('signup-password-verify');
        if(passwordelem.value == verifypasselem.value){
            var req = new XMLHttpRequest();
            req.open("POST", "https://api.airtable.com/v0/appqxUoD7s3dL1gtc/Users", true);
            req.setRequestHeader("Authorization", "Bearer keyIye3zskPSBMQ6Q");
            req.setRequestHeader("Content-Type", "applciation/json");
            var postresp;
            req.onreadystatechange = function () {
                if (req.readyState != 4 || req.status != 200) return;
                // console.log("Success: " + req.responseText);
                postresp = JSON.parse(req.responseText);
            };
            var obj = {};
            obj.email = emailelem.value;
            obj.password = passwordelem.value;
            obj.first_Name = firstnameelem.value;
            obj.last_Name = lastnameelem.value;
            obj.phone_Number = "(123) 555-1234";
            obj.username = obj.first_Name + obj.last_Name;
            obj.lists = [];
            var data = {};
            data.fields = obj;
            // console.log(data);
            req.send(data);
            localStorage.setItem("currentUser", JSON.stringify(postresp));
            window.location.href = "./app.html";
        } else {
            //passwords did not match
            verifypasselem.className = verifypasselem.className + " uk-form-danger";
            passwordelem.className = passwordelem.className + " uk-form-danger";
        }
    }
});
