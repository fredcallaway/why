function make_slides(f) {
    var   slides = {};

    
    slides.i0 = slide(
        {
            name : "i0"
        }
    );
    
    //Radio Buttons//
    slides.radio_buttons = slide(
    	{
    		name : "radio_buttons",	
    		
            present: [0, 1, 2, 3],
                      
            present_handle : function(stim) {
            	console.log(stim);
            	exp.data_trials.push(stim);
            	
            	//get scenario
            	exp.questions = get_question();
            	_(stim).shuffle;
            	$('.why_question').each(function(){$(this).text(exp.questions['question']);});
				$('.expl1').each(function(){$(this).text(exp.questions['expl_' + stim.expl1]);});
				$('.expl2').each(function(){$(this).text(exp.questions['expl_' + stim.expl2]);});
				},
            
            //This makes sure subjects can't move on if they haven't given an answer                   
    		button : function() {
    			if ($('input[type=radio]:checked').size() > 0) {
					_.last(exp.data_trials)["expl_chosen"] = [{
					rad_button_resp : $('input[name="rad_button"]:checked').val()
					}];
					//This unselects the button for the next trial
					$('input[name="rad_button"]').attr('checked',false);
					_stream.apply(this);
				} 
    		}
     	}
     );
     
     
     //SLIDER
     slides.slider = slide(
     	{
     		name : "slider",
     		
     		start : function() {
     		},
     		
            present: [0, 1, 2, 3, 4, 5, 6, 7],
                      
            present_handle : function(stim) {
            	exp.data_trials.push(stim);
                this.init_sliders();
            	exp.scenarios = get_scenarios();
            	order_trials = exp.scenarios[1];
            	exp.scenarios = exp.scenarios[0];
            	$('.scenario').each(function(){$(this).text(exp.scenarios[order_trials[stim]]['scenario']);});
				$('.expl').each(function(){$(this).text(exp.scenarios[order_trials[stim]]['expl' + order_trials.expl]);});
				//$('.expl2').each(function(){$(this).text(exp.scenarios['expl2']);});
			},
			
            button : function() {
                //if(_.all(exp.sliderPost, function(x){return(x<500);})){
                    _.last(exp.data_trials)["version"]= "baseline";
                    _.last(exp.data_trials)["pid"]= this.phaseid;
                    _.last(exp.data_trials)["expl_rating"]= exp.sliderPost;
                    //_.last(exp.data_trials)["expl2_rating"]= exp.sliderPost[1];
                    if(this.version=="pre") exp.data_trials.push($.extend(true, {}, _.last(exp.data_trials)));
                    if(exp.canvas) exp.canvas.remove();
                    _stream.apply(this);
                //}
            },
            
            init_sliders : function() {

                exp.sliderPost=[500,500];

                if (this.version === "baseline") {
                    $('#test_text').hide();
                    $('#baseline_test_text').show();
                }
                else{
                    $('#test_text').show();
                    $('#baseline_test_text').hide();
                }

                $(".sim_slide").css('width' , 3*(exp.width/4)).centerhin();
                $(".slider-lbl1 ").css('right' , (exp.width/4) *3.2 +20);
                $(".slider-lbl2 ").css('left' , (exp.width/4) *3.2 +20);
                $(".slider-lbl3 ").css('left' , (exp.width/2));
                $("#expl_slide").slider({
                    range : "min",
                    value : 50,
                    min : 0,
                    max : 100,
                    slide : function(event, ui) {
                        exp.sliderPost[0] = ui.value/100;
                    }
                });
                $("#expl_slide").mousedown(function(){$("#expl_slide a").css('display', 'inherit');});
                $("#expl_slide").slider("option","value",0);//reset slider
        
                
                $(".ui-slider-handle").css('display', 'none');
            }
      	}      
	);
	
	slides.likert = slide(
		{
			name : "likert",
			start : function() {
			},
            present: [0, 1, 2, 3, 4],
                      
            present_handle : function(stim) {
            	console.log(stim);
            	exp.data_trials.push(stim);
            	
            	//get scenario
            	exp.question = get_questions();
            	$('.why_question').each(function(){$(this).text(exp.question['question']);});
				$('.expl').each(function(){$(this).text(exp.question['expl' + stim.expl]);});
				},
            
            //This makes sure subjects can't move on if they haven't given an answer                   
    		button : function() {
    			if ($('input[type=radio]:checked').size() > 0) {
					_.last(exp.data_trials)["rating"] = [{
					rad_button_resp : $('input[name="rad_button"]:checked').val()
					}];
					//This unselects the button for the next trial
					$('input[name="rad_button"]').attr('checked',false);
					_stream.apply(this);
				} 
    		}
     	}
	);

	slides.instructions_causal = slide(
		{
			name : "instructions_causal"
//			present : [0],
//			button : function() {
//				exp.start_time = Date.now();
//				_stream.apply(this);
//			}
		}
	);
	
	slides.training = slide(
		{
			name : "training",
			start : function() {
			},
			present : [0],
			present_handle : function() {
				t1 = Date.now();
			},
			button : function() {
				t2 = Date.now();
				if ((t2 - t1) > 1000) {
					_stream.apply(this);
				}
			}
		}
	);
	
	slides.txt_box = slide(
		{
			name : "txt_box",
			start : function() {
			},
			present : _.shuffle([{catchT: 0, item: 0},
			{catchT: 0, item: 1},
			{catchT: 0, item: 2},
			{catchT: 0, item: 3},
			{catchT: 0, item: 4},
			{catchT: 0, item: 5},
			{catchT: 0, item: 6},
			{catchT: 0, item: 7},
			{catchT: 1, item: 0},
			{catchT: 1, item: 1},
			{catchT: 1, item: 2},
			{catchT: 1, item: 3}
			]),
			
			catch_trial_handle : function(stim) {
				exp.trial_type = "catch";
				exp.data_trials.push(stim);
				$("#critical_trial").hide();
				$("#catch_trial").show();				
            	//catch trial question
            	exp.comp_questions = get_comprehension_questions();
            	//exp.condition = exp.comp_questions[stim]; 
            	$('.comp_question').each(function(){$(this).text(exp.comp_questions[stim["item"]]['comp_question']);});
            	
            	//choose which answer to display in which button
            	exp.ans_display = ["wrong_ans", "right_ans"];
            	exp.ans_display = _(exp.ans_display).shuffle();
            	
				$('.ans1').each(function(){$(this).text(exp.comp_questions[stim["item"]][exp.ans_display[0]]);});
				$('.ans2').each(function(){$(this).text(exp.comp_questions[stim["item"]][exp.ans_display[1]]);});
			
			},
			
			present_handle : function(stim) {
				exp.trial_type = "critical";
				exp.data_trials.push(stim);
				$("#catch_trial").hide();
				$("#critical_trial").show();
				exp.questions = get_questions();
				//exp.condition = exp.questions[stim];
            	
            	//critical trial question
            	$('.why_question').each(function(){$(this).text(exp.questions[stim["item"]]['question']);});
			},
			button : function() {
                var res = {};

                $('input[name="expl"]').each(
                    function(){
                        res[$(this).attr("name")] = $(this).val();
                    });
                
                $('input[name="radio_button"]').each(
                    function(){
                        res[$(this).attr("name")] = $(this).val();
                    });
                    
                //console.log(res);
                if(exp.trial_type==="critical" && !_.contains(_.values(res), "")){
                    res["answered"]= 1 * ! _.isEmpty(_.filter(_.values(res), function(x){ return !isNumber(x);}));
                    _.last(exp.data_trials)["expl"] = res["expl"];
                    _.last(exp.data_trials)["answered"]=res["answered"];
                //clear text box, move to next trial
                $('input[name="expl"]').val('');
				_stream.apply(this);
				}
    			if (exp.trial_type==="catch" && $('input[type=radio]:checked').size() > 0) {
    				var ans_chosen = [];
    				if ($('input[name="radio_button"]:checked').val() === "ans1") {
    					ans_chosen = exp.ans_display[0];
    				} else { ans_chosen = exp.ans_display[1]; }
					_.last(exp.data_trials)["ans_chosen"] = ans_chosen;
					//This unselects the button for the next trial
					$('input[name="radio_button"]').attr('checked',false);
					_stream.apply(this);
				}
			}
		}
	);
	
// 	slides.comp_questions = slide(
// 		{
// 			name : "comp_questions",
// 			start : function() {
// 			},
// 			present : [0,1,2,3],
// 			present_handle : function(stim) {
//             	exp.data_trials.push(stim);
//             	
//             	//get scenario
//             	exp.comp_questions = get_comprehension_questions();
//             	_(stim).shuffle;
//             	$('.comp_question').each(function(){$(this).text(exp.comp_questions[stim]['comp_question']);});
//             	
//             	//choose which answer to display in which button
//             	var exp.ans_display = ["wrong_ans", "right_ans"];
//             	exp.ans_display = _(exp.ans_display).shuffle();
//             	
// 				$('.ans1').each(function(){$(this).text(exp.comp_questions[stim][exp.ans_display[0]]);});
// 				$('.ans2').each(function(){$(this).text(exp.comp_questions[stim][exp.ans_display[1]]);});
// 			},
//     		button : function() {
//     			if ($('input[type=radio]:checked').size() > 0) {
// 					_.last(exp.data_trials)["ans_chosen"] = [{
// 					rad_button_resp : $('input[name="rad_button"]:checked').val()
// 					}];
// 					//This unselects the button for the next trial
// 					$('input[name="rad_button"]').attr('checked',false);
// 					_stream.apply(this);
// 				}
// 			} 
// 		}		
// 	);
    
    slides.conf_trial = slide(
        {
            name : "conf_trial",
            start : function() {
            },
            button : function() {
                var res = {};
                $('input[type="text"]').each(
                    function(){
                        res[$(this).attr("name")] = $(this).val();
                    });
                console.log(res);
                if(!_.contains(_.values(res), "")){
                    res["ass"]= 1 * ! _.isEmpty(_.filter(_.values(res), function(x){ return !isNumber(x);}));
                    exp.data_trials.push(res);
                    exp.go();
                }
            }
        }
    );

    slides.show_some_images = slide(
        {
            name: "show_some_images",
            present: _.shuffle([{creature: "fish"}, {creature: "fish"}]),
            start: function() {},
            present_handle: function(stim) {
                $("#creature").html("");
                Ecosystem.draw(stim.creature, {}, "creature", 0.5);
            },
            button: function() { _stream.apply(this); },
            init_sliders : function() {

                exp.sliderPost=[500,500];

                if (this.version === "baseline") {
                    $('#test_text').hide();
                    $('#baseline_test_text').show();
                }
                else{
                    $('#test_text').show();
                    $('#baseline_test_text').hide();
                }

                $(".sim_slide").css('width' , 3*(exp.width/4)).centerhin();
                $(".slider-lbl1 ").css('right' , (exp.width/4) *3.2 +20);
                $(".slider-lbl2 ").css('left' , (exp.width/4) *3.2 +20);
                $(".slider-lbl3 ").css('left' , (exp.width/2));
                $("#test_slide").slider({
                    range : "min",
                    value : 50,
                    min : 0,
                    max : 100,
                    slide : function(event, ui) {
                        exp.sliderPost[0] = ui.value/100;
                    }
                });
                $("#test_slide").mousedown(function(){$("#test_slide a").css('display', 'inherit');});
                $("#test_slide").slider("option","value",0);//reset slider


                $("#confidence_slide").slider({
                    range : "min",
                    value : 50,
                    min : 0,
                    max : 100,
                    slide : function(event, ui) {
                        exp.sliderPost[1] = ui.value/100;
                    }
                });
                $("#confidence_slide").mousedown(function(){$("#confidence_slide a").css('display', 'inherit');});
                $("#confidence_slide").slider("option","value",0);//reset slider
                $(".ui-slider-handle").css('display', 'none');
            }
        }
    );

    
    slides.repeated_stims = slide(
        {
            name : "repeated_stims",
            present: [{prop: .6, num_samples:5},
                      {prop: .4, num_samples:5},
                      {prop: .5, num_samples:4},
                      {prop: 1, num_samples:5},
                      {prop: .2, num_samples:5},
                      {prop: 0, num_samples:5},
                      {prop: .8, num_samples:5}
                     ],

            start: function(){
                // example of moving html blocks around
                // $('#res_sum').prependTo("#baseline");
                // $('#test_sliders').insertAfter("#res_sum");
                // $('<br/><br/><br/>').insertBefore("#test_sliders");
            },

            present_handle : function(stim){
                console.log(stim);
                this.init_sliders();
                exp.data_trials.push(stim);

                //get new horse names
                exp.horse_names = [get_horse_name(),get_horse_name()];

                //update horses names
                $('.horse1_name').each(function(){$(this).text(exp.horse_names[0]);});
                $('.horse2_name').each(function(){$(this).text(exp.horse_names[1]);});

                //update table with win data
                $('#horse2').text(Math.round(stim.num_samples * stim.prop) + "");
                $('#horse1').text(Math.round(stim.num_samples * (1-stim.prop)) +"");
                $('#race_total').text(stim.num_samples);
            },
            button : function() {
                if(_.all(exp.sliderPost, function(x){return(x<500);})){
                    _.last(exp.data_trials)["version"]= "baseline";
                    _.last(exp.data_trials)["pid"]= this.phaseid;
                    _.last(exp.data_trials)["prop_estimate"]= exp.sliderPost[0];
                    _.last(exp.data_trials)["confidence"]= exp.sliderPost[1];
                    if(this.version=="pre") exp.data_trials.push($.extend(true, {}, _.last(exp.data_trials)));
                    if(exp.canvas) exp.canvas.remove();
                    _stream.apply(this);
                }
            },
            init_sliders : function() {

                exp.sliderPost=[500,500];

                if (this.version === "baseline") {
                    $('#test_text').hide();
                    $('#baseline_test_text').show();
                }
                else{
                    $('#test_text').show();
                    $('#baseline_test_text').hide();
                }

                $(".sim_slide").css('width' , 3*(exp.width/4)).centerhin();
                $(".slider-lbl1 ").css('right' , (exp.width/4) *3.2 +20);
                $(".slider-lbl2 ").css('left' , (exp.width/4) *3.2 +20);
                $(".slider-lbl3 ").css('left' , (exp.width/2));
                $("#test_slide").slider({
                    range : "min",
                    value : 50,
                    min : 0,
                    max : 100,
                    slide : function(event, ui) {
                        exp.sliderPost[0] = ui.value/100;
                    }
                });
                $("#test_slide").mousedown(function(){$("#test_slide a").css('display', 'inherit');});
                $("#test_slide").slider("option","value",0);//reset slider


                $("#confidence_slide").slider({
                    range : "min",
                    value : 50,
                    min : 0,
                    max : 100,
                    slide : function(event, ui) {
                        exp.sliderPost[1] = ui.value/100;
                    }
                });
                $("#confidence_slide").mousedown(function(){$("#confidence_slide a").css('display', 'inherit');});
                $("#confidence_slide").slider("option","value",0);//reset slider
                $(".ui-slider-handle").css('display', 'none');
            }
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
				exp.end = Date.now();
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
                    condition : exp.condition,
                    subj_data : exp.subj_data
                };
                setTimeout(function() {turk.submit(exp.data);}, 1000);
            }
        });
    return slides;
};

