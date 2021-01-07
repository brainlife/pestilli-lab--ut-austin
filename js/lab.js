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
    this.get = function(aUrl, aCallback) {
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
        "name": "Franco Pestilli",
        "id": "0000-0002-2469-0494"
    },
    {
        "name": "Franco Pestilli",
        "id": "0000-0002-2469-0491"
    }
    ]

    console.log(myObj);
    for(var i = 0; i < myObj.length; i++) {
        var obj = myObj[i];
    
        console.log(obj.id);

        var client = new HttpClient();
    client.get('https://pub.orcid.org/v3.0/'+obj.id, function(response) {

    // do something with response
        console.log(response);


}); 
    }

    }
