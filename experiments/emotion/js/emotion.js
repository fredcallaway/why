function make_slides(f) {
    var slides = {};

    slides.i0 = slide(
        {
            name : "i0"
        }
    );

    slides.scenario_1 = slide(
        {
            name : "scenario_1",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_1').val();
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


    slides.scenario_2 = slide(
        {
            name : "scenario_2",
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


    slides.scenario_3 = slide(
        {
            name : "scenario_3",
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


    slides.scenario_4 = slide(
        {
            name : "scenario_4",
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

    slides.scenario_5 = slide(
        {
            name : "scenario_5",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_5').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "5",
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

    slides.scenario_6 = slide(
        {
            name : "scenario_6",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_6').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "6",
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

   slides.scenario_7 = slide(
        {
            name : "scenario_7",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_7').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "7",
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

   slides.scenario_8 = slide(
        {
            name : "scenario_8",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_8').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "8",
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

   slides.scenario_9 = slide(
        {
            name : "scenario_9",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_9').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "9",
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

   slides.scenario_10 = slide(
        {
            name : "scenario_10",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_10').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "10",
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

   slides.scenario_11 = slide(
        {
            name : "scenario_11",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_11').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "11",
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

   slides.scenario_12 = slide(
        {
            name : "scenario_12",
             start : function () {
                $('#new_slide_form').submit(this.button);
            }, 
            present : [0],
            button : function (e){
                var res = {};
                var text_res = $('#res_text_12').val();
                if (text_res == "" || $('input[name="sure"]:checked').length == 0) {
                    alert("You need to answer all questions!")
                }  else {
                    res = { prompt: "12",
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
                    };

                exp.data= {
                    "trials" : exp.data_trials,
                    "system" : exp.system,
                    "condition" : exp.condition,
                    "subject_information" : exp.subj_data
                };
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


    exp.structure=["i0",'scenario_1','scenario_2', 'scenario_3', 'scenario_4', 'scenario_5', 'scenario_6', 'scenario_7', 'scenario_8', 'scenario_9', 'scenario_10', 'scenario_11', 'scenario_12', 'subj_info', 'thanks'];
 
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

get_five_name= function(){
    var names=["Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis"];

    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();

get_six_name= function(){
    var names=["Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis"];

    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();

get_seven_name= function(){
    var names=["Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis"];

    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();

get_eight_name= function(){
    var names=["Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis"];

    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();

get_nine_name= function(){
    var names=["Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis"];

    names = _(names).shuffle();
    return function(){
        return names.pop();
    };
}();

get_twelve_name= function(){
    var names=["Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis"];

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

    var five_name = get_five_name();
    $('.five_name').each(function(){$(this).text(five_name);});

    var six_name = get_six_name();
    $('.six_name').each(function(){$(this).text(six_name);});

    var seven_name = get_seven_name();
    $('.seven_name').each(function(){$(this).text(seven_name);});

    var eight_name = get_eight_name();
    $('.eight_name').each(function(){$(this).text(eight_name);});

    var nine_name = get_nine_name();
    $('.nine_name').each(function(){$(this).text(nine_name);});

    var ten_1_name = get_wife_name();
    $('.ten_1_name').each(function(){$(this).text(ten_1_name);});

    var ten_2_name = get_husband_name();
    $('.ten_2_name').each(function(){$(this).text(ten_2_name);});

    var eleven_1_name = get_pusher_name();
    $('.eleven_1_name').each(function(){$(this).text(eleven_1_name);});

    var eleven_2_name = get_wife_name();
    $('.eleven_2_name').each(function(){$(this).text(eleven_2_name);});

    var twelve_name = get_nine_name();
    $('.twelve_name').each(function(){$(this).text(twelve_name);});
}
