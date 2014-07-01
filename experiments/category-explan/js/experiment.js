function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.
function make_slides(f) {
	var   slides = {};

	slides.i0 = slide(
	{
			name : "i0"
		}
	);

	slides.instructions = slide(
	{
		name: "instructions",
		button : function() {
			exp.go();
		}
	});

	slides.repeated_stims = slide(
		{   //text for each trial
			name : "repeated_stims",
			present:shuffle([
				{  catchT: 0, fact: 'Tulips have leaves because they are '	},
				{  catchT: 0, fact: 'Tulips are beautiful because they are '	},
				{  catchT: 0, fact: 'Strawberries have seeds because they are '	},
				{  catchT: 0, fact: 'Trees have seeds because they are '	},
				{  catchT: 0, fact: 'Redwoods are beautiful because they are '	},
				{  catchT: 0, fact: 'Ferraris have tires because they are '	},
				{  catchT: 0, fact: 'Ferraris are fast because they are '	},
				{  catchT: 0, fact: 'Motorboats have engines because they are '	},
				{  catchT: 0, fact: 'Motorboats are useful because they are '	},
				{  catchT: 0, fact: 'Cars have engines because they are '	},
				{  catchT: 0, fact: 'Boeing 747s are fast because they are '	},
				{  catchT: 0, fact: 'Tigers have fur because they are '	},
				{  catchT: 0, fact: 'Tigers are smart because they are '	},
				{  catchT: 0, fact: 'Scorpions have legs because they are '	},
				{  catchT: 0, fact: 'Scorpions are dangerous because they are '	},
				{  catchT: 0, fact: 'Birds have legs because they are '	},
				{  catchT: 0, fact: 'Chimpanzees are smart because they are '	},
				{  catchT: 1, check: 'Can tigers fly?    '	},
				{  catchT: 1, check: 'Are Ferraris boats?    '	},
				{  catchT: 1, check: 'Do trees have roots?    '	}
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
					condition : exp.condition,
					subject_information : exp.subj_data
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

	exp.structure=["i0", 'instructions', 'repeated_stims', 'subj_info', 'thanks'];
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


