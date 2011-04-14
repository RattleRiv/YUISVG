/*
 * Author: Tyler Pham, Gregory Kon
 * File: yui.js
 * Version: 0.1
 * Description: 
 *		This is the YUI-SVG Library used for rendering SVG Tiny 1.2 base profile as defined in the 
 *		W3C at http://www.w3.org/TR/SVGMobile12/
 *		This library will try to, at best, follow the specification in an OOP manner
 *		"Canvas" and "Stage" will be used hereafter as the same concept to what is referred to as 
 *		the base SVG object/document.
 *		"graphic" is the member of the Object that is the SVG element to be rendered on the stage.
 */
 
//-------------------------------------------------------------------------
// Initializations
//-------------------------------------------------------------------------
// Default namespaces
const SVG = "http://www.w3.org/2000/svg";
const XLINK = "http://www.w3.org/1999/xlink";
const XHTML = "http://www.w3.org/1999/xhtml";
const hotspot = "rgba(0,200,200,0.3)";

// canvas/drawing constants
const stage = window.document.documentElement; //get the svg element in the document

//-------------------------------------------------------------------------
// HELPERS
//-------------------------------------------------------------------------
/*
 * function: render(container, element)
 * pre: 	container is an SVG container type & container != element
 * post: 	returns 0 if successfully drawn the element to the container
 * 		 	returns -1 otherwise
 * @param: container - valid SVG container
 * @param: element - valid SVG element to be drawn in container (container != element)
 */
function render(container, element) {
	if(container != element) {
		if(container == stage) {
			container.appendChild(element.graphic);
		} else { // assuming only SVG element right now
			container.graphic.appendChild(element.graphic);
		}
	} else {
		alert("render error"); // needs to REALLY improve on the error message
	}
}

/*
 * function: createElement
 * description: creates an element with specified namespace and returns it
 * @param: NS - the Namespace
 * @param: type - the type of object to create
 * @param: [id] - the id of this element
 */
function createElement(NS, type, id) {
    var e = document.createElementNS(NS,type);
    if(id != null) { e.setAttribute("id", id); }
    return e;
}

// a simplification of the above for only SVG
function create(ob) {
	return createElement(SVG, ob.type, ob.id);
}

//-------------------------------------------------------------------------
// Declaring all base objects and prototypes necessary for SVG Objects
//-------------------------------------------------------------------------
// 
/* Class SVGObject
 */
function SVGObject(ob) {
	this.graphic = create({id: "", type: "SVGElement"});
	
	// setting defaults
	this.draggable = false;
	
	// Sets the SVG type
	this.setType = function(type) {
		this.graphic = create({type: type});
	}
	
	// this is a "better" simulated super call for subclasses
	if(ob != null) {
		for (var i in ob) {
			switch(i) {
				case "id":
				case "x":
				case "y":
				case "vector-effect":
					alert(i + ": " + ob[i]);
					this.graphic.setAttribute(i, ob[i]);
					break;
			  	default:
					break;
		  	}
   		}
	}
	
	// translates the x-y coords
	this.translate = function(x, y) {
		this.graphic.setAttribute("transform", "translate(" + x + "," + y + ")");
	}
	
	this.animate = function(ob) {
		var ani = create({id: ob.id, type: "animateTransform"}); 
	
		for(i in ob) {
			switch(i) {
				case "attributeName":
				case "type":
				case "begin":
				case "dur":
				case "fill":
				case "from":
				case "to":
					ani.setAttribute(i, ob[i]);
					break;
				default:
					break;
			}
		}
	
		this.graphic.appendChild(ani);
		ani.beginElementAt(ob.begin.replace("s", ""));
		ani.endElementAt(ob.dur.replace("s", "") + ob.begin.replace("s", ""));
	}
}

//=========================================================================
// W3C Specifications
//-------------------------------------------------------------------------
// CONTAINERS
//-------------------------------------------------------------------------
// Class Def : container object for definitions
Defs.prototype = new SVGObject();
Defs.prototype.constructor = Defs;
function Defs(ob) {
	this.setType("defs");
	this.initSuper(ob);
}

// Class Group : container to group SVG content
G.prototype = new SVGObject();
G.prototype.constructor = G;
function G(ob) {
	this.setType("g");
	this.initSuper(ob);
}
//-------------------------------------------------------------------------
// BASIC SHAPES
//-------------------------------------------------------------------------
/*
 * Class Rect()
 * description: creates a <rect>
 * @param: id - the id of the rect
 * @param: x - the x coordinate of rect
 * @param: y - the y coordinate of rect
 * @param: width - the width of the rect
 * @param: height - the height of the rect
 * @param: fill - the fill of the rect
 * @param: stroke - the stroke of the object
 * @param: stroke-width - the stroke-width of the object
 * @param: rx - the rounded corners x radius
 * @param: ry - the rounded corners y radius
 * @param: focusable - define if element can get keyboard focus
 */
