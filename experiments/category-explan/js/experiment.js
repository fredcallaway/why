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
		start: function() {
			exp.startT = Date.now();
		},
		button : function() {
			exp.go();
		}
	});


	slides.repeated_stims = slide(
		{   //text for each trial
			name : "repeated_stims",
			present:shuffle([
				// PLANTS
				{catchT:0, cat: 'plant', trait: 'simple part', fact: 'Tulips have leaves because they are ' },
				{catchT:0, cat: 'plant', trait: 'trick attr', fact: 'Tulips are beautiful because they are ' },
				{catchT:0, cat: 'plant', trait: 'trick attr', fact: 'Redwoods are beautiful because they are ' },
				{catchT:0, cat: 'plant', trait: 'trick part', fact: 'Trees have seeds because they are ' },
				{catchT:0, cat: 'plant', trait: 'trick part', fact: 'Strawberries have seeds because they are ' },
				{catchT:0, cat: 'plant', trait: 'simple attr', fact: 'Strawberries are tasty because they are ' },
				// VEHICLES
				{catchT:0, cat: 'vehicle', trait: 'simple part', fact: 'Ferraris have tires because they are ' },
				{catchT:0, cat: 'vehicle', trait: 'trick attr', fact: 'Ferraris are fast because they are ' },
				{catchT:0, cat: 'vehicle', trait: 'trick attr', fact: 'Boeing 747s are fast because they are ' },
				{catchT:0, cat: 'vehicle', trait: 'trick part', fact: 'Vans have steering wheels because they are ' },
				{catchT:0, cat: 'vehicle', trait: 'trick part', fact: 'Motorboats have steering wheels because they are ' },
				{catchT:0, cat: 'vehicle', trait: 'simple attr', fact: 'Motorboats are fun because they are ' },
				// ANIMALS
				{catchT:0, cat: 'animal', trait: 'simple part', fact: 'Tigers have fur because they are ' },
				{catchT:0, cat: 'animal', trait: 'trick attr', fact: 'Tigers are smart because they are ' },
				{catchT:0, cat: 'animal', trait: 'trick attr', fact: 'Chimpanzees are smart because they are ' },
				{catchT:0, cat: 'animal', trait: 'trick part', fact: 'Salmon have fins because they are ' },
				{catchT:0, cat: 'animal', trait: 'trick part', fact: 'Dolphins have fins because they are ' },
				{catchT:0, cat: 'animal', trait: 'simple attr', fact: 'Dolphins are friendly because they are ' },
				// CATCH
				{catchT: 1, check: 'Can tigers fly?    ' },
				{catchT: 1, check: 'Are Ferraris boats?    ' },
				{catchT: 1, check: 'Do trees have roots?    ' }
			]),

			present_handle : function(stim){
				exp.trial_type = 'critical';
				$('#explanation').focus();
				$('#txt').text(stim.fact);
				this.init_slider();
				exp.data_trials.push(stim);
				_s.startT = Date.now();
			},
			catch_trial_handle : function(stim) {
				exp.trial_type = 'catch';
				_s.isCatch = true;
				$('#explanation').focus();
				$('#txt').text(stim.check);
				this.init_slider();
				exp.check_trials.push(stim);
				_s.startT = Date.now();
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
						res.time_taken = (Date.now() - _s.startT)/1000; //in seconds
						if (_s.isCatch) exp.check_trials.push(res);
						else exp.data_trials.push(res);
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
					system : exp.system, //FIX: exp.system is not defined
					condition : exp.condition,
					subject_information : exp.subj_data,
					time : (Date.now() - exp.startT)/1000
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