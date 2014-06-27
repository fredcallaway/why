make_exp = function() {
  var f = {};
  f.structure = [];
  f.data = {
  	"trials": [],
  	"check_trials": [],
  };
  f.slideIndex = -1;

  /*
  ** exp.go() goes to the next slide in exp.structure
  **
  ** it defines _s to be the current slide
  **
  ** if you give it a positive integer argument, it will call itself that
  ** many more times, effectively skipping that number of elements
  ** in exp.structure
  */
	f.go = function(num_slides_to_skip) {
    /*if (typeof _s !== 'undefined' && _s.end) {
        _s.end();
    }
    if (this.slideStartTime) addData("slide_time", getTimeOffset(this.slideStartTime));
    this.slideStartTime = new Date();*/
    this.slideIndex++;
    if (this.slideIndex < this.structure.length) {
	    var all = this.structure[this.slideIndex];
	    var slide_name = all.split(".")[0];
	    //var _version = all.split(".")[1];
	    console.log("Beginning "+ slide_name);
	    _s = this.slides[slide_name];
	    /*console.log(_version);
	    if (_version) {
	        _s.version= _version;
	    }
	    else if (_s && _s.version){
	        _s.version= "default";
	    }
	    $('#progress').css('visibility', 'hidden');*/
	    if(_s != undefined) {
		      _s.init();
		    } else {
	        utils.showSlide(slide_name);
	    	}
	    if (num_slides_to_skip !=0 && num_slides_to_skip != undefined){
	        this.go(num_slides_to_skip-1);
	    }
	  } else {
	  	//what should we do if we try to go on after the experiment is done?
	  }
	};
  f.phase = 0; //out of all the trials, what number are we on?
	return f;
}
exp=make_exp();