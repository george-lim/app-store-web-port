$(function() {
  
	// Dark-mode Scripts
	(function() {

		// Change src of dark mode affected images
		function modifySrc($selector) {
      if (document.documentMode || /Edge/.test(navigator.userAgent)) {
        $selector.css('background-image', $selector.css('background-image').replace(/@2x.png/g, '-dark@2x.png'));
      } else {
        $selector.attr('src', $selector.attr('src').replace(/@2x.png/g, '-dark@2x.png'));
      }
		}

		// Set dark mode on page load
		if (Cookies.getJSON('dark-mode')) {
			$('body').addClass('dark-mode');
			$('#dark-mode-toggle').prop('checked', true);

			modifySrc($('#sb-wifi'));
			modifySrc($('#sb-battery-icon'));
			modifySrc($('.back-arrow'));
			modifySrc($('.expand-arrow'));
		}
	}());
});