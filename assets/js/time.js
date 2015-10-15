var ten_minutes = 0;
var minutes = 1;
var ten_seconds = 0;
var seconds = 0;
var blinking = false;
var blink;

var setTime = function(new_ten_minutes, new_minutes, new_ten_seconds, new_seconds){
	ten_minutes = new_ten_minutes;
	minutes = new_minutes;
	ten_seconds = new_ten_seconds;
	seconds = new_seconds;

	//if (ten_minutes == 0 && minutes == 0 && ten_seconds == 0)
		//$('#timer').css("color", "red");

	if ((!blinking && ten_minutes == 0 && minutes == 0 && ten_seconds == 0 ) || (!blinking && minutes == 0 && ten_seconds <= 1 && seconds == 0)){
		blinking = true;
		$('#timer').css("color", "red");
			blink = setInterval(function(){
				if ($('#timer').css("visibility") == "visible")
					$('#timer').css("visibility", "hidden")
				else
					$('#timer').css("visibility", "visible");
				}, 500);
	}

	if (seconds == -1){
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
			alert("Game Over!");
			clearInterval(clock);
			clearInterval(blink);
			seconds = 0;
		}
	}
	$("#timer").text(ten_minutes.toString() + minutes.toString() + ":" + ten_seconds.toString() + seconds.toString());
}

var clock = setInterval(function(){setTime(ten_minutes, minutes, ten_seconds, --seconds)}, 1000);