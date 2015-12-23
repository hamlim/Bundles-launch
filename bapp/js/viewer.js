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
    //sharekey should be the id of the Bundle to show
    //so we want to get the Bundle that matches that sharekey
    //first handle the demo case
    if (sharekey === "Demo"){
        // links are: "https://www.youtube.com/watch?v=_swivbEsD50, https://www.youtube.com/watch?v=g_U6yOM3pnw, https://www.youtube.com/watch?v=xzpndHtdl9A, https://www.youtube.com/watch?v=Z8shhcRx7Hk, https://www.youtube.com/watch?v=7T2oje4cYxw, https://www.youtube.com/watch?v=hrjs1UXC8rU, https://youtu.be/1ZLN9AzxVa8, https://youtu.be/myG0dFbfCHk";
        var links = "https://www.youtube.com/watch?v=_swivbEsD50, https://www.youtube.com/watch?v=g_U6yOM3pnw, https://www.youtube.com/watch?v=xzpndHtdl9A, https://www.youtube.com/watch?v=Z8shhcRx7Hk, https://www.youtube.com/watch?v=7T2oje4cYxw, https://www.youtube.com/watch?v=hrjs1UXC8rU, https://youtu.be/1ZLN9AzxVa8, https://youtu.be/myG0dFbfCHk";
        var arrOfLinks = links.split(', ');
        console.log(arrOfLinks);
        //now we have the array of links, and we want to render them and the title
        var renderBundle = {};
        renderBundle.name = "Demo Bundle";
        renderBundle.madeBy = "Bundles";
        renderBundle.content = arrOfLinks;

        // var lightbox = UIkit.lightbox.create([
        //     {'source': 'http://url/to/video.mp4', 'type':'video'},
        //     {'source': 'http://url/to/image.jpg', 'type':'image'}
        // ]);
        //
        // lightbox.show();
        var contentArr = [];
        for(var i=0; i<arrOfLinks.length; i++){
            var obj = {
                'source': arrOfLinks[i],
                'type': 'video'
            };
            contentArr.push(obj);
        }
        console.log(contentArr);

        var lightbox = UIkit.lightbox.create(contentArr);
        lightbox.show();
    }
});
