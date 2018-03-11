iOS 10 App Store Web Port
===============

This project tries to take the UI of the iOS 10 App Store and port it into the web with full responsive web design support. Utilizing CSS3 Media Queries, the site switches between iPhone and iPad layouts depending on the width of the browser. Minimal javascript frameworks are used, and support for all browsers from IE9 is included.

1. [Inspiration](#inspiration)
1. [Features](#features)
1. [CSS Feats](#css-feats)
1. [JQuery Feats](#jquery-feats)
1. [JavaScript-enabled Behaviours](#javascript-enabled-behaviours)

# Inspiration

As a huge Apple fan, I suddenly had the urge to "move" the App Store onto the web. This project is meant to serve as the ultimate test for my web design abilities. Since GitHub Pages is static, this version of the site will be limited to pure HTML5, CSS3, and jQuery goodness :) Eventually, I will move this project onto my proper personal site and implement
the back end to hopefully one day (maybe) make a functional App Store port on web (if I don't get attacked by Apple's Lawyers LOL)

Anyway, this site will be a personal test to see how much I have grown over the years in full stack development. I am planning on supporting as many devices and browsers as possible, and have managed to accomplish backwards compatibility to IE9.

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
**Featured Page**
* Infinite top banner scrolling
* Gallery auto-scrolling for top banners
* Manual horizontal scrolling enabled when mouse is hovered on edge of screen
* iPad page-navigation behaviour using iframes
