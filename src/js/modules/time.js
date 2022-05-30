let ten_minutes = 0;
let minutes = 1;
let ten_seconds = 0;
let seconds = 0;
let blinking = false;
let blink;
const clock = setInterval(function(){setTime(ten_minutes, minutes, ten_seconds, --seconds)}, 1000);
const timer = document.getElementById('timer');

const setTime = function(new_ten_minutes, new_minutes, new_ten_seconds, new_seconds){
	ten_minutes = new_ten_minutes;
	minutes = new_minutes;
	ten_seconds = new_ten_seconds;
	seconds = new_seconds;

	if ((!blinking && ten_minutes === 0 && minutes === 0 && ten_seconds === 0 ) || (!blinking && minutes === 0 && ten_seconds <= 1 && seconds === 0)){
		blinking = true;
		timer.style.color = 'red';
			blink = setInterval(function(){
				if (timer.style.visibility === 'visible') {
					timer.style.visibility = 'hidden';
				} else {
					timer.style.visibility = 'visible';
				}
			}, 500);
	}

	if (seconds === -1){
		if (ten_seconds){
			ten_seconds--;
			seconds = 9;
		}
		else if (minutes){
			ten_seconds = 5;
			seconds = 9;
			minutes--;
		}
		else {
			seconds = 0;
			timer.style.visibility = 'visible';
			gameOver();
			clearInterval(clock);
			clearInterval(blink);

		}
	}
	timer.textContent = `${ten_minutes.toString()}${minutes.toString()}:${ten_seconds.toString()}${seconds.toString()}`;
};
