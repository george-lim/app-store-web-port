$(function() {

	// jQuery prototypes
	(function($) {

		// Remove white-space from innerHTML
		$.fn.strippedHTML = function() {
			return this.html().replace(/(^|>)\s+|\s+(?=<|$)/g, '$1');
		};

		// Remove white-space from outerHTML
		$.fn.strippedOuterHTML = function() {
			return this[0].outerHTML.replace(/(^|>)\s+|\s+(?=<|$)/g, '$1');
		};
	}(jQuery));

	// Dark mode scripts
	(function() {

		// Change src of dark mode affected images
		function modifySrc($selector, darkMode) {
      if (document.documentMode || /Edge/.test(navigator.userAgent)) {
        var src = $selector.css('background-image');

        if (darkMode) {
          $selector.css('background-image', src.replace(/@2x.png/g, '-dark@2x.png'));
        } else {
          $selector.css('background-image', src.replace(/-dark@2x.png/g, '@2x.png'));
        }
      } else {
  			var src = $selector.attr('src');

  			if (darkMode) {
  				$selector.attr('src', src.replace(/@2x.png/g, '-dark@2x.png'));
  			} else {
  				$selector.attr('src', src.replace(/-dark@2x.png/g, '@2x.png'));
  			}
      }
		}

		// Modify elements to match dark mode theme
		function darkMode(willEnter) {
			if (willEnter) {
				$('body').addClass('dark-mode');
			} else {
				$('body').removeClass('dark-mode');
			}

			modifySrc($('#sb-wifi'), willEnter);
			modifySrc($('#sb-battery-icon'), willEnter);
			modifySrc($('#wish-list'), willEnter);
			modifySrc($('.expand-arrow'), willEnter);
		}

		// Set dark mode on page load
		if (Cookies.getJSON('dark-mode')) {
			darkMode(true);
			$('#dark-mode-toggle').prop('checked', true);
		}

		// Toggle dark mode
		$('#dark-mode-toggle').on('change', function(e) {
			var willEnterDarkMode = this.checked;

			darkMode(willEnterDarkMode);
			Cookies.set('dark-mode', willEnterDarkMode);
		});
	}());

	// Top banner scripts
	(function() {

		// Banner calculations
		function topBannerWidth() {
			return $('.top-banner.item-group .scroll-item:first-of-type').width();
		}

		function topBannerOuterWidth() {
			return $('.top-banner.item-group .scroll-item:first-of-type').outerWidth(true);
		}

		function bannerOffset() {
			var $bannerContainer = $('.top-banner.item-group .hscroll > .overflow-container');

			if ((Math.floor($bannerContainer.width() / topBannerOuterWidth()) + 2) % 2 == 0) {
				return Math.floor((topBannerWidth() - $bannerContainer.width() % topBannerOuterWidth()) / 2);
			} else {
				return Math.floor(topBannerWidth() - ($bannerContainer.width() % topBannerOuterWidth()) / 2);
			}
		}

		// Banner setup on page load
		(function() {

			// Banner container calculation
			function topBannerContainerWidth() {
				return $('.top-banner.item-group .hscroll > .overflow-container')[0].scrollWidth;
			};

			// Fill screen with banners
			var $bannerContainer = $('.top-banner.item-group .hscroll > .overflow-container');
			var bannerHTML = $bannerContainer.strippedHTML();

			$bannerContainer.scrollLeft(0);
			$bannerContainer.html(bannerHTML);

			while(topBannerContainerWidth() <= $bannerContainer.width() + topBannerOuterWidth()) {
				$bannerContainer.append(bannerHTML);
			}

			// Scroll banners to default position
			var scrollDistance = bannerOffset();
			var travelDistance = 15;

			(function scroll() {
				setTimeout(function() {
					if (scrollDistance <= travelDistance) {
						$bannerContainer.scrollLeft($bannerContainer.scrollLeft() + scrollDistance);
					} else {
						$bannerContainer.scrollLeft($bannerContainer.scrollLeft() + travelDistance);
						scrollDistance -= travelDistance;
						scroll();
					}
				}, 10);
			}());
		}());

		// Scrolling behaviour
		(function() {
      
			// Timer scroll
			var timerScrollInterval = 0;

			// Scroll banners indefinitely after interval
			function timerScroll() {
				timerScrollInterval = setTimeout(function() {
					var $bannerContainer = $('.top-banner.item-group .hscroll > .overflow-container');
					var scrollDistance = $bannerContainer.scrollLeft() + topBannerOuterWidth() - ($bannerContainer.scrollLeft() - bannerOffset()) % topBannerOuterWidth();
					var travelDistance = 15;
          var previousScrollLeft = $bannerContainer.scrollLeft();
          var hasAdjustedScrollDistance = false;

					(function scroll() {
						setTimeout(function() {
							if ($bannerContainer.scrollLeft() + travelDistance >= scrollDistance) {
								$bannerContainer.scrollLeft(scrollDistance);
							} else {
								$bannerContainer.scrollLeft($bannerContainer.scrollLeft() + travelDistance);
								scroll();
							}

              if ($bannerContainer.scrollLeft() > previousScrollLeft) {
                previousScrollLeft = $bannerContainer.scrollLeft();
              } else if (!hasAdjustedScrollDistance) {
                scrollDistance -= topBannerOuterWidth();
                hasAdjustedScrollDistance = true;
              }
						}, 10);
					}());
				}, 5000);
			};

			// Kill timer for timer scroll
			function killTimerScroll() {
				clearTimeout(timerScrollInterval);
				timerScrollInterval = 0;
			}

			// Disable timer scroll on window blur
			$(window).on({blur: function(e) {
				e.preventDefault();
				killTimerScroll();
			}, focus: function(e) {
				e.preventDefault();
				timerScroll();
			}});

			// Infinite-scrolling
			var scrollClock = 0;

			// Append / Prepend banners to create infinite scrolling
			$('.top-banner.item-group .hscroll > .overflow-container').on('scroll', function(e) {
				e.preventDefault();

				var $bannerContainer = $(this);
				var bannerMargin = topBannerOuterWidth() - topBannerWidth();

				if ($bannerContainer.scrollLeft() <= bannerMargin) {
					$lastChild = $('.top-banner.item-group .scroll-item:last-of-type');
					$bannerContainer.prepend($lastChild.strippedOuterHTML());
					$lastChild.remove();
					$bannerContainer.scrollLeft(topBannerOuterWidth());
				}

				if ($bannerContainer.scrollLeft() + $bannerContainer.width() >= $bannerContainer[0].scrollWidth - bannerMargin) {
					$firstChild = $('.top-banner.item-group .scroll-item:first-of-type');
					$bannerContainer.append($firstChild.strippedOuterHTML());
					$firstChild.remove();
					$bannerContainer.scrollLeft($bannerContainer[0].scrollWidth - $bannerContainer.width() - topBannerWidth());
				}

				killTimerScroll();

				clearTimeout(scrollClock);
				scrollClock = setTimeout(function() {
					timerScroll();
				}, 250);
			});
		}());
	}());

	// iPad iframe pop-up behaviour
	$('.item-group .hscroll > .overflow-container').on('click', '.scroll-item', function(e) {
		if ($(window).width() >= 768) {
			e.preventDefault();

			var $frame = $('#item-display');

			$frame.contents().find('html').html('');
			$frame.attr('src', $(this).attr('href'));
			$('body')
			.css('top', -$(document).scrollTop())
			.addClass('spotlight');
		}
	});
});