/**
 * We will use the following convention for our js files:
 * 
 * We make an object per file and define ALL functions as members of that object
 * This iis to avoid collisions in our namespaces
 */
//A global variable. Be careful not to overwrite other global variables!

function Node(uid, xPosition, yPosition, html2323){
	this.uid = uid;
	this.xPosition = xPosition;
	this.yPosition = yPosition;
	this.inEdges = [];
	this.outEdges = [];
	this.htmlElement = html2323;
}


var Graph = {};
Graph.nodes = [];
Graph.currentNode;
Graph.mood;

Graph.initialize = function(){
	
}



Graph.play = function(id){
	Graph.currentNode = Graph.nodeById(id);
	var control = document.getElementById("mainControl");
	var source = document.createElement("source");
	var mDiv = document.getElementById("canvas" + Graph.currentNode.uid.toString());
	mDiv.classList.remove("canvasMusic");
	mDiv.classList.add("canvasMusicPlaying");
	while(control.childNodes.length>0){
		control.removeChild(control.firstChild);
	}
	source.setAttribute("src", Database.values.get(Graph.currentNode.uid).pathToFile);
	source.setAttribute("type", "audio/mpeg");
	control.appendChild(source);
	var nextSongCheck;
	if(Graph.currentNode.outEdges.length > 0){
		nextSongCheck = true;
		var nextSong = Graph.getNextSong(Graph.currentNode.uid);
		control.addEventListener('ended', function(event){
		var musicDiv = document.getElementById("canvas" + Graph.currentNode.uid.toString());
		musicDiv.classList.remove("canvasMusicPlaying");
		musicDiv.classList.add("canvasMusic");
		Graph.play(nextSong.uid);
	});
	}
	else{
		control.addEventListener('ended', function(event){
		var musicDiv = document.getElementById("canvas" + Graph.currentNode.uid.toString());
		musicDiv.classList.remove("canvasMusicPlaying");
		musicDiv.classList.add("canvasMusic");
		event.target.pause();
	});
	}
		control.load();
		control.play();

}


Graph.nodeById = function(id){
	for (var i = 0; i < this.nodes.length; i++){
		if(this.nodes[i].uid == id){
			return this.nodes[i];
		}
	}
}
Graph.addNode = function(node) {
	Graph.nodes.push(node);
}

Graph.addMusic = function(uid, xPosition, yPosition, node33)
{
	var node = new Node(uid, xPosition, yPosition, node33);
	Graph.addNode(node);
}

Graph.addEdge = function(startUid, endUid) {
	var startNode;
	var endNode; 
	
	for(var i = 0; i < Graph.nodes.length; i++)
	{
		if(Graph.nodes[i].uid == startUid)
			startNode = Graph.nodes[i];
			
		if(Graph.nodes[i].uid == endUid)
			endNode = Graph.nodes[i];
			
		if(startNode != null & endNode != null)
			i = Graph.nodes.length;
	}
	
	if(startNode != null & endNode != null)
	{
		startNode.outEdges.push(endNode);
		endNode.inEdges.push(startNode);
	}		
}

Graph.removeEdge = function(startUid, endUid) {
	var startNode;
	var endNode; 
	
	for(var i = 0; i < Graph.nodes.length; i++)
	{
		if(Graph.nodes[i].uid == startUid)
			startNode = Graph.nodes[i];
			
		if(Graph.nodes[i].uid == endUid)
			endNode = Graph.nodes[i];
			
		if(startNode != null & endNode != null)
			i = Graph.nodes.length;
	}
	
	if(startNode != null & endNode != null)
	{
		var startNodeLength = startNode.outEdges.length;
		for(var i = 0; i < startNodeLength; i++)
		{
			if(startNode.outEdges[i] == endUid)
			{
				startNode.outEdges.splice(i,1);
				i = startNodeLength;
			}			
		}
		
		var endNodeLength = endNode.inEdges.length;
		for(var i = 0; i < endNodeLength; i++)
		{
			if(endNode.inEdges[i] == startUid)
			{
				endNode.inEdges.splice(i,1);
				i = endNodeLength;
			}			
		}
	}		
}

Graph.getNextSong = function(id){
	var possibleNodes = Graph.nodeById(id).outEdges;
	
	var index = Math.floor((Math.random() * possibleNodes.length));
	return possibleNodes[index];

}