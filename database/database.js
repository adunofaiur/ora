/**
 * We will use the following convention for our js files:
 * 
 * We make an object per file and define ALL functions as members of that object
 * This iis to avoid collisions in our namespaces
 */

 
 
function Music(songName, pathToFile, pathToArtwork){
	this.songName = songName;
	this.pathToFile = pathToFile;
	this.pathToArtwork = pathToArtwork;
} 
var Map = {};
Map.values = [];
//Courtesy of stack overflow:
//http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript user 
//Briguy37
function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};
Map.add = function(musicObject){
	var id = generateUUID();
	Map.values[id] = musicObject;

}

Map.get = function(uniqueID){
	if(Map.values[uniqueID] != null){
		return Map.values[uniqueID];
	)else{
		alert("No song for ID");
	}
}


var Database = {};
Database.initialize = function(){
Music Color_Kings =new Music("Color_Kings","database\Color_Kings.mp3"," ");
Music Kirk_Pearson=new Music("Kirk_Pearson","database\Kirk_Pearson"," ");
Music These_Guy=new Music("These_Guy","database\These_Guy"," ");
Map.add(Color_Kings);
Map.add(Kirk_Pearson);
Map.add(These_Guy);
	
}