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
        // need a for loop to get each of the bunldes the user has GO
        var allUsersBundles = [];

        // --------------------------------------------------------------------
        // Handle the make form
        //number of content


        var numOfLinks = d.getElementById('num-of-links');
        var linkSubmitBtn = d.getElementById('num-of-links-btn');
        linkSubmitBtn.onclick = function() {
            var numberOfLinks = numOfLinks.value;
            //now we need to render content based on the number of links
            var attachPoint = d.getElementById('attach-form-content');
            var selectLabels = d.createElement('label');
            selectLabels.setAttribute('class', 'uk-form-label');
            selectLabels.innerHTML = "Click the button only after verifying each select is correct!";
            attachPoint.appendChild(selectLabels);
            for (var i=0; i<numberOfLinks; i++){
                //div
                var div = d.createElement('div');
                var makeId = "content-" + i;
                div.setAttribute('id', makeId);
                div.className = "uk-form-row";
                //end-div
                //select
                //we want to add a select of the content Type
                var select = d.createElement('select');
                //options
                var optYouVid = d.createElement('option');
                var optVimVid = d.createElement('option');
                var optVine = d.createElement('option');
                var optGiphy = d.createElement('option');
                var optImg = d.createElement('option');
                optYouVid.value = "youtube-video";
                optYouVid.text = "Youtube Video";
                optVimVid.value = "vimeo-video";
                optVimVid.text = "Vimeo Video";
                optVine.value = "vine";
                optVine.text = "Vine";
                optGiphy.value = "giphy";
                optGiphy.text = "Giphy gif";
                optImg.value = "image";
                optImg.text = "Image (gifs also)";
                //make more options here in the future
                var selectId = "select-" + i;
                select.setAttribute('id', selectId);
                select.className = "uk-form";
                select.appendChild(optYouVid);
                select.appendChild(optVimVid);
                select.appendChild(optVine);
                select.appendChild(optGiphy);
                select.appendChild(optImg);
                //end-options
                //end-select
                div.appendChild(select);
                //attach select elements to the document
                attachPoint.appendChild(div);
            }
            //make select button and div
            var buttonDiv = d.createElement('div');
            buttonDiv.className = "uk-form-row";
            var selectTypeBtnElem = d.createElement('button');
            selectTypeBtnElem.className = "uk-button uk-button-mini uk-button-success";
            selectTypeBtnElem.setAttribute('id', 'submit-content-types-btn');
            selectTypeBtnElem.setAttribute('value', 'Select Content Types');
            // selectTypeBtnElem.setAttribute('onclick', 'selectBtnClicked()');
            selectTypeBtnElem.setAttribute('type', 'button');
            selectTypeBtnElem.innerHTML = "Select Content Types";
            //end-button
            //end-div
            //attach button to div and div to document
            buttonDiv.appendChild(selectTypeBtnElem);
            attachPoint.appendChild(buttonDiv);
            //we want to add a button to submit all content types
            //add an event listener to the button created above
            $(attachPoint).on( 'click', '#submit-content-types-btn', function () {
                //now we want to get all the values
                //once the button is clicked grab all the selected values and append them to an array
                var selectedVals = [];
                for (var j=0; j<numberOfLinks; j++){
                    var searchId = "select-" + j;
                    var selectVal = d.getElementById(searchId);
                    var sValue = selectVal.value;
                    selectedVals.push(sValue);
                }
                //all kinds of content are in the array selectedVals
                console.log(selectedVals);
                //ok now we have the selected elements
                //make actual content adding forms
                // var actualContent = d.createElement('div');
                // actualContent.setAttribute('class', 'uk-form-row');
                // attachPoint.appendChild(actualContent);
                //for each piece of content we need to add an appropriate form
                var nums = selectedVals.length;
                for (k=0; k<nums; k++){
                    //basically a catch statement/loop
                    //handle the youtube options first
                    var actualContent = d.createElement('div');
                    actualContent.setAttribute('class', 'uk-form-row');
                    attachPoint.appendChild(actualContent);
                    if(selectedVals[k] === "youtube-video") {
                        //we need an input and a label element
                        //ok we need to get the Youtube Video URL
                        var yTLabel = d.createElement('label');
                        yTLabel.setAttribute('class', 'uk-form-label');
                        yTLabel.innerHTML = "Enter the code at the end of the YouTube URL: (Ex: https://www.youtube.com/watch?v=<mark>_swivbEsD50</mark>) ";
                        var yTInput = d.createElement('input');
                        yTInput.setAttribute('class', 'uk-form');
                        yTInput.setAttribute('type', 'text');
                        var inputYTId = "content-youtube-url-"+k;
                        yTInput.setAttribute('id', inputYTId);
                        yTInput.setAttribute('placeholder', '_swivbEsD50');
                        actualContent.appendChild(yTLabel);
                        actualContent.appendChild(yTInput);
                    } else if (selectedVals[k] === "vimeo-video") {
                        //we need an input and a label element
                        //ok we need to get the Youtube Video URL
                        var vimeoLabel = d.createElement('label');
                        vimeoLabel.setAttribute('class', 'uk-form-label');
                        vimeoLabel.innerHTML = "Enter the code at the end of the Vimeo URL: (Ex: https://vimeo.com/<mark>117934405</mark>) ";
                        var vimeoInput = d.createElement('input');
                        vimeoInput.setAttribute('class', 'uk-form');
                        vimeoInput.setAttribute('type', 'text');
                        var inputVimeoId = "content-vimeo-url-"+k;
                        vimeoInput.setAttribute('id', inputVimeoId);
                        vimeoInput.setAttribute('placeholder', '117934405');
                        actualContent.appendChild(vimeoLabel);
                        actualContent.appendChild(vimeoInput);
                    } else if (selectedVals[k] === "vine") {
                        //we need an input and a label element
                        //ok we need to get the Youtube Video URL
                        var vineLabel = d.createElement('label');
                        vineLabel.setAttribute('class', 'uk-form-label');
                        vineLabel.innerHTML = "Enter the code at the end of the Vine URL: (Ex: https://vine.co/v/<mark>iuBJ9v07mFP</mark>) ";
                        var vineInput = d.createElement('input');
                        vineInput.setAttribute('class', 'uk-form');
                        vineInput.setAttribute('type', 'text');
                        var inputVineId = "content-vine-url-"+k;
                        vineInput.setAttribute('id', inputVineId);
                        vineInput.setAttribute('placeholder', 'iuBJ9v07mFP');
                        actualContent.appendChild(vineLabel);
                        actualContent.appendChild(vineInput);
                    } else if (selectedVals[k] === "giphy") {
                        //we need an input and a label element
                        //ok we need to get the Youtube Video URL
                        var giphyLabel = d.createElement('label');
                        giphyLabel.setAttribute('class', 'uk-form-label');
                        giphyLabel.innerHTML = "Enter the code at the end of the Giphy URL: (Ex: http://giphy.com/gifs/afv-funny-fail-lol-<mark>26tP972jcNs3V4bKw</mark>) ";
                        var giphyInput = d.createElement('input');
                        giphyInput.setAttribute('class', 'uk-form');
                        giphyInput.setAttribute('type', 'text');
                        var inputGiphyId = "content-giphy-url-"+k;
                        giphyInput.setAttribute('id', inputGiphyId);
                        giphyInput.setAttribute('placeholder', '26tP972jcNs3V4bKw');
                        actualContent.appendChild(giphyLabel);
                        actualContent.appendChild(giphyInput);
                    } else if (selectedVals[k] === "image") {
                        //we need an input and a label element
                        //ok we need to get the Youtube Video URL
                        var imageLabel = d.createElement('label');
                        imageLabel.setAttribute('class', 'uk-form-label');
                        imageLabel.innerHTML = "Enter the code at the end of the Giphy URL: (Ex: <mark>http://www.mojaveriver.net/wp-content/uploads/2014/09/earth-3.jpg</mark>) ";
                        var imageInput = d.createElement('input');
                        imageInput.setAttribute('class', 'uk-form');
                        imageInput.setAttribute('type', 'text');
                        var inputImageId = "content-image-url-"+k;
                        imageInput.setAttribute('id', inputImageId);
                        imageInput.setAttribute('placeholder', 'whole-link-to-image.png');
                        actualContent.appendChild(imageLabel);
                        actualContent.appendChild(imageInput);
                    }
                }
                // add an input for the Bundle name here
                var bundleName = d.createElement('input');

                //add a final button to make a Bundle
                // this button needs to send all our data
                // so we need to make an object with all the content and key data points
            });

        }
        // var selectTypeBtnElem = d.getElementById('select-content-type');
        // selectTypeBtnElem.onclick = function() {
        //     //get the value of the select element
        //     var select = d.getElementById('content-type');
        //     var selected = select.options[select.selectedIndex].value; // selected is the value
        //     if (selected === "video") {
        //         //ok the user wants to add a video
        //     }
        // }


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
