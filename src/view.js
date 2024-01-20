/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log(
	'Hello World! (from create-block-liascript-markdown-block block)'
);
/* eslint-enable no-console */
iframes = document.querySelectorAll('.course-view');

window.addEventListener('load', function() {

	document.addEventListener("click", function(e) {
		if (e.target.classList.contains("next-slide")) {
			e.preventDefault();
			window.scrollTo(0, 0);
		}
	});

	document.querySelector('.course-view').contentDocument.addEventListener('click',e=>{
		const block=document.querySelector('.wp-block-create-block-liascript-markdown-block');
		const height = window.innerHeight-100;
		block.style.height = height+'px';
		block.setAttribute('data-height',height+'px');
		block.classList.add('selected')
		const fra=document.querySelector('.wp-block-create-block-liascript-markdown-block iframe');
		fra.style.height = height-80+'px';
	})

	document.addEventListener('keydown', function(event) {
		if (event.key === 'Escape') {
			// Setzen Sie die Stile auf ihre ursprünglichen Werte zurück
			const block=document.querySelector('.wp-block-create-block-liascript-markdown-block');
			block.classList.remove('selected');
		}
	});

	const iframes = document.querySelectorAll('.course-view');
	iframes.forEach(frameElement => {

		const checkIframeContent = () => {

			const iframeDoc = frameElement.contentDocument;

			iframeDoc.addEventListener('scroll', (event) => {
				event.stopPropagation();
				e.preventDefault();
				top.scrollTo(0, 0);
			});


			const liaCanvas = iframeDoc.querySelector('.lia-canvas');

			if (liaCanvas) {

				liaCanvas.addEventListener('scroll', (event) => {
					event.stopPropagation();
					e.preventDefault();
					top.scrollTo(0, 0);
				});



				liaCanvas.classList.remove("lia-navigation--visible");
				liaCanvas.classList.add("lia-navigation--hidden");

				const liaTocSearch = iframeDoc.querySelector('.lia-toc__search');
				if (liaTocSearch) {
					liaTocSearch.style.display = "none";
				}

				const liaBtnHome = iframeDoc.querySelector('#lia-btn-home');
				if (liaBtnHome && liaBtnHome.parentElement) {
					liaBtnHome.parentElement.style.display = "none";
				}

				const body = iframeDoc.querySelector('.lia-slide__container');
				body.addEventListener('scroll', (event) => {
					event.stopPropagation();
				});


			} else {
				// Warten und erneut überprüfen
				setTimeout(checkIframeContent, 50);
			}
		}
		checkIframeContent();

	})
});
