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
				{  check: "Is a cat a mammal or a reptile?   "			},
				{  check: "Do dolphins live on land or in the sea?   "	},
				{  fact: 'An elephant is smart because it is a(n) '		},
				{  fact: 'An elephant has bones because it is a(n) '	},
				{  fact: 'A horse is smart because it is a(n) '			},
				{  fact: 'A horse has lungs because it is a(n) '		},
				{  fact: 'A chimp has feet because it is a(n) '			},
				{  fact: 'A chimp lives in groups because it is a(n) '	},
				{  fact: 'A chimp is smart because it is a(n) '			},
				{  fact: 'A mouse has lungs because it is a(n) '		},
				{  fact: 'A mouse has a tail because it is a(n) '		},
				{  fact: 'A squirrel has claws because it is a(n) '		},
				{  fact: 'A tiger has claws because it is a(n) '		},
				{  fact: 'A tiger is dangerous because it is a(n) '		},
				{  fact: 'A tiger is smart because it is a(n) '			},
				{  fact: 'A dolphin has fins because it is a(n) '		},
				{  fact: 'A robin has wings because it is a(n) '		},
				{  fact: 'A chicken has wings because it is a(n) '		},
				{  fact: 'A robin has wings because it is a(n) '		},
				{  fact: 'A salmon has fins because it is a(n) '		},
				{  fact: 'A bee lives in groups because it is a(n) '	},
				{  fact: 'A bee has wings because it is a(n) '			},
				{  fact: 'An alligator has teeth because it is a(n) '	},
				{  fact: 'A deer has teeth because it is a(n) '			},
				{  fact: 'A lizard has a tail because it is a(n) '		}
			]),

			present_handle : function(stim){
				$('#explanation').focus();
				//check trial
				if (stim.check!==null) {
					console.log('check trial');
					$('#fact').text(stim.check);
					exp.check_trials.push(stim); //TODO create exp.check_trials
				} else {
					$('#fact').text(stim.fact);
					exp.data_trials.push(stim);
				}
			},
			button : function() {
				var res = {  explanation: $('#explanation').val() };
				if (res.explanation !== "") {
					if (stim.check!==null) exp.check_trials.push(res);
					else exp.check_trials.push(res);
					$('#explanation').val("");
					$('#help').hide();
					_stream.apply(this);
				} else { $('#help').show(); }
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


