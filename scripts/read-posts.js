//Initializes the post
var storage = firebase.storage();
console.log("Getting Posts");
var docRef = database.collection("GlobalPosts");

docRef.onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        if (doc) {

            var url = "gs://bookfinder-2b31b.appspot.com/GlobalPosts/" + doc.id;

            var gsReference = storage.refFromURL(url);

            createPost(doc.data().Title,
                doc.data().Price,
                doc.data().imageURL,
                gsReference,
                doc.id);
        }
    })
});


//Body
var body = document.getElementsByTagName("body");

//Main container
var container = document.getElementById("container");
container.style.marginTop = "15%";
container.style.marginBottom = "15%";


function createPost(title, price, imageURL, gsReference, id) {
    //Outer box
    var boxOut = document.createElement("div");
    boxOut.style.width = "100%";
    boxOut.style.paddingTop = "3%";
    boxOut.style.paddingBottom = "3%";
    boxOut.style.backgroundColor = "white";
    boxOut.style.marginBottom = "3.5%";
    boxOut.style.boxShadow = "0.5px 0px 3px #888888";

    //Inner Box
    var boxIn = document.createElement("div");
    boxIn.style.display = "block";
    boxIn.style.marginLeft = "auto";
    boxIn.style.marginRight = "auto";
    boxIn.style.width = "50%";
    boxIn.style.height = "50%";
    boxIn.style.paddingBottom = "0";
    boxIn.style.marginBottom = "0";

    //Getting images
    var img = document.createElement("IMG");
    img.id = id;
    img.src = imageURL;

    //Image styling
    img.style.width = "100%";
    img.style.marginBottom = "10%";
    img.style.boxShadow = "4px 4px 3px #888888, -4px -4px 3px #888888";
    img.style.zIndex = "1";

    //Price box styling
    var boxPrice = document.createElement("div");
    boxPrice.style.fontSize = "12px";
    boxPrice.style.textAlign = "left";
    boxPrice.style.fontFamily = "Roboto, sans-serif";
    boxPrice.style.marginBottom = "5px";
    boxPrice.style.marginLeft = "2%";
    boxPrice.style.marginRight = "2%";
    boxPrice.style.borderTop = "1px solid #bbbbbb";
    boxPrice.style.paddingTop = "3%";

    //Price text styling
    var priceC = document.createElement("span");
    priceC.innerHTML = "$" + price;
    priceC.style.color = "green";

    //Description box styling
    var descriptionBox = document.createElement("div");
    descriptionBox.style.fontSize = "15px";
    descriptionBox.style.textAlign = "left";
    descriptionBox.style.marginLeft = "2%";
    descriptionBox.style.fontFamily = "Roboto, sans-serif";

    //Description texts styling
    var descriptionBoxText = document.createElement("span");
    descriptionBoxText.innerHTML = title;
    descriptionBoxText.style.color = "black";

    //Append all together to display
    container.appendChild(boxOut);
    boxOut.appendChild(boxIn);
    boxIn.appendChild(img);
    boxOut.appendChild(boxPrice);
    boxPrice.appendChild(priceC);
    boxOut.appendChild(descriptionBox);
    descriptionBox.appendChild(descriptionBoxText);
}