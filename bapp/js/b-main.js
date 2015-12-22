var currentLinks = [],
  d = document,
  w = window;
$(d).ready( function() {
    //ok so we want people to add content, when they click on the .can-click divs
    //a modal pops up that allows them to add content to their bundle
    $('#plus-button-container').on('click','div.can-click' , function () {
        //ok time to append a small form
        var newBtn = d.createElement('div');
        newBtn.setAttribute('class', 'plus-button two columns can-click');
        var plusIcon = d.createElement('i');
        plusIcon.setAttribute('class', 'fa fa-plus plus-icon');
        newBtn.appendChild(plusIcon);
        var linkli = d.createElement('li');
        var linkanchor = d.createElement('a');
        var elem = this;
        //ok so `This` refers to the dom node
        UIkit.modal.prompt("Link: ", '', function(value){
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
    


});
