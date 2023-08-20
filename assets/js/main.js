/*
	Locus by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 5

		};

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1367px',  '1680px' ],
			large:    [ '981px',   '1366px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav Panel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					resetScroll: true,
					resetForms: true,
					side: 'top',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax background.

		// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
			if (browser.name == 'ie'
			||	browser.name == 'edge'
			||	browser.mobile)
				settings.parallax = false;

		if (settings.parallax) {

			var $dummy = $(), $bg;

			$window
				.on('scroll.locus_parallax', function() {

					// Adjust background position.
					// Note: If you've removed the background overlay image, remove the "top left, " bit.
						$bg.css('background-position', 'top left, center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');

				})
				.on('resize.locus_parallax', function() {

					// If we're in a situation where we need to temporarily disable parallax, do so.
					// Note: If you've removed the background overlay image, remove the "top left, " bit.
						if (breakpoints.active('<=medium')) {

							$body.css('background-position', 'top left, top center');
							$bg = $dummy;

						}

					// Otherwise, continue as normal.
						else
							$bg = $body;

					// Trigger scroll handler.
						$window.triggerHandler('scroll.locus_parallax');

				})
				.trigger('resize.locus_parallax');

		}

})(jQuery);