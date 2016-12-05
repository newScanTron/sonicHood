/// <reference path="../typings/jquery/jquery.d.ts"/>

function linkHover(ele) {
    var name = ele.id;
    switch (name) {
        case 'rotgut':
            document.getElementById('sonic').innerHTML = "Rotgut Whines is a Soul and roll band from missoula, Mt.";
            break;
        case 'windbag':
            document.getElementById('sonic').innerHTML = "Windbag Saloon in helena, Mt.";
            break;
        case 'synth':
            document.getElementById('sonic').innerHTML = "SynthScape is a endless runner style game for two players, written in typescript using the <a href='http://phaser.io/'>Phaser.io</a> framwork";
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


