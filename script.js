var preloader = document.querySelector(".preloader");


window.onbeforeunload = function () { window.scrollTo(0, 0); }


window.addEventListener("load", () => {
	setTimeout(() => { preloader.parentNode.removeChild(preloader); }, 300)
	window.scrollTo(0, 0);

	let video = document.querySelector('.video_bg');
	let video_rev = document.querySelector('.video_bg_rev');
	let checkpoint_list = document.querySelectorAll('.checkpoint');
	const checkpoints_count = checkpoint_list.length;
	video.play();
	// let video_does_active = true;
	// let video_rev_does_active = false;
	let video_active = true;
	let video_rev_active = false;
	let window_height = window.innerHeight;
	document.querySelector('.scroll_space').style.height = checkpoints_count + '45vh';
	let active_checkpoint = checkpoint_list[0];





	setTimeout(() => {
		video.pause();
		video.currentTime = 1;
		video_rev.currentTime = video_rev.duration - video.currentTime;
		window.addEventListener('wheel', scrolled);
		setInterval(scrolled, 1000);

		function bg_change() {
			if (video_rev_active) {
				video_rev.classList.toggle('visible');
				video.classList.toggle('visible');

			}
			else {
				video.classList.toggle('visible');
				video_rev.classList.toggle('visible');

			}

		}


		function scrolled(event) {

			if ((video_active) || (video_rev_active)) {
				if (window.scrollY > (+active_checkpoint.getAttribute('data-check-number') * window_height)) {
					if (video_active) { }
					else {
						bg_change();
					}
					active_checkpoint.classList.remove('visible');

					let video_active_cash = true;
					let video_rev_active_cash = false;

					video_active = false;
					video_rev_active = false;
					let next_active_checkpoint = 0;
					checkpoint_list.forEach(el => {
						if ((window.scrollY >= +el.getAttribute('data-check-number') * window_height - window_height) && (window.scrollY <= (+el.getAttribute('data-check-number') * window_height))) {
							next_active_checkpoint = el;
						};
					});
					let stop_time = 0;
					stop_time = (+next_active_checkpoint.getAttribute('data-time') - video.currentTime) * 1000;
					active_checkpoint = next_active_checkpoint;
					console.log(stop_time);
					video.play();
					setTimeout(function () {
						video.pause();
						video.currentTime = (+active_checkpoint.getAttribute('data-time'));
						video_rev.currentTime = video.duration - (+active_checkpoint.getAttribute('data-time'));
						video_active = video_active_cash;
						video_rev_active = video_rev_active_cash;
						active_checkpoint.classList.add('visible');
					}, stop_time);

				}



				if (window.scrollY < (+active_checkpoint.getAttribute('data-check-number') * window_height - window_height)) {
					if (video_rev_active) { }
					else {
						bg_change();
					}
					active_checkpoint.classList.remove('visible');
					let video_active_cash = false;
					let video_rev_active_cash = true;

					video_active = false;
					video_rev_active = false;
					let next_active_checkpoint = 0;
					checkpoint_list.forEach(el => {
						if ((window.scrollY >= +el.getAttribute('data-check-number') * window_height - window_height) && (window.scrollY <= (+el.getAttribute('data-check-number') * window_height))) {
							next_active_checkpoint = el;
						};
					});
					let stop_time = 0;
					stop_time = ((video_rev.duration - (+next_active_checkpoint.getAttribute('data-time'))) - video_rev.currentTime) * 1000;
					active_checkpoint = next_active_checkpoint;
					console.log(stop_time);
					video_rev.play();
					setTimeout(function () {
						video_rev.pause();
						video.currentTime = (+active_checkpoint.getAttribute('data-time'));
						video_rev.currentTime = video.duration - (+active_checkpoint.getAttribute('data-time'));
						video_active = video_active_cash;
						video_rev_active = video_rev_active_cash;
						active_checkpoint.classList.add('visible');
					}, stop_time);

				}

			}



























			// if (window.scrollY > 377) {
			// 	if (video_does_active) {
			// 		// window.removeEventListener('wheel', scrolled);
			// 		let stop_time_video = video.duration * 1000 - 1100;
			// 		video.play();
			// 		video_does_active = false;
			// 		video_rev_does_active = false;
			// 		setTimeout(function () {
			// 			video.pause();
			// 			video_does_active = false;
			// 			video_rev_does_active = true;
			// 			video_rev.currentTime = 0.1;
			// 			bg_change();
			// 			video.currentTime = 1;
			// 		}, stop_time_video);
			// 	}
			// }

			// if (window.scrollY < 377) {
			// 	if (video_rev_does_active) {
			// 		// window.removeEventListener('wheel', scrolled);
			// 		let stop_time_video_rev = video.duration * 1000 - 1100;
			// 		video_rev.play();
			// 		video_does_active = false;
			// 		video_rev_does_active = false;
			// 		setTimeout(function () {
			// 			video_rev.pause();
			// 			video_does_active = true;
			// 			video_rev_does_active = false;
			// 			video.currentTime = 1;
			// 			bg_change();
			// 			video_rev.currentTime = 0.1;
			// 		}, stop_time_video_rev);
			// 	}
			// }


		}






	}, 1000);





})

