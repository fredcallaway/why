function make_slides(f) {
	var   slides = {};

	
	slides.i0 = slide( 
	{
			name : "i0"
		}
	);




	slides.prelim_test = slide(
	{
		name: 'prelim_test',
		start: function(){
			$("#ass_slide").css('width' , 3*(exp.width/4)).centerhin();
			$(".slider-lbl1 ").css('right' , (exp.width/4) *3.2 +20);
			$(".slider-lbl2 ").css('left' , (exp.width/4) *3.2 +20);
			$(".slider-lbl3 ").css('left' , (exp.width/2));
			exp.sliderPost=null;
			$("#ass_slide").slider({
				range : "min",
				value : 50,
				min : 0,
				max : 100,
				slide : function(event, ui) {
					exp.sliderPost = ui.value/100;
				}
			});
		},
		button: function() {
			if (exp.sliderPost != null) {
				var res = {
					self_ascribed: exp.sliderPost
				};
				exp.data_trials.push(res);
				console.log('slider:'+exp.sliderPost)
				exp.go();
			}
		}
	});




	slides.repeated_stims = slide(
		{   //text for each trial
			name : "repeated_stims",
			present: [
			{situation: "While driving on the freeway, you notice the car on your right turns on its left turn signal.", 
				question: "Do you let the car merge in front of you?"}, //yes
			{situation: "You are in a parking lot and every space is taken except for the handicap spot", 
				question: "Do you park in the handicap spot?"}, //no
			{situation: "Your friend left his facebook account logged in on your computer.", 
				question: "Do you post an embarrasing status?"}, //no
			], //TODO: How do you clear the last response on each trial?

			start: function(){
				// example of moving html blocks aroundth
				// $('#res_sum').prependTo("#baseline");th
				// $('#test_sliders').insertAfter("#res_sum");th
				// $('<br/><br/><br/>').insertBefore("#test_sliders");th
			},

			present_handle : function(stim){
				console.debug(stim);
				//init text
				$('#situation').text(stim.situation);
				$('#question').text(stim.question);
				exp.data_trials.push(stim);

			},
			button : function() {
				//if (e.preventDefault) e.preventDefault();
				var res = {  checked: $('input[name="assess"]:checked').val()  };
				exp.data_trials.push(res);
				$('input[name="assess"]').attr('checked',false);
				console.log(res.checked);
				_stream.apply(this);

			},
		});


	// slides.results=slide({
	// 	name: 'results'
	// 	//console.debug(exp.data_trials)         WHY DOESN'T THIS WORK?!?!!


	// 	})



	//!subj_info
	slides.subj_info =  slide(
		{
			name : "subj_info",
			start : function () {
				$('#subj_info_form').submit(this.button);
			},
			button : function(e){
				if (e.preventDefault) e.preventDefault();
				exp.subj_data =
					[{
						language: $('select[name="language"]').val(),
						enjoyment: $('select[name="enjoyment"]').val(),
						assess: $('input[name="assess"]:checked').val(),
						age : $('input:text[name="age"]').val(),
						sex : $('input[name="sex"]:checked').val(),
						education : $('select[name="education"]').val(),
						workerId : turk.workerId
					}];

				exp.go();
				return false;
			}

		}
	);

	
	slides.thanks = slide(
		{
			name : "thanks",
			start : function(){

				exp.data= {
					trials : exp.data_trials,
					system : exp.system,
					condition : exp.condition
				};
				setTimeout(function() {turk.submit(exp.data);}, 1000);
			}
		});
	return slides;
};

/// init ///
function init() {
	jquery_extensions();
	$('.slide').hide();
	$('body').css('visibility','visible');
	exp_sizing();

	exp.data_trials=[];
	exp.sandbox=0;
	exp.slides = make_slides(exp);

	exp.structure=["i0", 'prelim_test', 'repeated_stims', 'subj_info', 'thanks'];
	set_condition();

	//allow to click through experiment
	exp.debug=1;
	if (exp.debug){
		console.log('debug');
		$('#start-button').click(function(){exp.go();});
	}
	else{
		$('#start-button').click(function(){experiment_proceed();});
	}


	exp.go();

};

function set_condition(){
	exp.condition={dependent:"hl_num",
				   bins:"lmh"
				  };
}


