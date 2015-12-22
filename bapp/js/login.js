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
            //req.responseText
            var allusers = JSON.parse(req.responseText).records;
            var len = allusers.length;
            for(var i=0; i<len; i++) {
                if(allusers[i].fields.email == emailelem.value) {
                    //correct user email
                    if(allusers[i].fields.password == passwordelem.value) {
                        //correct email and password
                        //redirect to main App
                        var usertempid = allusers[i].id;
                        localStorage.setItem("currentUser", JSON.stringify(allusers[i])); //make sure to expose the ID here above fields
                        //now we also want to get all the lists that the user owns
                        var xhr = new XMLHttpRequest();
                        // xhr.withCredentials = true;
                        xhr.open("GET", "https://api.airtable.com/v0/appqxUoD7s3dL1gtc/Lists");
                        xhr.setRequestHeader("authorization", "Bearer keyIye3zskPSBMQ6Q");
                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === 4) {
                                var allLists = JSON.parse(this.responseText);
                                // console.log(allLists);
                                var usersBundles = [];
                                var records = allLists.records;
                                for (var k=0; k<records.length; k++){
                                    //now we have access to see if things match
                                    var testarray = [];
                                    testarray.push(usertempid);
                                    if(records[k].fields.Users[0] === testarray[0]) {
                                        //now we want to push this with the name to the userBundles array
                                        var bundle = {};
                                        bundle.name = records[k].fields.list_Name;
                                        bundle.links = records[k].fields.links.split(', ');
                                        bundle.sharekey = records[k].fields.listID;
                                        usersBundles.push(bundle);
                                    }
                                }
                                // console.log(usersBundles);
                                localStorage.setItem('usersBundles', JSON.stringify(usersBundles));
                                window.location.href = "./changed-app.html";
                            }
                        });
                        xhr.send();

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
