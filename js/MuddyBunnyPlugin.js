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

mudbunFormatter = {}; // 'namespace' for local functions

mudbunDebug = function(out,str)
{
	createTiddlyText(out,str.replace(/\n/mg,'\\n').replace(/\r/mg,'RR'));
	createTiddlyElement(out,'br');
};

config.parsers.mudbunFormatter = new Formatter(config.mudbunFormatters);
config.parsers.mudbunFormatter.format = 'example';
config.parsers.mudbunFormatter.formatTag = 'ExampleFormat';

} // end of 'install only once'
//}}}


