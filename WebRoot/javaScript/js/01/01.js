(function(){
	var Cat = function(name) {
		this.name = name
		this.run = function() {
			document.write( name + ' start runing ');
		}
		this.stopRun = function() {
			document.write( name + ' stop runing ');
		}
		this.sing = function() {
			document.write( name + ' start sing ');
		}
		this.stopSing = function() {
			document.write( name + ' stop sing ');
		}
	}
	var c = new Cat('Jack');
		c.run();
		c.sing();
		c.stopSing();
		c.stopRun();
})();