/// init ///
function init() {
  //  jquery_extensions();
    $('.slide').hide();
    $('body').css('visibility','visible');
    //exp_sizing();

    exp.data_trials=[];
    exp.sandbox=0;
    exp.slides = make_slides(exp);

    exp.structure=["i0", 'instructions_causal', 'training', 'txt_box', 'subj_info', 'thanks'];
    set_condition();
    exp.condition = [];

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
        [{
            workerId : turk.workerId,
            cond : exp.condition,
            Browser : BrowserDetect.browser,
            OS : BrowserDetect.OS,
            screenH: screen.height,
            screenUH: exp.height,
            screenW: screen.width,
            screenUW: exp.width
        }];

    exp.go();

};

function set_condition(){
    exp.condition={dependent:"expl", independent: "question"};
    var zname = get_zach_name();
    $('.zach_name').each(function(){$(this).text(zname);});
}

// example helper function (also a closure!)
get_zach_name= function(){
    var names=["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis", "Walter", "Patrick", "Peter", "Harold", "Douglas", "Henry", "Carl", "Arthur", "Ryan", "Roger", "Joe", "Juan", "Jack", "Albert", "Jonathan", "Justin", "Terry", "Gerald", "Keith", "Samuel", "Willie", "Ralph", "Lawrence", "Nicholas", "Roy", "Benjamin", "Bruce", "Brandon", "Adam", "Harry", "Fred", "Wayne", "Billy", "Steve", "Louis", "Jeremy", "Aaron", "Randy", "Howard", "Eugene"];

    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();


// example helper function (also a closure!)
var get_horse_name= function(){
    var horses=["Maple Thor","FlyingFog","Dagwood Fears","Mod Tap","Rosy Slang","Ouch Pouch","Ken Dread Spirit","Exoville","Tom Foolery","Balancing Action","Retro-Yo","Abundance Grand","Fix n' Vix","Existential X","Illustrious Oh","Tori Bora","Erstwhile","Crowd Daddy","Basking Bingo","Trips not Trips","Zensure","Mr. Cup-a-Soup","Svelt Smelt","Libation Nation","Crutos","Technoasis","Pretzel","Diet Smokes","Laugh Tax","Bleendot","Yo Comprehension","Twinkies Don't Count","Captain Bamboo","Closet Palace","Tino Cooper","Pearlescient","Green Mole","Chomsky","Mr. Sunnymoon","Retail Dentist","Vigration","Soft Shark","Post Mortadella","Juke London","Glow Wonder","Mr. Mercurial","60 Grit","Silver Demand","Chow Biscuit","Love That Loot","Question Quest","Counter Clone","Picnic Train","Huffington Heights","Sunbright Sparrow","Panic Button","Pancho Casanova","Tropicantor","Zen Shin","Water Back","Pirate School","Rank","Wind Shear","Conundreampt","Que West","Dr. Haste","Miles Alpha","Guru Static","Chateau Yo","Habitual Church","Truth Spock","The Deuce","Pawnagra","Airborne Pickle","Two Faux","Here Comes Me","Habit Taught","Princess Plex","Grammburglar","Acid Rein","Stamina","Fez","Weeeeeeeee","Narrow Barrow","Faux Boil","Flame-Thrower","Pen the Tale","Tuscany Tucson","Smackdab Init","Go Ned!","Izzy Bell","Never No","Floppy Zinger","Columbo Logic","Turtle Problems","Below the Beltway","Historia Fonz","Pumpty Dumpty"];
    horses = _(horses).shuffle();
    return function(){
        return horses.pop();
    };
}();

var get_scenarios = function() {
	var scenarios = [{scenario: "Dummy Scenario 1", 
					expl1: "Explanation 1", expl2: "Explanation 2"},
					{scenario: "Dummy Scenario 2", 
					expl1: "Explanation 1", expl2: "Explanation 2"},  
					{scenario: "Dummy Scenario 3", 
					expl1: "Explanation 1", expl2: "Explanation 2"}, 
					{scenario: "Dummy Scenario 4", 
					expl1: "Explanation 1", expl2: "Explanation 2"}];
	var order_trials = [{scen: 1, expl: 1}, {scen: 1, expl: 2}, {scen: 2, expl: 1}, {scen: 2, expl: 2},
						{scen: 3, expl: 1}, {scen: 3, expl: 2}, {scen: 4, expl: 1}, {scen: 4, expl: 2}];
	order_trials = _(order_trials).shuffle();
	return function() {
		return [scenarios, order_trials];
	};
}();

var get_questions = function() {
	var questions = [{disease: "D", protein: "X", fever: "NA",
	question : 'You know that an alien has Disease D and expresses Protein X. Why do they express Protein X?'},
	{disease: "B", protein: "Y", fever: "NA",
	question : 'You know that an alien has Disease B and expresses Protein Y. Why do they express Protein Y?'},
	{disease: "A", protein: "NA", fever: "Y",
	question : 'You know that an alien has Disease A and has a fever. Why do they have a fever?'},
	{disease: "B", protein: "NA", fever: "Y",
	question : 'You know that an alien has Disease B and has a fever. Why do they have a fever?'},
	{disease: "C", protein: "NA", fever: "Y",
	question : 'You know that an alien has Disease C and has a fever. Why do they have a fever?'},
	{disease: "D", protein: "NA", fever: "Y",
	question : 'You know that an alien has Disease D and has a fever. Why do they have a fever?'},
	{disease: "NA", protein: "X", fever: "Y",
	question : 'You know that an alien expresses Protein X and has a fever. Why do they have a fever?'},
	{disease: "NA", protein: "Y", fever: "Y",
	question : 'You know that an alien expresses Protein Y and has a fever. Why do they have a fever?'}];
	
// 	in case i want to use these in the future
// 	var extra_questions = [{disease: "A", protein: "X", fever: "NA", 
// 	question : "You know that an alien has Disease A and expresses Protein X. Why do they express Protein X?"},
// 	{disease: "B", protein: "X", fever: "NA",
// 	question : "You know that an alien has Disease B and expresses Protein X. Why do they express Protein X?"},
// 	{disease: "C", protein: "X", fever: "NA",
// 	question : "You know that an alien has Disease C and expresses Protein X. Why do they express Protein X?"},
// 	{disease: "D", protein: "Y", fever: "NA",
// 	question : "You know that an alien has Disease D and expresses Protein Y. Why do they express Protein Y?"},
// 	{disease: "A", protein: "Y", fever: "NA",
// 	question : "You know that an alien has Disease A and expresses Protein Y. Why do they express Protein Y?"},
// 	{disease: "C", protein: "Y", fever: "NA",
// 	question : "You know that an alien has Disease C and expresses Protein Y. Why do they express Protein Y?"}];
	
	questions = _(questions).shuffle();
	
	return function() {
		return questions;
	}
}();

var get_comprehension_questions = function() {
	var comp_questions = [{comp_question: "How many aliens out of 100 have Disease B?",
	wrong_ans: "2", right_ans: "10"},
	{comp_question: "What happens when an alien expresses Protein X and Protein Y?",
	wrong_ans: "They get Disease C.", right_ans: "They get a Fever."},
	{comp_question: "True or False: If an alien has Disease C, they always express Protein X.",
	wrong_ans: "True", right_ans: "False"},
	{comp_question: "When an alien has Disease B, which protein do they always express?",
	wrong_ans: "Protein Y", right_ans: "Protein X"}];
	
	comp_questions = _(comp_questions).shuffle();
	
	return function() {
		return comp_questions;
	}	
}();
	
	
	
