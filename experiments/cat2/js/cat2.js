function make_slides(f) {
	var   slides = {};

	slides.i0 = slide({
		name : "i0",
		start: function() {
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
			this.init_sliders();
			exp.sliderPost = [];
		},
		button : function() {
			this.log_responses();
			_stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
		},
		init_sliders : function(explanation_types) {
			for (var i=0; i<this.explanation_types.length; i++) {
				var explanation_type = this.explanation_types[i];
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
					exp.data.trials.push({
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
		}
	});



	// slide.rankings = slide({
	//   name : "rankings",
	//   present: [],
	//   present_handle: function() {
	//   },
	//   button : function(){
	//     exp.go();
	//   }
	// });

	// slide.forced_choice = slide({
	//   name: "forced_choice",
	//   start: function(){
			
	//   },
	//   button: function(){
	//     exp.go();
	//   },
	//   present_handle: function() {
	//     $('#forced_choice');
	//   },
	// });


	slides.subj_info =  slide({
		name : "subj_info",
		submit : function(e){
			//if (e.preventDefault) e.preventDefault(); // I don't know what this means.
			exp.data.subj_data =
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
	exp.data.condition = 1; //{0, 1}  //can randomize between subject conditions here
	exp.data.system = {
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
		{cat: 'plant', qtype: 1, trait: 'attr', explanandum: 'Strawberries are tasty', explanations: {
			sub: 'berries',
			basic: 'fruits',
			sup: 'plants',
			adj: 'sweet',
			other: null
			}},
		{cat: 'plant', qtype: 2, trait: 'part', explanandum: 'Tulips have leaves', explanations: {
			sub: null,
			basic: 'flowers',
			sup: 'plants',
			adj: 'colorful',
			other: 'decorations'
			}},
		{cat: 'plant', qtype: 3, trait: 'attr', explanandum: 'Tulips are beautiful', explanations: {
			sub: null,
			basic: 'flowers',
			sup: 'plants',
			adj: 'colorful',
			other: 'decorations'
			}},
		{cat: 'plant', qtype: 4, trait: 'attr', explanandum: 'Redwoods are beautiful', explanations: {
			sub: 'evergreens',
			basic: 'trees',
			sup: 'plants',
			adj: 'tall',
			other: null
			}},
		{cat: 'plant', qtype: 5, trait: 'part', explanandum: 'Redwoods have seeds', explanations: {
			sub: 'evergreens',
			basic: 'trees',
			sup: 'plants',
			adj: 'reproductive',
			other: null
			}},
		{cat: 'plant', qtype: 6, trait: 'part', explanandum: 'Strawberries have seeds', explanations: {
			sub: 'berries',
			basic: 'fruits',
			sup: 'plants',
			adj: 'reproductive',
			other: null
			}},

		{cat: 'vehicle', qtype: 1, trait: 'attr', explanandum: 'Speedboats are fun', explanations: {
			sub: 'motorboats',
			basic: 'boats',
			sup: 'vehicles',
			adj: 'fast',
			other: null
			}},
		{cat: 'vehicle', qtype: 2, trait: 'part', explanandum: 'Ferraris have tires', explanations: {
			sub: 'sports cars',
			basic: 'cars',
			sup: 'vehicles',
			adj: 'aerodynamic',
			other: null
			}},
		{cat: 'vehicle', qtype: 3, trait: 'attr', explanandum: 'Ferraris are fast', explanations: {
			sub: 'sports cars',
			basic: 'cars',
			sup: 'vehicles',
			adj: 'aerodynamic',
			other: null
			}},
		{cat: 'vehicle', qtype: 4, trait: 'attr', explanandum: 'Boeing 747s are fast', explanations: {
			sub: 'jets',
			basic: 'planes',
			sup: 'vehicles',
			adj: 'powerful',
			other: null
			}},
		{cat: 'vehicle', qtype: 5, trait: 'part', explanandum: 'Camries have steering wheels', explanation: {
			sub: 'sedan',
			basic: 'cars',
			sup: 'vehicles',
			adj: 'maneuverable',
			other: null
			}},
		{cat: 'vehicle', qtype: 6, trait: 'part', explanandum: 'Speedboats have steering wheels', explanations: {
			sub: 'motorboats',
			basic: 'boats',
			sup: 'vehicles',
			adj: 'maneuverable',
			other: null
			}},

		{cat: 'animal', qtype: 1, trait: 'attr', explanandum: 'Dolphins are social', explanations: {
			sub: null,
			basic: 'mammals',
			sup: 'animals',
			adj: 'intelligent',
			other: 'swimmers'
			}},
		{cat: 'animal', qtype: 2, trait: 'part', explanandum: 'Tigers have fur', explanations: {
			sub: 'cats',
			basic: 'mammals',
			sup: 'animals',
			adj: null,
			other: 'predators'
			}},
		{cat: 'animal', qtype: 3, trait: 'attr', explanandum: 'Tigers are smart', explanations: {
			sub: 'cats',
			basic: 'mammals',
			sup: 'animals',
			adj: null,
			other: 'predators'
			}},
		{cat: 'animal', qtype: 4, trait: 'attr', explanandum: 'Chimpanzees are smart', explanations: {
			sub: 'primates',
			basic: 'mammals',
			sup: 'animals',
			adj: 'social',
			other: null
			}},
		{cat: 'animal', qtype: 5, trait: 'part', explanandum: 'Salmon have fins', explanations: {
			sub: null,
			basic: 'fish',
			sup: 'animals',
			adj: 'aquatic',
			other: 'swimmers'
			}},
		{cat: 'animal', qtype: 6, trait: 'part', explanandum: 'Dolphins have fins', explanations: {
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
	return _.shuffle(stims);
}
