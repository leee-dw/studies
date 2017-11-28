# 상속

상속은 대부분의 프로그래밍 언어에서 중요한 주제입니다.

자바같은 클래스 기반의 언어에서 상속(또는 확장)은 두 가지 유용한 점을 제공합니다. 첫째로 상속은 코드 재사용의 한 형태입니다. 만약 새로 만들 클래스가 기존에 있는 클래스와 매우 유사하다면, 상속을 통해 단지 다른 점만을 구현하면 됩니다. 코드를 재사용하는 패턴은 소프트웨어 개발 비용을 현저하게 줄일 수 있는 잠재력이 있기 때문에 매우 중요합니다. 클래스 상속의 또 다른 이점은 상속에 데이터 타입 체계의 명세가 포함된다는 것입니다. 이러한 속성은 프로그래머들이 명시적으로 캐스팅 작업을 해야 할 필요를 없애줍니다. 만약 상속 시에 캐스팅을 해야한다면 프로그래머들의 작업이 많아지는 것도 많아지는 것이지만 데이터 타입 체계가 안전하게 전달되는 이점을 잃게 됩니다.

테이터 타입 확인이 엄격하지 않은 자바스크립트는 캐스팅을 절대 하지 않습니다. 객체의 계보는 별 상관이 없습니다. 객체에서 중요한 점은 어떤 일을 하느냐지 어디서 유래했는지가 아닙니다.

자바스크립트는 더 풍부한 코드 재사용 패턴을 제공합니다. 자바스크립트에서도 물론 클래스 패턴처럼 상속을 할 수 있지만 그 보다 더 표현적인 다른 패턴들도 지원합니다. 자바스크립트에서 가능한 상속 패턴들은 매우 다양합니다. 이번 장에서는 그 중에서 가장 직관적인 패턴 몇 가지를 살펴볼 것입니다. 물론 훨씬 더 복잡한 방법들이 있지만 언제나 최선의 방법은 단순함을 유지하는 것입니다.

클래스 기반의 언어에서 객체는 클래스의 인스턴스이며 클래스틑 다른 클래스로 상속될 수 있습니다. 자바스크립트는 프로토타입 기반 언어인데 이 말은 즉 객체가 다른 객체로 바로 상속된다는 뜻입니다.

## 의사 클래스 방식(Psudoclassical)

자바스크립트는 자신의 프로토타입 본질과 모슨되는 점들이 있습니다. 자바스크립트의 프로토타입 메커니즘은 클래스와 비슷하게 보이는 일부 복잡한 구문들 때문에 명확히 두드러지질 않습니다. 프로토타입적 본성에 맞게 객체에서 다른 객체로 직접 상속하는 방법을 갖는 대신에 생성자 함수를 통해 객체를 생성하는 것과 같은 불필요한 간접적인 단계가 있습니다. 

함수 객체가 만들어질 때, 함수를 생성하는 Function 생성자는 다음과 같은 코드를 실행합니다.

```javascript
this.prototype = {constructor: this};
```

새로운 함수 객체는, 새로운 함수 객체를 값으로 갖는 constructor라는 속성이 있는 객체를 prototype 속성에 할당받습니다. prototype 객체는 상속할 것들이 저장되는 장소입니다. 자바스크립트는 어떤 함수가 생성자로 사용되기 위해 만들어졌는지 알 수 있는 방법을 제공하지 않기 때문에 모든 함수는 prototype 객체를 갖습니다. prototype 객체 내에 기본적으로 할당되는 constructor 속성은 유용하지 않습니다. 중요한 것은 prototype 객체 자체입니다.

new 연산자를 사용하여 생성자 호출 패턴으로 함수가 호출되면 함수가 실행되는 방법이 변경됩니다. 만약 new 연산자가 메소드였다면, 아마 다음과 같이 구현됐을 것입니다.

