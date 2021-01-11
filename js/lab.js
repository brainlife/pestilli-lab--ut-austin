function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200)
                aCallback(this.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.setRequestHeader("Content-Type", "application/json");
        anHttpRequest.send(null);
    }
}

function get_data_from_url(url) {
    var obj;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    anHttpRequest.setRequestHeader("Content-Type", "application/json");

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            obj = JSON.parse(xmlhttp.responseText);
        }
    }

    return obj;
}
var CurrentTeam = [
    {
        "ORCID":true,
        "image": "https://brainlife.io/images/avatar/franco.jpg",
        "id": "0000-0002-2469-0494",
        "summary": "A small description"

    },
    {
        "ORCID" : true,
        "image": "https://brainlife.io/images/avatar/soichi.jpg",
        "id": "0000-0003-3641-3491",
        "summary": "A small descggggggggggription"
    },
    {
        "ORCID":false,
        "image" : "https://avatars2.githubusercontent.com/u/16397223?s=460&u=7f5cd78ae3a0046f1f10988bf0a0ddcf3b81953d&v=4",
        "name": "Dheeraj Bhatia",
        "summary" : "summer intern",
        "role" : "intern",
        "location":"Buffalo,NY",
    }
]

var AlumniTeam = [
    
    {
        /* bradley*/
        "ORCID" : true,
        "image" : "https://brainlife.io/images/avatar/brad.jpg",
        "id":"0000-0002-4486-1203",
    },
    {
        "ORCID" : true,
        /* Sophia */
        "image" : "https://brainlife.io/images/avatar/sophia_cropped_750x750.jpg",
        "id" : "0000-0002-3626-146X",
    },
    {
        /* Sandra*/
        "ORCID":true,
        "image" :"https://brainlife.io/images/avatar/sandra.jpg",
        id : "0000-0002-3677-1611",
    },
    {
        "ORCID" : false, 
        "image" : "https://brainlife.io/images/avatar/giulia3.png",
        "name" : "Giulia Bertò",
        "position":"Data and Application Engineer",
        "location":"BrainLife", 
    }
]

