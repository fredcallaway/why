function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.
function make_slides(f) {
	var   slides = {};

	slides.i0 = slide(
	{
			name : "i0"
		}
	);



	slides.repeated_stims = slide(
		{   //text for each trial
			name : "repeated_stims",
			present:shuffle([
				{  catchT: 1, check: "Is a cat a mammal or a reptile?   "			},
				{  catchT: 1, check: "Do dolphins live on land or in the sea?   "	},
				{  catchT: 1, check: "Do horses lay eggs?   "						},
				{  catchT: 0, fact: 'An elephant is smart because it is a(n) '		},
				{  catchT: 0, fact: 'An elephant has bones because it is a(n) '		},
				{  catchT: 0, fact: 'A horse is smart because it is a(n) '			},
				{  catchT: 0, fact: 'A horse has lungs because it is a(n) '			},
				{  catchT: 0, fact: 'A chimp has feet because it is a(n) '			},
				{  catchT: 0, fact: 'A chimp lives in groups because it is a(n) '	},
				{  catchT: 0, fact: 'A chimp is smart because it is a(n) '			},
				{  catchT: 0, fact: 'A mouse has lungs because it is a(n) '			},
				{  catchT: 0, fact: 'A mouse has a tail because it is a(n) '		},
				{  catchT: 0, fact: 'A squirrel has claws because it is a(n) '		},
				{  catchT: 0, fact: 'A tiger has claws because it is a(n) '			},
				{  catchT: 0, fact: 'A tiger is dangerous because it is a(n) '		},
				{  catchT: 0, fact: 'A tiger is smart because it is a(n) '			},
				{  catchT: 0, fact: 'A dolphin has fins because it is a(n) '		},
				{  catchT: 0, fact: 'A robin has wings because it is a(n) '			},
				{  catchT: 0, fact: 'A chicken has wings because it is a(n) '		},
				{  catchT: 0, fact: 'A robin has wings because it is a(n) '			},
				{  catchT: 0, fact: 'A salmon has fins because it is a(n) '			},
				{  catchT: 0, fact: 'A bee lives in groups because it is a(n) '		},
				{  catchT: 0, fact: 'A bee has wings because it is a(n) '			},
				{  catchT: 0, fact: 'An alligator has teeth because it is a(n) '	},
				{  catchT: 0, fact: 'A deer has teeth because it is a(n) '			},
				{  catchT: 0, fact: 'A lizard has a tail because it is a(n) '		}
			]),


			start : function(){

			},
			present_handle : function(stim){
				exp.trial_type = 'critical';
				$('#explanation').focus();
				$('#txt').text(stim.fact);
				this.init_slider();
				exp.data_trials.push(stim);
			},
			catch_trial_handle : function(stim) {
				exp.trial_type = 'catch';
				$('#explanation').focus();
				$('#txt').text(stim.check);
				this.init_slider();
				exp.data_trials.push(stim);
			},
			init_slider : function() {
				// $(".ui-slider-handle").hide();
				$("#slider1").css('width' , 3*(exp.width/4)).centerhin();
				$(".slider-lbl1 ").css('right' , (exp.width/4) *3.2 +20);
				$(".slider-lbl2 ").css('left' , (exp.width/4) *3.2 +20);
				exp.sliderPost=null;
				$("#slider1").slider({
					range : "min",
					value : 50,
					min : 0,
					max : 100,
					slide : function(event, ui) {
						exp.sliderPost = ui.value/100; // sliderPost in 0..1
					}
				});
				$("#slider1").mousedown(function(){$("#slider1 a").css('display', 'inherit');});
				$("#slider1").slider("option","value",0); //reset slider ()
				$(".ui-slider-handle").css('display', 'none');
			},
			button : function() {
				var res = { explanation: $('#explanation').val(),
							confidence: exp.sliderPost };
				if (res.explanation === "") $('#help').show(); //no explanation
				else {
					$('#help').hide();
					if (res.confidence === null) $('#help2').show(); //no confidence
					else { //explanation and confidence given
						exp.check_trials.push(res);
						$('#explanation').val("");
						$('#help2').hide();
						_stream.apply(this);
					}
				}
			},
		});



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
					checks : exp.check_trials,
					system : exp.system,
					condition : exp.condition
				};
				setTimeout(function() {turk.submit(exp.data);}, 1000);
			}
		});
	return slides;
}

/// init ///
function init() {
	jquery_extensions();
	$('.slide').hide();
	$('body').css('visibility','visible');
	exp_sizing();

	exp.data_trials=[];
	exp.check_trials=[];
	exp.sandbox=0;
	exp.slides = make_slides(exp);

	exp.structure=["i0", 'repeated_stims', 'subj_info', 'thanks'];
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

}

function set_condition(){
	exp.condition={dependent:"hl_num",
					bins:"lmh"
					};
}


