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

Graph.initialize = function(){
	
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