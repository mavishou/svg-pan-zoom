svg-pan-zoom library
==========================

Simple pan/zoom solution for SVGs in HTML. It adds events listeners for mouse scroll, double-click and pan, plus it optionally offers:
  * JavaScript API for control of pan and zoom behavior
  * onPan and onZoom event handlers
  * On-screen zoom controls

It works cross-browser and supports both inline SVGs and SVGs in HTML 'object' or 'embed' elements.

Demos
-----
 Pan and zoom the SVG tiger on github pages:
 * [Single Inline SVG](http://ariutta.github.io/svg-pan-zoom/demo/inline.html)
 * [Multiple Inline SVGs](http://ariutta.github.io/svg-pan-zoom/demo/multi-instance.html)
 * [SVG Inserted with 'Embed' Element](http://ariutta.github.io/svg-pan-zoom/demo/embed.html)
 * [SVG Inserted with 'Object' Element](http://ariutta.github.io/svg-pan-zoom/demo/object.html)
 * [SVG Inserted with 'Img' Element](http://ariutta.github.io/svg-pan-zoom/demo/img.html) (These cannot be panned/zoomed.)
 * [SVG With custom controls](http://ariutta.github.io/svg-pan-zoom/demo/custom-controls.html)
 * [Resize SVG container on document resize](http://ariutta.github.io/svg-pan-zoom/demo/resize.html)
 * [Two SVGs with sinchronized zooming and panning](http://ariutta.github.io/svg-pan-zoom/demo/sinchronized.html)

How To Use
----------

1) Ensure the target SVG has a top-level 'g' element with the class 'viewport' to enable zooming for the entire SVG:

```xml
<g class="viewport"></g>
```

If the target SVG does not have this element, the library will create it.

2) Reference the [svg-pan-zoom.js file](http://ariutta.github.io/svg-pan-zoom/dist/svg-pan-zoom.min.js) from your HTML document. Then call the init method:

```js
var panZoomTiger = svgPanZoom('#demo-tiger');
// or
var svgElement = document.querySelector('#demo-tiger')
var panZoomTiger = svgPanZoom(svgElement)
```

First argument to function should be a CSS selector of SVG element or a DOM Element.

If you want to override the defaults, you can optionally specify one or more arguments:

```js
svgPanZoom.init('#demo-tiger', {
  panEnabled: true
, controlIconsEnabled: false
, zoomEnabled: true
, dblClickZoomEnabled: true
, zoomScaleSensitivity: 0.2
, minZoom: 0.5
, maxZoom: 10
, fit: true
, center: true
, refreshRate: 'auto'
, beforeZoom: function(){}
, onZoom: function(){}
, beforePan: function(){}
, onPan: function(){}
});
```

If any arguments are specified, they must have the following value types:
* 'panEnabled' must be true or false. Default is true.
* 'controlIconsEnabled' must be true or false. Default is false.
* 'zoomEnabled' must be true or false. Default is true.
* 'dblClickZoomEnabled' must be true or false. Default is true.
* 'zoomScaleSensitivity' must be a scalar. Default is 0.2.
* 'minZoom' must be a scalar. Default is 0.5.
* 'maxZoom' must be a scalar. Default is 10.
* 'fit' must be true or false. Default is true.
* 'center' must be true or false. Default is true.
* 'refreshRate' must be a number or 'auto'
* 'beforeZoom' must be a callback function to be called before zoom changes.
* 'onZoom' must be a callback function to be called when zoom changes.
* 'beforePan' must be a callback function to be called before pan changes.
* 'onPan' must be a callback function to be called when pan changes.

`beforeZoom` and `onZoom` callbacks will be called with a float attribute. The attribute will be equal to current zoom scale of the viewport.

`beforePan` and `onPan` callbacks will be called with an object attribute. The object will have two attributes (x and y) each representing current pan (on X and Y axes) of the viewport.

`panEnabled` and `zoomEnabled` are related only to user interaction. If any of this options are disabled - you still can zoom and pan via API.

Public API
----------

When you call `svgPanZoom` method it returns an object with following methods:
* enablePan
* disablePan
* isPanEnabled
* pan
* panBy
* getPan
* setBeforePan
* setOnPan
* enableZoom
* disableZoom
* isZoomEnabled
* enableControlIcons
* disableControlIcons
* isControlIconsEnabled
* enableDblClickZoom
* disableDblClickZoom
* isDblClickZoomEnabled
* setZoomScaleSensitivity
* setMinZoom
* setMaxZoom
* setBeforeZoom
* setOnZoom
* zoom
* zoomBy
* zoomAtPoint
* zoomAtPointBy
* zoomIn
* zoomOut
* resetZoom
* resetPan
* reset
* getZoom
* fit
* center
* resize
* destroy

To programmatically pan, call the pan method with vector as first argument:

```js
// Get instance
var panZoomTiger = svgPanZoom('#demo-tiger');

// Pan to rendered point x = 50, y = 50
panZoomTiger.pan({x: 50, y: 50})

// Pan by x = 50, y = 50 of rendered pixels
panZoomTiger.panBy({x: 50, y: 50})
```

To programmatically zoom, you can use the zoom method to specify your desired scale value:

```js
// Get instance
var panZoomTiger = svgPanZoom('#demo-tiger');

// Set zoom level to 2
panZoomTiger.zoom(2)

// Zoom by 130%
panZoomTiger.zoomBy(1.3)

// Set zoom level to 2 at point
panZoomTiger.zoomAtPoint(2, {x: 50, y: 50})

// Zoom by 130% at point
panZoomTiger.zoomAtPointBy(1.3, {x: 50, y: 50})
```

Or you can use the zoomIn or zoomOut methods:

```js
// Get instance
var panZoomTiger = svgPanZoom('#demo-tiger');

panZoomTiger.zoomIn()
panZoomTiger.zoomOut()
panZoomTiger.resetZoom()
```

If you want faster or slower zooming, you can override the default zoom increment with the setZoomScaleSensitivity method.

To programmatically enable/disable pan or zoom:

```js
// Get instance
var panZoomTiger = svgPanZoom('#demo-tiger');

panZoomTiger.enablePan();
panZoomTiger.disablePan();

panZoomTiger.enableZoom();
panZoomTiger.disableZoom();
```

To fit and center:

```js
// Get instance
var panZoomTiger = svgPanZoom('#demo-tiger');

panZoomTiger.fit();
panZoomTiger.center();
```

If you want to fit and center your SVG after its container resize:

```js
// Get instance
var panZoomTiger = svgPanZoom('#demo-tiger');

panZoomTiger.resize(); // update SVG cached size and controls positions
panZoomTiger.fit(true); // dropCache and fit
panZoomTiger.center(true); // dropCache and center
```

Destroy SvgPanZoom instance:

```js
// Get instance
var panZoomTiger = svgPanZoom('#demo-tiger');

panZoomTiger.destroy();
delete panZoomTiger;
```

How to test
-----------

Before committing you should check your code style by running `gulp check`.

If you made a change then first build the library. Open `./tests/index.html` in your browser. All tests should pass.

If you have PhantomJS installed then you can run `gulp test`.

Supported Browsers
------------------
* Chrome
* Firefox
* Safari
* Opera
* Internet Explorer 9+ _(works badly if viewBox is set)_

Related Work
------------
This library used the [SVGPan](https://code.google.com/p/svgpan/) library as a starting point. SVGPan is intended for use with the [SVG 'script' element](http://www.w3.org/TR/SVG/script.html), whereas svg-pan-zoom is intended for use with the [HTML 'script' element](http://www.w3.org/TR/html401/interact/scripts.html).

License
-------
 The code from the SVGPan library is licensed under the following BSD license:

 ```
 Copyright 2009-2010 Andrea Leofreddi <a.leofreddi@itcharm.com>. All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are
 permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this list of
       conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice, this list
       of conditions and the following disclaimer in the documentation and/or other materials
       provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY Andrea Leofreddi "AS IS" AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Andrea Leofreddi OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

  * The views and conclusions contained in the software and documentation are those of the
  authors and should not be interpreted as representing official policies, either expressed
  or implied, of Andrea Leofreddi.
```

The code from the updates and changes to SVGPan are licensed under the same BSD license, with the copyright for the code from each change held by the author of that code.