```javascript
Function.method('new', function(){
  // 생성자의 프로토타입을 상속받는 새로운 객체 생성.
  var that = Object.create(this.prototype)
  // this를 새로운 객체에 바인딩하면서 생성자 호출
  var other = this.apply(that, arguments);
  // 반환값이 객체가 아니면, 새로운 객체로 대체
  return (typeof other === 'object' && other) || that;
});


// 다음과 같이 생성자를 정의하고 prototype 메소드를 추가할 수 있습니다.


var Mammal = function (name) {
  this.name = name;
};
Mammal.prototype.get_name =  function(){
  return this.name;
};
Mammal.prototype.says = function(){
  return this.saying || '';
};

// 그리고 나서 다음과 같이 인스턴스를 생성합니다.

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name(); // 'Herb the Mammal'


// 이제 생성자 함수를 정의하고 이 함수의 prototype을 Mammal 인스턴스로 대체하는 방식으로 또 다른 의사 클래스(pseudocalss)를 만들 수 있습니다.

var Cat = function (name) {
  this.name = name;
  this.saying = 'meow';
};

// Cat.prototype을 Mammal의 새 인스턴스로 대체

Cat.prototype = new Mammal();

// 새로운 prototype에 purr와 get_name 메소드 추가

Cat.prototype.purr = function (n) {
  var i, s = '';
  for(i=0; i < n; i += 1){
    if(s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};
Cat.prototype.get_name = function(){
  return this.says()+ ' ' + this.name + ' ' this.says();
};

var myCat = new Cat('Henrietta');
var says = myCat.says(); // 'meow'
var purr = myCat.purr(5); // 'r-r-r-r-r'
var name = myCat.get_name();  // 'meow Henrietta meow'
```

의사 클래스 패턴은 객체지향처럼 보이게 고안됐지만 이는 마치 어디 외계에서 온 패턴 같습니다. 이렇게 이상한 코드의 일부분을 앞에서 정의했던 method 메소드와 다음과 같이 inherits 메소드를 정의해서 숨길 수 있습니다.
```javascript
Function.method('inherits', function(Parent) {
  this.prototype = new Parent();
  return this;
});
```

inherits와 method 메소드는 this를 반환하는데 이러한 속성 때문에 연속 호출 스타일을 사용할 수 있습니다. 이제 다음과 같이 Cat을 한 문장으로 만들 수 있습니다.

```javascript
var Cat = function(name) {
  this.name = name;
  this.saying = 'meow';
}.inherits(Mammal).method('purr', function(n) {
  var i, s = '';
  for (i = 0; i < n; i += 1) {
    if(s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
}).method('get_name', function(){
  return this.says() + ' ' + this.name + ' ' + this.says();
});
```

객체의 prototype을 사용하는 것을 method와 inherits라는 메소드를 만들어 숨김으로써 외계에서 온 것 같은 부분이 조금 경감됐습니다. 하지만 실제로 향상된 부분이 있을까요? 이제 클래스 같이 동작하는 생성자 함수를 갖게 됐습니다. 하지만 면면을 살펴보면 전혀 그렇지 않습니다. private은 전혀 없고 모든 속성은 public 입니다. 그리고 부모 메소드로의 접근도 전혀 할 수 없습니다.

설상가상으로 생성자 함수를 사용하는 데는 심각한 위험이 있습니다. 만약 생성자 함수를 호출할 때 new 연산자를 포함하는 것을 잊게 되면 this는 새로운 객체와 바인딩되지 않습니다. 불행히도 this는 전역객체와 연결되고 이렇게 됨으로써 새로운 객체에 필요한 기능을 추가하게 되는 것이 아니라 전역 변수에 영향을 미치게 됩니다. 가히 심각한 문제라고 밖에 할 수 없습니다. new를 누락해도 어떠한 컴파일 경고나 실행시간 경고가 발생하지 않습니다. 이러한 점은 언어에 있어서 심각한 설계 오류입니다. 이러한 문제점을 경감시키기 위한 한가지 방법은 단ㄷ어 첫 글자를 대문자로 표기하는 표기법(일명 파스칼 표기법)을 모든 생성자 함수의 이름에 사용하고 그 외 다른 것들은 이 표기법을 사용하지 않는 것입니다. 이러한 방법을 사용함으로써 그나마 new를 빼먹은 것을 보다 쉽게 식별할 수 있습니다. 물론 더 나은 대안은 new를 사용하는 방식을 피하는 것입니다.

의사 클래스(pseudoclass)를 사용하는 방법은 자바스크립트에 익숙하지 않은 프로그래머들에게 편안함을 제공합니다. 하지만 이 방법은 자바스크립트라는 언어가 가진 진정한 속성을 가리기도 합니다. 클래스에서 영감 받은 표기법은 프로그래머들에게 불필요하게 복잡하고 단계가 많은 구조를 만들도록 유도할 수 있습니다. 클래스 계층의 복잡함 대부분은 정적 타입 확인이라는 제약사항으로 인해 발생합니다. 자바스크립트는 이러한 제약사항으로부터 완전히 자유롭습니다. 클래스 기반의 언어에서는 클래스 상속이 코드를 재사용할 수 있는 유일한 방법이지만 자바스크립트는 더 좋은 방법들이 있습니다.
