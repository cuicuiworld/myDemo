$.fn.snowPlaying = function(option) {
		this.defaults = {
			snowType: '*'
		}
		this.num = 0;
		this.options = $.extend({}, this.defaults, option);
		this.playing = function() {
			this.createSnow()
		};
		this.radomPosition = function() {
			var $width = $(document).width();
			var $position = Math.floor(Math.random() * 2000);
			var $height = $(document).height();
			if ($position < $width) {
				return $position;
			}
		};
		this.createSnow = function() {
			var timer = null;
			var $this = this;
			timer = setInterval(function() {
				var snow = $("<span class=" + 'snow' + $this.num + ">" + $this.defaults.snowType + "</span>");
				$('body').append(snow);
				var $size = $this.radomSize();
				$this.radomCss(snow, $size);
				$this.animates(snow, $size)
			}, 80)
		};
		this.radomCss = function(obj, size) {
			var $this = this;
			return obj.css({
				"color": "white",
				"font-size": size + 'px',
				"position": "absolute",
				"top": "-50px",
				left: this.radomPosition() + 'px'
			})
		}
		this.radomSize = function() {
			return Math.floor(Math.random() * 15 + 10)
		};
		this.animates = function(ele, size) {
			var $height = $(document).height() - size;
			var $this = this;
			ele.animate({
				"top": $height + 'px'
			}, 5000, function() {
				ele.remove();
			})
		}
		return this.playing();
	}