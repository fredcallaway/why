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
			console.log('This version last updated at 8:20 AM on 7/3/14');
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
				{QID: 1, cat: 'plant', trait: 'simple part', txt: 'Tulips have leaves because they are ' },
				{QID: 2, cat: 'plant', trait: 'trick attr', txt: 'Tulips are beautiful because they are ' },
				{QID: 3, cat: 'plant', trait: 'trick attr', txt: 'Redwoods are beautiful because they are ' },
				{QID: 4, cat: 'plant', trait: 'trick part', txt: 'Trees have seeds because they are ' },
				{QID: 5, cat: 'plant', trait: 'trick part', txt: 'Strawberries have seeds because they are ' },
				{QID: 6, cat: 'plant', trait: 'simple attr', txt: 'Strawberries are tasty because they are ' },
				// VEHICLES
				{QID: 7, cat: 'vehicle', trait: 'simple part', txt: 'Ferraris have tires because they are ' },
				{QID: 8, cat: 'vehicle', trait: 'trick attr', txt: 'Ferraris are fast because they are ' },
				{QID: 9, cat: 'vehicle', trait: 'trick attr', txt: 'Boeing 747s are fast because they are ' },
				{QID: 10, cat: 'vehicle', trait: 'trick part', txt: 'Vans have steering wheels because they are ' },
				{QID: 11, cat: 'vehicle', trait: 'trick part', txt: 'Motorboats have steering wheels because they are ' },
				{QID: 12, cat: 'vehicle', trait: 'simple attr', txt: 'Motorboats are fun because they are ' },
				// ANIMALS
				{QID: 13, cat: 'animal', trait: 'simple part', txt: 'Tigers have fur because they are ' },
				{QID: 14, cat: 'animal', trait: 'trick attr', txt: 'Tigers are smart because they are ' },
				{QID: 15, cat: 'animal', trait: 'trick attr', txt: 'Chimpanzees are smart because they are ' },
				{QID: 16, cat: 'animal', trait: 'trick part', txt: 'Salmon have fins because they are ' },
				{QID: 17, cat: 'animal', trait: 'trick part', txt: 'Dolphins have fins because they are ' },
				{QID: 18, cat: 'animal', trait: 'simple attr', txt: 'Dolphins are friendly because they are ' },
				// CATCH
				{ QID: 19, cat: 'CHECK', trait: 'none', txt: 'Can tigers fly? ' },
				{ QID: 20, cat: 'CHECK', trait: 'none', txt: 'Are Ferraris boats? ' },
				{ QID: 21, cat: 'CHECK', trait: 'none', txt: 'Do trees have roots? ' }
			]),

			present_handle : function(stim){
				$('#explanation').focus();
				$('#txt').text(stim.txt);
				this.init_slider();
				_s.trial = {
					'QID' : stim.QID,
					'cat' : stim.cat,
					'trait' : stim.trait,
					'text' : stim.txt
				};
				_s.startT = Date.now();
				exp.trial_order.push(stim.QID);
			},
			init_slider : function() {
				$("#slider1").css('width' , 3*(exp.width/4)).centerhin();
				$(".slider-lbl1 ").css('right' , (exp.width/4) *3.2 +20);
				$(".slider-lbl2 ").css('left' , (exp.width/4) *3.2 +20);
				_s.sliderPost=null;
				$("#slider1").slider({
					range: "min",
					value: 50,
					min: 0,
					max: 100,
					slide : function(event, ui) {
						_s.sliderPost = ui.value/100; // sliderPost in 0..1
					}
				});
				$("#slider1").mousedown(function(){$("#slider1 a").css('display', 'inherit');});
				$("#slider1").slider("option","value",0); //reset slider ()
				$(".ui-slider-handle").css('display', 'none');
			},
			button : function() {
				_s.trial.explanation = $('#explanation').val();
				_s.trial.confidence = _s.sliderPost;
				if (_s.trial.explanation === "") $('#help').show(); //no explanation
				else {
					$('#help').hide();
					if (_s.trial.confidence === null) $('#help2').show(); //no confidence
					else { //explanation and confidence given
						_s.trial.time_taken = (Date.now() - _s.startT)/1000; //in seconds
						exp.trials.push(_s.trial);
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
					{
						language: $('select[name="language"]').val(),
						enjoyment: $('select[name="enjoyment"]').val(),
						assess: $('input[name="assess"]:checked').val(),
						age : $('input:text[name="age"]').val(),
						sex : $('input[name="sex"]:checked').val(),
						education : $('select[name="education"]').val(),
						workerId : turk.workerId
					};
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
					"trials" : exp.trials,
					"trial_order" : exp.trial_order,
					"system" : exp.system,
					"condition" : exp.condition,
					"subject_information" : exp.subj_data,
					"time" : (Date.now() - exp.startT)/1000
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

	exp.trials=[];
	exp.trial_order = [];
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
    exp.system =
        {
            workerId : turk.workerId,
            cond : exp.condition,
            Browser : BrowserDetect.browser,
            OS : BrowserDetect.OS,
            screenH: screen.height,
            screenUH: exp.height,
            screenW: screen.width,
            screenUW: exp.width
        };
	exp.go();

}

function set_condition(){
	exp.condition={dependent:"hl_num",
					bins:"lmh"
					};
}