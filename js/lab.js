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

function team(){
   var myObj = [
    {
        "name": "Franco Pestilli",
        "id": "0000-0002-2469-0494"
    },
    {
        "name": "Franco Pestilli",
        "id": "0000-0002-2469-0494"
    }
    ]

    console.log(myObj);
    }
