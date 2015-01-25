# CCT

Lastly, there’s the lib folder, which is the place for adding your JS files that you need loaded first. The order in which files get loaded are as follows; 
first the lib folder gets read, from the inside out. This means sub-directories get loaded before parent directories, and the order in directories that 
files get loaded is alphabetical, except for files named main.js . If a file is named main.js , it gets loaded after everything else. 
After the lib folder is done, Meteor continues to the rest of the files, excluding the client folder on the server, and the server folder on the client. 
The rest of the folders follow the same rules as the lib folder, so nested directories first, alphabetically loaded, and main.js files come last.

Collaborative Campaign Tool
GRAVITEAM by SPACEBUFFS

CU BOULDER '14-'15 Sr. Design Projects
A Proof of Concept for JPL

Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver

Version 2.01
1/25/2015

