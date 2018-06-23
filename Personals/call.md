# call() & this

## context & this

- Javascript에는 전역 스크립트 함수가 실행될 때 실행영역(Execution context)이 생성됨.
- 실제 실행은 Stack 공간에 올라가서 쌓인 뒤 실행됨.
- 모든 context에는 참조하고 있는 객체가 존재하는데, 실행 시에 참조하고 있는 객체 this binding이 존재, 
- 현재 context가 어떤 객체를 참조하고 있는지 알기 위해서는 this를  출력해보면 알 수 있다.
- 다시 말해, 함수가 실행될 때 함수에서 가리키는 this 키워드를 출력해보면 context가 참조하고 있는 객체를 알 수 있음.

```javascript
function get() {
    return this;
}

get(); // window. 함수가 실행될 때의 context는 window를 참조
```

```javascript
function get() {
    return this;
}
new get(); // object. new 키워드를 쓰면 새로운 object context가 생성된다.
```





## Call 메서드

> context가 참조하는 객체(this)를 변경할 수 있을까?

```javascript
function get() {
  return this;
}
get.call({}); // {}. call로 임의의 context를 지정할 수 있다.
```



```javascript
var foo = {
  getName: function () {
    return this.name;
  }
}

function get() {
  this.name = this.name || "codesquad";
  return this.getName();
}

get.call(foo); // codesquad
```

```javascript
var foo = {
  getName: function() {
    return this.name;
  }
}

function get() {
  this.name = this.name || "codesquad";
  return this.getName();
}

function get2() {
  this.name = this.name || "codesquad2";
  return this.getName();
}

console.log(get.call(foo)); // codesquad
console.log(get2.call(foo)); // codesquad

```



```javascript
var obj = {
  value: "codesquad",
  run: function() {
    console.log('this of run:', this);

    function printVal() {
      console.log(this);
      console.log(this.value);
    }
    
    (function() {
      printVal.call(this);
    }.bind(this))();
  }
}
obj.run();
```



```javascript
var obj = (function (value) {
  function print() {
    console.log(this);
    console.log(this.value);
  }
  return {
    value: value,
    print: function () {
      print.call(this); // 여기서 call을 사용하기
    }
  }
})('crong');

obj.print();
```



```javascript
var youn = {
  name: 'crong',
  getName() {
    return this.name;
  },
  setName(name) {
    this.name = name;
  }
}

var jk = {
  name: 'jk',
  getName() {
    return this.name;
  },
  setName(name) {
    this.name = name;
  }
}

youn.getName(); // crong
jk.getName(); // jk
```

```javascript
var youn = {
  name: 'crong',
  getName() {
    return this.name;
  },
  setName(name) {
    this.name = name;
  }
}

var jk = {
  name: 'jk'
}

youn.getName(jk); // jk
```

```javascript
var youn = {
  name: 'crong',
  getName() {
    return this.name;
  },
  setName(name) {
    this.name = name;
  }
}

var jk = {
  name: 'jk'
}

youn.getName.call(jk); // jk
```

```javascript
var util = {
  getName() {
    return this.name;
  },
  setName(name) {
    this.name = name;
  },
  getAge() {
    return  this.age;
  },
  setAge(age) {
    this.age = age;
  }
}

var lists = {
  crong: {
    name: 'crong',
    age: 40
  },

  jk: {
    name: 'jk',
    age: 39
  }
}

util.getName.call(lists.jk); // jk
util.getAge.call(lists.jk); // 39
util.getName.call(lists.crong); // crong 
util.getAge.call(lists.crong); // 40
```

```javascript
var util = function() {
  this.getName = function() {
return this.name;
  }
  this.setName = function(name) {
    this.name=name;
  }
}

function Name(name) {
  this.name = name;
}

util.call(Name.prototype);

var my = new Name("crong");
my.getName(); // crong
```



```javascript
var util = function() {
   this.getName = function() {
     return this.name;
   }
   this.setName = function(name) {
     this.name = name;
   }
}

//Name생성자
function Name(name) {
   this.name = name;
}

//Car생성자 추가
function Car(name) {
   this.name = name || "Ford";
   this.price = 999;
}
Car.prototype.getPrice = function() {
   return this.price;
}

util.call(Name.prototype);
util.call(Car.prototype);

var car = new Car();
car.getPrice(); //999
car.getName(); //Ford
```

