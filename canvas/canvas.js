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
        $(ui.draggable).draggable({ containment: "#containment-wrapper", scroll: false });
		//JukeBox.readd(ui.draggable);
      }
    });

}
//Expects a drop event
Canvas.newMusicDrop = function(e){
}
