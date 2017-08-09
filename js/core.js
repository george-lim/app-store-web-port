$(function() {

	$('html')
	.removeClass('no-js')
	.addClass('js');

	// Device type detection
	(function() {
		var headerIndex = $('header.global').css('z-index');

		switch (true) {
			case (headerIndex == 250):
			$('html').addClass('mobile');
			case (headerIndex == 500):
			$('html').addClass('tablet');
			default:
			$('html').addClass('desktop');
		}
	}());

	// IE / Edge browser detection
	if (document.documentMode || /Edge/.test(navigator.userAgent)) {
		$('html').addClass('IEedge');

		// Fallback for object-fit: cover
		$('img').each(function() {
			var $img = $(this);
			var imgUrl = $img.attr('src');

			if (imgUrl) {
				$img
				.css('background-image', 'url(' + imgUrl + ')')
				.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
			}
		});
	}

	// iframe scripts
	(function() {
		// Calculate height of frame
		function inheritHeight() {
			var $frame = $('#item-display');
			$frame.contents().find('body').height($frame.height());
		}

		// iframe detection
		if (window.location != window.parent.location) {
			$('html').addClass('iframe');
		}

		// Recalculate height on iframe load
		$('#item-display').on('load', function(e) {
			e.preventDefault();
			inheritHeight();
		});

		// Recalculate height on iframe resize
		$(window).on('resize', function(e) {
			e.preventDefault();
			inheritHeight();
		});
	}());

	// Remove spotlight
	$('#spotlight').on('click', function(e) {
		e.preventDefault();

		var $body = $('body');
		var scrollTop = -parseInt($body.css('top'));

		$body
		.removeClass('spotlight')
		.removeAttr('style');
		$(document).scrollTop(scrollTop);
	});

	// Desktop scripts
	if ($('html').hasClass('desktop')) {
    
		// Update status bar time
		(function updateSBTime() {
			setTimeout(function() {
				var date = new Date();
				var hh = date.getHours();
				var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
				var period;

				switch (true) {
					case (hh == 0):
					hh = 12;
					case (hh <= 12):
					period = 'AM';
					break;
					default:
					hh -= 12;
					period = 'PM';
					break;
				}

				$('#sb-time').html(hh + ':' + mm + ' ' + period);
				updateSBTime();
			}, 250);
		}());

		// Scroll-assist
		(function() {
			var isScrolling = false;

			$('.scroll-assist').on({mouseenter: function(e) {
				e.preventDefault();

				isScrolling = true;

				var $scrollAssist = $(this);
				var $bannerContainer;
				var scrollDirection;

				if ($scrollAssist.hasClass('left')) {
					$bannerContainer = $scrollAssist.next();
					scrollDirection = -1;
				} else {
					$bannerContainer = $scrollAssist.prev();
					scrollDirection = 1;
				}

				var travelDistance = 5;
				var maxTravelDistance = 20;

				(function scroll() {
					setTimeout(function() {
						$bannerContainer.scrollLeft($bannerContainer.scrollLeft() + (travelDistance * scrollDirection));

						if (travelDistance < maxTravelDistance) {
							travelDistance += 0.2;
						}

						if (isScrolling) {
							scroll();
						}
					}, 10);
				}());
			}, mouseleave: function(e) {
				e.preventDefault();
				isScrolling = false;
				travelDistance = 5;
			}});
		}());
	}
});