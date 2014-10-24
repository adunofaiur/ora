/**
 * We will use the following convention for our js files:
 * 
 * We make an object per file and define ALL functions as members of that object
 * This iis to avoid collisions in our namespaces
 */
//A global variable. Be careful not to overwrite other global variables!
var MusicGraph = {};
MusicGraph.someFunction = function(someArg, anotherArg){
	var someValue = 0;
	return someValue;
}