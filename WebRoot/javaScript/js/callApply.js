/**
 * call和apply使用方法基本一样，都是为了改变this
 * 
 * call的参数顺序必须是一一对应的，apply的参数只需要把他放到一个数组里面就可以
 * 
 * 当一个对象没有这个方法，借助call和apply使用其他的对象的方法
 * 
 * hasOwnProperty不检索property上面的属性
 * 
 */

function Box(name, age) {
	this.name = name;
	this.age = age;
	this.family = ['哥哥','姐姐']
}

function Desk(name, age) {
	Box.call(this,name,age);
}

var desk = new Desk('张三',21);
console.log(desk.family);
desk.family.push('弟弟');
console.log(desk.family);
