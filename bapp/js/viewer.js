$(document).ready(function(){
    function getQueryVariable(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    };

    var sharekey = getQueryVariable("sharekey");
    var mustacheAttachPoint = document.getElementById('body-mustache');
    //sharekey should be the id of the Bundle to show
    //so we want to get the Bundle that matches that sharekey
    //first handle the demo case
    if (sharekey === "Demo"){
        // links are: "https://www.youtube.com/watch?v=_swivbEsD50, https://www.youtube.com/watch?v=g_U6yOM3pnw, https://www.youtube.com/watch?v=xzpndHtdl9A, https://www.youtube.com/watch?v=Z8shhcRx7Hk, https://www.youtube.com/watch?v=7T2oje4cYxw, https://www.youtube.com/watch?v=hrjs1UXC8rU, https://youtu.be/1ZLN9AzxVa8, https://youtu.be/myG0dFbfCHk";
        var linkstring = "https://www.youtube.com/watch?v=_swivbEsD50, https://www.youtube.com/watch?v=g_U6yOM3pnw, https://www.youtube.com/watch?v=xzpndHtdl9A, https://www.youtube.com/watch?v=Z8shhcRx7Hk, https://www.youtube.com/watch?v=7T2oje4cYxw, https://www.youtube.com/watch?v=hrjs1UXC8rU, https://youtube.com/watch?v=1ZLN9AzxVa8, https://youtube.com/watch?v=myG0dFbfCHk";
        var arrOfLinks = linkstring.split(', ');
        console.log(arrOfLinks);

        var getTemp = new XMLHttpRequest();
        getTemp.open('GET', './bundle.mst', true);
        getTemp.send();

        var bundles = {};
        var firstName = "Matt"; //final version needs to get the person who owns the list and get their name
        var lastName = "Hamlin";
        bundles.name = "Demo Bundle";
        bundles.description = "This is a demo bundle!";
        bundles.firstName = firstName;
        bundles.lastName = lastName;
        var links = [];
        for(var i=0; i<arrOfLinks.length; i++){
            var obj = {};
            var interest = arrOfLinks[i];
            if(interest.search('youtube') != -1){
                //youtube
                //now we need to get the link, which will be the code following "v="
                var index = interest.search('v=');
                index = index + 2;
                obj.url = interest.slice(index);
                obj.isYoutube = true;
                obj.isVimeo = false;
                obj.isVine = false;
                obj.isStatic = false;
                obj.isImage = false;
                obj.isVideo = false;
                obj.isGiphy = false;
                links.push(obj);
            } else if(interest.search('giphy') != -1){
                //giphy
                //not sure how to do this yet
                // var index = interest.search('v=');
                // index = index + 2;
                // obj.url = interest.slice(index);
                obj.url = interest;
                obj.isYoutube = false;
                obj.isVimeo = false;
                obj.isVine = false;
                obj.isStatic = false;
                obj.isImage = false;
                obj.isVideo = false;
                obj.isGiphy = false;
                links.push(obj);
            } else if (interest.search('vine') != -1){
                //Vine
                var index = interest.search("v/");
                index = index + 2;
                obj.url = interest.slice(index);
                obj.isYoutube = false;
                obj.isVimeo = false;
                obj.isVine = true;
                obj.isStatic = false;
                obj.isImage = false;
                obj.isVideo = false;
                obj.isGiphy = false;
                links.push(obj);
            } else if(interest.search('vimeo') != -1){
                //vimeo
                var index = interest.search('.com/');
                index = index + 5;
                obj.url = interest.slice(index);
                obj.isYoutube = false;
                obj.isVimeo = true;
                obj.isVine = false;
                obj.isStatic = false;
                obj.isImage = false;
                obj.isVideo = false;
                obj.isGiphy = false;
                links.push(obj);
            } else {
                //image/video direct link (static)
                //ok we need to get the last 3 chars of the URL
                var filetype = interest.slice(-3);
                if(filetype === "mp4"){
                    obj.isVideo = true;
                    obj.url = interest;
                    obj.isImage = false;
                    obj.isYoutube = false;
                    obj.isVimeo = false;
                    obj.isVine = false;
                    obj.isStatic = true;
                    obj.isGiphy = false;
                    links.push(obj);
                } else {
                    //assume its an image
                    obj.isImage = true;
                    obj.isVideo = false;
                    obj.url = interest;
                    obj.isYoutube = false;
                    obj.isVimeo = false;
                    obj.isVine = false;
                    obj.isStatic = true;
                    obj.isGiphy = false;
                    links.push(obj);
                }
            }
        }

        //now we should have an array of objects
        console.log(links);
        bundles.links = links;
        console.log(bundles);
        console.log(getTemp);
        getTemp.onreadystatechange = function () {
            var template = this.responseText;
            var rendered = Mustache.render(template, bundles);
            mustacheAttachPoint.innerHTML = rendered;
        };



    } else {
        var sharekey = parseInt(sharekey);
        //we need to retrieve all bundles and find the one with the same id as sharekey
        //get all bundles first
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://api.airtable.com/v0/appqxUoD7s3dL1gtc/testLists",
          "method": "GET",
          "headers": {
            "authorization": "Bearer keyIye3zskPSBMQ6Q",
            "content-type": "application/json"
          }
        }

        var getTemp = new XMLHttpRequest();
        getTemp.open('GET', './bundle.mst', true);
        getTemp.send();

        var bundles = {};

        $.ajax(settings).done(function (response) {
            // console.log(response);
            var lists = response.records;
            for(var n=0; n<lists.length; n++){
                // console.log(typeof(lists[n].fields.listID));
                // console.log(typeof(sharekey));
                if(sharekey === lists[n].fields.listID){
                    // console.log("hwllo?");
                    bundles.name = lists[n].fields.list_Name;
                    bundles.description = lists[n].fields.description;
                    bundles.ownerName = lists[n].fields.Owner;
                    //this is the right bundle
                    var links = lists[n].fields.links;
                    var linkArr = links.split(', ');
                    console.log(linkArr);
                    var list = [];
                    for(var i=0; i<linkArr.length; i++){
                        var obj = {};
                        var interest = linkArr[i];
                        if(interest.search('youtube') != -1){
                            //youtube
                            //now we need to get the link, which will be the code following "v="
                            var index = interest.search('v=');
                            index = index + 2;
                            obj.url = interest.slice(index);
                            obj.isYoutube = true;
                            obj.isVimeo = false;
                            obj.isVine = false;
                            obj.isStatic = false;
                            obj.isImage = false;
                            obj.isVideo = false;
                            obj.isGiphy = false;
                            list.push(obj);
                        } else if(interest.search('giphy') != -1){
                            //giphy
                            //not sure how to do this yet
                            // var index = interest.search('v=');
                            // index = index + 2;
                            // obj.url = interest.slice(index);
                            obj.url = interest;
                            obj.isYoutube = false;
                            obj.isVimeo = false;
                            obj.isVine = false;
                            obj.isStatic = false;
                            obj.isImage = false;
                            obj.isVideo = false;
                            obj.isGiphy = false;
                            list.push(obj);
                        } else if (interest.search('vine') != -1){
                            //Vine
                            var index = interest.search("v/");
                            index = index + 2;
                            obj.url = interest.slice(index);
                            obj.isYoutube = false;
                            obj.isVimeo = false;
                            obj.isVine = true;
                            obj.isStatic = false;
                            obj.isImage = false;
                            obj.isVideo = false;
                            obj.isGiphy = false;
                            list.push(obj);
                        } else if(interest.search('vimeo') != -1){
                            // console.log("hello?");
                            //vimeo
                            var index = interest.search('.com/');
                            index = index + 5;
                            obj.url = interest.slice(index);
                            obj.isYoutube = false;
                            obj.isVimeo = true;
                            obj.isVine = false;
                            obj.isStatic = false;
                            obj.isImage = false;
                            obj.isVideo = false;
                            obj.isGiphy = false;
                            list.push(obj);
                        } else {
                            //image/video direct link (static)
                            //ok we need to get the last 3 chars of the URL
                            var filetype = interest.slice(-3);
                            if(filetype === "mp4"){
                                obj.isVideo = true;
                                obj.url = interest;
                                obj.isImage = false;
                                obj.isYoutube = false;
                                obj.isVimeo = false;
                                obj.isVine = false;
                                obj.isStatic = true;
                                obj.isGiphy = false;
                                list.push(obj);
                            } else {
                                //assume its an image
                                obj.isImage = true;
                                obj.isVideo = false;
                                obj.url = interest;
                                obj.isYoutube = false;
                                obj.isVimeo = false;
                                obj.isVine = false;
                                obj.isStatic = true;
                                obj.isGiphy = false;
                                list.push(obj);
                            }
                        }
                    }
                    console.log(list);
                    bundles.links = list;
                    //ok now we render
                    console.log(bundles);
                    console.log(getTemp);
                    getTemp.onreadystatechange = function () {
                        console.log("huh?");
                        var template = this.responseText;
                        var rendered = Mustache.render(template, bundles);
                        mustacheAttachPoint.innerHTML = rendered;
                    };

                    var templateSettings = {
                      "async": true,
                    //   "crossDomain": true,
                      "url": "./bundle.mst",
                      "method": "GET"
                    }

                    $.ajax(templateSettings).done(function (response) {
                        console.log(response);
                        var template = response;
                        var rendered = Mustache.render(template, bundles);
                        mustacheAttachPoint.innerHTML = rendered;
                    });
                }
            }
        });

    }


});