Rect.prototype = new SVGObject();
Rect.prototype.constructor = Rect;
function Rect(ob) {
	SVGObject.call(this, ob);
	// create a new SVG rect element
  	this.setType("rect");

	for (i in ob) {
		switch(i) {
			case "fill":
			case "width":
			case "height":
			case "stroke":
			case "stroke-width":
			case "transform":
			case "rx":
			case "ry":
			case "focusable":
			case "stroke-linecap":
			case "stroke-linejoin":
			case "stroke-miterlimit":
			case "stroke-dasharray":
			case "stroke-dashoffset":
			case "stroke-opacity":
			case "vector-effect":
					this.graphic.setAttribute(i, ob[i]);
					break;
			default:
					break;
   		}		
	}
}
/*
 * Class Ellipse()
 * description: creates an <ellipse>
 * @param: id - the id of the ellipse
 * @param: rx - the x axis radius of ellipse
 * @param: ry - the y axis radius of ellipse
 * @param: fill - the fill of the ellipse
 * @param: stroke - the stroke of the object
 * @param: stroke-width - the stroke-width of the object
 * @param: cx - the x axis coordinate of the centre of the ellipse
 * @param: cy - the y axis coordinate of the centre of the ellipse
 * @param: focusable - define if element can get keyboard focus
 */
Ellipse.prototype = new SVGObject();
Ellipse.prototype.constructor = Ellipse;
function Ellipse(ob) {
   SVGObject.call(this, ob);
   // create a new SVG ellipse element
   this.setType("ellipse");
	
	for (i in ob) {
		switch(i) {
			case "rx":
			case "ry":
			case "fill":
			case "stroke":
			case "stroke-width":
			case "transform":
			case "cx":
			case "cy":
			case "focusable":
			case "stroke-linecap":
			case "stroke-linejoin":
			case "stroke-miterlimit":
			case "stroke-dasharray":
			case "stroke-dashoffset":
			case "stroke-opacity":
			case "vector-effect":
					this.graphic.setAttribute(i, ob[i]);
					break;
			default:
					break;
    	}		
	}
} 
/*
 * Class Circle()
 * description: creates a <circle>
 * @param: id - the id of the circle
 * @param: fill - the fill of the circle
 * @param: r - the radius of the circle
 * @param: stroke - the stroke of the object
 * @param: stroke-width - the stroke-width of the object
 * @param: cx - the rounded corners x radius
 * @param: cy - the rounded corners y radius
 */
Circle.prototype = new SVGObject();
Circle.prototype.constructor = Circle;
function Circle(ob) {
	SVGObject.call(this, ob);
	// create a new SVG circle element
  this.setType("circle");
	// default settings
	
	for (i in ob) {
		switch(i) {
			case "fill":
			case "r":
			case "stroke":
			case "stroke-width":
			case "transform":
			case "cx":
			case "cy":
			case "focusable":
			case "stroke-linecap":
			case "stroke-linejoin":
			case "stroke-miterlimit":
			case "stroke-dasharray":
			case "stroke-dashoffset":
			case "stroke-opacity":
			case "vector-effect":
					this.graphic.setAttribute(i, ob[i]);
					break;
			default:
					break;
      	}		
   	}
}
/*
* Class Line()
* description: creates a <line>
* @param: id - the id of the line
* @param: x1 - the x1 coordinate of line
* @param: y1 - the y1 coordinate of line
* @param: x2 - the x2 coordinate of line
* @param: y2 - the y2 coordinate of line
* @param: stroke - the stroke of the object
* @param: stroke-width - the stroke-width of the object
* @param: focusable - define if element can get keyboard focus
*/
Line.prototype = new SVGObject();
Line.prototype.constructor = Line;
function Line(ob) {
   SVGObject.call(this, ob);
	// create a new SVG line element
   this.setType("line");
	
	for (i in ob) {
		switch(i) {
			case "x1":
			case "y1":
            case "x2":
			case "y2":
			case "stroke":
			case "stroke-width":
			case "transform":
			case "focusable":
			case "stroke-linecap":
			case "stroke-linejoin":
			case "stroke-miterlimit":
			case "stroke-dasharray":
			case "stroke-dashoffset":
			case "stroke-opacity":
			case "vector-effect":
					this.graphic.setAttribute(i, ob[i]);
					break;
			default:
					break;
    	}		
	}
}

/*
* Class Polyline()
* description: creates a <Polyline>
* @param: id - the id of the Polyline
* @param: points - list of point coordinate that make up the poly Polyline
* @param: stroke - the stroke of the object
* @param: stroke-width - the stroke-width of the object
* @param: focusable - define if element can get keyboard focus
*/
Polyline.prototype = new SVGObject();
Polyline.prototype.constructor = Polyline;
function Polyline(ob) {
   SVGObject.call(this, ob);
	// create a new SVG line element
   this.setType("polyline");
   // fill is controlled here as a workaround
	// to the unwanted fill by default
	this.graphic.setAttribute("fill", "none");

	for (i in ob) {
		switch(i) {
			case "points":
			case "stroke":
			case "stroke-width":
			case "transform":
			case "focusable":
			case "stroke-linecap":
			case "stroke-linejoin":
			case "stroke-miterlimit":
			case "stroke-dasharray":
			case "stroke-dashoffset":
			case "stroke-opacity":
			case "vector-effect":
					this.graphic.setAttribute(i, ob[i]);
					break;
              case "fill":
                  if(i != "none")
                      this.graphic.setAttribute(i, ob[i]);
                  break;
			default:
					break;
   		}		
	}
}

