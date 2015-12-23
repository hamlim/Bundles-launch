//sharekey should be the id of the Bundle to show
//so we want to get the Bundle that matches that sharekey
//first handle the demo case
if (sharekey === "Demo"){
    // links are: "https://www.youtube.com/watch?v=_swivbEsD50, https://www.youtube.com/watch?v=g_U6yOM3pnw, https://www.youtube.com/watch?v=xzpndHtdl9A, https://www.youtube.com/watch?v=Z8shhcRx7Hk, https://www.youtube.com/watch?v=7T2oje4cYxw, https://www.youtube.com/watch?v=hrjs1UXC8rU, https://youtu.be/1ZLN9AzxVa8, https://youtu.be/myG0dFbfCHk";
    var links = "https://www.youtube.com/watch?v=_swivbEsD50, https://www.youtube.com/watch?v=g_U6yOM3pnw, https://www.youtube.com/watch?v=xzpndHtdl9A, https://www.youtube.com/watch?v=Z8shhcRx7Hk, https://www.youtube.com/watch?v=7T2oje4cYxw, https://www.youtube.com/watch?v=hrjs1UXC8rU, https://youtu.be/1ZLN9AzxVa8, https://youtu.be/myG0dFbfCHk";
    var arrOfLinks = links.split(', ');
    //now we have the array of links, and we want to render them and the title
    var renderBundle = {};
    renderBundle.name = "Demo Bundle";
    renderBundle.madeBy = "Bundles";
    renderBundle.content = arrOfLinks;

    //ok so lets pull in the template of the Bundle.html viewer
    
}
