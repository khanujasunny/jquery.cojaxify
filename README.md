

#DEMO
	http://www.logical-brains.com/projects/jquery.cojaxify

    

#OPTIONS:
 	data-cojaxify		: [REQUIRED] include this attribute in any anchor tag to load data from ajax
	data-url			: [REQUIRED]  URL or link from where we need to load content
							Eg : sampledata/books.html , http://w3schools.com/xml/simple.xml , sampledata/books.json
	data-target			: [REQUIRED]  ID of container where we need to load content
	data-type			: [OPTIONAL] type of content to load. Eg. : xml , json , html    	
	data-section		: [OPTIONAL] in case of xml or html , mention this to load perticular part from ajax loaded content
	data-script			: [OPTIONAL] Callback script incase of successful ajax call.
	data-animation		: [OPTIONAL] aniamte target . Possible values : fade | slide
	data-speed			: [OPTIONAL] animation speed. Possible values in milliseconds. Possible values : 1000 , 2000 , slow , fast


#USAGE : 
	<a href="#" data-cojaxify data-url="sampledata/books.html" data-target="DivCenter" data-section="p">2. all P tag from books.html</a>
    <a href="#" data-cojaxify data-url="sampledata/books.html" data-target="DivCenter" data-type="html" data-script="showalert">6 . Load data with Dynamic Script call</a>
    <a href="#" data-cojaxify data-url="sampledata/books.json" data-target="DivCenter" data-type="json">8 . Load json from books.json</a>
    <a href="#" data-cojaxify data-url="http://w3schools.com/xml/simple.xml" data-target="DivCenter" data-type="xml">12 . Load xml from another domain</a>



#DEPENDENCY : 
	jquery.js
	vkbeautify.0.99.js : to keep xml or json well formatted