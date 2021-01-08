function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
var HttpClient = function() {
    this.get = function(aUrl ,aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );    
        anHttpRequest.setRequestHeader("Content-Type", "application/json");        
        anHttpRequest.send( null );
    }
}

function team(){
   var myObj = [
    {
        "image": "https://brainlife.io/images/avatar/franco.jpg",
        "id": "0000-0002-2469-0494",
        "summary":"A small description"
    
    },
    {
        "image": "https://brainlife.io/images/avatar/soichi.jpg",
        "id": "0000-0003-3641-3491",
        "summary":"A small descggggggggggription"
    }
    ]

    console.log(myObj);
    for(var i = 0; i < myObj.length; i++) {
        var obj = myObj[i];
        console.log(obj.id);
        var passed_img = obj.image
        var client = new HttpClient();
        client.get('https://pub.orcid.org/v3.0/'+obj.id, function(response) {
            

        // do something with response
            // console.log(response);
            var JsonResponse = JSON.parse(response);
            var LastName = JSON.stringify(JsonResponse.person.name['family-name'].value);
            var FirstName = JSON.stringify(JsonResponse.person.name['given-names'].value);
            var image_address = passed_img;
            console.log(image_address);
            LastName = LastName.replace(/\"/g, "");
            FirstName = FirstName.replace(/\"/g, "");
            // console.log(FirstName+" "+LastName);
            // console.log(JsonResponse["activities-summary"]);
            var role =JSON.stringify(JsonResponse["activities-summary"].employments["affiliation-group"][0].summaries[0]["employment-summary"]["role-title"]);
            role = role.replace(/\"/g, "");
            var location = JSON.stringify(JsonResponse["activities-summary"].employments["affiliation-group"][0].summaries[0]["employment-summary"].organization.name);
            location = location.replace(/\"/g, "");
            if(image_address == null){
                image_address == obj.image;
            }
            var content = '<div class="col-lg-3 col-md-6 col-12 mt-4 pt-2"><div class="text-center"><img src='+""+image_address+' class="rounded-circle" alt="Generic placeholder image" width="140" height="140"><div class="margin-5px"></div><h5 class="font-bold">'+FirstName+' '+LastName+'</h5><p class="position-team">'+role+' at '+location+'</p><p class="text-center caption-team">Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod.</p></div></div>'
            document.getElementById('teampage-section-1').innerHTML += content;
            passed_img = null;


    }); 
    }

    }