/*
* Class Polygon()
* description: creates a <Polygon>
* @param: id - the id of the Polygon
* @param: points - list of point coordinate that make up the poly Polygon
* @param: fill - the fill of the circle
* @param: stroke - the stroke of the object
* @param: stroke-width - the stroke-width of the object
* @param: focusable - define if element can get keyboard focus
*/
Polygon.prototype = new SVGObject();
Polygon.prototype.constructor = Polygon;
function Polygon(ob) {
   SVGObject.call(this, ob);
	// create a new SVG line element
   this.setType("polygon");

	for (i in ob) {
		switch(i) {
			case "points":
              case "fill":
			case "stroke":
			case "stroke-width":
			case "transform":
			case "focusable":
			case "stroke-linecap":
			case "stroke-linejoin":
			case "stroke-miterlimit":
			case "stroke-dasharray":
			case "stroke-dashoffset":
			case "stroke-opacity":
			case "vector-effect":
					this.graphic.setAttribute(i, ob[i]);
					break;
			default:
					break;
   		}		
	}
}

/*
 * function: Text()
 * description: creates a <text> element
 * @param: id - the id of the text
 * @param: x - the x coordinate of text
 * @param: y - the y coordinate of text
 * @param: length - the length of all sides
 * @param: fill - the fill of the text
 */
Text.prototype = new SVGObject();
Text.prototype.constructor = Text;
function Text(ob) {
	this.setType("text");
	this.initSuper(ob);
	
	for (i in ob) {
		switch(i) {
			case "fill":
			case "font-size":
			case "transform":
			case "translate":
			case "editable":
			case "rotate":
			case "focusable":
					this.graphic.setAttribute(i, ob[i]);
					break;
			case "text": // create the "special" text (actual text) node
					this.graphic.appendChild(document.createTextNode(ob[i]));
      default:
        	break;
      }
   	}
}

//-------------------------------------------------------------------------
// EXPANSIONS TO SVG FOR ATSC-MH
//-------------------------------------------------------------------------
/*
 * Class Square()
 * Desc: Subclass of Rect() but constrains the width and height
 */
Square.prototype = new Rect();
Square.prototype.constructor = Square;
function Square(ob) {
	this.graphic.setAttribute("width", ob.length);
	this.graphic.setAttribute("height", ob.length);
}

/*
 * Class Button()
 * Desc: Inherits G() and contains Rect() and Text()
 */
Button.prototype = new G();
Button.prototype.constructor = Button;
function Button(ob) {
	this.setType("g"); // this is required otherwise subsequent calls will group into one larger <g>
	this.initSuper(ob);
	
	this.graphic.setAttribute("transform", "translate("+ob.x +"," + ob.y +")");
	render(this, new Rect({id: ob.id + "bg", y:0, x:0, fill: ob.fill, width: ob.width, height: ob.height, rx: ob.r, ry: ob.r}));R
	render(this, new Text({x: 5, y: ob.height/2 + 3,  fill: ob.textFill, "font-size": ob["font-size"], text: ob.text}))
	
	this.setEventHandler = function(evt, handler) {
		this.graphic.setAttribute(evt, handler);
	}
}

/* THIS NEEDS A REVISION
	function: Video()
	description: inserts a video into the foreignobject container and adds the fo to the rootNode container. All paramters with coordinates will be set on both fo and video
		-There is an offset so that the fo element's registration point is centered
	@param: rootNode - the container element to add fo to
	@param: id - the foreignobject's id
	@param: url - the link for the video
	@param: x - the x coordinate of the fo
	@param: y - the y coordinate of the fo
	@param: width - the width of the fo
	@param: height - the height of the fo
function Video(id, url, type, x, y, width, height, autoplay) {
	var g = document.createElementNS(SVG, "g");
	var fo = document.createElementNS(SVG, "foreignObject");
	var d = document.createElementNS(XHTML, "div");
	var video = document.createElementNS(XHTML, "video");
	
	d.setAttribute("style", "width: "+width+"px; height: " + height + "px; margin: 0 auto; text-align: center;position: relative");
	// set the group object
	g.setAttribute("id", "g"+id);
	g.setAttribute("transform", "translate(x,y)");
	// set the fo attributes
	fo.setAttribute("id", id);
	//fo.setAttribute("x", -(width/2));
	//fo.setAttribute("y", -(height/2));
	if(BrowserDetect.browser == "Safari") {
		fo.setAttribute("width", "100%");
		fo.setAttribute("height", "100%");
		fo.setAttribute("style", "margin: 0 auto; text-align: center; position: relative");
	} else {
		fo.setAttribute("x", 0);
		fo.setAttribute("y", 0);
		fo.setAttribute("width", width);
		fo.setAttribute("height", height);
	}
	
	fo.setAttribute("preserveAspectRatio", "xMinYMin slice");
	fo.setAttributeNS(XLINK, "href", url);
	
	// set the video attributes
	video.src = url;
	video.setAttribute("style", "display: block; margin: auto; overflow: hidden");
	video.setAttribute("id", id+"-video");
	
	if(BrowserDetect.browser == "Safari") {
		video.setAttribute("width", width*2);
		video.setAttribute("height", height*2);
	} else {
		video.setAttribute("width", width);
		video.setAttribute("height", height);
	}
	video.setAttribute("type", "video/"+type);
	if(autoplay == "true") {
		video.play();
		video.setAttribute("autoplay", "");
	}
	// add fo to g
	g.appendChild(fo);
	// add video to fo
	d.appendChild(video);
	fo.appendChild(d);
	g.setAttribute("transform", "translate("+x+","+y+")");
	return g;
}
*/

