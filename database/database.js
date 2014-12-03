/**
 * We will use the following convention for our js files:
 * 
 * We make an object per file and define ALL functions as members of that object
 * This iis to avoid collisions in our namespaces
 */

 
 
 /*
 * http://stackoverflow.com/users/48015 - thanks Chris!
 */


// linking the key-value-pairs is optional
// if no argument is provided, linkItems === undefined, i.e. !== false
// --> linking will be enabled

function Map(linkItems) {
    this.current = undefined;
    this.size = 0;

    if(linkItems === false)
        this.disableLinking();
}

Map.noop = function() {
    return this;
};

Map.illegal = function() {
    throw new Error("illegal operation for maps without linking");
};

// map initialisation from existing object
// doesn't add inherited properties if not explicitly instructed to:
// omitting foreignKeys means foreignKeys === undefined, i.e. == false
// --> inherited properties won't be added
Map.from = function(obj, foreignKeys) {
    var map = new Map;

    for(var prop in obj) {
        if(foreignKeys || obj.hasOwnProperty(prop))
            map.put(prop, obj[prop]);
    }

    return map;
};

Map.prototype.disableLinking = function() {
    this.link = Map.noop;
    this.unlink = Map.noop;
    this.disableLinking = Map.noop;
    this.next = Map.illegal;
    this.key = Map.illegal;
    this.value = Map.illegal;
    this.removeAll = Map.illegal;

    return this;
};

// overwrite in Map instance if necessary
Map.prototype.hash = function(value) {
    return (typeof value) + ' ' + (value instanceof Object ?
        (value.__hash || (value.__hash = ++arguments.callee.current)) :
        value.toString());
};

Map.prototype.hash.current = 0;

// --- mapping functions

Map.prototype.get = function(key) {
    var item = this[this.hash(key)];
    return item === undefined ? undefined : item.value;
};

Map.prototype.put = function(key, value) {
    var hash = this.hash(key);

    if(this[hash] === undefined) {
        var item = { key : key, value : value };
        this[hash] = item;

        this.link(item);
        ++this.size;
    }
    else this[hash].value = value;

    return this;
};

Map.prototype.remove = function(key) {
    var hash = this.hash(key);
    var item = this[hash];

    if(item !== undefined) {
        --this.size;
        this.unlink(item);

        delete this[hash];
    }

    return this;
};

// only works if linked
Map.prototype.removeAll = function() {
    while(this.size)
        this.remove(this.key());

    return this;
};

// --- linked list helper functions

Map.prototype.link = function(item) {
    if(this.size == 0) {
        item.prev = item;
        item.next = item;
        this.current = item;
    }
    else {
        item.prev = this.current.prev;
        item.prev.next = item;
        item.next = this.current;
        this.current.prev = item;
    }
};

Map.prototype.unlink = function(item) {
    if(this.size == 0)
        this.current = undefined;
    else {
        item.prev.next = item.next;
        item.next.prev = item.prev;
        if(item === this.current)
            this.current = item.next;
    }
};

// --- iterator functions - only work if map is linked

Map.prototype.next = function() {
    this.current = this.current.next;
};

Map.prototype.key = function() {
    return this.current.key;
};

Map.prototype.value = function() {
    return this.current.value;
};
 
 

function Music(songName, pathToFile, pathToArtwork, genre){
    this.songName = songName;
    this.pathToFile = pathToFile;
    this.genre = genre;
    this.pathToArtwork = pathToArtwork;
    
} 
var Database = {};
Database.values = new Map();
Database.initialize = function(){
    
    
    var m1 = new Music("Firework","music/pop/Firework.mp3","music/pop/Firework.jpg" ,"pop");
    var m2 = new Music("Starships","music/pop/Starships.mp3","music/pop/Starships.jpg","pop");
    var m3 = new Music("Applause","music/pop/Applause.mp3","music/pop/Applause.jpg","pop");
    var m4 = new Music("Blank Space","music/pop/Blank Space.mp3","music/pop/Blank Space.jpg","pop");
    Database.values.put(generateUUID(), m1);
    Database.values.put(generateUUID(), m2);
    Database.values.put(generateUUID(), m3);
    Database.values.put(generateUUID(), m4);
    
    var m5 = new Music("Ev'ry Time We Say Goodbye","music/jazz/Ev'ry Time We Say Goodbye.mp3","music/jazz/Ev'ry Time We Say Goodbye.jpg","jazz");
    var m6 = new Music("I Won't Dance","music/jazz/I Won't Dance.mp3","music/jazz/I Won't Dance.jpg","jazz");
    var m7 = new Music("The Lady Is a Tramp (1956 Version)","music/jazz/The Lady Is a Tramp (1956 Version).mp3","music/jazz/The Lady Is a Tramp (1956 Version).jpg","jazz");
    var m8 = new Music("Anything Goes","music/jazz/Anything Goes.mp3","music/jazz/Anything Goes.jpg","jazz");
    Database.values.put(generateUUID(), m5);
    Database.values.put(generateUUID(), m6);
    Database.values.put(generateUUID(), m7);
    Database.values.put(generateUUID(), m8);
    
    var m9 = new Music("Kerosene","music/country/Kerosene.mp3","music/country/Kerosene.jpg","country");
    var m10 = new Music("Ticks","music/country/Ticks.mp3","music/country/Ticks.jpg","country");
    var m11 = new Music("What About Georgia","music/country/What About Georgia.mp3","music/country/What About Georgia.jpg","country");
    var m12 = new Music("Favorite State of Mind","music/country/Favorite State of Mind.mp3","music/country/Favorite State of Mind.jpg","country");
    Database.values.put(generateUUID(), m9);
    Database.values.put(generateUUID(), m10);
    Database.values.put(generateUUID(), m11);
    Database.values.put(generateUUID(), m12);
    
    var m13 = new Music("Czardas","music/classical/Czardas.mp3","music/classical/Czardas.jpg","classical");
    var m14= new Music("Main Theme","music/classical/Main Theme.mp3","music/classical/Main Theme.jpg","classical");
    var m15 = new Music("One-Winged Angel","music/classical/One-Winged Angel.mp3","music/classical/One-Winged Angel.jpg","classical");
    var m16 = new Music("Terra_S Theme (Final Fantasy VI)","music/classical/Terra_S Theme (Final Fantasy VI).mp3","music/classical/Terra_S Theme (Final Fantasy VI).jpg","classical");
    Database.values.put(generateUUID(), m13);
    Database.values.put(generateUUID(), m14);
    Database.values.put(generateUUID(), m15);
    Database.values.put(generateUUID(), m16);
    JukeBox.initialize();
    
}
function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};