/**
 * We will use the following convention for our js files:
 * 
 * We make an object per file and define ALL functions as members of that object
 * This iis to avoid collisions in our namespaces
 */

var JukeBox = {};
JukeBox.initialize = function(){
$( "#someMusic" ).draggable({ revert: "invalid" });
}
//Make your own parameters, I'm not sure how you want to handle the control flow
JukeBox.addMusic(){

//Whenever you make music HTML, it needs to be
//initialized
//	$( "#someMusic" ).draggable({ revert: "invalid" });

}

//Readds a piece of music to the list
JukeBox.readdMusic = function(uniqueID){
	//Should probably call JukeBox.addMusic()
}
