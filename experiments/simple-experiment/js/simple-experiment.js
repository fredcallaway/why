function make_slides(f) {
	var   slides = {};

	slides.i0 = slide({
     name : "i0"
  });

	slides.instructions = slide({
		name : "instructions",
		button : function() {
			_stream.apply(this);
		}
	});

	slides.familiarization = slide({
		name : "familiarization",
		present : [], //trial information for this block
		start : function() {/*what to do at the beginning of a block*/},
		present_handle : function() {/*what to do at the beginning of each trial*/},
		button : function() {
			_stream.apply(this);
		},
		end : function() {/*what to do at the end of a block*/}
	});

	slides.one_slider = slide({
		name : "one_slider",
		start : function() {
      this.init_sliders();
      exp.sliderPost = null;
		},
		button : function() {
			this.log_responses();
			_stream.apply(this);
		},
		init_sliders : function() {
			utils.make_slider("#generic_slider", function(event, ui) {
				exp.sliderPost = ui.value;
			});
		},
		log_responses : function() {
			exp.data.trials.push({
				"trial_type" : "one_slider",
				"sentence_type" : "generic",
				"response" : exp.sliderPost
			})
		}
	});

	slides.multi_slider = slide({
		name : "multi_slider",
		start : function() {
			this.sentence_types = _.shuffle(["generic", "negation", "always", "sometimes", "usually"]);
			var sentences = {
				"generic":"Wugs have fur.",
				"negation":"Wugs do not have fur.",
				"always":"Wugs always have fur.",
				"sometimes":"Wugs sometimes have fur.",
				"usually":"Wugs usually have fur.",
			};
			for (var i=0; i<this.sentence_types.length; i++) {
				var sentence_type = this.sentence_types[i];
				var sentence = sentences[sentence_type];
      	$("#multi_slider_table").append('<tr><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
      	utils.match_row_height("#multi_slider_table", ".slider_target");
      };
      this.init_sliders();
      exp.sliderPost = [];
		},
		button : function() {
			this.log_responses();
			_stream.apply(this);
		},
		init_sliders : function(sentence_types) {
			for (var i=0; i<this.sentence_types.length; i++) {
				var sentence_type = this.sentence_types[i];
				utils.make_slider("#slider" + i, this.make_slider_callback(i));
			}
		},
		make_slider_callback : function(i) {
			return function(event, ui) {
        exp.sliderPost[i] = ui.value;
      };
		},
		log_responses : function() {
			for (var i=0; i<this.sentence_types.length; i++) {
				var sentence_type = this.sentence_types[i];
				exp.data.trials.push({
					"trial_type" : "multi_slider",
					"sentence_type" : sentence_type,
					"response" : exp.sliderPost[i]
				});
			}
		}
	});

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
      exp.go();
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

	return slides;
};

/// init ///
function init() {
	//blocks of the experiment:
  exp.structure=["i0", "instructions", "familiarization", "one_slider", "multi_slider", 'subj_info', 'thanks'];
  
  //make corresponding slides:
  exp.slides = make_slides(exp);

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
  		$("#mustaccept").show();
    } else {
  		$("#start_button").click(function() {$("#mustaccept").show();})
      exp.go();
    }
  });

  exp.data.condition = {}; //can randomize between subject conditions here
  exp.data.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
   
  exp.go(); //show first slide
};