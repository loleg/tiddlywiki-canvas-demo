/***
|''Name:''|MuddyBunnyPlugin|
|''Description:''|Format Tiddler content into a Canvas object|
|''Author:''|Oleg Lavrovsky (lavrovsky (at) gmail (dot) com)|
|''Source:''|http://github.com/loleg/MuddyBunny|
|''Requires''||
|''Version:''|0.0.1|
|''Date:''|June 7, 2009|
|''Comments:''|Please make comments at /dev/null |
|''License:''|[[Creative Commons Attribution-ShareAlike 2.5 License|http://creativecommons.org/licenses/by-sa/2.5/]]|
|''~CoreVersion:''|2.1.0|

***/

//{{{
// Ensure that the plugin is only installed once
if(!version.extensions.MuddyBunnyPlugin) {
version.extensions.MuddyBunnyPlugin = {installed:true};

if(version.major < 2 || (version.major == 2 && version.minor < 1))
	{alertAndThrow('MuddyBunnyPlugin requires TiddlyWiki 2.1 or later.');}

// mudbunFormatter = {}; // 'namespace' for local functions

mudbunDebug = function(out,str)
{
	createTiddlyText(out,str.replace(/\n/mg,'\\n').replace(/\r/mg,'RR'));
	createTiddlyElement(out,'br');
};

mudbunConfig = {
	orderTiddler: "Order",
	currentTiddler: ""
};	

// Adapted from PSD's ProcessingCanvas
config.macros.Canvas = {
	counter: 0,
	handler: function (place,macroName,params,wikifier,paramString,tiddler) {
		var id = "mudbunCanvas" + this.counter;

		// inlined code
		var code = paramString;

		// quick and dirty grab of code from a named tiddler
		if (store.tiddlerExists(params[0])) {
			code = store.getTiddlerText(params[0]);
		}

		// or with no params, grab code from this tiddler
		if (paramString.trim() == '') {
			code = tiddler.text;
		}

		mudbunConfig.currentTiddler = tiddler.title;

		var nextBunny = getNextBunny(this);
		if (nextBunny != null) {
			createTiddlyButton(place,"Continue","next",function() {	
				switchBunny(nextBunny);			
				return false;
			}, 'mudbunButton' // class for styling the button
			);
		}

		var prevBunny = getPrevBunny(this);
		if (prevBunny != null) {
			createTiddlyButton(place,"Previous","prev",function() {	
				switchBunny(prevBunny);
				return false;
			}, 'mudbunButton' // class for styling the button
			);
		}

		createTiddlyElement(place,"br");

		// Creates the Canvas object
		var canvas = createTiddlyElement(place,"canvas",id);

		runCanvasScript(canvas,code);
	}
};

// Kindly provided by Matt
function runCanvasScript(canvas, program) {
	ctx = canvas.getContext('2d');
	eval(program);
}

// Retrieves the next tiddler to go to
function getNextBunny() {
	return findBunny(1);
}

// Retrieves the previous tiddler to go to
function getPrevBunny() {
	return findBunny(-1);
}

// Switches current presentation slide
function findBunny(switchDirection) {

	// Get ordering tiddler
	if (!store.tiddlerExists(mudbunConfig.orderTiddler)) {
		alert("Please create an 'Order' tiddler for your presentation");
		return null;
	}
	var bunnyArray = store.getTiddlerText(mudbunConfig.orderTiddler).split("\n");

	// Find current and return next
	for (var i = (switchDirection) ? 0 : 1; 
		 i < bunnyArray.length - switchDirection; 
		 i++) {
		if (bunnyArray[i] == mudbunConfig.currentTiddler) {
			// Return the next target
			return bunnyArray[i + switchDirection];
		}
	}

	// No next bunny available
	return null;
}

// Switches the shown tiddlers
function switchBunny(nextBunny) {
	// Close currently displayed
	story.closeTiddler(mudbunConfig.currentTiddler,false,false);
	// Return the next one 
	story.displayTiddler(null, nextBunny);
}

/*
config.parsers.mudbunFormatter = new Formatter(config.mudbunFormatters);
config.parsers.mudbunFormatter.format = 'example';
config.parsers.mudbunFormatter.formatTag = 'ExampleFormat';
*/
} // end of 'install only once'
//}}}


