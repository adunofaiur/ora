/**
 * We will use the following convention for our js files:
 * 
 * We make an object per file and define ALL functions as members of that object
 * This iis to avoid collisions in our namespaces
 */

var JukeBox = {};
JukeBox.initialize = function(){
}
//Make your own parameters, I'm not sure how you want to handle the control flow
JukeBox.addMusic = function(uuid) {

//DO NOT CHANGE
	var mData = Database.values.get(uuid);
	var jukeboxMusic = document.createElement("div");
	jukeboxMusic.className = "jukeboxMusic";
	var jukeboxImage = document.createElement("img");
	jukeboxImage.className = "jukeboxImage";
	jukeboxImage.setAttribute("src", mData.pathToArtwork);
	jukeboxMusic.setAttribute("musicId", uuid);
	jukeboxMusic.appendChild(jukeboxImage);
	$( jukeboxMusic).draggable({ revert: "invalid" });
		jukeboxMusic.classList.add("jukeboxMusic");
//NOW YOU CAN CHANGE		
		
	var jb = document.getElementById("jukeBox");
	jb.appendChild(jukeboxMusic);
	

}

//Readds a piece of music to the list
JukeBox.readdMusic = function(uniqueID){
	//Should probably call JukeBox.addMusic()
}
