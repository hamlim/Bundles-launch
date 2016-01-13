var currentLinks = [],
  d = document,
  w = window;
$(d).ready( function() {
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
        var rendered = Mustache.render(template, user.fields);
        navbar.innerHTML = rendered;

        // --------------------------------------------------------------------
        // need a for loop to get each of the bunldes the user has GO
        var allUsersBundles = [];

        // --------------------------------------------------------------------
        // Handle the make form
        //number of content

        //ok so we want people to add content, when they click on the .can-click divs
        //a modal pops up that allows them to add content to their bundle
        $('.plus-button-container').on('click','div.can-click' , function () {
            //ok time to append a small form
            console.log(this);
            console.log(this.parentNode);
            console.log(this.parentNode.parentNode);
            var newBtn = d.createElement('div');
            newBtn.setAttribute('class', 'plus-button two columns can-click');
            var plusIcon = d.createElement('i');
            plusIcon.setAttribute('class', 'fa fa-plus plus-icon');
            newBtn.appendChild(plusIcon);
            var linkli = d.createElement('li');
            var linkanchor = d.createElement('a');
            var elem = this;
            //ok so `This` refers to the dom node
            UIkit.modal.prompt("Link (Youtube, Vimeo, Imgur, Giphy, Vine Only): ", '', function(value){
                //here we have access to value which will be a link
                var alreadycheck = true;
                for(var i=0; i<currentLinks.length; i++){
                    if (value === currentLinks[i]){
                        alreadycheck = false;
                        UIkit.modal.alert("You have already added that Link!");
                    }
                }
                if(value != '' && alreadycheck){
                    currentLinks.push(value);
                    elem.className = "plus-button two columns activated";
                    elem.innerHTML = "<i class='fa fa-check plus-icon'></i>";
                    elem.parentNode.appendChild(newBtn);
                    linkanchor.setAttribute('href', value);
                    linkanchor.setAttribute('class', 'link');
                    linkanchor.innerHTML = value;
                    linkli.appendChild(linkanchor);
                    var dellink = d.createElement('span');
                    dellink.setAttribute('class',  'delete-link');
                    dellink.setAttribute('data-bundle-link', value);
                    dellink.innerHTML = "  Click here to delete this link!";
                    linkli.appendChild(dellink);
                    d.getElementById('current-links').appendChild(linkli);
                }
            });
        });
        $('#current-links').on('click','span.delete-link' , function () {
            //ok so you clicked on the p tag, now we want to remove the li element (this.parentNode), the link within the array, and a checked off div above
            var parentElem = this.parentNode;
            var lenOfCurrentLinks = currentLinks.length;
            for (var k=0; k<lenOfCurrentLinks; k++){
                if(currentLinks[k] === this.getAttribute('data-bundle-link')){
                    //ok now we want to pop that from the array
                    currentLinks.splice(k,1);
                    //now we want to remove the li element (parentElem)
                    var parentOfParentElem = parentElem.parentNode;
                    parentOfParentElem.removeChild(parentElem);
                    //now we want to remove one of the activated divs above
                    d.getElementsByClassName('activated')[0].parentNode.removeChild(d.getElementsByClassName('activated')[0]);
                }
            }

        });
        console.log(currentLinks);


        //now we want to handle the big blue button
        //first we want to make sure that there is some content in the currentLinks array
        //then we want to check that there has been some text input in the Bundle Name input
        var makeBundleBtn = d.getElementById('make-bundle-btn');
        var makeBundleName = d.getElementById('bundle-name');
        var makeBundleDesc = d.getElementById('bundle-description');

        //ok so we want to check and see if there is something in the name input field on the button clicked
        $(makeBundleBtn).click(function() {
            //ok so check the input
            if(makeBundleName.value === ''){
                //error there is no name
                UIkit.modal.alert("Error: You need to add a name to your Bundle!");
                makeBundleName.setAttribute('class', 'uk-form-danger');
                makeBundleName.focus();
            } else if (makeBundleDesc.value === ''){
                UIkit.modal.alert("Error: You need to add a short description to your Bundle!");
                makeBundleDesc.setAttribute('class', 'uk-form-danger');
                makeBundleDesc.focus();
            } else {
                if(currentLinks.length < 2){
                    UIkit.modal.alert("We suggest you add more content to a Bundle.");
                } else {
                    //ok we passed all the checks
                    var bundleName = makeBundleName.value;
                    var bundleDesc = makeBundleDesc.value;
                    var bundleMaker = user.fields.first_Name +" "+ user.fields.last_Name;
                    var userID = user.id;
                    var useridArr = [];
                    useridArr.push(userID);
                    console.log(useridArr);
                    //currentLinks is all our links for the bundle
                    //user is the user object
                    // ok so we need to make a string that is comma seperated of all of the links
                    var cslinks = currentLinks.join(', ');
                    var updateobj = {};
                    updateobj.list_Name = bundleName;
                    updateobj.description = bundleDesc;
                    updateobj.links = cslinks;
                    updateobj.Owner =  bundleMaker;
                    updateobj.testUsers = useridArr;
                    var sendobj = {};
                    sendobj.fields = updateobj;
                    // ok we want to send this to the database
                    console.log(sendobj);
                    var data = JSON.stringify(sendobj);

                    var xhr = new XMLHttpRequest();
                    var returnObj = {};
                    xhr.addEventListener("readystatechange", function () {
                      if (this.readyState === 4) {
                        console.log(this.responseText);
                        returnObj = JSON.parse(this.responseText);
                        console.log(returnObj);
                        //now we want to add that to an array of current lists that the user owns
                        //we also need to clear the added elements
                        //and clear the current queue
                        //and push an alert stating that it worked

                        // <div class="uk-alert" data-uk-alert> For an alert
                        //     <a href="" class="uk-alert-close uk-close"></a>
                        //     <p>...</p>
                        // </div>
                        var returnbundle = returnObj.fields;
                        console.log(returnbundle);
                        var toAddBundle = {};
                        toAddBundle.name = returnbundle.list_Name;
                        toAddBundle.sharekey = returnbundle.listID;
                        toAddBundle.links = returnbundle.links.split(', ');
                        var getBundles = JSON.parse(localStorage.getItem('usersBundles'));
                        getBundles.push(toAddBundle);
                        localStorage.setItem('usersBundles', JSON.stringify(getBundles));
                        //now clear the queue
                        currentLinks = [];
                        //now remove all elements with class activated
                        $('.activated').remove();
                        // for(var v=0; v<d.getElementsByClassName('activated').length; v++){
                        //     d.getElementsByClassName('activated')[v].parentNode.removeChild(d.getElementsByClassName('activated')[v]);
                        // }
                        makeBundleName.value = '';
                        makeBundleDesc.value = '';
                        //now clear the ul of the queue
                        d.getElementById('current-links').innerHTML = "";
                        //now add the alert to the document
                        d.getElementById('alert-container').innerHTML = "<div class='uk-alert' data-uk-alert><a href='' class='uk-alert-close uk-close'></a><p>Added bundle to your Bundles!</p></div>";
                        //now to add it to the users bundles ul on the page
                        d.getElementById('load-Bundles-here').innerHTML = d.getElementById('load-Bundles-here').innerHTML + "<li class=''><a href='http://goexploring.today/app/bundle.html?sharekey="+returnbundle.listID+"'>"+returnbundle.list_Name+"</a></li>";
                      }
                    });

                    xhr.open("POST", "https://api.airtable.com/v0/appqxUoD7s3dL1gtc/testLists", true);
                    xhr.setRequestHeader("authorization", "Bearer keyIye3zskPSBMQ6Q");
                    xhr.setRequestHeader("content-type", "application/json");

                    xhr.send(data);
                    //done

                }
            }
        });

        //ok now we want to load in the user's Bundles
        var usersBundles = JSON.parse(localStorage.getItem('usersBundles'));
        var attachPointBundles = d.getElementById('load-Bundles-here');
        var usersBundlesTemplate = "<li class=''><a href='http://goexploring.today/app/bundle?sharekey={{sharekey}}'> {{name}}</a></li>";
        var currentadditionelems = "";
        for(var j=0; j<usersBundles.length; j++){
            var renderedbundles = Mustache.render(usersBundlesTemplate, usersBundles[j]);
            currentadditionelems += renderedbundles;
        }
        attachPointBundles.innerHTML = currentadditionelems;
    }


});

function logoutUser() {
    //user clicked on the logout button/link
    //we want to redirect to the index page, and also clear the localStorage
    //first remove the data
    // TODO insert check for remember me setting at login
    localStorage.removeItem("currentUser");
    user = "";
    w.location.href = "./index.html";
}
