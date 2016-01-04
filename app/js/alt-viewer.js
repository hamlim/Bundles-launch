$(document).ready(function(){
    function getQueryVariable(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for(var i=0; i<vars.length; i++){
            var pair = vars[i].split("=");
            if(pair[0] === variable){return pair[1]}
        }
        return(false);
    };

    var sharekey = getQueryVariable("sharekey");
    var mustacheAttachPoint = document.getElementById('body-mustache');
    if(sharekey === "Demo"){
        //handle the demo links
        var linkstring = "https://www.youtube.com/watch?v=_swivbEsD50,https://www.youtube.com/watch?v=g_U6yOM3pnw,https://www.youtube.com/watch?v=xzpndHtdl9A,https://www.youtube.com/watch?v=Z8shhcRx7Hk,https://www.youtube.com/watch?v=7T2oje4cYxw,https://www.youtube.com/watch?v=hrjs1UXC8rU,https://youtube.com/watch?v=1ZLN9AzxVa8,https://youtube.com/watch?v=myG0dFbfCHk";
        //now we want to construct an API call to embedly
        var embedlyKey = "14b86ed4720044d99984f900da6a2bce";
        var embedlyBaseUrl = "http://api.embed.ly/1/oembed?key=14b86ed4720044d99984f900da6a2bce&urls=";
        var embedlySettings = {
            "async": true,
            "url": embedlyBaseUrl + linkstring,
            "method": "GET"
        };

        // we also want to get the templateSettings
        var templateSettings = {
            "async": true,
            "url": "./alt-bundle.mst",
            "method": "GET"
        }
        $.ajax(embedlySettings).done(function (response) {
            console.log(response);
            var dataObj = {};
            dataObj.name = "Demo Bundle";
            dataObj.description = "This is a demo bundle!";
            dataObj.ownerName = "Matt Hamlin";
            var links = [];
            for(var j=0; j<response.length; j++){
                links.push(response[j].html);
            }
            dataObj.things = links;
            dataObj.sharekey = "Demo";
            console.log(dataObj);
            $.ajax(templateSettings).done(function(resp) {
                var template = resp;

                var torender = Mustache.render(template, dataObj);
                console.log(torender);
                mustacheAttachPoint.innerHTML = torender;
            });

        });
    } else {
        var sharekey = parseInt(sharekey);
        var airtableSettings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.airtable.com/v0/appqxUoD7s3dL1gtc/testLists",
            "method": "GET",
            "headers": {
              "authorization": "Bearer keyIye3zskPSBMQ6Q",
              "content-type": "application/json"
            }
        };

        var templateSettings = {
            "async": true,
            "url": "./alt-bundle.mst",
            "method": "GET"
        };
        var dataObj = {};
        dataObj.sharekey = sharekey;

        $.ajax(airtableSettings).done(function(response){
            console.log(response);
            var lists = response.records;
            for(var n=0; n<lists.length; n++){
                if(sharekey === lists[n].fields.listID){
                    dataObj.name = lists[n].fields.list_Name;
                    dataObj.description = lists[n].fields.description;
                    dataObj.ownerName = lists[n].fields.Owner;
                    var links = lists[n].fields.links;
                    var arroflinks = links.split(', ');
                    var allLinks = arroflinks.join(',');
                    console.log(allLinks);
                    var embedlyKey = "14b86ed4720044d99984f900da6a2bce";
                    var embedlyBaseUrl = "http://api.embed.ly/1/oembed?key=14b86ed4720044d99984f900da6a2bce&urls=";
                    var embedlySettings = {
                        "async": true,
                        "url": embedlyBaseUrl + allLinks,
                        "method": "GET"
                    };
                    $.ajax(embedlySettings).done(function(resp) {
                        var things = [];
                        console.log(resp);
                        for(var j=0; j<resp.length; j++){
                            if(resp[j]["provider_name"] === "Imgur"){
                                console.log("blah?");
                                var htmlString = "<img class='content-image' height='"+resp[j].height+"' src='"+resp[j].url+"'/>";
                                things.push(htmlString);
                            } else {
                                things.push(resp[j].html);
                            }
                        }
                        dataObj.things = things;
                        $.ajax(templateSettings).done(function(temp) {
                            var template = temp;
                            console.log(dataObj);
                            var torender = Mustache.render(template, dataObj);
                            console.log(torender);
                            mustacheAttachPoint.innerHTML = torender;
                        });
                    })


                }
            }
        })


    }
})
