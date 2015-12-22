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
            var username = firstnameelem.value + lastnameelem.value;
            var namef = firstnameelem.value,
                namel = lastnameelem.value,
                passv = passwordelem.value,
                emailv = emailelem.value;
            var obj = {};
            obj.first_Name = namef;
            obj.last_Name = namel;
            obj.password = passv;
            obj.email = emailv;
            obj.phone_Number = "(123) 456-7890";
            obj.lists = [];
            obj.username = username;
            var data = {};
            data.fields = obj;
            console.log(data);
            console.log(JSON.stringify(data));
            var xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                    localStorage.setItem("currentUser", JSON.stringify(JSON.parse(this.responseText)));
                    // we need to also add a demo bundle
                    var strin = "https://www.youtube.com/watch?v=_swivbEsD50, https://www.youtube.com/watch?v=g_U6yOM3pnw, https://www.youtube.com/watch?v=xzpndHtdl9A, https://www.youtube.com/watch?v=Z8shhcRx7Hk, https://www.youtube.com/watch?v=7T2oje4cYxw, https://www.youtube.com/watch?v=hrjs1UXC8rU, https://youtu.be/1ZLN9AzxVa8, https://youtu.be/myG0dFbfCHk";
                    var localDemoBundle = {}
                    localDemoBundle.name = "Demo Bundle";
                    localDemoBundle.sharekey = "demo";
                    localDemoBundle.links = strin.split(', ');
                    var localDemo = JSON.stringify(localDemoBundle);
                    localStorage.setItem('usersBundles', localDemo);
                    window.location.href = "./changed-app.html";
                }
            });

            xhr.open("POST", "https://api.airtable.com/v0/appqxUoD7s3dL1gtc/testUsers", true);
            xhr.setRequestHeader("authorization", "Bearer keyIye3zskPSBMQ6Q");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.send(JSON.stringify(data));
        } else {
            //passwords did not match
            verifypasselem.className = verifypasselem.className + " uk-form-danger";
            passwordelem.className = passwordelem.className + " uk-form-danger";
        }
    }
});
