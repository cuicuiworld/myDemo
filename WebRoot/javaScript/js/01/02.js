(function(){
	var Cat = function(name) {
		this.name = name
		this.run = function() {
			document.write( name + ' start runing ');
			return this;
		}
		this.stopRun = function() {
			document.write( name + ' stop runing ');
			return this;
		}
		this.sing = function() {
			document.write( name + ' start sing ');
			return this;
		}
		this.stopSing = function() {
			document.write( name + ' stop sing ');
			return this;
		}
	}
	var c = new Cat('Jack');
		c.run().sing().stopSing().stopRun();
})();
