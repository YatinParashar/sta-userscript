// ==UserScript==
// @name         StaResolutionScriptV1.0
// @namespace    StaResolutionScript
// @version      0.1
// @description  To get ticket resolution from STA
// @author       Yatin
// @include      https://dev67656.service-now.com/*
// @exclude      http*://*google.*/*
// @match        https://dev67656.service-now.com/*
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function() {
    'use strict';
    //alert("Hello Yatin!");
    var incident= {}

    incident.IncidentNumber = document.getElementById("incident.number").value;
    incident.Notes= document.getElementById("incident.short_description").value;

    if(incident.Notes.include("\""))
    {
        incident.Notes = incident.Notes.replace("\"", "\`");
    }
    console.log("Incident Number ============= "+incident.IncidentNumber);
    console.log("Incident Short Description ============= "+incident.Notes);

    var input={"vectors":"tfidf","classifier":"LinearSVC","file_upload":"false","unseen_test_data":[incident],"predictor_variable":"Notes","output_variable":"bit_keywords_list","username":"Gurjot","userrole":"DataScientist"};
    const url='http://sta.westus.cloudapp.azure.com:8080/run_model';
    GM.xmlHttpRequest({
    method: "POST",
    url: url,
    data: JSON.stringify(input),
    headers: {
    "Content-Type": "application/json"
    },
    onload:     function (response) {

        if (response.status===200 )
        {
            var output = JSON.parse(this.responseText);
            console.log(output.data);
            var resolution = output.data[0].ITSM_Resolution;
            alert("Incident Number :  "+ incident.IncidentNumber + "\n\nDescription :  "+ incident.Notes + "\n\nResolution :  " + resolution);
            document.getElementById("incident.close_notes").innerHTML=resolution;
        }
        else
        {
            console.log("error");
        }

    },
    onerror:    function(reponse) {
        console.log("error: ", reponse);
    }
});
})();