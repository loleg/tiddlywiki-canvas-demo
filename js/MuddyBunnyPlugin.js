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

// Adapted from PSD's ProcessingCanvas
config.macros.Canvas = {
	counter: 0,
	handler: function (place,macroName,params,wikifier,paramString,tiddler) {
		var id = "mudbuncanvas" + this.counter;
		var canvas = createTiddlyElement(place,"canvas",id);

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

/*
		createTiddlyElement(place,"br");
		var restartBtn = createTiddlyButton(place,"restart","restart",function() {
				story.refreshTiddler(tiddler.title,null,true);
				return false;
			},
			'processingRestart' // it's a class so you can style the button
		);
*/
		runCanvasScript(canvas,code);
	}
};

// Kindly provided by Matt
function imageFromUrl(url) {
	var img = document.createElement('img')
	img.src = url;
	return img;
}

function runCanvasScript(canvas, program) {
	ctx = canvas.getContext('2d');

	function drawImageFromUrl(url, x, y) {
		ctx.drawImage(imageFromUrl(url), x || 0, y || 0);
	}

	eval(program);
}

/*
config.parsers.mudbunFormatter = new Formatter(config.mudbunFormatters);
config.parsers.mudbunFormatter.format = 'example';
config.parsers.mudbunFormatter.formatTag = 'ExampleFormat';
*/
} // end of 'install only once'
//}}}


