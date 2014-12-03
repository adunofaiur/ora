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
Canvas.circles = [];
Canvas.editedEdge;
Canvas.even = 0;
function Circle(x, y, radius, startNode, endNode){
	this.x = x;
	this.y = y;
	this.startNode = startNode;
	this.endNode = endNode;
	this.radius = radius;
	this.isContained = function(someX, someY){
		if (Math.pow((someX - this.x), 2) + Math.pow((someY - this.y), 2) <= Math.pow(this.radius, 2)){
			return true;
		}
		else{
			return false;
		}
		}
	
}
Circle.prototype.isContained = function(someX, someY){
		if (Math.pow((someX - this.x), 2) + Math.pow((someY - this.y), 2) <= this.radius^2){
			return true;
		}
		else{
			return false;
		}
		}

Canvas.setMood = function(id){
	Graph.mood = id;
}
Canvas.initialize = function(){
   
   	$("#filter").change(JukeBox.filterMusic);
		$("#next").click(function(event){
			if(Graph.isNext){
				Graph.keepPlaying();
			}
		});
		$( "#edgeDialog" ).dialog({
               autoOpen: false, 
               hide: "puff",
               show : "slide",
               height: 400 ,
               width: 450,
               open: function(event){
          		}, 
               buttons: [ { text: "Ok", click: function(event) {
               		var edge = Canvas.editedEdge;
               		if ($("#sadS").prop('checked')){
						edge.sadPref = 'sometimes';				
					}
					else if ($("#sadN").prop('checked')){
						edge.sadPref = 'never';				
					}
					else{
						edge.sadPref = 'always';				
					}
					if ($("#happyS").prop('checked')){
						edge.happyPref = 'sometimes';				
					}
					else if ($("#happyN").prop('checked')){
						edge.happyPref = 'never';				
					}
					else{
						edge.happyPref = 'always';				
					}
					if ($("#metalS").prop('checked')){
						edge.metalPref = 'sometimes';				
					}
					else if ($("#metalN").prop('checked')){
						edge.metalPref = 'never';				
					}
					else{
						edge.metalPref = 'always';				
					}
					if ($("#partyS").prop('checked')){
						edge.partyPref = 'sometimes';				
					}
					else if ($("#partyN").prop('checked')){
						edge.partyPref = 'never';				
					}
					else{
						edge.partyPref = 'always';				
					}

          		$( this ).dialog( "close" ); } }, 
				{text: "REMOVE EDGE", click: function(event) {
					Graph.removeEdge(Canvas.editedEdge.inNode.uid, Canvas.editedEdge.outNode.uid);
					Canvas.redraw();
					$( this ).dialog( "close" );
				}}]   

            });


    ///Initialize mood
    var moodCont = document.getElementById("moods");
    for (var i = 0; i < moodCont.childNodes.length; i++){
    	$(moodCont.childNodes[i]).click(function (event){
    		var previous = document.getElementById(Graph.mood);
			if(event.target.class != "mood"){
				event.target = event.target.parentNode;
			}
			if(previous != null){
				previous.classList.remove("moodSelected");
				previous.classList.add("mood");
				if(previous.getAttribute("id")!=event.target.getAttribute("id")){
					Canvas.setMood(event.target.getAttribute("id"));
					event.target.classList.remove("mood");
					event.target.classList.add("moodSelected");
				}else{
					Graph.mood=null;
				}
			}else{
					Canvas.setMood(event.target.getAttribute("id"));
					event.target.classList.remove("mood");
					event.target.classList.add("moodSelected");
			}
			
    	
    	})
    }




     Canvas.htmlNode = document.getElementById("musicCanvas")
     $(Canvas.htmlNode).mousemove(function(event){
     	var realX = event.pageX - this.offsetLeft;
    	var realY = event.pageY - this.offsetTop;
     	var intersects = false;
     	for (var i = 0; i < Canvas.circles.length; i++){
     		if (Canvas.circles[i].isContained(realX, realY)){
     			document.body.style.cursor = 'pointer';
     			intersects = true;
     		}
     		else{
     			 if (!intersects){
     			 	document.body.style.cursor = 'default';
     			 }

     		}
     	}
     });
        $(Canvas.htmlNode).click(function(event){
     	var realX = event.pageX - this.offsetLeft;
    	var realY = event.pageY - this.offsetTop;
     	var intersects = false;
     	for (var i = 0; i < Canvas.circles.length; i++){
     		if (Canvas.circles[i].isContained(realX, realY)){
     			Canvas.triggerEdit(Canvas.circles[i].startNode, Canvas.circles[i].endNode);
     		}
     		else{
     			 

     		}
     	}

     });
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
		$( ui.draggable[0] ).draggable( "option", "helper", "original" );

		if(ui.draggable[0].parentNode.id != "musicCanvas"){
			
		
				var conts = jb.childNodes;
				for (var ll = 3; ll < conts.length; ll++){
					if(conts[ll].getAttribute("musicid") == mID){
						conts[ll].parentNode.removeChild(conts[ll]);

					}
				}
			


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
			$(ui2).on( "drag", function( event ) {
				if(Canvas.even == 0){
					Canvas.redraw();
					Canvas.even++;

				}else{
				Canvas.even = 0;
				}

			} );
			$(ui2).dblclick(function(event){
				if(event.target.childNodes[0] == null){
							event.target = event.target.parentNode;
						}
				Canvas.playMe(event.target.getAttribute("musicid"));
			});
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
						var midY = (startY + endY)/2;
						var midX = (startX + endX)/2;
						
						var leftHeadX = midX - 10;
						var leftHeadY = midY - 10; 
						var rightHeadX = midX + 10;
						var rightHeadY = midY - 10; 
 

						var c = document.getElementById("draw");
						var ctx = c.getContext("2d");
						ctx.moveTo(startX,startY);
						ctx.lineTo(endX, endY);
						ctx.stroke();

						ctx.moveTo(midX,midY);
						ctx.lineTo(leftHeadX, leftHeadY);
						ctx.stroke();

						ctx.moveTo(midX,midY);
						ctx.lineTo(rightHeadX, rightHeadY);
						ctx.stroke();


						var vect2X = endX - midX;
					var vect2Y = endY - midY;

					var vect1X = 0;
					var vect1Y = 1;
					var tan  = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)) / (endX - startX);
					//var radians = Math.atan(tan) + Math.PI/2;
					var radians = Math.atan2(endX-startX, endY - startY);
					var degrees = radians * 180 / Math.PI 
						console.log(degrees)

					/*	var leftHeadX = (midX - 10)*Math.cos(radians) - (midY-10) * Math.sin(radians) ;

						var leftHeadY = (midY - 10)*Math.cos(radians) + (midX-10) * Math.sin(radians) ;
						var rightHeadX = (midX + 10)*Math.cos(radians) - (midY-10) * Math.sin(radians) ;

						var rightHeadY = (midY - 10)*Math.cos(radians) + (midX + 10) * Math.sin(radians) ;*/
					var leftHeadX = midX-10;
					var leftHeadY = midY-10;
					var rightHeadX = midX + 10
					var rightHeadY = midY-10;
					ctx.save();

					ctx.translate(midX, midY);
					ctx.rotate(-radians); 
					ctx.moveTo(0,0);
					ctx.lineTo(-10, -10);
					ctx.stroke();
					ctx.moveTo(0,0);
					ctx.lineTo(10, -10);
					ctx.stroke()
					ctx.translate(-midX, -midY);
					ctx.restore();
					var startNode = Graph.nodeById(idd);
					var endNode = Graph.nodeById(event.target.getAttribute("id"));

					var c1 = new Circle(midX, midY, 15,startNode, endNode);
					Canvas.circles.push(c1);

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

				}
			});
		
		
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
		Canvas.circles = [];
		Canvas.htmlNode.removeChild(c);
		var cancan = document.createElement("canvas");
		cancan.setAttribute("width", "1104px");
		cancan.setAttribute("height",  "740px");
		cancan.setAttribute("id", "draw");
		Canvas.htmlNode.appendChild(cancan);
	
		for(var i = 0; i < Graph.nodes.length; i++){
			for(var j = 0; j < Graph.nodes[i].outEdges.length; j++){
				//draw connection line
					
					var iRect = Graph.nodes[i].htmlElement.getBoundingClientRect();
					var destRect =  Graph.nodes[i].outEdges[j].outNode.htmlElement.getBoundingClientRect();
					var mCanvasRect = Canvas.htmlNode.getBoundingClientRect();
					var canY = mCanvasRect.top;
					
					var canX = mCanvasRect.left;
					
					var startY = iRect.top - canY + 64;
					var startX = iRect.left - canX + 64;
					var endY = destRect.top - canY + 64;
					var endX = destRect.left - canX + 64;
					var midY = (startY + endY)/2 - (startY - endY)/12;
						var midX = (startX + endX)/2 -(startX- endX)/12;
					

					
					var c = document.getElementById("draw");
					var ctx = c.getContext("2d");
					
					ctx.lineWidth = 2;
					ctx.moveTo(startX,startY);
					ctx.lineTo(endX, endY);
					ctx.stroke();

					var vect2X = endX - midX;
					var vect2Y = endY - midY;

					var vect1X = 0;
					var vect1Y = 1;
					var tan  = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)) / (endX - startX);
					//var radians = Math.atan(tan) + Math.PI/2;
					var radians = Math.atan2(endX-startX, endY - startY);
					var degrees = radians * 180 / Math.PI 
						console.log(degrees)

					/*	var leftHeadX = (midX - 10)*Math.cos(radians) - (midY-10) * Math.sin(radians) ;

						var leftHeadY = (midY - 10)*Math.cos(radians) + (midX-10) * Math.sin(radians) ;
						var rightHeadX = (midX + 10)*Math.cos(radians) - (midY-10) * Math.sin(radians) ;

						var rightHeadY = (midY - 10)*Math.cos(radians) + (midX + 10) * Math.sin(radians) ;*/
	var leftHeadX = midX-10;
