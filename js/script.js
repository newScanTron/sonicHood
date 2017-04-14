/// <reference path="../typings/jquery/jquery.d.ts"/>

function linkHover(ele) {
    var name = ele.id;
    switch (name) {
        case 'rotgut':
            document.getElementById('rotgutText').style.display = "block";
            document.getElementById('displayText').style.display = "none";
            document.getElementById('synthscapeText').style.display = "none";
            document.getElementById('windbagText').style.display = "none";
            break;
        case 'windbag':
            document.getElementById('rotgutText').style.display = "none";
            document.getElementById('displayText').style.display = "none";
            document.getElementById('synthscapeText').style.display = "none";
            document.getElementById('windbagText').style.display = "block";
            break;
        case 'synth':
            document.getElementById('rotgutText').style.display = "none";
            document.getElementById('displayText').style.display = "none";
            document.getElementById('synthscapeText').style.display = "block";
            document.getElementById('windbagText').style.display = "none";
            break;
        case 'about':
            document.getElementById('rotgutText').style.display = "none";
            document.getElementById('displayText').style.display = "block";
            document.getElementById('synthscapeText').style.display = "none";
            document.getElementById('windbagText').style.display = "none";
            break;
    }
}

function linkClick(ele) {
    var name = ele.id;
    switch (name) {
        case 'rotgut':
            document.getElementById('rotgutP').style.display = "block";

            document.getElementById('synthscapeP').style.display = "none";
            document.getElementById('windbagP').style.display = "none";
            break;
        case 'windbag':
            document.getElementById('rotgutP').style.display = "none";

            document.getElementById('synthscapeP').style.display = "none";
            document.getElementById('windbagP').style.display = "block";
            break;
        case 'synth':
            document.getElementById('rotgutP').style.display = "none";
   
            document.getElementById('synthscapeP').style.display = "block";
            document.getElementById('windbagP').style.display = "none";
            break;
    }
}


function linkLeave() {
    document.getElementById('sonic').innerHTML = "The Sonic Neighborhood supports development of a varied array of multi-media projects. Based in Missoula, Montana";
}

$(document).ready(function() {
    $("#show").click(function(){
        $("#content").slideDown("slow");
//$("#rules").slideUp("slow");
        $("#headerOne").slideUp("fast");
        $("#gameName").slideDown("slow");
    });
    var truth = true;
    $("#fancyChild").click(function() {
       if (!truth)
       {
          $("#rules").slideUp("fast"); 
          truth = true;
       }
       else{
            $("#rules").slideDown("fast");
            truth = false;
       }
    })
    

    
});


