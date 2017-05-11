(function(window, undefined) {
    var events = 'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu';
    //$当普通函数和对象使用
    function $(selector) {
        //返回Jerry实例,本质上是init构造函数的实例对象
        return new $.prototype.init(selector);
    }
    $.fn = $.prototype = {
        //init当作构造函数使用
        init: function(selector) {debugger
            if (!$.isNull(selector)) {
                this.selector = '';
                return this;
            }
            var result = [];
            //这里的this是init构造函数的实例对象
            //selector为字符串
            if ($.isString(selector)) {
                //html格式的字符串
                if (selector.indexOf('<') == 0 && selector.lastIndexOf('>') == selector.length - 1 && selector.length > 3) {
                    result = parseHTML(selector); //作用就是把符合html规范的标签转换成DOM对象，并且放到数组中
                } else { //基本选择器
                    result = select(selector);
                }
                //call/apply作用：1、调用函数；2、改变所调用函数的this指向；3、借用别的对象的方法
                [].push.apply(this, result); //把选中的元素放到this当中，this就是类数组
                this.selector = selector;
                return this;
            }
 
            //如果selector是DOM元素
            if ($.isDom(selector)) {
                this[0] = selector;
                this.length = 1;
                this.selector = selector; //用来判断是不是Jerry实例
                // [].push.call(this,selector);
                return this;
            }
 
            //selector是DOM集合
            if (!$.isJerry(selector) && $.isArrayLike(selector)) {
                this.selector = selector;
                [].push.apply(this, selector);
                return this;
            }
 
            //这样的话就证明selector是Jerry实例
            if ($.isJerry(selector)) {
                return selector;
            }
 
            //selector是函数
            if ($.isFunction(selector)) {
                var oldFn = window.onload; //获取第一次注册的事件
                if ($.isFunction(oldFn)) {
                    window.onload = function() {
                        oldFn(); //如果已经注册过方法，那么直接调用原来的方法
                        selector(); //再调用新的方法
                    }
                } else {
                    window.onload = selector; //如果没有注册过onload方法，那么就注册一个
                }
            }
 
            this.selector = '';
            // var result = Sizzle(selector);
            // for(var i=0;i<result.length;i++){
            //     this[i] = result[i];
            // }
            // this.length = result.length;
            //this 的数据结构 {0:div,1:div,2:div,length:3}
        },
        version: '3.0.0'
    }
 
    //改变init构造函数的原型指向，保证$.prototype上的成员可以被init的实例访问
    $.prototype.init.prototype = $.prototype; //这句的作用就是保证init构造函数的实例能够访问到$.prototype中的成员
 
    //扩展插件(extend的作用：1、扩展插件；2、把o2的所有属性复制给o1)
    $.extend = $.fn.extend = function(o1, o2) {
        if (arguments.length == 1) { //就是把o1的所有属性复制给this（$  $.fn）
            for (var key in o1) {
                this[key] = o1[key];
            }
        } else if (arguments.length == 2) { //就是把o2中的所有属性复制给o1
            for (var key in o2) {
                o1[key] = o2[key];
            }
        }
    }
 
    //样式操作
    $.fn.extend({
        toggleClass: function() {
            var cName = arguments[0];
            var param2 = arguments[1];
            var that = this;
            if (arguments.length == 1) {
                if (typeof cName == 'boolean') { //单个参数，类型是布尔
                    $.each(this, function(index, element) {
                        if (cName) { //切换已有类
                            //把原来的className缓存到一个数据结构（数组），思考一下如何实现？
                            //一种思路就是把原来的className缓存到元素上
                            if (element.className) {
                                element.oldName = element.className; //缓存原理的className
                                element.className = '';
                            } else {
                                element.className = element.oldName == undefined ? '' : element.oldName;
                            }
                        } else { //删除已有类
                            element.className = '';
                        }
                    });
                } else if (typeof cName == 'string') { //只有一个参数，有这个类名就删除，没有这个类名就添加
                    var arr = $.trim(cName).split(/\s+/g);
                    if (arr.length == 1) { //单个类名
                        $.each(this, function(index, element) {
                            if ($(element).hasClass(cName)) { //有类名
                                $(element).removeClass(cName);
                            } else { //没有类名
                                $(element).addClass(cName);
                            }
                        });
                    } else if (arr.length >= 2) { //两个以上的类名
                        $.each(this, function(index, element) {
                            //方法一：
                            // if($(element).hasClass(arr[0])){
                            //     $(element).removeClass(arr[0]);
                            //     $(element).addClass(arr[1]);
                            // }else{
                            //     $(element).removeClass(arr[1]);
                            //     $(element).addClass(arr[0]);
                            // }
                            //方法二：
                            var that = element;
                            $.each(arr, function(index, element) {
                                $(that).toggleClass(element)
                            });
                        });
                    }
                }
 
            } else if (arguments.length == 2) { //有两个参数，第一个参数是类名，第二个参数是布尔（true强制添加；false强制删除）
                if (typeof arguments[0] == 'string') {
                    $.each(this, function(index, element) {
                        if (typeof param2 == 'boolean') {
                            if (param2) { //强制添加
                                $(element).addClass(cName);
                            } else { //强制删除
                                $(element).removeClass(cName);
                            }
                        }
                    });
                } else if ($.isFunction(arguments[0])) { //第一个参数为函数
                    var fn = arguments[0];
                    var flag = arguments[1];
                    $.each(this, function(index, element) {
                        var newClassName = fn.call(element, index, element.className, flag);
                        if (flag) {
                            $(element).addClass(newClassName);
                        } else {
                            $(element).removeClass(newClassName);
                        }
                    });
                }
            }
        },
        hasClass: function() {
            var target = arguments[0]; //要匹配的类名
            var cName = this[0].className;
            var arr = cName.split(/\s+/g); //按照空格对类名进行分割
            var flag = false;
            $.each(arr, function(index, element) {
                if (target == element) {
                    flag = true;
                    return false; //终止each内部的for循环
                }
            });
            return flag;
        },
        addClass: function() {
            var target = arguments[0];
            $.each(this, function(index, element) {
                if (!$(this).hasClass(target)) { //保证已经有这个类不再添加
                    var oldName = element.className;
                    oldName += " " + target; //给每一个元素添加一个类名
                    element.className = oldName;
                }
            });
            return this;
        },
        removeClass: function() {
            var target = arguments[0];
            $.each(this, function(index, element) {
                var oldName = element.className;
                var reg = new RegExp('\\b' + target + '\\b', 'g');
                element.className = $.trim(oldName.replace(reg, '')); //返回值是替换后的字符串
            });
            return this;
        },
        css: function(p1, p2) {
            if (arguments.length === 1) {
                if (typeof p1 === 'string') { //参数是字符串，获取单个样式属性
                    if (this[0].currentStyle) { //IE
                        return this[0].currentStyle[p1];
                    } else { //标准浏览器
                        return window.getComputedStyle(this[0], null)[p1];
                    }
                } else if ($.type(p1) == 'array') { //参数是数组，获取多个样式属性
                    var obj = {}; //这是一个对象，用来存放获取到的多个属性值
                    var that = this; //这里的this就是init的实例
                    $.each(p1, function(index, element) {
                        //这里的this是数组的其中一项
                        if (that[0].currentStyle) { //IE
                            //这里的this和element指向相同，都是数组中的一项
                            //obj[element]就是给obj添加了一个属性
                            obj[element] = that[0].currentStyle[element];
                        } else { //标准浏览器
                            obj[element] = window.getComputedStyle(that[0], null)[element];
                        }
                    });
                    return obj;
                } else if (typeof p1 === 'object') { //参数是对象，设置多个样式属性
                    $.each(this, function(index, element) {
                        for (var key in p1) {
                            element.style[key] = p1[key];
                        }
                    });
                }
            } else if (arguments.length === 2) { //设置单个的css样式属性
                //这里的this是init的实例对象
                $.each(this, function(index, element) {
                    // 这里的this就是其中一个div元素
                    element.style[p1] = p2;
                });
            }
            return this; //这里的this就是init的实例
        }
    });
 
    //DOM操作相关的API
    $.fn.extend({
        prependTo: function(target) {
            var target = $(target); //目标元素
            var that = this; //Jerry实例
            var allNodes = [];
            $.each(target, function(index, element) {
                $.each(that, function(i, e) {
                    var cNode = null;
                    if (index == target.length - 1) { //最后一个目标元素
                        cNode = e;
                    } else { //不是最后一个元素，需要克隆一份数据
                        cNode = e.cloneNode(true);
                    }
                    //向前面追加元素（参数一：要追加的元素；参数二：要追加的位置元素）
                    element.insertBefore(cNode, element.firstChild);
                });
            });
            [].push.apply(this, allNodes); //新克隆的元素要追加到Jerry实例中
            return this;
        },
        appendTo: function(target) {
            //这里的this就是init实例，实例中存储的是appendTo前面的选择器形成的元素
            var that = this;
            var target = $(target);
            //遍历目标元素
            var allNodes = [];
            $.each(target, function(index, tar) {
                //每一个目标元素中放一份数据
                $.each(that, function(i, ele) { //that当中包含了传入的数据，这里遍历的就是这些数据
                    //每一个元素只有一个父节点
                    // console.log(that.length);
                    if (index == target.length - 1) { //目标元素的最后一个
                        tar.appendChild(ele);
                    } else {
                        //如果目标元素不是最后一个就拷贝一份数据
                        var cNode = ele.cloneNode(true);
                        tar.appendChild(cNode);
                        allNodes.push(cNode);
                    }
                });
            });
            [].push.apply(this, allNodes);
            return this;
        },
        html: function(html) {
            //这里的this是init的实例对象
            if (html) { //设置值
                $.each(this, function(index, element) {
                    //这里的this是每一个要处理的元素
                    this.innerHTML = html;
                    // element.innerHTML = html;
                });
            } else { //获取值
                return this[0].innerHTML;
            }
            return this; //这里的this就是init的实例
        },
        attr: function() {
            if (arguments.length == 1) {
                return this[0].getAttribute(arguments[0]);
            } else if (arguments.length == 2) {
                var arg = arguments;
                $.each(this, function() {
                    //这里的arguments指的是本方法的参数
                    this.setAttribute(arg[0], arg[1]);
                });
            }
            return this;
        },
        val: function() {
            if (arguments.length == 0) {
                //val不传递参数的情况
                return this[0].value;
            } else if (arguments.length == 1) {
                //这是val传递参数的情况
                var arg = arguments;
                $.each(this, function() {
                    this.value = arg[0];
                });
            }
            return this;
        },
        eq: function() {
            var domElement = this[arguments[0]];
            return $(domElement); //这里返回的是jQuery实例对象
        },
        get: function() {
            var domElement = this[arguments[0]];
            return domElement; //这里返回的是原生DOM对象
        },
        first: function() {
            return $(this[0]);
        },
        last: function() {
            return $(this[this.length - 1]);
        },
        append: function() {
            $(arguments[0]).appendTo(this);
            return this;
        },
        prepend: function() {
            $(arguments[0]).prependTo(this);
            return this;
        },
        remove: function() {
            if (arguments.length == 0) {
                $.each(this, function() {
                    //删除所有选中的元素
                    this.parentNode.removeChild(this);
                });
            } else if (arguments.length == 1) { //处理有一个参数的情况，该参数就是一个选择器
                var that = this;
                //$(arguments[0])选中的是remove参数选择的元素
                $(arguments[0]).each(function(i, element) {
                    //这里遍历的是调用者实例中的DOM元素
                    $.each(that, function(index, ele) {
                        if (element == ele) {
                            ele.parentNode.removeChild(ele);
                        }
                    });
                });
            }
            return this;
        },
        empty: function() {
            //删除子元素
            $.each(this, function() {
                this.innerHTML = '';
            });
            return this;
        }
    });
 
    //工具方法
    $.fn.extend({
        each: function(fn) {
            //这里的this就是init的实例
            $.each(this, fn);
        }
    });
 
    //工具方法（静态方法）
    $.extend({
        //此时$的角色是对象，这句话是给$对象添加一个函数each
        each: function(list, fn) {
            for (var i = 0; i < list.length; i++) {
                // fn(i,list[i]);
                var ret = fn.call(list[i], i, list[i]); //这里通过call改变fn的内部this指向
                if (ret == false) {
                    //通过fn的返回值控制循环退出条件
                    break;
                }
            }
        },
        type: function(obj) { //用来进行类型判断
            var str = 'String Number Boolean Object Array Date RegExp Math Function Error';
            var arr = str.split(' ');
            var types = {}; //{"[object Array]":"array","[object Object]":"object","[object Number]":"number","[object String]":"string,"[object Boolean]":"boolean"}
            for (var i = 0; i < arr.length; i++) {
                
                types["[object " + arr[i] + "]"] = arr[i].toLowerCase(); //toLowerCase转换成小写
            }
            var type = {}.toString.call(obj); //[object Array]            return types[type];
        },
        isDom: function(obj) {
            return obj.nodeType == 1;
        },
        isString: function(str) {
            return typeof str === 'string';
        },
        isNull: function(param) {
            return param != null && param != undefined;
        },
        isArrayLike: function(arr) { //验证类数组
            return arr && typeof arr == 'object' && arr.length > 0 && this.type(arr) != 'array' && isFinite(arr.length);
        },
        isFunction: function(fn) {
            return typeof fn == 'function';
        },
        trim: function(str) { //去掉字符串两端的空格
            return str.replace(/(^\s+)|(\s+$)/g, '');
        },
        isJerry: function(obj) {
            return obj.hasOwnProperty('selector');
        }
    });
 
 
    //事件模块
    $.fn.extend({
        on: function() {
            var arg = arguments;
            $.each(this, function(index, element) {
                if (arg.length == 1) { //参数为对象类型，表示多个事件
                    for (var key in arg[0]) {
                        if (element.addEventListener) { //标准
                            element.addEventListener(key, arg[0][key], false); //默认冒泡
                        } else {
                            element.attachEvent("on" + key, arg[0][key]); //IE678
                        }
                    }
                } else if (arg.length == 2) { //两个参数：第一个是事件类型，第二个是事件函数
                    if (element.addEventListener) { //标准
                        element.addEventListener(arg[0], arg[1], false); //默认冒泡
                    } else {
                        element.attachEvent("on" + arg[0], arg[1]); //IE678
                    }
                }
            });
            return this;
        },
        off: function() {
            if (arguments.length == 2) {
                var arg = arguments;
                $.each(this, function(index, element) {
                    if (element.removeEventListener) { //标准浏览器
                        element.removeEventListener(arg[0], arg[1]);
                    } else { //IE678
                        element.detachEvent("on" + arg[0], arg[1]);
                    }
                });
            }
            return this;
        }
    });
    $.each(events.split(' '), function(index, element) {
        $.fn[element] = function(fn) {
            this.on(element, fn);
            return this;
        };
    });
 
    $.fn.extend({
        hover: function() {
            var arg = arguments;
            $.each(this, function(index, element) {
                $(element).mouseover(arg[0]).mouseout(arg[1]);
            });
            return this;
        },
        one: function(type, fn) {
            //foo谁来调用？foo是事件函数，它是由浏览器来调用的
            function foo() {
                //调用完成之后取消事件
                //1、调用参数中的事件函数fn,该函数是由foo来调用的
                fn.call(this);
                //2、取消事件，这里的this是谁？就是绑定事件的DOM元素本身
                $(this).off(type, foo);
            }
            this.on(type, foo); //这里的this就是jQuery实例本身
            return this;
        }
    });
 
    function parseHTML(str) {
        var result = [];
        var div = document.createElement('div');
        div.innerHTML = str;
        for (var i = 0; i < div.childNodes.length; i++) {
            result.push(div.childNodes[i]);
        }
        return result;
    }
    //选择器函数
    function select(selector) {
        var reg = /(^#\w+$)|(^\.\w+$)|(^\w+$)/;
        var flag = reg.exec(selector);
        if (!flag) {
            return [];
        }
        if (flag[1]) { //ID选择器
            var result = [];
            var ele = document.getElementById(selector.slice(1));
            [].push.call(result, ele); //将查询到的DOM节点添加到数组中
            return result;
        } else if (flag[2]) { //类选择器
            if (document.getElementsByClassName) { //标准
                var result = [];
                var eles = document.getElementsByClassName(selector.slice(1));
                [].push.apply(result, eles);
                return result;
            } else { //自定义
                var allEle = document.getElementsByTagName("*"); //获取页面中的所有标签元素
                var result = []; //放置按照类名找到标签
                for (var i = 0; i < allEle.length; i++) {
                    //判断类名中有没有和参数相同的类名
                    //<div class="abc   active  ddd"></div>类名中有可能有多个类
                    var nowClass = allEle[i].className;
                    // var arr = nowClass.split(/\s+/g);//按照空格分隔字符串
                    // var flag = false;//假设没有找到
                    var reg2 = new RegExp('\\b' + selector.slice(1) + '\\b', 'g');
                    var flag = reg2.test(nowClass);
                    // for (var j = 0; j < arr.length; j++) {
                    //     if (arr[j] == selector.slice(1)) {
                    //         flag = true;//找到之后赋值为true
                    //         break; //找到类之后没有必要继续比较了
                    //     }
                    // }
                    if (flag) { //true表示已经找到了
                        result.push(allEle[i]); //把类名包含选择器的DOM元素添加到数组
                    }
                }
                return result;
            }
        } else if (flag[3]) { //标签选择器
            var result = [];
            var eles = document.getElementsByTagName(selector);
            [].push.apply(result, eles); //将查询到的DOM节点添加到数组中
            return result;
        }
    }
 
    $.extend({
        ajax: function(obj) {
            var settings = {
                type: 'get',
                url: '#',
                data: {},
                dataType: 'text',
                async: true,
                jsonp: 'callback',
                success: function() {}
            }
            $.extend(settings, obj);
            if (settings.dataType == 'text' || settings.dataType == 'json') {
                //ajax方法
                ajaxForJson(settings);
            } else if (settings.dataType == 'jsonp') {
                //jsonp方法
                ajaxForJsonp(settings);
            }
            //这里是原生ajax
            function ajaxForJson(settings) {
                //1、创建XMLHttpRequest对象
                var xhr = null;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
 
                var param = '';
                for (var key in settings.data) {
                    param += key + '=' + settings.data[key] + '&'
                }
                if (param.length > 1) {
                    param = param.substring(0, param.length - 1);
                }
                console.log(param);
 
                //2、准备发送
                if (settings.type == 'get') {
                    settings.url += '?' + encodeURI(param);
                }
                console.log(settings.url);
                xhr.open(settings.type, settings.url, settings.async);
                //3、发送请求
                var data = null;
                if (settings.type == 'post') {
                    data = param;
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                }
                xhr.send(data);
                //4、指定回调函数
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            var retData = '';
                            if (settings.dataType == 'text') {
                                retData = xhr.responseText;
                            } else if (settings.dataType == 'json') {
                                //把json格式的字符串转换成JSON对象
                                retData = JSON.parse(xhr.responseText);
                            }
                            settings.success(retData);
                        }
                    }
                }
            }
            //原生jsonp
            function ajaxForJsonp(settings) {
                var param = '';
                for (var key in settings.data) {
                    param += key + '=' + settings.data[key] + '&'
                }
                if (param.length > 1) {
                    param = param.substring(0, param.length - 1);
                    param = "&" + param;
                }
 
                // "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
                var jsonpCallback = 'jQuery' + ('v2.6.1' + Math.random()).replace(/\D/g, '') + '_' + (new Date()).getTime();
                if (settings.jsonpCallback) {
                    jsonpCallback = settings.jsonpCallback;
                }
 
                //这里就是回调函数，实际上就是window的成员
                window[jsonpCallback] = function(data) {
                    settings.success(data);
                }
 
                var script = document.createElement('script');
                script.src = settings.url + '?' + settings.jsonp + '=' + jsonpCallback + param;
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(script);
            }
 
        }
    });
 
    //动画模块
    $.fn.extend({
        animate: function(json, time, type, fn) {
            if (!json) {
                return;
            }
            var settings = {
                time: time ? time : 400,
                type: type ? type : 'linear'
            }
 
            this.each(function(index, element) {
                clearInterval(element.timer);
                //初始化所有属性的初始值
                var initValue = {};
                for (var key in json) {
                    initValue[key] = getStyle(element, key);
                }
                var startTime = +new Date(); //动画开始时间
                element.timer = setInterval(function() {
                    var now = +new Date(); //当前时间
                    // var t = now - startTime;//当前进度（不一定能够正好达到指定时间）
                    var t = time - Math.max(0, startTime - now + time); //当前时间(能够保证正好达到指定时间)
                    for (var key in json) {
                        var b = initValue[key]; //初始状态值
                        var c = json[key] - initValue[key]; //变化量
                        var d = settings.time; //持续时间
                        var nowPosition = Tween[settings.type](t, b, c, d); //根据时间计算出来的当前状态值
                        setStyle(element, key, nowPosition);
                    }
                    //动画终止条件
                    console.log(t, settings.time);
                    if (t == settings.time) {
                        clearInterval(element.timer);
                        if (typeof fn === 'function') {
                            fn(); //执行回调函数
                        }
                    }
                }, 50);
            });
 
            function setStyle(obj, attr, value) {
                if (attr == 'opacity') {
                    //处理透明度的兼容性
                    obj.style.filter = 'alpha(opacity:' + value + ')';
                    obj.style.opacity = value / 100;
                } else {
                    //处理通用属性
                    obj.style[attr] = value + 'px';
                }
            }
 
            function getStyle(obj, attr) {
                var v = null;
                if (obj.currentStyle) {
                    v = obj.currentStyle[attr]; //IE
                } else {
                    v = getComputedStyle(obj, null)[attr]; //标准
                }
                console.log(v);
                //处理透明度
                if (attr == 'opacity') {
                    v = parseInt(parseFloat(v) * 100);
                } else {
                    if (v == 'auto') {
                        v = 0; //不设置left的值，获取到的是auto
                    } else {
                        v = parseInt(v);
                    }
                }
                return v;
            }
        }
    });
    window.$ = window.Jerry = $; //对外公开$
})(window);