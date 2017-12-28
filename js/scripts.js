/* Trigger when page is ready */
$(document).ready(function(){

	// Your functions go here
	var smallResultLow="Н-де... Что это мы все в Понарошку?! Есть идея получше - берешь на помощь друзей и играете вместе большую сериальную игру “Всерьез”";
	var smallResultMed="Неплохо! Зови друзей, которые любят сериальчики, и играйте большую игру всерьез!";
	var smallResultHigh="Господин сериальный Друзь? Вы ли это? Прошу всю команду знатоков сыграть “Всерьез”. Негоже вам в понарошку-то!";
	var smallCorrectAnswersNumber=0;
	var smallAnswers=["1Б 2Г 3А 4В","«Декстер»","«Позови меня с собой»","«LOST»","Малдер и Скалли","Донованов","На Мелмаке","«Чёрное зеркало»","В Париж","«Здравствуй, юность в сапогах!»"];
	var smallGameTimeouts=[3000,3000,3000,3000,3000,3000,3000,3000,3000,3000];


	

	
	$(".smallgame-body .main-buttons-unit").click(function(){
		$('.smallgame-body .main').addClass("hide");
		$(".smallgame-body .minigame").removeClass("hide");
		var questionNumber=$(".minigame-question-wrap").slick('slickCurrentSlide');
		setTimeout(function(){

			var interval=setInterval(function(){
				var timerValue=$(".slick-current").find(".minigame-question-unit-answer-timer").find(".time").html();
				$(".slick-current").find(".minigame-question-unit-answer-timer").find(".time").html(timerValue-1);
				if(parseInt(timerValue)===1){
						$(".slick-current").find(".minigame-question-unit-answer-next").html("Дальше");
						$(".slick-current").find(".minigame-question-unit-answer-picker").addClass("disabled");
						$(".slick-current").find(".minigame-question-unit-answer-next").removeClass("disabled");
						$(".slick-current").find(".minigame-question-unit-answer-next").addClass("timeout");
						$(".slick-current").find(".minigame-question-unit-answer-picker-unit.chosen").html("Ой! Времени на ответ совсем не осталось");
						clearInterval(interval);
				}
			},1000)

		},smallGameTimeouts[questionNumber+1]);
		
	})
	$(".minigame-question-unit-answer-picker").click(function(){
		$(this).addClass("open");
	})
	
	$(".minigame-question-wrap").slick({
		arrows:false,
		infinite:false,
		accessibility:false,
		draggable:false,
		fade:true,
		speed:1000,
		swipe:false,
		touchMove:false,
	})
	
	$(".minigame-question-unit-answer-picker-unit:not(.chosen)").click(function(e){
		e.stopPropagation();

		$(this).parents(".minigame-question-unit").find(".minigame-question-unit-answer-next").removeClass("disabled");
		$(".minigame-question-unit-answer-picker").removeClass("open");
		$(this).parents(".minigame-question-unit").find(".minigame-question-unit-answer-picker-unit.chosen").html($(this).html());
		
	})
	$(".minigame-question-unit-answer-next").click(function(){
		var questionNumber=$(".minigame-question-wrap").slick('slickCurrentSlide');

		if($(this).hasClass("disabled")){

		} else{
			 for(i=0; i<1000; i++){
			    window.clearInterval(i);
			}

			if($(this).parents(".minigame-question-unit").find('.minigame-question-unit-answer-picker-unit.chosen').html()==smallAnswers[questionNumber]){
				smallCorrectAnswersNumber++;
			}
			if($(".slick-current").next().hasClass("last")){
				var resultPage=$(".slick-current").next();
				resultPage.find(".number").html(smallCorrectAnswersNumber);
				if(smallCorrectAnswersNumber<=3&&0<=smallCorrectAnswersNumber){
					resultPage.find(".subtext").html(smallResultLow);
				} else if(smallCorrectAnswersNumber<=7&&4<=smallCorrectAnswersNumber){
					resultPage.find(".subtext").html(smallResultMed);
				}else if(smallCorrectAnswersNumber<=10&&8<=smallCorrectAnswersNumber){
					resultPage.find(".subtext").html(smallResultMed);
				}
			}
			var curr=$(".minigame-progression-unit.current");
			var next = curr.next();
			
			curr.removeClass("current");
			curr.addClass("done");
			next.addClass("current");
			setTimeout(function(){
				var interval=setInterval(function(){
					var timerValue=$(".slick-current").find(".minigame-question-unit-answer-timer").find(".time").html();
					$(".slick-current").find(".minigame-question-unit-answer-timer").find(".time").html(timerValue-1);
					if(parseInt(timerValue)===1){
							$(".slick-current").find(".minigame-question-unit-answer-next").html("Дальше");
							$(".slick-current").find(".minigame-question-unit-answer-picker").addClass("disabled");
							$(".slick-current").find(".minigame-question-unit-answer-next").removeClass("disabled");
							$(".slick-current").find(".minigame-question-unit-answer-next").addClass("timeout");
							$(".slick-current").find(".minigame-question-unit-answer-picker-unit.chosen").html("Ой! Времени на ответ совсем не осталось");
							clearInterval(interval);
					}
				},1000)

			},smallGameTimeouts[questionNumber+1]);
			$(".minigame-question-wrap").slick("slickNext");

		}

	})
});


/* Optional triggers

$(window).load(function() {
	
});

$(window).resize(function() { 
	
});

*/