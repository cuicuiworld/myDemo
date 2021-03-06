/**
 * Created by cui on 2017/9/12.
 */
/**
 * 字符串大小写转换
 */

var strings = 'qWer';
strings.toLowerCase();
strings.toUpperCase();

/**
 * 检测数组方式
 */

var isArrary = function(val){
    return Object.prototype.toString().apply(val) ==='[object Array]';
}

/**
 * arguments 模拟重载
 */

function todos(){
    switch (arguments){
        case 0:
            console.log(hello);
            break;
        case 1:
            console.log('你好');
            break;
        default:
            break;
    }
}

/**
 * js四大函数调用模式
 * 方法调用
 * 函数调用
 * 构造器调用
 * apply调用
 */

//方法调用，this指向当前
var obj = {
    val:0,
    income:function(num){
        return this.val+=typeof num==='number'?num:1;
    }
}
obj.income();
obj.income(2);

//函数调用 this指向全局
var obj = {
    val:1,
    income:function() {
        var me = this;
        function hellper(){
            return me.val = me.val*2;
        }
        hellper();
        return me.val;
    }
}
obj.income();

//构造器调用 new一个函数调用
var Myfn = function(arg){
    var me = this;
    this.arg = arg;
    this.get = function(){
        return me.arg;
    }
}
var myfn = new Myfn('hello');
myfn.get();

//apply调用 修改this值 参数【绑定给this的值，包含函数参数的数组】
var arr = [5,4];
var add = function(){
    var i,sum = 0;
    for(;i<arguments.length;i++){
        sum+=arguments[i];
    }
}
var sum = add.apply({},arr);

/**
 *  闭包
 *  1，从js角度正常来说的话，函数内部读取全局变量，函数外部无法读取内部变量
 *     那么闭包就可以解决函数外部无法访问内部变量这一问题，并且让局部变量一直在函数内部，不会影响其他全局变量。
 *     本质：将函数内部和外部链接起来。
 *     用途：可以读取函数内部变量，并且让这些内部变量始终保持在内存中。
 *     注意：匿名函数本身就是闭包
 *          内存泄漏
 *     通俗来说：js中所有函数都是闭包
 *
 */

var name = 'window';
var obj = {
    name:'object',
    getName1: function () {
        return function () {
            return this.name;
        }
    },
    getName2: function () {
        var me = this;
        return function () {
            return me.name;
        }
    },
    getName3: function () {
        return this.name;
    }
}
obj.getName1()();
obj.getName2()();
obj.getName3();


function fn() {
    var max = 10;
    return function(x){
        x>max===true?console.log(x):console.log(max);
    }
}
var f1 = fn(),
max = 100;
f1(15);

function f(x) {
    var a = x;
    function b(){
        return a;
    }
    a++;
    return b;
}
var c = f(5);
c();

/**
 * 高阶函数
 * 輸入函數輸出函數
 */

 function map(arrary, fn) {
     var  res = [];
     for (var i = 0; i < arrary.length; i++) {
         res.push(fn(arrary[i]));
     }
     return res;
 }

 var maps = map([1,2,3,4], function(i) {
     return i = i+1;
 });

 //Object和Function互為對方實例

 Object instanceof Function;//true
 Function instanceof Object;//true 

/**
 * 数组
 * 去重/排序/取奇偶/数组转化/
 */

 //取奇偶
var arr = [1,2,3,4,5,6,8,8,8,1,1,1,11,12];
function getEven(arr) {
    var res = [],
        i = 0,
        len = 0;
    Object.prototype.toString.apply(arr) === '[object Array]' ? len = arr.length : console.log('入参错误');
    
    for(; i<len; i++) {
        if(arr[i] % 2 === 0) {
            res.push(arr[i]);
        }
    }
    return res;
 }

 //过滤掉偶数
 function getEven1(arr) {
    var i = 0,
        len = 0;
    Object.prototype.toString.apply(arr) === '[object Array]' ? len = arr.length : console.log('入参错误');

    for(;i<len; i++) {
        if(arr[i] % 2 === 0) {
            arr.splice(i,1);
            len--;
            i--;
        }
    }
}

//数组去重
function uniqueArr(arr) {
    var i = 0,
        len = 0,
        res = [];
    Object.prototype.toString.apply(arr) === '[object Array]' ? len = arr.length : console.log('入参错误'); 
    for(; i<len; i++){
        if(res.indexOf(arr[i]) === -1) {
            res.push(arr[i]);
        }
    }
    return res;
}

//字符串出现次数
var a = "aaabbbadccedlslsfefffs";
function getCount() {
    var obj = {},
        arr = a.split(''),
        len = arr.length,
        i   = 0;

    for(; i<len; i++) {
        if(!!obj[a[i]]) {
            obj[a[i]]+=1;
        }else{
            obj[a[i]] = 1;
        }
    }
    for(item in obj) {
        console.log('有'+obj[item]+'个'+item);
    }
}

//json深度拷贝
var a = {
    a:1,
    b:{
        c:2,
        d:3
    }
}
var b = JSON.parse(JSON.stringify(a));

/**
 * 执行上下文
 * 函数声明----赋值
 * this----赋值
 * 函数表达式，变量----变量声明
 */
console.log(f1);//function f1(){};
function f1(){};//函数声明

console.log(f2);//undefined
var f2  = function(){};//函数表达式

/**
 * this是在函数调用的时候赋值的，在函数定义的时候赋值不了
 * this取值四种情况
 *  构造函数（所有函数都可以new一个对象出来）如果函数作为构造函数使用，this都可以代表他new出来的对象
 *  函数作为对象的一个属性，this指向该对象，如果这个函数不被对象调用时，this就指向window
 *  函数call或apply调用时，this的值就是传入对象的值
 *  全局调用，this = window
 */


