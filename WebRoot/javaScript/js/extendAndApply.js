var obj1 = {a:'1'};
var obj2 = {b:'2'};

var obj3 = $.extend(obj1, obj2);
var obj4 = $.extend(true, {}, obj1, obj2);

var arr = $.extend(true, [], obj1, obj2);

console.log(obj3);
console.log(obj4);
console.log(arr1);

var arr1 = [1,2,3];
var arr2 = [4,5,6];

var arr3 = arr1.concat(arr2);
var arr4 = arr1.push.apply(arr1, arr2);

console.log(arr3);
console.log(arr4);