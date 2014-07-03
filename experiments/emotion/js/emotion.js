function make_slides(f) {
    var slides = {};

    slides.i0 = slide(
        {
            name : "i0"
        }
    );

    slides.scenario_short_A = slide(
        {
            name : "scenario_short_A",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "1",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_short_B = slide(
        {
            name : "scenario_short_B",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text').val();
               var text_res2 = $('#2res_text').val();
               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
               } else {
                    res = { prompt: "1",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_medium_A = slide(
        {
            name : "scenario_medium_A",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_m').val();
               if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "1",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_medium_B = slide(
        {
            name : "scenario_medium_B",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text_m').val();
               var text_res2 = $('#2res_text_m').val();

               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
               } else {
                    res = { prompt: "1",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_long_A = slide(
        {
            name : "scenario_long_A",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_l').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "1",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );
    slides.scenario_long_B = slide(
        {
            name : "scenario_long_B",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text_l').val();
               var text_res2 = $('#2res_text_l').val();

               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
               } else {
                    res = { prompt: "1",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_short_A2 = slide(
        {
            name : "scenario_short_A2",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_2').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "2",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_short_B2 = slide(
        {
            name : "scenario_short_B2",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text_2').val();
               var text_res2 = $('#2res_text_2').val();

               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
               } else {
                    res = { prompt: "2",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_medium_A2 = slide(
        {
            name : "scenario_medium_A2",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_m2').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "2",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_medium_B2 = slide(
        {
            name : "scenario_medium_B2",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text_m2').val();
               var text_res2 = $('#2res_text_m2').val();

               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
               } else {
                    res = { prompt: "2",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_long_A2 = slide(
        {
            name : "scenario_long_A2",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_l2').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "2",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_long_B2 = slide(
        {
            name : "scenario_long_B2",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text_l2').val();
               var text_res2 = $('#2res_text_l2').val();

               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
               } else {
                    res = { prompt: "2",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_short_A3 = slide(
        {
            name : "scenario_short_A3",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_3').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "3",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_short_B3 = slide(
        {
            name : "scenario_short_B3",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text_3').val();
               var text_res2 = $('#2res_text_3').val();

               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
               } else {
                    res = { prompt: "3",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_medium_A3 = slide(
        {
            name : "scenario_medium_A3",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_3').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "3",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_medium_B3 = slide(
        {
            name : "scenario_medium_B3",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text_m3').val();
               var text_res2 = $('#2res_text_m3').val();

               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
               } else {
                    res = { prompt: "3",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_long_A3 = slide(
        {
            name : "scenario_long_A3",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_l3').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "3",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_long_B3 = slide(
        {
            name : "scenario_long_B3",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text_l3').val();
               var text_res2 = $('#2res_text_l3').val();

               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
               } else {
                    res = { prompt: "3",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_short_A4 = slide(
        {
            name : "scenario_short_A4",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_4').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "4",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_short_B4 = slide(
        {
            name : "scenario_short_B4",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text_4').val();
               var text_res2 = $('#2res_text_4').val();

               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                } else {
                    res = { prompt: "4",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_medium_A4 = slide(
        {
            name : "scenario_medium_A4",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_m4').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "4",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_medium_B4 = slide(
        {
            name : "scenario_medium_B4",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text_m4').val();
               var text_res2 = $('#2res_text_m4').val();

               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
               } else {
                    res = { prompt: "4",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_long_A4 = slide(
        {
            name : "scenario_long_A4",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_l4').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "4",
                        text: text_res,           
                        sure: $('input[name="sure"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.scenario_long_B4 = slide(
        {
            name : "scenario_long_B4",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
               var text_res1 = $('#1res_text_l4').val();
               var text_res2 = $('#2res_text_l4').val();

               if (text_res1 == "" || $('input[name="sure"]:checked').length == 0 || text_res2 == "" || $('input[name="sure2"]:checked').length == 0) {
                    alert("You need to answer all questions!")
               } else {
                    res = { prompt: "4",
                        text1: text_res1,
                        sure1: $('input[name="sure"]:checked').val(),
                        text2: text_res2,
                        sure2: $('input[name="sure2"]:checked').val()
                    };
                    exp.data_trials.push(res);
                    _stream.apply(this);
                    return false;
                }
            }
        }
    );

    slides.subj_info = slide(
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

                exp.data= {
                    "trials" : exp.data_trials,
                    "system" : exp.system,
                    "condition" : exp.condition,
                    "subject_information" : exp.subj_data
                };
                //setTimeout(function() {turk.submit(exp.subj_data);}, 1000);
                setTimeout(function() {turk.submit(exp.data);}, 1000);

                exp.go();
                return false;
            }

        }
    );

    slides.thanks = slide(
        {
            name : "thanks",
            start : function(){
            }
        }
    );

    return slides;
};

function init() {
    jquery_extensions();
    $('.slide').hide();
    $('body').css('visibility','visible');
    exp_sizing();

    exp.data_trials=[];
    exp.sandbox=0;
    exp.slides = make_slides(exp);


    var group = Math.random();
    if (group > 0.5) { 
        exp.structure=["i0",'scenario_short_A','scenario_medium_A', 'scenario_long_A', 'scenario_short_A2', 'scenario_medium_A2', 'scenario_long_A2', 'scenario_short_A3', 'scenario_medium_A3', 'scenario_long_A3', 'scenario_short_A4', 'scenario_medium_A4', 'scenario_long_A4', 'subj_info', 'thanks'];
    } else {
        exp.structure=["i0",'scenario_short_B','scenario_medium_B', 'scenario_long_B', 'scenario_short_B2', 'scenario_medium_B2', 'scenario_long_B2', 'scenario_short_B3', 'scenario_medium_B3', 'scenario_long_B3', 'scenario_short_B4', 'scenario_medium_B4', 'scenario_long_B4', 'subj_info', 'thanks'];
    }

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

};

get_pusher_name= function(){
    var names=["Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen"];

    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();

get_pushee_name= function(){
    var names=["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald"];
    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();

get_wife_name= function(){
    var names=["Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa"];

    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();

get_husband_name= function(){
    var names=["George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey"];

    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();

get_runner_name= function(){
    var names=["Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis"];

    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();

get_crier_name= function(){
    var names=["Stephanie", "Carolyn", "Christine", "Marie", "Janet", "Catherine", "Frances", "Ann", "Diane", "Julie", "Benjamin", "Bruce", "Brandon", "Adam", "Harry", "Fred", "Wayne", "Billy", "Steve", "Louis"];

    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();



function set_condition(){
    exp.condition={dependent:"hl_num",
                   bins:"lmh"
                  };
    var pusher = get_pusher_name();
    $('.pusher_name').each(function(){$(this).text(pusher);});

    var pushee = get_pushee_name();
    $('.pushee_name').each(function(){$(this).text(pushee);});

    var wife = get_wife_name();
    $('.wife_name').each(function(){$(this).text(wife);});

    var husband = get_husband_name();
    $('.husband_name').each(function(){$(this).text(husband);});

    var runner = get_runner_name();
    $('.runner_name').each(function(){$(this).text(runner);});

    var crier = get_crier_name();
    $('.crier_name').each(function(){$(this).text(crier);});
}
