

// DOM
var DOM = {};

DOM.create  = function(props) {

   this.props = props;
	 var properties = {
			tagName  : props.tag,
			text     : props.text,
			html     : props.html,
			styles   : props.styles,
			parent   : props.parent,
			child    : props.child,
		};
		let ed;

		ed = document.createElement(properties.tagName);
		( properties.html !== undefined ? ed.innerHTML = properties.html : '' );
		( properties.text !== undefined ? ed.textContent = properties.text : '' );

		// style
		if( properties.styles !== undefined ) {
			for (var key in properties.styles) {
				ed.style[key] = properties.styles[key];
			}
		}

	  if( properties.parent == 'body' ) {
			document.body.appendChild(ed);
		}

};


/*
 -- selector section
*/
var $ = function(selector) {
    if (!(this instanceof $)) {
        return new $(selector);
    }
		if ( typeof selector == "object" ) {
			this.el = [selector];
		} else {
			this.el = document.querySelectorAll(selector);
		}
		return this;
};

// set css property [css code v0.2]
// doc of this:
// $(element).css(property, value) or
// $(element).css({property1: value1, property2: value2,..3:..3})
$.prototype.css = function(prop, val) {
	this.el.forEach(function(element) {
			if(val === undefined) {
				Object.keys(prop).forEach(function(key) {
					element.style[key] = prop[key];
				});
			}
			else {
				element.style[prop] = val;
			}
	});
	return this;
};

// set property or chick property
$.prototype.attr = function(atr, val) {
	var attrib;
    this.el.forEach(function(element) {
			if( val !== undefined ) {
				element.setAttribute(atr, val);
			} else {
				attrib = hasAtrr( element, atr )
			}
		});
		return ( attrib === undefined ? this : attrib );
};
// helper
function hasAtrr(el, a) {
	'use strict';
	if( el.hasAttribute(a) ) { return true; }
	else { return false; }
}

// set & get text.
$.prototype.text = function(val) {
    var currentText;
    this.el.forEach(function(element) {
		if( val !== undefined ) {
			element.textContent = val;
		} else {
			currentText = element.textContent;
		}
	});
	return ( currentText === undefined ? this : currentText );
};

// set & get innerHTML
$.prototype.val = function(val) {
    var currentVal;
    this.el.forEach(function(element) {
		if( element.nodeName.toLowerCase() === 'input' ||  element.nodeName.toLowerCase() === 'textarea' ) {
			if( val !== undefined ) {
				element.value = val;
			} else {
				currentVal = element.value;
			}
		} else {
			console.log('This not \'TextFeild\', \'val()\' work only with input or textarea.');
		}
	});
	return ( currentVal === undefined ? this : currentVal );
};

// set(change) & get innerHTML
$.prototype.html = function(html) {
    var currentHtml;
    this.el.forEach(function(element) {
		if( html !== undefined ) {
			element.innerHTML = html;
		} else {
			currentHtml = element.innerHTML;
		}
	});
	return ( currentHtml === undefined ? this : currentHtml );
};

/*
------------------------
 -- append html or text
 --doc :
   $(element).append( my html as string );
------------------------
*/
$.prototype.append = function(item) {
	this.el.forEach(function(element) {
		element.innerHTML += item;
	});
	return this;
};

/*
----------------------
  --start event mothod
----------------------
*/
$.prototype.on = function(event, code) {
    this.el.forEach(function(element) {
        element.addEventListener(event, code);
    });
};

// set on click
$.prototype.click = function(code) {
    this.el.forEach(function(element) {
        element.addEventListener('click', code);
    });
};


/*
stylesheet fun part
-------------------
*/
// addClass
$.prototype.addClass = function(__className__) {
	this.el.forEach(function(element) {
		if(!element.classList.contains(__className__)){
			element.classList.add(__className__);
		}
	});
};

// remove class
$.prototype.removeClass = function(__className__) {
	this.el.forEach(function(element) {
		if(element.classList.contains(__className__)) {
			element.classList.remove(__className__);
		}
	});
};

// replace class
$.prototype.replaceClass = function(__className__, newClass) {
	this.el.forEach(function(element) {
		if(element.classList.contains(__className__)) {
			element.classList.replace(__className__, newClass);
		}
	});
};

// toggle
$.prototype.toggle = function(__className__) {
	this.el.forEach(function(element) {
		element.classList.toggle(__className__);
	});
};

// hasclass
$.prototype.hasClass = function(__className__) {
	var state;
	this.el.forEach(function(element) {
		if(element.classList.contains(__className__)) {
			state = true;
		} else {
			state = false;
		}
	});
	return state;
};


// set & get Height
$.prototype.Height = function(type, val) {
	var _height_;
	this.el.forEach(function(element) {
		if(val !== undefined && type === undefined) {
			element.style.height = val + "px";
		} else {
			if(type === undefined)
			{
				_height_ = element.offsetHeight;
			}
			else if (type == '-b')
			{
				_height_ = element.clientHeight;
			} else {
				_height_ = 'error';
				console.log("Height() getter accept one parametar only { '-b'= Height without border size } ");
			}
		}
	});
	return ( _height_ === undefined ? this : _height_ );
};

// set & get Height
$.prototype.Width = function(type, val) {
	var _width_;
	this.el.forEach(function(element) {
		if(val !== undefined) {
			element.style.width = val + "px";
		} else {
			_width_ = element.offsetWidth;
		}
	});
	return ( _width_ === undefined ? this : _width_ );
};
