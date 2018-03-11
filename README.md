iOS 10 App Store Web Port
===============

This project takes the UI of the iOS 10 App Store and ports it onto the web with full responsive web design support. Utilizing CSS3 Media Queries, the site switches between iPhone and iPad layouts depending on the width of the browser. Minimal javascript frameworks are used, and support for all browsers from IE9 is included.

1. [Inspiration](#inspiration)
1. [Features](#features)
1. [CSS Feats](#css-feats)
1. [JQuery Feats](#jquery-feats)
1. [JavaScript-enabled Behaviours](#javascript-enabled-behaviours)

# Inspiration
I always hated the way the App Store looked on the web. So, I wanted to try my hand at bringing the App Store interface to the web. Since GitHub Pages is static, there will be no backend fetching the latest apps from the App Store.

This project is also meant to serve as a test to see how much I have grown over my years of full stack development. I am planning on supporting as many devices and browsers as possible, and have managed to accomplish backwards compatibility to IE9.

# Features
* Developed with screen-reader/voice-over compatibility in mind
* Optimized for SEO
* Functional with JavaScript disabled
* Proper CSS usage - Virtually all animations are done using CSS (no jQuery animations)
* CSS is clean with minimized work-around solutions for compatibility
* Almost identical design as Apple's App Store interface (as of January 2016)
* Browser transitions between iPhone and iPad interfaces on browser width resize.

# CSS Feats
**Personal milestones accomplished with my responsive layout**
* No `display: flex` usage
* Proper usage of `position: absolute/relative/fixed`
* No `box-sizing: border-box` usage
* Minimized redundant HTML class usage with proper CSS pseudo-classes implementation
* No `display: table` hack usage
* No `float` / clearfix hack usage
* Responsive layouts achieved with CSS3 Media Queries

# JQuery Feats
* Made to support website, not necessary for functionality
* Adds extra JavaScript-enabled behaviours to HTML elements for more realistic App Store behaviour
* Increases compatibility for IE / Edge browsers
* Includes device type-specific behaviours

# JavaScript-enabled Behaviours
* Infinite top banner scrolling
* Gallery auto-scrolling for top banners
* Manual horizontal scrolling enabled when mouse is hovered on edge of screen
* iPad page-navigation behaviour using iframes