var leftHeadY = midY-10;
var rightHeadX = midX + 10
var rightHeadY = midY-10;
					ctx.save();

					ctx.translate(midX, midY);
					ctx.rotate(-radians); 
					ctx.moveTo(0,0);
					ctx.lineTo(-10, -10);
					ctx.stroke();
ctx.moveTo(0,0);
					ctx.lineTo(10, -10);
					ctx.stroke()
					ctx.translate(-midX, -midY);
					ctx.restore();

var c1 = new Circle(midX, midY, 15, Graph.nodes[i], Graph.nodes[i].outEdges[j].outNode);
					Canvas.circles.push(c1);

/*
						ctx.moxveTo(midX,midY);

						ctx.lineTo(rightHeadX, rightHeadY);
						ctx.stroke();*/
			}
		}
	
}

Canvas.makeRadioButtons = function(edge){
	var formContainer = document.createElement('div');

	formContainer.appendChild(document.createTextNode("When sad play: "));

	formContainer.appendChild(document.createElement('br'));
	var formCont = document.createElement('form');
	var formEntry1 = document.createElement('input');
	formEntry1.setAttribute('name', 'sad');
	formEntry1.setAttribute('id', 'sadN');
	formEntry1.setAttribute('type', 'radio');

	formEntry1.setAttribute('value', 'never');
	if(edge.sadPref == 'never'){
		formEntry1.setAttribute('checked', 'checked');
	}
	var e1l1 = document.createTextNode('Never');
	formCont.appendChild(formEntry1);
	formCont.appendChild(e1l1);

	var formEntry2 = document.createElement('input');
	formEntry2.setAttribute('name', 'sad');
	formEntry2.setAttribute('id', 'sadS');
		formEntry2.setAttribute('type', 'radio');

	formEntry2.setAttribute('value', 'sometimes');
	if(edge.sadPref == 'sometimes'){
		formEntry2.setAttribute('checked', 'checked');
	}
	var e1l2 = document.createTextNode('Sometimes');
	formCont.appendChild(formEntry2);
	formCont.appendChild(e1l2);

	var formEntry3 = document.createElement('input');
	formEntry3.setAttribute('name', 'sad');
	formEntry3.setAttribute('id', 'sadA');
		formEntry3.setAttribute('type', 'radio');

	formEntry3.setAttribute('value', 'always');
	if(edge.sadPref == 'always'){
		formEntry3.setAttribute('checked', 'checked');
	}
	var e1l3 = document.createTextNode('Always');
	formCont.appendChild(formEntry3);
	formCont.appendChild(e1l3);
		formContainer.appendChild(formCont);

		formContainer.appendChild(document.createElement('br'));

	formContainer.appendChild(document.createTextNode("When happy play: "));
		formContainer.appendChild(document.createElement('br'));

	var formCont2 = document.createElement('form');
	var formEntry4 = document.createElement('input');
	formEntry4.setAttribute('name', 'happy');
	formEntry4.setAttribute('id', 'happyN');
		formEntry4.setAttribute('type', 'radio');

	formEntry4.setAttribute('value', 'never');
	if(edge.happyPref == 'never'){
		formEntry4.setAttribute('checked', 'checked');
	}
	var e1l4 = document.createTextNode('Never');
	formCont2.appendChild(formEntry4);
	formCont2.appendChild(e1l4);

	var formEntry5 = document.createElement('input');
	formEntry5.setAttribute('name', 'happy');
	formEntry5.setAttribute('id', 'happyS');
	formEntry5.setAttribute('value', 'sometimes');
		formEntry5.setAttribute('type', 'radio');

	if(edge.happyPref == 'sometimes'){
		formEntry5.setAttribute('checked', 'checked');
	}
	var e1l5 = document.createTextNode('Sometimes');
	formCont2.appendChild(formEntry5);
	formCont2.appendChild(e1l5);

	var formEntry6 = document.createElement('input');
	formEntry6.setAttribute('name', 'happy');
	formEntry6.setAttribute('id', 'happyA');
		formEntry6.setAttribute('type', 'radio');

	formEntry6.setAttribute('value', 'always');
	if(edge.happyPref == 'always'){
		formEntry6.setAttribute('checked', 'checked');
	}
	var e1l6 = document.createTextNode('Always');
	formCont2.appendChild(formEntry6);
	formCont2.appendChild(e1l6);
	formContainer.appendChild(formCont2);



	formContainer.appendChild(document.createTextNode("When metal play: "));
	formContainer.appendChild(document.createElement('br'));

	var formCont3 = document.createElement('form');
	var formEntry41 = document.createElement('input');
	formEntry41.setAttribute('name', 'metal');
	formEntry41.setAttribute('id', 'metalN');
		formEntry41.setAttribute('type', 'radio');

	formEntry41.setAttribute('value', 'never');
	if(edge.metalPref == 'never'){
		formEntry41.setAttribute('checked', 'checked');
	}
	var e1l41 = document.createTextNode('Never');
	formCont3.appendChild(formEntry41);
	formCont3.appendChild(e1l41);

	var formEntry51 = document.createElement('input');
	formEntry51.setAttribute('name', 'metal');
	formEntry51.setAttribute('id', 'metalS');
	formEntry51.setAttribute('value', 'sometimes');
		formEntry51.setAttribute('type', 'radio');

	if(edge.metalPref == 'sometimes'){
		formEntry51.setAttribute('checked', 'checked');
	}
	var e1l51 = document.createTextNode('Sometimes');
	formCont3.appendChild(formEntry51);
	formCont3.appendChild(e1l51);

	var formEntry61 = document.createElement('input');
	formEntry61.setAttribute('name', 'metal');
	formEntry61.setAttribute('id', 'metalA');
		formEntry61.setAttribute('type', 'radio');

	formEntry61.setAttribute('value', 'always');
	if(edge.metalPref == 'always'){
		formEntry61.setAttribute('checked', 'checked');
	}
	var e1l61 = document.createTextNode('Always');
	formCont3.appendChild(formEntry61);
	formCont3.appendChild(e1l61);
	formContainer.appendChild(formCont3);



formContainer.appendChild(document.createTextNode("When party play: "));
	formContainer.appendChild(document.createElement('br'));

	var formCont4 = document.createElement('form');
	var formEntry42 = document.createElement('input');
	formEntry42.setAttribute('name', 'party');
	formEntry42.setAttribute('id', 'partyN');
		formEntry42.setAttribute('type', 'radio');

	formEntry42.setAttribute('value', 'never');
	if(edge.partyPref == 'never'){
		formEntry42.setAttribute('checked', 'checked');
	}
	var e1l42 = document.createTextNode('Never');
	formCont4.appendChild(formEntry42);
	formCont4.appendChild(e1l42);

	var formEntry52 = document.createElement('input');
	formEntry52.setAttribute('name', 'party');
	formEntry52.setAttribute('id', 'partyS');
	formEntry52.setAttribute('value', 'sometimes');
		formEntry52.setAttribute('type', 'radio');

	if(edge.partyPref == 'sometimes'){
		formEntry52.setAttribute('checked', 'checked');
	}
	var e1l52 = document.createTextNode('Sometimes');
	formCont4.appendChild(formEntry52);
	formCont4.appendChild(e1l52);

	var formEntry62 = document.createElement('input');
	formEntry62.setAttribute('name', 'party');
	formEntry62.setAttribute('id', 'partyA');
		formEntry62.setAttribute('type', 'radio');

	formEntry62.setAttribute('value', 'always');
	if(edge.partyPref == 'always'){
		formEntry62.setAttribute('checked', 'checked');
	}
	var e1l62 = document.createTextNode('Always');
	formCont4.appendChild(formEntry62);
	formCont4.appendChild(e1l62);
	formContainer.appendChild(formCont4);



	return formContainer;
}
Canvas.triggerEdit = function(start, end){
	var edge = Graph.edgeByIds(start.uid, end.uid);
	var dialog = document.getElementById("edgeDialog");
	while(dialog.childNodes[0] != null){
		dialog.removeChild(dialog.childNodes[0]);
	}
	dialog.appendChild(Canvas.makeRadioButtons(edge));


	Canvas.editedEdge = edge;
	$("#edgeDialog").dialog("open");
}

Canvas.playMe = function(id){
	var musicDivs = document.getElementsByClassName("canvasImage");
	for (var i = 0; i< musicDivs.length; i++){
		musicDivs[i].parentNode.classList.remove("canvasMusicPlaying");
		musicDivs[i].parentNode.classList.add("canvasMusic");
	}
		

	Graph.play(id);
}