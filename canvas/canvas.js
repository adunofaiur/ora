/**
 * We will use the following convention for our js files:
 * 
 * We make an object per file and define ALL functions as members of that object
 * This iis to avoid collisions in our namespaces
 */

var Canvas = {};
Canvas.firstClick = false;
Canvas.htmlNode;
Canvas.firstClickId = "";
Canvas.initialize = function(){
     Canvas.htmlNode = document.getElementById("musicCanvas")
	$( "#draggable3" ).draggable({ containment: "#musicCanvas", scroll: false });
	$( "#musicCanvas" ).droppable({
     
      drop: function( event, ui ) {
        var x = ui.offset.left;
		var y =ui.offset.top;
				var jb = document.getElementById("jukeBox");

		
		var mID = ui.draggable[0].getAttribute("musicid");
		var musicData = Database.values.get(mID);
		
		var can = document.getElementById("musicCanvas");
		var style = "position: absolute; top: " + y.toString() + "px; left: " + x.toString() + "px;";
		
		if(ui.draggable[0].parentNode.id != "musicCanvas"){
			jb.removeChild(ui.draggable[0]);
			can.appendChild(ui.draggable[0]);
			$( ui.draggable[0]).draggable({ containment: "#musicCanvas", scroll: false });
			var style = "position: absolute; top: " + y.toString() + "px; left: " + x.toString() + "px;";
			var ui2 =  ui.draggable[0];
			ui2.setAttribute("style", style);
			ui2.classList.remove("jukeboxMusic");
			ui2.classList.add("canvasMusic");
			ui2.childNodes[0].classList.remove("jukeboxImage");
			ui2.childNodes[0].classList.add("canvasImage");
			ui2.id = "canvas" + mID;
			
			var mCanvasRect = Canvas.htmlNode.getBoundingClientRect();
			var canY = mCanvasRect.top;
						
			var canX = mCanvasRect.left;
			x = x - canX;
			y = y - canY;
			Graph.addMusic(mID, x, y, ui2);

			
			$(ui2).mouseup(function(event){
				Canvas.redraw();
				});
			$(ui2).dblclick(function(event){
				if(event.target.childNodes[0] == null){
							event.target = event.target.parentNode;
						}
				Canvas.playMe(event.target.getAttribute("musicid"));
			})
			$(ui2).mousedown(function(event){
				if(event.which == 3){
					if(event.target.childNodes[0] == null){
							event.target = event.target.parentNode;
						}
					if(Canvas.firstClick){
						//check if a loop - for now we just disable the connection
						if(event.target.getAttribute("musicid") == Canvas.firstClickId){
							return;
						}
						Graph.addEdge(Canvas.firstClickId, event.target.getAttribute("musicid"));
				;
						var idd = "canvas" + Canvas.firstClickId;
						var initial = document.getElementById(idd);
						initial.classList.remove("canvasMusicSelected");
						initial.classList.add("canvasMusic");
						Canvas.firstClick = false;
						Canvas.firstClickId = "";
						//draw connection line
						var iRect = initial.getBoundingClientRect();
						var destRect = event.target.getBoundingClientRect();
						var mCanvasRect = Canvas.htmlNode.getBoundingClientRect();
						var canY = mCanvasRect.top;
						
						var canX = mCanvasRect.left;
						
						var startY = iRect.top - canY + 64;
						var startX = iRect.left - canX + 64;
						var endY = destRect.top - canY + 64;
						var endX = destRect.left - canX + 64;
						
						
						
						var c = document.getElementById("draw");
						var ctx = c.getContext("2d");
						ctx.moveTo(startX,startY);
						ctx.lineTo(endX, endY);
						ctx.stroke();
					}
					else{
						Canvas.firstClick = true;
						
						Canvas.firstClickId = event.target.getAttribute("musicid");

					//Do some graphical changes
						
						event.target.classList.remove("canvasMusic");
						event.target.classList.add("canvasMusicSelected");
					}
					
				}
				else if(event.which == 1){
					Canvas.clear();

				}
			}

			
			
			
			)
		
		}
		
     }
    });
	var canvas = document.getElementById("musicCanvas");
	canvas.setAttribute("oncontextMenu", "return false;");

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
Canvas.drawConnection = function(startId, endId){

}

Canvas.clear = function(){
		var c = document.getElementById("draw");
		var ctx = c.getContext("2d");
		ctx.clearRect(0,0,c.width,c.height);
	
}

Canvas.redraw = function(){
		var c = document.getElementById("draw");
		
		Canvas.htmlNode.removeChild(c);
		var cancan = document.createElement("canvas");
		cancan.setAttribute("width", "790px");
		cancan.setAttribute("height",  "630px");
		cancan.setAttribute("id", "draw");
		Canvas.htmlNode.appendChild(cancan);
	
		for(var i = 0; i < Graph.nodes.length; i++){
			for(var j = 0; j < Graph.nodes[i].outEdges.length; j++){
				//draw connection line
					var iRect = Graph.nodes[i].htmlElement.getBoundingClientRect();
					var destRect =  Graph.nodes[i].outEdges[j].htmlElement.getBoundingClientRect();
					var mCanvasRect = Canvas.htmlNode.getBoundingClientRect();
					var canY = mCanvasRect.top;
					
					var canX = mCanvasRect.left;
					
					var startY = iRect.top - canY + 64;
					var startX = iRect.left - canX + 64;
					var endY = destRect.top - canY + 64;
					var endX = destRect.left - canX + 64;
					
					var c = document.getElementById("draw");
					var ctx = c.getContext("2d");
					ctx.moveTo(startX,startY);
					ctx.lineTo(endX, endY);
					ctx.stroke();
			}
		}
	
}

Canvas.playMe = function(id){
	Graph.play(id);
}