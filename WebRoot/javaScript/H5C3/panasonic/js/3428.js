//interfaceFun接口函数，初始化入口
//indexMain  对应页面



var job = {
    headerHover: function headerHover() {

        var _this = this,
            $listPar = $('#navWrapper .nav'),
            $moveEl, $moveShow,
            $headerNavList = $('#navWrapper .nav>.navitem', '#header'),
            $choiseItem = $('#navWrapper .nav>.navitem>.active', '#header').closest('.navitem');

        function getWidth(el) {

            return $(el).width();
        }

        function getPos(el) {

            return $(el).position();
        }

        (function createMoveEl($el) {

            $moveEl = $('<li class="jsMoveEl"><span></span></li>').appendTo('#navWrapper .nav');
            $moveShow = $moveEl.find('span');

            $listPar.css('position', 'relative');
            $moveEl.css({
                position: 'absolute',
                left: getPos($choiseItem).left,
                bottom: '0',
                width: getWidth($choiseItem),
                height: '2px',
                'z-index': -1
            });
            $moveShow.css({

                position: 'absolute',
                left: '0',
                right: 0,
                top: '0',
                margin: 'auto',
                width: '100%',
                height: '2px',
                'z-index': -1
            });
        })();

        $headerNavList.on('mouseenter', function () {

            var _this = this,
                $subNav = $(this).find('.subnav:not(:animated)');

            if ($subNav[0]) {

                $subNav.slideDown(200);
                $moveEl.stop().animate({

                    width: getWidth(_this),
                    left: getPos(_this).left,
                    opacity: 0
                });
            } else {

                $moveEl.stop().animate({

                    width: getWidth(_this),
                    left: getPos(_this).left,
                    opacity: 1
                });
            }
            $moveShow.stop().animate({

                width: '100%',
                opacity: '1'
            });
        });

        $headerNavList.on('mouseleave', function () {
            var $subNav = $(this).find('.subnav');
            if ($subNav.length) {

                $subNav.slideUp();
            }
        });

        $listPar.on('mouseleave', function () {
            $moveEl.stop().animate({

                width: getWidth($choiseItem),
                left: getPos($choiseItem).left
            });
        });

    },
    parallax: function parallax (el) {
        var top = $(el).offset().top;
        $(window).scroll(function () { 
            $(el).css('position', 'fixed');
            $(el).css('top', function (){
                return (top -1 * $(document).scrollTop() / 4);
            })
        });
    }
};

var selfTools = {
    bindPage: function (fn, pageList, parameter){

        var fnName = fn.name;
        
        for (var i = 0; i < pageList.length; i++) {
            var doSome = fn;
            var item = pageList[i];
            
            YY.Page[item].prototype.things.push([doSome, parameter]);
            };
        }
};

var pageConfig = {
    list: ['indexMain', 'baseMain', 'postMain']
};

var config = {
    headerHover: {
        open: true,
        page: pageConfig.list,
        fn: job.headerHover
    },
    parallax: {
        open: true,
        page: ['indexMain'],
        fn: job.parallax,
        parameter: '#topSlider .bx-wrapper'
    },
    parallaxPage: {
        open: true,
        page: ['baseMain'],
        fn: job.parallax,
        parameter: '.npagePage #banner div'
    }
};


(function (){

    for (var i = 0; i < pageConfig.list.length; i++) {
        var item = pageConfig.list[i];
        YY.Page[item].prototype.things = [];
        YY.Page[item].prototype.interfaceFun = function (){
            for (var i = 0; i < this.things.length; i++) {
                var fn = this.things[i][0];
                var arg = this.things[i][1];
                fn(arg);
            }
        };
        
    }
    
    for (var key in this.config) {
        if (this.config.hasOwnProperty(key)) {
            var val = this.config[key];
            if (val.open) {
                selfTools.bindPage(val.fn, val.page, val.parameter);
            }
        }
    }

})();