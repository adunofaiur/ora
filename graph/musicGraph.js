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
	this.outEdgeFunc = [];
	this.outEdges = [];
	this.htmlElement = html2323;
}
function Edge(inNode, outNode, edgeFunc){
	this.inNode = inNode;
	this.outNode = outNode;
	this.edgeFunc = edgeFunc;
	this.sadPref = "sometimes";
	this.happyPref = "sometimes";
	this.partyPref = "sometimes";
	this.metalPref = "sometimes";
}

var Graph = {};
Graph.nodes = [];
Graph.edges = [];
Graph.currentNode;
Graph.mood;
Graph.nextIndex;
Graph.isNext = false;
Graph.initialize = function(){
	
}

Graph.defaultPlayFunct = function(mood){
	return "sometimes";
}
Graph.nextButtonToggle = function(){
	if(Graph.isNext){
		var next = document.getElementById("nextI");
		next.classList.remove("nextImgNan")
		next.classList.add("nextImg");
	}else{
var next = document.getElementById("nextI");
		next.classList.remove("nextImg")
		next.classList.add("nextImgNan");
	}
}

Graph.keepPlaying = function(event){
	var musicDiv = document.getElementById("canvas" + Graph.currentNode.uid.toString());
	musicDiv.classList.remove("canvasMusicPlaying");
	musicDiv.classList.add("canvasMusic");
	Graph.play(Graph.currentNode.outEdges[Graph.nextIndex].outNode.uid);
}
Graph.stopPlaying = function(event){
var musicDiv = document.getElementById("canvas" + Graph.currentNode.uid.toString());
		musicDiv.classList.remove("canvasMusicPlaying");
		musicDiv.classList.add("canvasMusic");
		event.target.pause();
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
		Graph.nextIndex = Graph.getNextSong(Graph.currentNode.uid);
		if(Graph.nextIndex >= 0){
			control.removeEventListener("ended", Graph.keepPlaying);
			control.removeEventListener("ended", Graph.stopPlaying);
			control.addEventListener('ended', Graph.keepPlaying);
			Graph.isNext = true;
		}
		else{
			control.removeEventListener("ended", Graph.keepPlaying);
			control.removeEventListener("ended", Graph.stopPlaying);
			control.addEventListener('ended', Graph.stopPlaying);
						Graph.isNext = false;

	}
	}
	else{
	control.removeEventListener("ended", Graph.keepPlaying);
			control.removeEventListener("ended", Graph.stopPlaying);
	control.addEventListener('ended', Graph.stopPlaying);
				Graph.isNext = false;

	}
	Graph.nextButtonToggle();
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
Graph.edgeByIds = function(startId, endId){
	for (var i = 0; i < Graph.edges.length; i++){
		if(Graph.edges[i].inNode.uid == startId && Graph.edges[i].outNode.uid == endId){
			return this.edges[i];
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
		var edge = new Edge(startNode, endNode, Graph.defaultPlayFunct);
		startNode.outEdges.push(edge);
		endNode.inEdges.push(edge);
		Graph.edges.push(edge);
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
			if(startNode.outEdges[i].outNode.uid == endUid)
			{
				startNode.outEdges.splice(i,1);
				i = startNodeLength;
			}			
		}
		
		var endNodeLength = endNode.inEdges.length;
		for(var i = 0; i < endNodeLength; i++)
		{
			if(endNode.inEdges[i].outNode.uid == startUid)
			{
				endNode.inEdges.splice(i,1);
				i = endNodeLength;
			}			
		}
	}		
}

Graph.getNextSong = function(id){
	var possibleNodes = Graph.nodeById(id).outEdges;
	var responses = [];


	for(var i = 0; i < possibleNodes.length; i++){
		if(Graph.mood == 'sad'){
		responses.push(possibleNodes[i].sadPref);

		}else if (Graph.mood == 'happy'){
		responses.push(possibleNodes[i].happyPref);

		}
		else if (Graph.mood == 'party'){
		responses.push(possibleNodes[i].partyPref);

		}
		else if (Graph.mood == 'metal'){
		responses.push(possibleNodes[i].metalPref);

		}
		else{
			responses.push("sometimes");
		}
	}
	var anyPossible = false;
	for(var i = 0; i < responses.length; i++){
		if(responses[i] == 'always'){
			return i;
		}else if (responses[i] == 'sometimes'){
			anyPossible = true;
		}
	}
	if(anyPossible){
		while(true){
			var index = Math.floor((Math.random() * responses.length));
			if (responses[index] != 'never'){
				return index;
			}
		}		
	}

	//return possibleNodes[index];


	//mood and was skipped will be out two criteria
return -1;
}