/* 
 * function: RULogo
 * description: draws our fancy RU logo
 * @param: [x] - the x coord
 * @param: [y] - the y coord
 * @param: [sx] - the x-scale
 * @param: [sy] - the y-scale
 */
function RULogo(x, y, sx, sy) {
    var i = 0;
    var logo = createElement(SVG,"g", "logo");
    var background = createElement(SVG,"g", "background");
    render(background, Rect("blue", 0,0,91.496,37,"#005A9C"));
    render(background, Rect("yellow", 91.423, 0, 12.157, 37, "#EFB310"));
    
    var whiteText = createElement(SVG, "g", "ryerson");
    var def = createElement(SVG, "defs");
    render(def, Rect("SVGID_1_", 0,0, 103.58, 37, "#005A9C"));
    render(whiteText, def);
    
    var clipPath = createElement(SVG, "clipPath", "SVGID_2_");
    var use = createElement(SVG, "use");
    use.setAttribute("xlink:href", "SVGID_1_");
    use.setAttribute("overflow", "visible");
    render(clipPath, use);
    render(whiteText, clipPath);
    
    var whiteTextPaths = new Array(
        "M63.168,13.308c0.543,0.679,0.814,1.71,0.814,3.093 c0,1.275-0.247,2.209-0.741,2.802c-0.493,0.592-1.118,0.887-1.876,0.887c-0.709,0-1.281-0.269-1.712-0.811 c-0.563-0.711-0.845-1.727-0.845-3.045c0-1.288,0.271-2.266,0.815-2.933c0.435-0.536,1.014-0.805,1.735-0.805 C62.129,12.497,62.732,12.768,63.168,13.308 M58.75,13.123c-0.874,0.81-1.31,1.858-1.31,3.141c0,1.256,0.378,2.279,1.135,3.069 c0.756,0.792,1.691,1.187,2.803,1.187c1.101,0,2.038-0.406,2.812-1.216c0.774-0.811,1.162-1.829,1.162-3.058 c0-1.192-0.385-2.187-1.153-2.983c-0.769-0.797-1.678-1.195-2.726-1.195C60.417,12.067,59.51,12.419,58.75,13.123",
        "M38.271,12.242h-0.839l-2.635,4.136l-1.201-1.871l-1.499-2.265h-1.308 l3.124,4.811v1.892c0,0.141-0.005,0.264-0.013,0.374v1.026h1.166v-1.165l-0.006-0.236V16.88l1.95-3.043 c0.239-0.387,0.44-0.667,0.604-0.838c0.163-0.172,0.344-0.304,0.543-0.396l0.115-0.049V12.242z",
        "M51.299,19.994c-0.17-0.054-0.322-0.124-0.453-0.207 c-0.275-0.176-0.604-0.531-0.986-1.066l-1.678-2.317c0.679-0.152,1.18-0.411,1.503-0.778c0.323-0.367,0.485-0.799,0.485-1.297 c0-0.466-0.143-0.868-0.427-1.205c-0.285-0.337-0.632-0.568-1.039-0.694c-0.408-0.125-1.043-0.188-1.903-0.188h-1.772v8.103h1.146 v-1.028c-0.01-0.119-0.017-0.252-0.017-0.404v-2.356l0.183,0.009l0.164,0.003c0.126,0,0.288-0.003,0.488-0.012l0.346,0.475h0.022 v0.031l2.388,3.283h1.551V19.994z M46.49,16.181l-0.136-0.003l-0.196-0.003v-3.343c0.391-0.085,0.7-0.128,0.928-0.128 c0.517,0,0.932,0.158,1.245,0.474c0.313,0.315,0.471,0.725,0.471,1.229c0,0.516-0.195,0.941-0.583,1.274 C47.831,16.014,47.254,16.181,46.49,16.181",
        "M31.978,19.994c-0.17-0.054-0.322-0.124-0.453-0.207 c-0.275-0.176-0.604-0.531-0.986-1.066l-1.678-2.317c0.678-0.152,1.18-0.411,1.503-0.778c0.323-0.367,0.485-0.799,0.485-1.297 c0-0.466-0.143-0.868-0.427-1.205c-0.285-0.337-0.632-0.568-1.04-0.694c-0.408-0.125-1.042-0.188-1.902-0.188h-1.772v8.103h1.146 v-1.028c-0.01-0.119-0.016-0.252-0.016-0.404v-2.356l0.182,0.009l0.165,0.003c0.125,0,0.287-0.003,0.487-0.012l0.346,0.475h0.022 v0.031l2.388,3.283h1.55V19.994z M27.168,16.181l-0.136-0.003l-0.195-0.003v-3.343c0.39-0.085,0.7-0.128,0.928-0.128 c0.517,0,0.931,0.158,1.244,0.474c0.314,0.316,0.471,0.725,0.471,1.229c0,0.516-0.194,0.941-0.583,1.274 S27.933,16.181,27.168,16.181",
        "M56.684,17.246c-0.162-0.288-0.386-0.534-0.672-0.738 s-0.814-0.495-1.584-0.868c-0.944-0.459-1.546-0.832-1.804-1.121c-0.18-0.195-0.274-0.417-0.284-0.662 c-0.014-0.322,0.109-0.614,0.369-0.877c0.259-0.263,0.594-0.404,1.007-0.42c0.365-0.015,1.134,0.046,1.483,0.219 c0.348,0.173,0.622,0.415,0.819,0.726c0.113,0.179,0.207,0.4,0.287,0.652l0.303-0.013l-0.013-1.363l-1.186-0.479 c-0.466-0.173-1.318-0.237-1.729-0.22c-0.688,0.028-1.245,0.261-1.672,0.698c-0.428,0.438-0.629,0.947-0.606,1.527 c0.014,0.334,0.103,0.637,0.265,0.909c0.163,0.272,0.396,0.518,0.698,0.736c0.303,0.219,0.808,0.505,1.516,0.862 c0.708,0.355,1.142,0.59,1.3,0.703c0.237,0.166,0.413,0.349,0.53,0.546c0.118,0.198,0.18,0.398,0.188,0.597 c0.015,0.358-0.117,0.674-0.394,0.949c-0.278,0.275-0.664,0.422-1.16,0.443c-0.429,0.017-1.033-0.054-1.399-0.231 c-0.368-0.178-0.645-0.408-0.832-0.69c-0.113-0.172-0.215-0.405-0.306-0.688l-0.315,0.014l0.005,1.276 c0,0,0.756,0.398,1.528,0.609c0.242,0.067,0.7,0.127,0.803,0.139c0.208,0.028,0.428,0.037,0.663,0.027 c0.748-0.03,1.35-0.277,1.806-0.738c0.457-0.463,0.673-1,0.647-1.611C56.933,17.837,56.847,17.534,56.684,17.246",
        "M42.52,19.893c-0.099,0.004-0.204,0.007-0.318,0.007h-1.625 c-0.223,0-0.374-0.024-0.452-0.069l-0.167-0.184c-0.032-0.078-0.047-0.296-0.047-0.655v-2.673l3.263,0.001v-0.454l-3.263,0.007 v-3.184h2.219c0.402,0,0.683,0.031,0.843,0.09c0.198,0.084,0.348,0.206,0.45,0.366c0.041,0.064,0.079,0.155,0.117,0.263h0.372 l-0.052-1.165h-5.099v8.103h5.342l0.003-0.009v-0.443H42.52z",
        "M71.624,12.242l0.017,6.056l-4.954-6.056h-0.605v8.103h1.077v-0.262 c-0.161-0.039-0.291-0.106-0.386-0.211c-0.109-0.122-0.164-0.432-0.164-0.927v-4.994l5.341,6.527h0.215v-6.834 c0-0.452,0.044-0.742,0.134-0.868c0.088-0.127,0.219-0.209,0.384-0.259v-0.274H71.624z",
        "M85.968,21.923l-2.635,4.134l-1.202-1.87l-1.498-2.264h-0.324h-0.984h-5.638 l-0.021,0.518h1.457c0.095-0.005,0.197-0.009,0.313-0.009h0.973v4.406h0.003v3.187h1.134l0.009-7.593h1.135 c0.333,0,0.616,0.04,0.832,0.116c0.217,0.073,0.423,0.326,0.423,0.326l2.506,3.86v1.891c0,0.142-0.006,0.265-0.015,0.375v1.026 H83.6v-1.165l-0.005-0.236v-2.063l1.95-3.045c0.238-0.386,0.439-0.666,0.604-0.837c0.162-0.172,0.344-0.303,0.543-0.395 l0.114-0.049v-0.312H85.968z",
        "M73.172,21.923h-1.686v8.103h1.146v-4.292h0.013v-2.378 c0-0.485,0.049-0.791,0.149-0.918c0.09-0.119,0.219-0.196,0.377-0.242V21.923z",
        "M51.209,21.923h-0.757l-1.021,2.417l-0.002-0.013l-1.655,4.047l-2.062-4.752 l-0.008-0.019l-0.769-1.68h-1.219l0.37,0.851c0.057,0.112,0.126,0.262,0.209,0.453l3.025,6.974h0.247l2.816-6.89 c0.163-0.4,0.351-0.697,0.562-0.892c0.07-0.063,0.16-0.117,0.264-0.162V21.923z",
        "M32.614,21.923h-1.051v2.411h-0.011v2.296c0,0.86-0.076,1.469-0.229,1.829 c-0.154,0.36-0.44,0.656-0.859,0.886c-0.418,0.23-0.893,0.346-1.423,0.346c-0.415,0-0.764-0.073-1.049-0.221 s-0.504-0.335-0.655-0.561c-0.152-0.226-0.256-0.543-0.314-0.948c-0.058-0.406-0.087-0.766-0.087-1.08v-3.526 c0-0.107,0.003-0.204,0.008-0.293v-1.14H25.79v2.411h0v2.182c0,0.975,0.063,1.638,0.192,1.992c0.19,0.517,0.514,0.928,0.972,1.234 c0.457,0.306,1.127,0.459,2.011,0.459c0.811,0,1.452-0.161,1.924-0.48c0.471-0.32,0.787-0.703,0.948-1.15 c0.161-0.446,0.242-1.076,0.242-1.887v-3.28c0-0.449,0.042-0.736,0.125-0.858c0.107-0.167,0.246-0.275,0.411-0.338V21.923z",
        "M42.921,21.923h-1.709v8.103h1.146v-4.292h0.012v-2.378 c0-0.485,0.049-0.791,0.149-0.918c0.096-0.124,0.233-0.205,0.401-0.25V21.923z",
        "M64.714,29.674c-0.169-0.054-0.321-0.123-0.452-0.206 c-0.275-0.176-0.604-0.531-0.987-1.066l-1.678-2.317c0.68-0.152,1.181-0.412,1.504-0.777c0.323-0.368,0.485-0.799,0.485-1.298 c0-0.466-0.142-0.869-0.427-1.206c-0.285-0.336-0.631-0.567-1.039-0.692s-1.042-0.188-1.903-0.188h-1.773v8.103h1.146v-1.028 c-0.01-0.119-0.015-0.252-0.015-0.405v-2.355l0.181,0.008l0.166,0.003c0.125,0,0.288-0.004,0.487-0.012l0.345,0.474h0.023v0.031 l2.388,3.283h1.55V29.674z M59.905,25.861l-0.137-0.002l-0.194-0.002v-3.344c0.39-0.084,0.698-0.127,0.928-0.127 c0.516,0,0.931,0.158,1.244,0.473c0.313,0.316,0.471,0.725,0.471,1.229c0,0.516-0.194,0.942-0.583,1.275 C61.247,25.694,60.67,25.861,59.905,25.861",
        "M55.677,29.574c-0.098,0.005-0.204,0.007-0.317,0.007h-1.625 c-0.223,0-0.374-0.023-0.452-0.069l-0.167-0.185c-0.033-0.078-0.047-0.295-0.047-0.655v-2.673l3.264,0v-0.453l-3.264,0.006v-3.184 h2.219c0.401,0,0.683,0.03,0.841,0.089c0.199,0.085,0.349,0.206,0.451,0.366c0.04,0.064,0.079,0.156,0.117,0.263h0.371 l-0.051-1.164h-5.099v8.103h5.341l0.002-0.008v-0.444H55.677z",
        "M70.25,26.926c-0.162-0.288-0.385-0.534-0.671-0.739 c-0.286-0.205-0.815-0.494-1.584-0.869c-0.945-0.458-1.546-0.832-1.805-1.12c-0.178-0.195-0.274-0.416-0.284-0.662 c-0.014-0.321,0.109-0.614,0.369-0.877c0.258-0.264,0.596-0.404,1.007-0.421c0.367-0.015,1.135,0.047,1.484,0.219 c0.349,0.173,0.622,0.416,0.819,0.727c0.114,0.179,0.208,0.399,0.287,0.652l0.303-0.014l-0.012-1.363l-1.186-0.479 c-0.466-0.172-1.318-0.236-1.729-0.22c-0.688,0.028-1.246,0.261-1.673,0.699c-0.428,0.438-0.629,0.948-0.605,1.528 c0.013,0.333,0.101,0.637,0.265,0.907c0.162,0.274,0.395,0.519,0.697,0.737c0.303,0.219,0.808,0.505,1.515,0.861 c0.709,0.356,1.143,0.59,1.301,0.703c0.236,0.166,0.413,0.348,0.529,0.546c0.118,0.198,0.18,0.397,0.188,0.596 c0.015,0.359-0.117,0.675-0.395,0.95c-0.275,0.275-0.663,0.423-1.159,0.442c-0.429,0.018-1.033-0.054-1.4-0.23 c-0.367-0.178-0.645-0.408-0.832-0.69c-0.113-0.172-0.214-0.406-0.306-0.689l-0.316,0.016l0.006,1.275 c0,0,0.755,0.397,1.527,0.609c0.242,0.067,0.7,0.127,0.803,0.139c0.208,0.028,0.429,0.037,0.664,0.027 c0.747-0.031,1.349-0.277,1.807-0.739c0.457-0.462,0.672-0.999,0.647-1.61C70.499,27.518,70.411,27.214,70.25,26.926",
        "M39.078,21.923l0.017,6.056l-4.953-6.056h-0.605v8.103h1.077v-0.263 c-0.16-0.039-0.291-0.106-0.386-0.21c-0.109-0.122-0.163-0.433-0.163-0.928v-4.993l5.34,6.525h0.215v-6.833 c0-0.452,0.045-0.742,0.133-0.868c0.089-0.127,0.221-0.21,0.386-0.26v-0.273H39.078z"
    );
    
    length = whiteTextPaths.length;
    
    for(i = 0; i < length; i++) {
        var path = createElement(SVG, "path");
        path.setAttribute("fill", "#FFFFFF");
        path.setAttribute("d", whiteTextPaths[i]);
        render(whiteText, path);
    }
    
    var blueText = createElement(SVG, "g");
    blueText.setAttribute("id", "blueText");
    
    var blueTextPaths= new Array(
        "M108.049,7.958l-0.84,2.542h-1.079l2.759-8.083h1.247l2.759,8.083h-1.115l-0.864-2.542H108.049z M110.711,7.142l-0.803-2.327c-0.181-0.527-0.3-1.007-0.42-1.475h-0.024c-0.12,0.468-0.239,0.972-0.407,1.463l-0.792,2.338 H110.711z",
        "M114.708,3.304h-2.458V2.417h5.984v0.887h-2.471V10.5h-1.056V3.304z",
        "M118.945,9.229c0.468,0.3,1.14,0.528,1.859,0.528c1.067,0,1.691-0.563,1.691-1.379 c0-0.743-0.433-1.187-1.523-1.595c-1.319-0.48-2.135-1.176-2.135-2.303c0-1.259,1.043-2.195,2.614-2.195 c0.815,0,1.428,0.192,1.775,0.396l-0.288,0.852c-0.252-0.156-0.792-0.384-1.523-0.384c-1.104,0-1.523,0.66-1.523,1.211 c0,0.755,0.492,1.127,1.607,1.559c1.367,0.528,2.051,1.188,2.051,2.375c0,1.248-0.911,2.339-2.818,2.339 c-0.779,0-1.631-0.24-2.062-0.528L118.945,9.229z",
        "M130.631,10.248c-0.372,0.192-1.151,0.384-2.135,0.384c-2.279,0-3.982-1.439-3.982-4.102 c0-2.542,1.715-4.246,4.222-4.246c0.995,0,1.644,0.216,1.919,0.36l-0.264,0.852c-0.384-0.192-0.947-0.336-1.619-0.336 c-1.895,0-3.154,1.211-3.154,3.334c0,1.991,1.14,3.25,3.095,3.25c0.647,0,1.295-0.132,1.715-0.336L130.631,10.248z",
        "M134.364,6.878v0.768h-2.963V6.878H134.364z",
        "M142.449,6.95c-0.061-1.127-0.131-2.495-0.131-3.49h-0.025c-0.287,0.936-0.611,1.955-1.02,3.07 l-1.427,3.922h-0.791l-1.319-3.85c-0.384-1.151-0.696-2.183-0.924-3.142h-0.024c-0.023,1.007-0.084,2.351-0.155,3.574 l-0.216,3.466h-0.996l0.564-8.083h1.331l1.379,3.91c0.336,0.996,0.6,1.883,0.815,2.723h0.024c0.216-0.815,0.504-1.703,0.863-2.723 l1.439-3.91h1.332l0.502,8.083h-1.031L142.449,6.95z",
        "M146.328,2.417v3.382h3.91V2.417h1.055V10.5h-1.055V6.71h-3.91v3.79h-1.055V2.417H146.328z",
        "M112.379,21.248c-0.372,0.192-1.151,0.384-2.135,0.384c-2.279,0-3.982-1.439-3.982-4.102 c0-2.542,1.715-4.246,4.222-4.246c0.995,0,1.644,0.216,1.919,0.36l-0.264,0.852c-0.384-0.192-0.947-0.336-1.619-0.336 c-1.895,0-3.154,1.211-3.154,3.334c0,1.991,1.14,3.25,3.095,3.25c0.647,0,1.295-0.132,1.715-0.336L112.379,21.248z",
        "M118.799,18.55c0,2.146-1.499,3.082-2.891,3.082c-1.56,0-2.782-1.151-2.782-2.986 c0-1.931,1.283-3.07,2.878-3.07C117.671,15.575,118.799,16.787,118.799,18.55z M114.205,18.609c0,1.271,0.72,2.231,1.751,2.231 c1.008,0,1.763-0.947,1.763-2.255c0-0.983-0.491-2.219-1.738-2.219C114.745,16.367,114.205,17.518,114.205,18.609z",
        "M120.134,17.266c0-0.611-0.013-1.091-0.049-1.571h0.936l0.061,0.959h0.023 c0.288-0.54,0.96-1.08,1.919-1.08c0.804,0,2.051,0.48,2.051,2.471V21.5h-1.055v-3.346c0-0.936-0.348-1.715-1.344-1.715 c-0.684,0-1.224,0.492-1.415,1.079c-0.048,0.132-0.072,0.312-0.072,0.492v3.49h-1.055V17.266z",
        "M128.028,14.304v1.392h1.512v0.803h-1.512v3.13c0,0.72,0.204,1.127,0.792,1.127 c0.288,0,0.456-0.024,0.611-0.072l0.048,0.803c-0.203,0.072-0.527,0.144-0.936,0.144c-0.491,0-0.887-0.168-1.139-0.444 c-0.288-0.324-0.408-0.839-0.408-1.523v-3.167h-0.899v-0.803h0.899v-1.08L128.028,14.304z",
        "M131.244,18.79c0.024,1.427,0.924,2.015,1.991,2.015c0.756,0,1.224-0.132,1.607-0.3l0.191,0.756 c-0.372,0.168-1.02,0.372-1.942,0.372c-1.787,0-2.854-1.188-2.854-2.938s1.031-3.118,2.723-3.118c1.906,0,2.398,1.655,2.398,2.723 c0,0.216-0.013,0.372-0.036,0.492H131.244z M134.339,18.034c0.012-0.66-0.276-1.703-1.463-1.703c-1.08,0-1.535,0.971-1.619,1.703 H134.339z",
        "M136.67,17.266c0-0.611-0.013-1.091-0.049-1.571h0.936l0.061,0.959h0.023c0.288-0.54,0.96-1.08,1.919-1.08 c0.804,0,2.052,0.48,2.052,2.471V21.5h-1.056v-3.346c0-0.936-0.349-1.715-1.344-1.715c-0.684,0-1.224,0.492-1.415,1.079 c-0.048,0.132-0.072,0.312-0.072,0.492v3.49h-1.055V17.266z",
        "M144.564,14.304v1.392h1.512v0.803h-1.512v3.13c0,0.72,0.205,1.127,0.791,1.127 c0.289,0,0.457-0.024,0.613-0.072l0.047,0.803c-0.203,0.072-0.527,0.144-0.936,0.144c-0.492,0-0.887-0.168-1.139-0.444 c-0.289-0.324-0.408-0.839-0.408-1.523v-3.167h-0.898v-0.803h0.898v-1.08L144.564,14.304z",
        "M112.906,32.14c-0.468,0.18-1.403,0.444-2.495,0.444c-1.223,0-2.23-0.312-3.021-1.067 c-0.696-0.672-1.128-1.751-1.128-3.01c0-2.411,1.667-4.174,4.378-4.174c0.936,0,1.679,0.204,2.026,0.372l-0.264,0.852 c-0.432-0.204-0.972-0.348-1.787-0.348c-1.967,0-3.25,1.223-3.25,3.25c0,2.051,1.224,3.262,3.118,3.262 c0.684,0,1.151-0.096,1.392-0.216v-2.411h-1.631v-0.839h2.662V32.14z",
		"M114.458,28.506c0-0.684-0.013-1.271-0.049-1.811h0.924l0.048,1.151h0.036 c0.264-0.78,0.911-1.271,1.619-1.271c0.108,0,0.192,0.012,0.288,0.024v0.996c-0.108-0.024-0.216-0.024-0.36-0.024 c-0.743,0-1.271,0.552-1.415,1.343c-0.023,0.144-0.036,0.324-0.036,0.492V32.5h-1.055V28.506z",
        "M123.515,29.55c0,2.146-1.499,3.082-2.891,3.082c-1.56,0-2.782-1.151-2.782-2.986 c0-1.931,1.283-3.07,2.878-3.07C122.387,26.575,123.515,27.787,123.515,29.55z M118.921,29.609c0,1.271,0.72,2.231,1.751,2.231 c1.008,0,1.763-0.947,1.763-2.255c0-0.983-0.491-2.219-1.738-2.219C119.461,27.367,118.921,28.518,118.921,29.609z",
        "M129.706,30.905c0,0.612,0.013,1.14,0.049,1.595h-0.936l-0.061-0.947h-0.023 c-0.265,0.468-0.888,1.079-1.919,1.079c-0.912,0-2.003-0.516-2.003-2.542v-3.394h1.055v3.202c0,1.104,0.349,1.859,1.296,1.859 c0.707,0,1.199-0.492,1.391-0.971c0.061-0.144,0.097-0.336,0.097-0.54v-3.55h1.055V30.905z",
        "M131.462,28.59c0-0.744-0.024-1.343-0.049-1.895h0.936l0.061,0.995h0.023 c0.42-0.708,1.115-1.115,2.063-1.115c1.415,0,2.471,1.188,2.471,2.938c0,2.087-1.283,3.118-2.651,3.118 c-0.768,0-1.438-0.336-1.786-0.912h-0.024v3.154h-1.043V28.59z M132.505,30.137c0,0.156,0.012,0.3,0.048,0.432 c0.192,0.732,0.828,1.235,1.583,1.235c1.115,0,1.764-0.911,1.764-2.243c0-1.151-0.612-2.146-1.728-2.146 c-0.72,0-1.403,0.503-1.595,1.295c-0.036,0.132-0.072,0.288-0.072,0.42V30.137z"
        );
        
    length = blueTextPaths.length;
    
    for(i = 0; i < length; i++) {
        var path = createElement(SVG, "path");
        path.setAttribute("fill", "#005A9C");
        path.setAttribute("d", blueTextPaths[i]);
        render(blueText, path);
    }
    // draw everything to stage
    render(logo, background);
    render(logo, whiteText);
    render(logo, blueText);
    
	// check for parameters
	if((x != null) && (y != null)) { logo.setAttribute("transform", "translate("+x+","+y+")"); }
	else if(x != null) { logo.setAttribute("transform", "translate("+x+")"); }
	
	if((sx != null) && (sy != null)) { logo.setAttribute("transform", logo.getAttribute("transform") + " scale("+sx+","+sy+")"); }

    return logo;
}