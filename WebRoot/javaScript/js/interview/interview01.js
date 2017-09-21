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
 * 设计模式
 */





















