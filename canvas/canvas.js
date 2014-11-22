/**
 * We will use the following convention for our js files:
 * 
 * We make an object per file and define ALL functions as members of that object
 * This iis to avoid collisions in our namespaces
 */

var Canvas = {};
Canvas.initialize = function(){
	$( "#draggable3" ).draggable({ containment: "#musicCanvas", scroll: false });
	$( "#musicCanvas" ).droppable({
     
      drop: function( event, ui ) {
        $(ui.draggable).draggable({
		containment: "#containment-wrapper", scroll: false,
		drop: function(event, ui){
			var mID = e.target.getAttribute("musicId");
			var musicData = Database.values.get(mD);
			//build html element
			var musicImage = document.createElement("img");
			musicImage.className = "canvasMusic";
			musicImage.setAttribute("src", musicData.pathToArtwork);
			musicImage.setAttribute("title", musicData.songName);
			var draggableWrapper = document.createElement("div");
			draggableWrapper.className = "canvasDraggable";
				$( draggableWrapper ).draggable({ containment: "#musicCanvas", scroll: false });
			draggableWrapper.appendChild(musicImage);
		}
		});
		//JukeBox.readd(ui.draggable);
      }
    });

}
//Expects a drop event
Canvas.newMusicDrop = function(e){
	var mID = e.target.getAttribute("musicId");
	var musicData = Database.values.get(mD);
	//build html element
	var musicImage = document.createElement("img");
	musicImage.className = "canvasMusic";
	musicImage.setAttribute("src", musicData.pathToArtwork);
	musicImage.setAttribute("title", musicData.songName);
	var draggableWrapper = document.createElement("div");
	draggableWrapper.className = "canvasDraggable";
		$( draggableWrapper ).draggable({ containment: "#musicCanvas", scroll: false });
	draggableWrapper.appendChild(musicImage);

}
