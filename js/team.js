
function generateAlumniTeamDIV(name, role, location, image ) {
    
    content = '<div class="col-lg-3 col-md-6 col-12 mt-4 pt-2"><div class="text-center"><img src=' + "" + image + ' class="rounded-circle" alt="Generic placeholder image" width="140" height="140"><div class="margin-5px"></div><h5 class="font-bold">' + name + '</h5><p class="position-team">' + role + ' at ' + location + '</p></div></div>'
    document.getElementById('teampage-section-alumni').innerHTML += content;
}


var config = {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json'
  };

function generateAlumni(obj,name){
    axios.defaults.headers = {
        'Content-Type': 'application/json',
    }

    console.log("entered generateAlumni");
    console.log(obj["ORCID"]);
    console.log(name)
    if(obj["ORCID"] == "true"){
        console.log("heyyyy it has orcid");
        console.log(obj)
        var assets_json = obj;
        var data_url = 'https://pub.orcid.org/v3.0/' + obj.id;
        axios.get(data_url, { data: null },config)
        .then(function (response, obj) {
            JsonResponse = response.data;
            console.log(JsonResponse);
            var role = JSON.stringify(JsonResponse["activities-summary"].employments["affiliation-group"][0].summaries[0]["employment-summary"]["role-title"]);
            role = role.replace(/\"/g, "");
            console.log(role);
            var location = JSON.stringify(JsonResponse["activities-summary"].employments["affiliation-group"][0].summaries[0]["employment-summary"].organization.name);
            location = location.replace(/\"/g, "");
            console.log(JsonResponse = response.data); // ex.: { user: 'Your User'}
            console.log(response.status); // ex.: 200
            generateAlumniTeamDIV(name, role, location,assets_json["image"])
        });
    }else{
        console.log("it doesn't has orcid");
        generateAlumniTeamDIV(name, obj.role, obj.location,obj["image"])
    }
    console.log("exit generateAlumni");

}

function team_generator(){
    console.log("entered");

    fetch('assets/team.json').then(res=>res.json()).then(insts=>{
        
        console.log(insts);
        for(let name in insts) {
            var obj = insts[name];
            var type = obj.type;
            if(type == 'alumni'){
                generateAlumni(obj,name);
            }else if (type == 'current'){

            }else{

            }
        }
});

}