function generateCurrentTeamDIV(name, id, role, location) {
    var picture;
    var description;
    for (var i = 0; i < CurrentTeam.length; i++) {
        if(id == null){
            var obj = CurrentTeam[i];
            if (name == obj.name) {
                picture = obj.image;
                description = obj.summary;
            }
        }else{
        var obj = CurrentTeam[i];
        console.log(obj.id);
        console.log(id);
        id = id.replace(/\"/g, "");
        if (id == obj.id) {
            picture = obj.image;
            description = obj.summary;
        }
    }
    }
    content = '<div class="col-lg-3 col-md-6 col-12 mt-4 pt-2"><div class="text-center"><img src=' + "" + picture + ' class="rounded-circle" alt="Generic placeholder image" width="140" height="140"><div class="margin-5px"></div><h5 class="font-bold">' + name + '</h5><p class="position-team">' + role + ' at ' + location + '</p><p class="text-center caption-team">'+description+'</p></div></div>';
    document.getElementById('teampage-section-1').innerHTML += content;
}

function generateAlumniTeamDIV(name, id, role, location) {
    var picture;
    for (var i = 0; i < AlumniTeam.length; i++) {
        if(id == null){
            var obj = AlumniTeam[i];
            if (name == obj.name) {
                picture = obj.image;
                role = obj.position;
                location = obj.location;
            }
        }else{
        var obj = AlumniTeam[i];
        console.log(obj.id);
        console.log(id);
        id = id.replace(/\"/g, "");
        if (id == obj.id) {
            picture = obj.image;
        }
    }
    }
    content = '<div class="col-lg-3 col-md-6 col-12 mt-4 pt-2"><div class="text-center"><img src=' + "" + picture + ' class="rounded-circle" alt="Generic placeholder image" width="140" height="140"><div class="margin-5px"></div><h5 class="font-bold">' + name + '</h5><p class="position-team">' + role + ' at ' + location + '</p></div></div>'
    document.getElementById('teampage-section-alumni').innerHTML += content;
}

function team() {

    // CREATES Current Team
    console.log(CurrentTeam);
    for (var i = 0; i < CurrentTeam.length; i++) {
        
        var obj = CurrentTeam[i];
        console.log(obj.id);
        if(obj.ORCID == true){
        var passed_img = obj.image
        var client = new HttpClient();
        var name = "";
        var description = obj.summary;
        var role = "";
        var location = "";
        var content = "";
        axios.defaults.headers = {
            'Content-Type': 'application/json',
        }
        var data_url = 'https://pub.orcid.org/v3.0/' + obj.id;
        // var JsonResponse = get_data_from_url(data_url);
        var JsonResponse;
        axios.get(data_url, { data: null }, axios.defaults.headers)
            .then(function (response, obj) {
                console.log(obj);
                JsonResponse = response.data;
                var LastName = JSON.stringify(JsonResponse.person.name['family-name'].value);
                var FirstName = JSON.stringify(JsonResponse.person.name['given-names'].value);
                var id = JSON.stringify(JsonResponse["orcid-identifier"].path);
                // var image_address = passed_img;
                // console.log(image_address);
                LastName = LastName.replace(/\"/g, "");
                FirstName = FirstName.replace(/\"/g, "");
                name = FirstName + " " + LastName;
                console.log(name);
                // console.log(JsonResponse["activities-summary"]);
                role = JSON.stringify(JsonResponse["activities-summary"].employments["affiliation-group"][0].summaries[0]["employment-summary"]["role-title"]);
                role = role.replace(/\"/g, "");
                console.log(role);
                location = JSON.stringify(JsonResponse["activities-summary"].employments["affiliation-group"][0].summaries[0]["employment-summary"].organization.name);
                location = location.replace(/\"/g, "");


                console.log(JsonResponse = response.data); // ex.: { user: 'Your User'}
                console.log(response.status); // ex.: 200
                generateCurrentTeamDIV(name, id, role, location);
            });
        }else{
             generateCurrentTeamDIV(obj.name, null, obj.role, obj.location);
        }
        
        console.log("value of ab" + JsonResponse);
        // content = '<div class="col-lg-3 col-md-6 col-12 mt-4 pt-2"><div class="text-center"><img src='+""+passed_img+' class="rounded-circle" alt="Generic placeholder image" width="140" height="140"><div class="margin-5px"></div><h5 class="font-bold">'+name+'</h5><p class="position-team">'+role+' at '+location+'</p><p class="text-center caption-team">Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod.</p></div></div>'
        // document.getElementById('teampage-section-1').innerHTML += content; 
    }

    // Creates Alumni Team 
    for (var i = 0; i < AlumniTeam.length; i++) {
        
        var obj = AlumniTeam[i];
        if(obj.ORCID == true){
        console.log(obj.id);
        var passed_img = obj.image
        var name = "";
        var description = obj.summary;
        var role = "";
        var location = "";
        axios.defaults.headers = {
            'Content-Type': 'application/json',
        }
        var data_url = 'https://pub.orcid.org/v3.0/' + obj.id;
        // var JsonResponse = get_data_from_url(data_url);
        var JsonResponse;
        axios.get(data_url, { data: null }, axios.defaults.headers)
            .then(function (response, obj) {
                console.log(obj);
                JsonResponse = response.data;
                var LastName = JSON.stringify(JsonResponse.person.name['family-name'].value);
                var FirstName = JSON.stringify(JsonResponse.person.name['given-names'].value);
                var id = JSON.stringify(JsonResponse["orcid-identifier"].path);
                // var image_address = passed_img;
                // console.log(image_address);
                LastName = LastName.replace(/\"/g, "");
                FirstName = FirstName.replace(/\"/g, "");
                name = FirstName + " " + LastName;
                console.log(name);
                // console.log(JsonResponse["activities-summary"]);
                role = JSON.stringify(JsonResponse["activities-summary"].employments["affiliation-group"][0].summaries[0]["employment-summary"]["role-title"]);
                role = role.replace(/\"/g, "");
                console.log(role);
                location = JSON.stringify(JsonResponse["activities-summary"].employments["affiliation-group"][0].summaries[0]["employment-summary"].organization.name);
                location = location.replace(/\"/g, "");


                console.log(JsonResponse = response.data); // ex.: { user: 'Your User'}
                console.log(response.status); // ex.: 200
                generateAlumniTeamDIV(name, id, role, location);
            });
        
        console.log("value of ab" + JsonResponse);
        // content = '<div class="col-lg-3 col-md-6 col-12 mt-4 pt-2"><div class="text-center"><img src='+""+passed_img+' class="rounded-circle" alt="Generic placeholder image" width="140" height="140"><div class="margin-5px"></div><h5 class="font-bold">'+name+'</h5><p class="position-team">'+role+' at '+location+'</p><p class="text-center caption-team">Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod.</p></div></div>'
        // document.getElementById('teampage-section-1').innerHTML += content; 
    }else{
        generateAlumniTeamDIV(obj.name, null, obj.role, obj.location);
    }
}
}
