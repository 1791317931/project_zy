function Person() {
	this.sayHello = function() {
		console.log('hello');
	}
}

Person.prototype.sleep = function() {
	console.log('sleep');
};

var person = new Person();
person.sayHello();

Person.prototype.speak = function(msg) {
	console.log('I said:' + msg);
};

person.sleep();
person.speak('你好');

var People = function() {
	
};
People.prototype = person;
var people = new People();
people.sleep();