/**
 * 原型和继承
 * prototype只有函数才有的属性，__proto__只有对象才有的属性
 * __proto__指向性
 * 取决于对象创建时的 实现方式
 * 1，字面量方式。                var a = {};  a.__proto__ === a.constructor.prototype
 * 2，构造器方式                  var F = function(){}; var f = new F(); f.__proto__ === f.constructor.prototype;
 * 3，Object.create方式           var a = {a:1};var f = Object.create(a) f.__proto__ ===  f.constructor.prototype;
 * 
 * js万物皆对象，对象有普通对象和函数对象区别
 * 每个对象都都会有一个__proto__属性，每个对象都会有一个__proto__链接起来的链条。
 * 当js查找对象属性时，如果不存在，则会在原型链上查找，而不会去查找自身的prototype
 * 
 * js中没有类这个概念，都是函数。其实js是一门函数编程语言。
 * 类的特性：根据它的构造函数来创建以他为模板的对象。
 * js中函数有两个作用：1，作为函数调用。2，作为他原型对象的构造函数。
 * 
 * 通过一段话来理解
 * 当我们创建一个函数时，它会创建一个函数对象，也就是它本身，也会创建一个原型对象。这个函数对象的prototype指针会指向它的原型对象。
 * 而原型对象中有一个constructor指针会指向它的构造函数，也就是指向它本身。
 * 
 * new就是通过prototype指针调用原型对象的构造函数（constructor）创建一个新的实例。
 * 
 * js万物皆对象，对象有普通对象和函数对象区别
 * 普通对象：var a = {}; var a = new Object(); var a = new f1();
 * 函数对象：function f1(){}; var f1 = function(){}; var f1 = new Function('str', 'console.log(str)')
 */

/**
 * 继承（六种方式）
 * js无法实现接口继承，只能通过实现继承。实现继承主要是通过原型链继承
 * 1，原型链：利用原型实现一个引用类型继承另一个引用类型的属性和方法
 *      构造函数，原型，实例之间的关系：每个构造函数都有一个原型对象，每个原型对象都有个指针指向构造函数。每个实例都有个指向原型对象的指针
 * 2，构造函数：在子类构造函数内部调用超类构造函数，通过call或apply方法创建新的对象执行构造函数。
 * 3，组合继承：将原型链和构造函数组合一起。
 * 4，原型式继承：基于已有对象创建新的对象
 * 5，寄生式继承
 * 6，寄生组合式继承：通过函数继承属性，通过原型链继承方法
 */

/**
 * 面向对象
 * 两个概念：类和实例
 * 类定义了公共的行为和方法，实例是类的具体表现形式
 * 面向对象编程三个重要概念：封装、继承、多态
 * js不是面向对象编程，而是基于对象编程。
 */

/**
 * 一次请求一般会存在哪些地方有缓存
 *      dns(域名，ip缓存)
 *      cdn缓存（内容分发网络）
 *      浏览器缓存
 *      服务器缓存
 * 
 * 优化图片加载
 *      懒加载
 *      预加载
 *      精灵图
 *      缩略图
 * 
 * 垂直居中
 *      浮动元素
 *          已知宽高，绝对定位配合left和top和margin值
 *          未知宽高，绝对定位浮动元素，left，top，right，bottom值为0，加上margin auto；
 *      非浮动元素
 *          已知宽高，定位。
 *          未知宽高，css3的translate或者display:table-cell;
 * 
 * css hack
 *      ie下双边距，给块级元素设置_display:inline;
 *      a链接访问后样式丢失，link，visited，hover，active；
 *      z-index
 *      opacity：使用滤镜filter
 *      不支持png：ie6下使用gif
 *      最小高度：height:auto!important;height:最小高度；
 *      a下面嵌套img标签有边框
 * 
 * 创建函数方式
 *      函数表达式
 *      函数声明
 *      函数对象方式
 *      匿名函数
 * 
 * 创建对象方式
 *      字面量形式
 *      自定义构造函数
 *      new一个函数对象
 *      
 * ajax
 *      ajax是xmlhttprequest向服务器发送异步请求，从服务器中获取数据，通过js操作dom元素刷新页面。
 *      XMLHTTPRequest是ajax核心，他可以实现异步请求，从而做到不阻塞页面，实现页面局部刷新。
 * 
 * get和post
 *      get传输数据有字节限制，post没有
 *      get通过url传递，post通过报文传递
 *      get用于请求查询数据，post用于表单提交
 * 
 * http状态码
 *      200：请求成功
 *      204：请求成功无数据
 *      304：重定向
 *      403：请求被拒绝
 *      404：找不到
 *      500：服务端错误
 * 
 * 控制页面失效时间
 *      header上加属性
 *      定时请求一个204空接口
 *      后台修改cookie时长
 * 
 * js延迟加载
 *      script标签加上defer = ‘defer’
 *      async = ‘async’
 *      动态创建script标签
 *      iframe
 *      异步加载
 *      settimeout加载
 * 
 * amd+cmd
 *      amd提前加载
 *      cmd延迟加载
 * 
 * 防止用户发生多次请求
 *      1，setTimeout + clearTimeout，前一个请求没有真正发出来的时候，就被clearTimeout了。
 *      2，disabled按钮
 *      3，使用递增id，每次发送请求时，往回调里加闭包，带唯一递增id，每次请求成功回调以后看这个id是不是主函数体里面最后一次点击的id，是则调用回调，不是则不返回。
 *      4，比较ajax的url以及参数是否一致，
 *      5，loading加载
 * 
 * 
 */



		
	
	
	
	
	
	
	































