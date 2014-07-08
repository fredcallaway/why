function make_slides(f) {
	var   slides = {};

	slides.i0 = slide({
		name : "i0",
		start: function() {
			exp.startT = Date.now();
			console.log('this version last updated at 6:39 PM on 7/7/14');
		}
	});

	slides.instructions = slide({
		name : "instructions",
		button : function() {
			exp.go(); //use exp.go() if and only if there is no "present" data.
		}
	});

	slides.multi_slider = slide({
		name : "multi_slider",
		present : get_stims(),

		start: function() {
		},
		catch_trial_handle : function(stim) {
			this.stim = stim;
			$("#explanandum").text("Slide each slider all the way in the direction indicated");
			this.direction_nums = ['one', 'two', 'three', 'four'];
			$(".slider_row").remove();
			for (var i=0; i<this.direction_nums.length; i++) {
				var direction_num = this.direction_nums[i];
				var direction = stim[direction_num];
				$("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="direction' + i + '">' + '...because they are '+direction + '</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
				utils.match_row_height("#multi_slider_table", ".slider_target");
			}
			this.init_sliders(this.direction_nums.length);
			exp.sliderPost = [];
		},
		present_handle : function(stim) {
			this.stim = stim;
			$("#explanandum").text(stim.explanandum+'...');
			this.explanation_types = _.shuffle(["sub", "basic", "sup", "adj", "other"]);
			$(".slider_row").remove();
			for (var i=0; i<this.explanation_types.length; i++) {
				var explanation_type = this.explanation_types[i];
				var explanation = stim.explanations[explanation_type];
				if (explanation !== null) { //each stim has only 4 of the 5 possible types
					$("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="explanation' + i + '">' + '...because they are '+explanation + '</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
					utils.match_row_height("#multi_slider_table", ".slider_target");
				}
			}
			this.init_sliders(this.explanation_types);
			exp.sliderPost = [];
		},
		button : function() {
			this.log_responses();
			_stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
		},
		init_sliders : function(explanation_types) {
			for (var i=0; i<explanation_types.length; i++) {
				var explanation_type = explanation_types[i];
				utils.make_slider("#slider" + i, this.make_slider_callback(i));
			}
		},
		make_slider_callback : function(i) {
			return function(event, ui) {
				exp.sliderPost[i] = ui.value;
			};
		},
		log_responses : function() {
			for (var i=0; i<this.explanation_types.length; i++) {
				var explanation_type = this.explanation_types[i];
				var explanation = this.stim.explanations[explanation_type];
				if (explanation !== null) {
					exp.trials.push({
						"cat" : this.stim.cat,
						"qtype" : this.stim.qtype,
						"trait" : this.stim.trait,
						"explanandum" : this.stim.explanandum,
						"explanation_type" : explanation_type,
						"explanation" : explanation,
						"response" : exp.sliderPost[i]
					});
				}
			}
		},
		log_catch_trial : function() {
			performance = {};
			for (var i=0; i<this.direction_nums.length; i++) {
				var direction_num = this.direction_nums[i];
				var direction = this.stim[direction_num];
				//check if slider is in right direction
				var correct = (direction == 'right') ? 1:0;
				if (Math.abs(correct - exp.sliderPost[i]) < 0.4) performance[direction_num] = 'pass';
				else perfromance[direction_num] = 'FAIL';
			}
			exp.catch_trials.push(performance);
		}
	});

	slides.subj_info =  slide({
		name : "subj_info",
		submit : function(e){
			//if (e.preventDefault) e.preventDefault(); // I don't know what this means.
			exp.subj_data =
				{
					language : $("#language").val(),
					enjoyment : $("#enjoyment").val(),
					asses : $('input[name="assess"]:checked').val(),
					age : $("#age").val(),
					gender : $("#gender").val(),
					education : $("#education").val(),
					comments : $("#comments").val(),
				};
			exp.go(); //use exp.go() if and only if there is no "present" data.
		}
	});

	slides.thanks = slide({
		name : "thanks",
		start : function() {
			exp.data = {
				"trials" : exp.trials,
				"check_trials" : exp.check_trials,
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
	//blocks of the experiment:
	exp.structure=["i0", "instructions", "multi_slider", 'subj_info', 'thanks'];
	
	//make corresponding slides:
	exp.slides = make_slides(exp);

	$('.slide').hide(); //hide everything

	//make sure turkers have accepted HIT (or you're not in mturk)
	$("#start_button").click(function() {
		if (turk.previewMode) {
			$("#mustaccept").show();
		} else {
			$("#start_button").click(function() {$("#mustaccept").show();});
			exp.go();
		}
	});
	exp.trials = [];
	exp.check_trials = [];
	exp.condition = 1; //{0, 1}  //can randomize between subject conditions here
	exp.system = {
		Browser : BrowserDetect.browser,
		OS : BrowserDetect.OS,
		screenH: screen.height,
		screenUH: exp.height,
		screenW: screen.width,
		screenUW: exp.width
	};
	exp.go(); //show first slide
}

function get_stims() {
	all_stims = [
		{catchT: 0, cat: 'plant', qtype: 1, trait: 'attr', explanandum: 'Strawberries are tasty', explanations: {
			sub: 'berries',
			basic: 'fruits',
			sup: 'plants',
			adj: 'sweet',
			other: null
			}},
		{catchT: 0, cat: 'plant', qtype: 2, trait: 'part', explanandum: 'Tulips have leaves', explanations: {
			sub: null,
			basic: 'flowers',
			sup: 'plants',
			adj: 'colorful',
			other: 'decorations'
			}},
		{catchT: 0, cat: 'plant', qtype: 3, trait: 'attr', explanandum: 'Tulips are beautiful', explanations: {
			sub: null,
			basic: 'flowers',
			sup: 'plants',
			adj: 'colorful',
			other: 'decorations'
			}},
		{catchT: 0, cat: 'plant', qtype: 4, trait: 'attr', explanandum: 'Redwoods are beautiful', explanations: {
			sub: 'evergreens',
			basic: 'trees',
			sup: 'plants',
			adj: 'tall',
			other: null
			}},
		{catchT: 0, cat: 'plant', qtype: 5, trait: 'part', explanandum: 'Redwoods have seeds', explanations: {
			sub: 'evergreens',
			basic: 'trees',
			sup: 'plants',
			adj: 'reproductive',
			other: null
			}},
		{catchT: 0, cat: 'plant', qtype: 6, trait: 'part', explanandum: 'Strawberries have seeds', explanations: {
			sub: 'berries',
			basic: 'fruits',
			sup: 'plants',
			adj: 'reproductive',
			other: null
			}},

		{catchT: 0, cat: 'vehicle', qtype: 1, trait: 'attr', explanandum: 'Speedboats are fun', explanations: {
			sub: 'motorboats',
			basic: 'boats',
			sup: 'vehicles',
			adj: 'fast',
			other: null
			}},
		{catchT: 0, cat: 'vehicle', qtype: 2, trait: 'part', explanandum: 'Ferraris have tires', explanations: {
			sub: 'sports cars',
			basic: 'cars',
			sup: 'vehicles',
			adj: 'aerodynamic',
			other: null
			}},
		{catchT: 0, cat: 'vehicle', qtype: 3, trait: 'attr', explanandum: 'Ferraris are fast', explanations: {
			sub: 'sports cars',
			basic: 'cars',
			sup: 'vehicles',
			adj: 'aerodynamic',
			other: null
			}},
		{catchT: 0, cat: 'vehicle', qtype: 4, trait: 'attr', explanandum: 'Boeing 747s are fast', explanations: {
			sub: 'jets',
			basic: 'planes',
			sup: 'vehicles',
			adj: 'powerful',
			other: null
			}},
		{catchT: 0, cat: 'vehicle', qtype: 5, trait: 'part', explanandum: 'Camries have steering wheels', explanations: {
			sub: 'sedan',
			basic: 'cars',
			sup: 'vehicles',
			adj: 'maneuverable',
			other: null
			}},
		{catchT: 0, cat: 'vehicle', qtype: 6, trait: 'part', explanandum: 'Speedboats have steering wheels', explanations: {
			sub: 'motorboats',
			basic: 'boats',
			sup: 'vehicles',
			adj: 'maneuverable',
			other: null
			}},

		{catchT: 0, cat: 'animal', qtype: 1, trait: 'attr', explanandum: 'Dolphins are social', explanations: {
			sub: null,
			basic: 'mammals',
			sup: 'animals',
			adj: 'intelligent',
			other: 'swimmers'
			}},
		{catchT: 0, cat: 'animal', qtype: 2, trait: 'part', explanandum: 'Tigers have fur', explanations: {
			sub: 'cats',
			basic: 'mammals',
			sup: 'animals',
			adj: null,
			other: 'predators'
			}},
		{catchT: 0, cat: 'animal', qtype: 3, trait: 'attr', explanandum: 'Tigers are smart', explanations: {
			sub: 'cats',
			basic: 'mammals',
			sup: 'animals',
			adj: null,
			other: 'predators'
			}},
		{catchT: 0, cat: 'animal', qtype: 4, trait: 'attr', explanandum: 'Chimpanzees are smart', explanations: {
			sub: 'primates',
			basic: 'mammals',
			sup: 'animals',
			adj: 'social',
			other: null
			}},
		{catchT: 0, cat: 'animal', qtype: 5, trait: 'part', explanandum: 'Salmon have fins', explanations: {
			sub: null,
			basic: 'fish',
			sup: 'animals',
			adj: 'aquatic',
			other: 'swimmers'
			}},
		{catchT: 0, cat: 'animal', qtype: 6, trait: 'part', explanandum: 'Dolphins have fins', explanations: {
			sub: null,
			basic: 'mammals',
			sup: 'animals',
			adj: 'aquatic',
			other: 'swimmers'
			}}
	];
	//give evens to cond 0, odds to cond 1
	stims = [];
	for (var i = 0; i < all_stims.length; i++) {
		stim = all_stims[i];
		if (stim.qtype%2 == 1) {
			stims.push(stim);
		}
	}
	stims.push( //catch trials
		{catchT: 1, one:'left', two:'left', three:'right', four:'right'},
		{catchT: 1, one:'right', two:'left', three:'right', four:'right'},
		{catchT: 1, one:'right', two:'left', three:'left', four:'left'}
	)
	return _.shuffle(stims);
}
