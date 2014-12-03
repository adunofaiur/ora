/**
 * We will use the following convention for our js files:
 * 
 * We make an object per file and define ALL functions as members of that object
 * This iis to avoid collisions in our namespaces
 */

var JukeBox = {};
function sortFunc(a, b){
return Database.values.get(a).songName < Database.values.get(b).songName;
}
JukeBox.initialize = function(){
	var keyList = [];
	var nameList = [];
	for(var i = 0; i < Database.values.size; i++){
	
			keyList[Database.values.current.value.songName] = (Database.values.current.key);
			nameList.push(Database.values.current.value.songName);

				Database.values.next();

	}
	nameList.sort();
	var q = 0;
	for(var i = 0; i < nameList.length; i++){
		var jb = document.getElementById("jukeBox");

		jb.appendChild(JukeBox.addMusic(keyList[nameList[i]]));
		if((nameList.length - i) > 1){
			/*var r = JukeBox.makeRow();
			r.appendChild(JukeBox.addMusic(keyList[nameList[i]]));
			r.appendChild(JukeBox.addMusic(keyList[nameList[i+1]]));
			i++;
			var jb = document.getElementById("jukeBox");
			jb.appendChild(r);
			*/
		}
		else{
			/*
			var r = JukeBox.makeRow();
			r.appendChild(JukeBox.addMusic(keyList[nameList[i]]));
			jb.appendChild(r);
			*/

		}

	}

	


}

JukeBox.sortTheBox = function(){
	
}
JukeBox.makeRow = function(){
	var row = document.createElement('div');
	row.className = "jukeRow";

	return row;
}
JukeBox.filterMusic = function(event){
	var genre = $(event.target).val();
	var conts = document.getElementById("jukeBox").childNodes;

	for (var ll = 3; ll < conts.length; ll++){

		if(genre=="none"){
	conts[ll].setAttribute("style", "display: inline-block");
		}
		else if(conts[ll].getAttribute("genre") != genre){
			conts[ll].setAttribute("style", "display: none");

		}else{
			conts[ll].setAttribute("style", "display: inline-block");

		}

	}

}

function whenIStop(uuid){

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
		jukeboxMusic.setAttribute("title", mData.songName);

	jukeboxMusic.appendChild(jukeboxImage);
	$( jukeboxMusic).draggable({ revert: "invalid", helper: 'clone' });
	$( jukeboxMusic).bind('dragstop', function(event, ui) {					
		var jb = document.getElementById("jukeBox");
		var conts = jb.childNodes;
		var booleanunamedfalg = false;
		for (var tt = 3; tt < conts.length; tt++){
			if(conts[tt].getAttribute("musicid") == uuid){
			 booleanunamedfalg = true;

			}	
		}
		if(!booleanunamedfalg){
					jb.appendChild(JukeBox.addMusic(uuid));

		}

		
	});
		jukeboxMusic.classList.add("jukeboxMusic");

		var mContainer = document.createElement('div');
		mContainer.className = "jbmCont";
		mContainer.appendChild(jukeboxMusic);
		var breaka = document.createElement('p');
		mContainer.appendChild(breaka);
		mContainer.appendChild(document.createTextNode(mData.songName));
		mContainer.setAttribute("musicId", uuid);
		mContainer.setAttribute("genre", mData.genre);

		return mContainer;
	

}

JukeBox.addLabel = function(uuid){
	var mData = Database.values.get(uuid);

}

//Readds a piece of music to the list
JukeBox.readdMusic = function(uniqueID){
	//Should probably call JukeBox.addMusic()
}