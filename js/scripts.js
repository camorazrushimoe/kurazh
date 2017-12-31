/* Trigger when page is ready */
sessionStorage['firstVisit'];
$(document).ready(function(){

	// Your functions go here

	var smallCorrectAnswersNumber=0;
	var smallAnswers=["1Б 2Г 3А 4В","«Декстер»","«Позови меня с собой»","«LOST»","Малдер и Скалли","Донованов","На Мелмаке","«Чёрное зеркало»","В Париж","«Здравствуй, юность в сапогах!»"];
	var smallGameTimeouts=[26000,21000,15000,23000,8000,20000,15000,13000,15000,12000];
	var bigGameQuestionsDelay=[38000,9000,14000,14000,15000,14000,3000,0,42000,8000,17000,19000,17000,21000,3000,0,21000,10000,9000,10000,11000,12000,3000,0,52000,10000,16000,3000,0,28000,14000,14000,15000,19000,18000,3000,0,23000,11000,10000,8000,8000,8000,3000,0,0,3000,3000,3000,3000,3000,3000,0,0,0];
	var bigGameteamsList=[];
	var biggameTeamAddingUnit=`
		<div class="biggame-question-unit-list-unit-wrap">
            <input class="biggame-question-unit-list-unit" type="text">
            <div class="biggame-question-unit-list-unit-btn">Еще команда</div>
        </div>
	`;


	function createResultListUnit(array){
		var sum = array[1]+array[2]+array[3]+array[4]+array[5]+array[6]+array[7];
		var unit = `<div class="biggame-question-unit-resultlist-unit">
                    <div class="title">`+array[0]+`</div>
                    <div class="result"><span>`+sum+`</span></div><span>баллов набрано</span>
                  </div>`
        return [unit,sum]
	}
	function createBiggameResultTableUnit(array){
		var sum = array[1]+array[2]+array[3]+array[4]+array[5]+array[6]+array[7];
		var biggameResultTableUnit=`
			<tr class="biggame-question-unit-resultTable-unit">
                <td>`+array[0]+`</td>
                <td>`+array[1]+ `</td>
                <td>`+array[2]+ `</td>
                <td>`+array[3]+ `</td>
                <td>`+array[4]+ `</td>
                <td>`+array[5]+`</td>
                <td>`+array[6]+ `</td>
                <td>`+array[7]+ `</td>
                <td>`+sum+ `</td>
            </tr>`;
        return [biggameResultTableUnit,sum]
	}


	function createResultUnit(teamTitle){
		var unit = `
		<div class="biggame-question-unit-teams-unit">
                <div class="biggame-question-unit-teams-unit-title">`+teamTitle+`</div>
                <div class="biggame-question-unit-teams-unit-input-wrap">
                  <input class="biggame-question-unit-teams-unit-input" type="number">
                </div>
                <div class="biggame-question-unit-teams-unit-controls">
                  <div class="biggame-question-unit-teams-unit-controls-unit minus"></div>
                  <div class="biggame-question-unit-teams-unit-controls-unit plus"></div>
                </div>
              </div>
	`;
		return unit
	}
	if($(".biggame")){

		if(sessionStorage["firstVisit"]=='false'){
			$(".main").find(".minigame-question-unit-answer-picker").removeClass("hidden");
		}

		sessionStorage["firstVisit"]=false;
		
	}
	$(".popup-button").click(function(){
		$(this).parents(".popup").addClass("hidden");
		$(".main").find("audio").get(0).play();
	})
	$(".smallgame-body .main-buttons-unit").click(function(){
		for(var i=0;i<100;i++){
			window.clearInterval(i);
			window.clearTimeout(i);
		}
		if(typeof interval !== 'undefined'){
			clearInterval(interval)
		}
		if(typeof timeout !== 'undefined'){
			clearTimeout(timeout)
		}
		
		$('.smallgame-body .main').addClass("hide");
		$(".smallgame-body .minigame").removeClass("hide");
		var questionNumber=$(".minigame-question-wrap").slick('slickCurrentSlide');
		$(".slick-current").find("video")[0].play();
		var timeout=setTimeout(function(){

			var interval=setInterval(function(){
				var timerValue=$(".slick-current").find(".minigame-question-unit-answer-timer").find(".time").html();
				$(".slick-current").find(".minigame-question-unit-answer-timer").find(".time").html(timerValue-1);
				if(parseInt(timerValue)<2){
						$(".slick-current").find(".minigame-question-unit-answer-next").html("Дальше");
						$(".slick-current").find(".minigame-question-unit-answer-picker").addClass("disabled");
						$(".slick-current").find(".minigame-question-unit-answer-next").removeClass("disabled");
						$(".slick-current").find(".minigame-question-unit-answer-next").addClass("timeout");
						$(".slick-current").find(".minigame-question-unit-answer-picker-unit.chosen").html("Ой! Времени на ответ совсем не осталось");
						clearInterval(interval);
				}
			},1000)

		},smallGameTimeouts[questionNumber]);

//мой хардкод
		var myAudio = document.getElementById("main-audio");
		myAudio.pause()
//мой хардкод

	})
	$(".biggame-body .main-buttons-unit").click(function(){
		for(var i=0;i<100;i++){
			window.clearInterval(i);
			window.clearTimeout(i);
		}
		if(typeof interval !== 'undefined'){
			clearInterval(interval)
		}
		if(typeof timeout !== 'undefined'){
			clearTimeout(timeout)
		}
		$('.biggame-body .main').addClass("hide");
		$(".biggame-body .biggame").removeClass("hide");

		var questionNumber=$(".biggame-question-wrap").slick('slickCurrentSlide');


		if($(".slick-current").hasClass("smallTimer")){
			$(".slick-current").find(".biggame-question-unit-answer-timer").find(".time").html(20);
		} else if($(".slick-current").hasClass("medTimer")){
			$(".slick-current").find(".biggame-question-unit-answer-timer").find(".time").html(59);
		} else if($(".slick-current").hasClass("bigTimer")){
			$(".slick-current").find(".biggame-question-unit-answer-timer").find(".time").html(89);
		}

		$(".slick-current").find(".biggame-question-unit-answer-input").focus();
		var timeout=setTimeout(function(){

			var interval=setInterval(function(){
				var timerValue=$(".slick-current").find(".biggame-question-unit-answer-timer").find(".time").html();
				$(".slick-current").find(".biggame-question-unit-answer-timer").find(".time").html(timerValue-1);
				if(parseInt(timerValue)<2){
						$(".slick-current").find(".biggame-question-unit-answer-next").html("Дальше");
						$(".slick-current").find(".biggame-question-unit-answer-input").attr("disabled","true");
						$(".slick-current").find(".biggame-question-unit-answer-next").addClass("timeout");
						$(".slick-current").find(".biggame-question-unit-answer-input").val("Ой! Времени на ответ совсем не осталось");
						clearInterval(interval);
				}
			},1000)

		},bigGameQuestionsDelay[questionNumber]);

		var myAudio = document.getElementById("main-audio");

		myAudio.pause();
		var myAudio = document.getElementById("teamsAdding-audio");
		myAudio.play();
	})

	$(".minigame-question-unit-answer-picker").click(function(){
		if($(this).hasClass("open")){
			$(this).removeClass("open")
		} else{
			$(this).addClass("open");
		}
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
	$(".biggame-question-wrap").slick({
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
		if($(this).parents(".main")){
			var number=$(this).attr("data-number");
			$(this).parents(".main").find(".minigame-question-unit-answer-picker-unit.chosen").html($(this).html());
			$(this).parents(".main").find(".minigame-question-unit-answer-picker-unit.chosen").attr("data-number",number);
			$(".biggame-question-unit.teamsAdding").find(".biggame-question-unit-answer-next").attr("data-number",number);
		}

	})
	$(".minigame-question-unit-answer-next").click(function(){
		
		var questionNumber=$(".minigame-question-wrap").slick('slickCurrentSlide');

		if($(this).hasClass("disabled")){

		} else{
			for(var i=0;i<100;i++){
				window.clearInterval(i);
				window.clearTimeout(i);
			}
			if(typeof interval !== 'undefined'){
			clearInterval(interval)
			}
			if(typeof timeout !== 'undefined'){
				clearTimeout(timeout)
			}

			if($(this).parents(".minigame-question-unit").find('.minigame-question-unit-answer-picker-unit.chosen').html()==smallAnswers[questionNumber]){
				if($(".slick-current").next().hasClass("last")){

				} else{
					smallCorrectAnswersNumber++;
				}

			}
			if($(".slick-current").next().hasClass("last")){
				var resultPage=$(".slick-current").next();
				resultPage.find(".number").html(smallCorrectAnswersNumber);
				if(smallCorrectAnswersNumber<=3&&0<=smallCorrectAnswersNumber){
					resultPage.find(".lastSlide-kurazh.small ").siblings(".lastSlide-kurazh").remove();
					resultPage.find("audio").get(0).play();
				} else if(smallCorrectAnswersNumber<=7&&4<=smallCorrectAnswersNumber){
					resultPage.find(".lastSlide-kurazh.med ").siblings(".lastSlide-kurazh").remove();
					resultPage.find("audio").get(0).play();
				}else if(smallCorrectAnswersNumber<=10&&8<=smallCorrectAnswersNumber){
					resultPage.find(".lastSlide-kurazh.big ").siblings(".lastSlide-kurazh").remove();
					resultPage.find("audio").get(0).play();
				}
			}
			var curr=$(".minigame-progression-unit.current");
			var next = curr.next();

			curr.removeClass("current");
			curr.addClass("done");
			next.addClass("current");
			var timeout=setTimeout(function(){
				var interval=setInterval(function(){
					var timerValue=$(".slick-current").find(".minigame-question-unit-answer-timer").find(".time").html();
					$(".slick-current").find(".minigame-question-unit-answer-timer").find(".time").html(timerValue-1);
					if(parseInt(timerValue)<2){
							$(".slick-current").find(".minigame-question-unit-answer-next").html("Дальше");
							$(".slick-current").find(".minigame-question-unit-answer-picker").addClass("disabled");
							$(".slick-current").find(".minigame-question-unit-answer-next").removeClass("disabled");
							$(".slick-current").find(".minigame-question-unit-answer-next").addClass("timeout");
							$(".slick-current").find(".minigame-question-unit-answer-picker-unit.chosen").html("Ой! Времени на ответ совсем не осталось");
							clearInterval(interval);
					}
				},1000)

			},smallGameTimeouts[questionNumber]);
			$(".minigame-question-wrap").slick("slickNext");
			$('video').each(function() {
    			$(this).get(0).pause();
			});
			if($(".slick-current").find("video")[0]){
				$(".slick-current").find("video")[0].play();
			}


		}

	})
	var roundNumber=1;

	var lastSum=0;

	$(".biggame-question-unit-answer-next").click(function(){
		for(var i=0;i<100;i++){
			window.clearInterval(i);
			window.clearTimeout(i);
		}
		if(typeof interval !== 'undefined'){
			clearInterval(interval)
		}
		if(typeof timeout !== 'undefined'){
			clearTimeout(timeout)
		}
		var questionNumber=$(".biggame-question-wrap").slick('slickCurrentSlide');
		if($(this).parents(".biggame-question-unit").hasClass("compare")||$(this).parents(".biggame-question-unit").hasClass("teamsAdding")){

		} else{
			if($(this).parents(".biggame-question-unit").hasClass("lastQuestion")){
				$(".biggame-progression").addClass("transparent");
			} else{
				if($(this).parents(".biggame-question-unit").hasClass("roundResult")){
					roundNumber++;
					$(".minigame-header-title").html("Игра «Всерьез». Тур №"+roundNumber);
					$(".biggame-progression").removeClass("transparent");
					var currentTour=$(".biggame-progression").find(".biggame-progression-unit.current");
					$(".biggame-progression").find(".biggame-progression-unit.current").next().addClass("current");
					currentTour.removeClass("current");
					currentTour.addClass("done");
					var questionUnit=$(this).parents(".biggame-question-unit");

					var result=$(".slick-current").find(".biggame-question-unit-teams-unit");


					if(questionUnit.hasClass("round-1")){
						$.each(bigGameteamsList, function( index, value ) {
							if(isNaN(parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val()))){
								value[1]=0;
							} else{
								value[1]=parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val());
							}
						});

					} else if(questionUnit.hasClass("round-2")){
						$.each(bigGameteamsList, function( index, value ) {

							if(isNaN(parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val()))){
								value[2]=0;
							} else{
								value[2]=parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val());
							}
						});
					} else if(questionUnit.hasClass("round-3")){
						$.each(bigGameteamsList, function( index, value ) {

							if(isNaN(parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val()))){
								value[3]=0;
							} else{
								value[3]=parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val());
							}
						});
					} else if(questionUnit.hasClass("round-4")){
						$.each(bigGameteamsList, function( index, value ) {

							if(isNaN(parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val()))){
								value[4]=0;
							} else{
								value[4]=parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val());
							}
						});
					} else if(questionUnit.hasClass("round-5")){
						$.each(bigGameteamsList, function( index, value ) {

							if(isNaN(parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val()))){
								value[5]=0;
							} else{
								value[5]=parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val());
							}
						});
					} else if(questionUnit.hasClass("round-6")){
						$.each(bigGameteamsList, function( index, value ) {

							if(isNaN(parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val()))){
								value[6]=0;
							} else{
								value[6]=parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val());
							}
						});
					} else if(questionUnit.hasClass("round-7")){
						$(".minigame-header-title").html("Игра «Всерьез». Итоги");
						$.each(bigGameteamsList, function( index, value ) {

							if(isNaN(parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val()))){
								value[7]=0;
							} else{
								value[7]=parseInt(result.eq(index).find(".biggame-question-unit-teams-unit-input").val());
							}
						});
					}


				} else{
					var current=parseInt($(".biggame-progression-unit.current").find(".current").html());
					$(".biggame-progression-unit.current").find(".current").html(current+1);
				}
			}
		}
		
		if($(this).parents(".biggame-question-unit").hasClass("round-7")){
			bigGameteamsList.sort(function(a,b){
				var k = a[1]+a[2]+a[3]+a[4]+a[5]+a[6]+a[7];
				var l = b[1]+b[2]+b[3]+b[4]+b[5]+b[6]+b[7];
				if (k == l) { return 0; }
				    if (k < l) {
				        return 1;
				    }
				    else{
				        return -1;
				    }
			})

			$.each(bigGameteamsList, function( index, value ) {
					var indexTop=index;
					$.each(value,function(index,value){
						value=parseInt(value);
					})
				});
			$.each(bigGameteamsList, function( index, value ) {
					var prevSum=lastSum;
					var listUnit=createResultListUnit(value);
					var unit=createBiggameResultTableUnit(value);
					 lastSum=unit[1];
						$(".biggame-question-unit-resultTable").append(unit[0]);
						$(".biggame-question-unit-resultlist").append(listUnit[0]);


				});
		}
		if($(this).parents(".biggame-question-unit").hasClass("teamsAdding")){
			
			$(".minigame-header-title").html("Игра «Всерьез». Тур №1");
			$(".biggame-progression").removeClass("transparent");

			$(".biggame-question-unit-list-unit-wrap").each(function(){
				var title=$(this).find(".biggame-question-unit-list-unit").val();
				if(title.length!=0){
					$(".roundResult").each(function(){
						$(this).find(".biggame-question-unit-teams-wrap").append(createResultUnit(title));
					})
					bigGameteamsList.push([title,0,0,0,0,0,0,0]);
				}
			})
			var roundCount=parseInt($(".biggame-question-unit.teamsAdding").find(".biggame-question-unit-answer-next").attr("data-number"));
			 $(".biggame-progression-unit").eq(roundCount-1).prevAll(".biggame-progression-unit").removeClass("current");
			 $(".biggame-progression-unit").eq(roundCount-1).prevAll(".biggame-progression-unit").addClass("done");
			 $(".biggame-progression-unit").eq(roundCount-1).prevAll(".biggame-progression-unit").each(function(){
			 	var allText=$(this).find(".all").html();
			 	allText=parseInt(allText.substring(1,allText.length));
			 	$(this).find(".current").html(allText);
			 })
			 $(".biggame-progression-unit").eq(roundCount-1).addClass("current");
			 $(".minigame-header-title").html("Игра «Всерьез». Тур №"+roundCount);
			switch (roundCount) {
				  case 7:
				  	roundNumber=7;
				  	$(".biggame-question-wrap").slick('slickGoTo', 45, true);
				    break;
				  case 6:
				  	roundNumber=6;
				   $(".biggame-question-wrap").slick('slickGoTo', 37, true);
				    break;
				  case 5:
				  	roundNumber=5;
				     $(".biggame-question-wrap").slick('slickGoTo', 29, true);
				    break;
				  case 4:
				  	roundNumber=4;
				     $(".biggame-question-wrap").slick('slickGoTo', 24, true);
				    break;
				  case 3:
				  	roundNumber=3;
				     $(".biggame-question-wrap").slick('slickGoTo', 16, true);
				    break;
				  case 2:
				  	roundNumber=2;
				    $(".biggame-question-wrap").slick('slickGoTo', 8, true);
				    break;
				  case 1:

				    break;

			}
			
			var questionNumber=$(".biggame-question-wrap").slick('slickCurrentSlide');
			
		}
		
		$(".biggame-question-wrap").slick("slickNext");
			$('audio').each(function() {
    			$(this).get(0).pause();
			});
			$('video').each(function() {
    			$(this).get(0).pause();
			});
			if($(".slick-current").find("video")[0]){
				$(".slick-current").find("video")[0].play();
			}
			$(".slick-current").find(".biggame-question-unit-answer-input").focus();
			if($(".slick-current").hasClass("smallTimer")){
				$(".slick-current").find(".biggame-question-unit-answer-timer").find(".time").html(20);
			} else if($(".slick-current").hasClass("medTimer")){
				$(".slick-current").find(".biggame-question-unit-answer-timer").find(".time").html(59);
			} else if($(".slick-current").hasClass("bigTimer")){
				$(".slick-current").find(".biggame-question-unit-answer-timer").find(".time").html(89);
			}
			var timeout=setTimeout(function(){
				var interval=setInterval(function(){
					var timerValue=$(".slick-current").find(".biggame-question-unit-answer-timer").find(".time").html();
					$(".slick-current").find(".biggame-question-unit-answer-timer").find(".time").html(timerValue-1);
					if(parseInt(timerValue)<2){
							$(".slick-current").find(".biggame-question-unit-answer-next").html("Дальше");
							$(".slick-current").find(".biggame-question-unit-answer-input").attr("disabled","true");
							$(".slick-current").find(".biggame-question-unit-answer-next").removeClass("disabled");
							$(".slick-current").find(".biggame-question-unit-answer-next").addClass("timeout");
							$(".slick-current").find(".biggame-question-unit-answer-input").val("Ой! Времени на ответ совсем не осталось");
							clearInterval(interval);
					}
			},1000)

		},bigGameQuestionsDelay[questionNumber]);
		if($(this).parents(".biggame-question-unit").hasClass("compare")){
			var curr=$(".biggame-question-wrap").slick('slickCurrentSlide');

			//if($(this).parents(".biggame-question-unit").next().find("audio")){
				//$(this).parents(".biggame-question-unit").next().find("audio").get(0).play();
			//}

		}



	})
	$(".biggame-question-unit-answer-prev").click(function(){
		$(".biggame-question-wrap").slick("slickPrev");
		$('audio').each(function() {
    			$(this).get(0).pause();
			});
		$(".slick-current").find("video").get(0).play();

	})
	$(".biggame-question-unit").on("keyup",'.biggame-question-unit-list-unit',function(){
		if($(this).val()!=""){
			$(this).parents(".biggame-question-unit").find(".biggame-question-unit-answer-next.answer").removeClass("disabled");
		} else{
			$(this).parents(".biggame-question-unit").find(".biggame-question-unit-answer-next.answer").addClass("disabled");
		}
	})
	
	$('.biggame-question-unit').on('click','.biggame-question-unit-teams-unit-controls-unit', function(){
		var value=parseInt($(this).parents(".biggame-question-unit-teams-unit").find(".biggame-question-unit-teams-unit-input").val());
		if(isNaN(value)){
			value=0;
		}
		if($(this).hasClass("plus")){
			$(this).parents(".biggame-question-unit-teams-unit").find(".biggame-question-unit-teams-unit-input").val(value+1);
		} else{
			if(value!=0){
				$(this).parents(".biggame-question-unit-teams-unit").find(".biggame-question-unit-teams-unit-input").val(value-1);
			}
		}
	})
	$('.biggame-question-wrap').on('beforeChange', function(event, slick, currentSlide, nextSlide){
 		if(nextSlide==$(".slick-slide").length-1){
 			$(".biggame-progression").addClass("transparent");
 			$(".biggame-question-unit-resultlist-unit").each(function(){
 				var wrapWidth=$(this).find(".title").width();
 				var textWidth=$(this).find(".title span").width();
 				if(wrapWidth<textWidth){
 					$(this).find(".title").addClass("overlap");
 				}
 			})
 		}

	});

	$('.biggame-question-unit').on('click','.biggame-question-unit-list-unit-btn', function(){

	    var parent = $(this).parent(".biggame-question-unit-list-unit-wrap");
			if(!(parent.find(".biggame-question-unit-list-unit").val().length === 0)){
				if(parent.hasClass("locked")){
					parent.remove();
				} else{
					parent.find(".biggame-question-unit-list-unit").attr("disabled","disabled");
					parent.parents(".biggame-question-unit-list").append(biggameTeamAddingUnit);
					parent.addClass("locked");
					$(this).html("Удалить команду");
				}
			}

			var count = $('.biggame-question-unit-list-unit-wrap');

 			if(count.length>0){

    				$(this).parents(".biggame-question-unit").find(".biggame-question-unit-answer-next").removeClass("disabled");
    		} else{

    			$(this).parents(".biggame-question-unit").find(".biggame-question-unit-answer-next").addClass("disabled");
    		}
	});
	$('.biggame-question-wrap').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  		$(".slick-current").next().find(".biggame-question-unit-answer-next").css("pointer-events","none");
  		setTimeout(function(){
  			$(".slick-current").find(".biggame-question-unit-answer-next").css("pointer-events","all");
  		},3000)
	});
	$('.minigame-question-wrap').on('afterChange', function(event, slick, currentSlide, nextSlide){
  		$(".slick-current").find(".minigame-question-unit-answer-next").css("pointer-events","none");
  		setTimeout(function(){
  			$(".slick-current").find(".minigame-question-unit-answer-next").css("pointer-events","all");
  		},3000)
	});
});


/* Optional triggers

$(window).load(function() {

});

$(window).resize(function() {

});

*/
