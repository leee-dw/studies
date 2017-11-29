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

## 객체를 기술하는 객체(Object Specifiers)

때때로 생성자가 매우 많은 매개변수를 갖는 경우가 있습니다. 이런 경우 일일이 인수의 순서를 외우기가 힘들기 떄문에 성가실 수 있습니다. 그래서 생성자가 많은 인수를 받는 대신에 객체를 기술하는 하나의 객체를 받도록 정의하면 보다 사용하기 편리한 형태가 됩니다. 객체를 기술하는 객체는 만들어질 객체의 명세를 포함합니다. 그래서 다음과 같이 작성하는 대신에,

```javascript
var myObject = maker(f, l, m, c, s);
```

다음과 같이 작성할 수 있습니다.

```javascript
var myObject = maker({
  first: f,
  last: l,
  state: s,
  city: c
});
```

이제 인수는 꼭 순서를 맞출 필요가 없으며, 생성자가 기본값들을 똑독하게 설정하고 있다면 인수를 생략할 수도 있습니다. 그리고 이렇게 함으로써 코드의 가독성이 높아집니다.

이러한 방법은 JSON을 사용하여 작업하는 경우 부가적인 이점을 제공합니다. JSON 텍스트는 단지 데이터만을 기술할 수 있습니다. 그런데 JSON으로 기술되는 데이터가 객체인 경우 메소드들과 함께 구성됐을 때, 더 편리한 경우들이 있습ㄴ디ㅏ. 이를 위해 객체를 기술하는 객체를 받아들이는 생성자를 사용하면 쉽게 처리할 수 있습니다. 즉 간단하게 생성자에 JSON 객체를 넘기고, 이 생성자가 필요한 기능을 갖춘 객체를 구성하여 반환하는 형식으로 처리할 수 있습니다.

## 프로토타입 방식

순수하게 프로토타입에 기반한 패턴에서는 클래스가 필요 없습니다. 대신에 객체에만 초점을 맞추면 됩니다. 프로토타입에 의한 상속은 개념적으로 클래스에 의한 상속보다 더 간단합니다. 즉 새로운 객체는 기존 객체의 속성들을 상속받을 수 있습니다. 이러한 개념이 익숙하지 않을지 모르지만 실제로 이해하기 쉬운 개념입니다. 일단 먼저 유용한 객체를 만드는 것으로 시작합니다. 그러면 이후부터는 이와 유사한 객체들을 보다 많이 만들 수 있습니다. 애플리케이션을 중첩된 추상 클래스들로 분해하는 클래스화 과정은 전혀 필요가 없습니다.

그러면 이제 유용한 객체를 생성하는 객체 리터럴로 시작해 보겠습니다.

```javascript
var myMammal = {
  name:  'Herb the Mammal',
  get_name: function(){
    return this.name;
  },
  says: function(){
    return this.saying || '';
  }
};
```

일단 위와 같은 객체를 생성하고 나면 3장에서 살펴봤던 Object.create 메소드를 사용하여 이 객체의 더 많은 인스턴스를 만들 수 있습니다. 그리고 나서 이렇게 새로 만든 인스턴스를 필요에 맞게 맞춤화할 수 있습ㄴ디ㅏ .즉 인스턴스에 원하는 대로 메소드나 속성들을 추가할 수 있습니다.

```javascript
var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';

myCat.purr = function(n){
  var i, s = '';
  for (i = 0; i < n; i += 1) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};
myCat.get_name = function(){
  return this.says + ' ' + this.name + ' ' + this.says();
};
```

이러한 방법은 클래스에 의한 상속과는 분명히 구별되는 상속 방법입니다. 새로운 객체를 맞춤화함으로써 기반이 되는 객체와 차이점을 만들 수 있습니다.

이러한 방법은 때때로 기존의 데이터 구조를 상속받는 데이터 구조게 유용합니다. 다음은 그 예입니다. 중괄호로 유효범위(scope)를 지정하는 자바스크립트나 TEX 같은 언어를 파싱한다고 가정해 보겠습니다. 특정 유효범위 내에 정의된 항목은 바깥 유효범위에서 볼 수 없어야 합니다. 어떤 의미에서는 내부의 유효범위가 ㅇ외부의 유효범위를 상속받는다고 볼 수 있습니다. 자바스크립트의 객체는 이러한 관계를 나타내는데 매우 적합합니다. block이라는 함수는 왼쪽 중괄호를 만나게 되면 호출됩니다. parse 함수는 유효범위 내에서 심볼들을 검색해서 새로운 심볼이 정의된 경우 이를 scope에 추가합니다.

```javascript
var block = function(){
  // 현재 scope를 기억. 현재 scope의 모든 것을 포함하는 새로운 scope 생성.

  var oldScope = scope;
  scope = Object.create(scope);

  // 왼쪽 중괄호를 지나 앞으로 전진.
  advance('{');

  // 새로운 scope를 사용하여 파싱.

  parse(scope);

  // 오른족 중괄호를 지나 전진. 새로운 scope를 포기하고 이전 scope 복원

  advance('}');
  scope = oldScope;
};
```


## 함수를 사용한 방식

지금까지 살펴본 프로토타입에 의한 상속 패턴의 한가지 단점은 private 속성을 가질 수 없다는 것입니다. 객체의 모든 속성은 public입니다. private 변수도 private 메소드도 모두 생성할 수 없습니다. 어떤 경우에는 이것이 문제가 안 되지만, 경우에 따라서는 아주 중요한 문제일 수 있습니다. 특히 골치 아픈 경우는 인식없는 일부 프로그래머들이 이상한 방법으로 private을 흉내내는 패턴을 사용하는 경우입니다. 즉 private이라는 의미로 사용하기 원하는 속성들의 이름을 이상하게 표기하여 다른 코드에서 이 속성들이 사용되지 않게 하는 경우입니다. 다행히도 앞서 살펴본 모듈 패턴에서 좀더 나은 대안을 찾을 수 있습니다.

먼저 객체를 생성하는 함수를 만드는 것으로 시작할 것입니다. 이 함수는 new 연산자를 사용하지 않을 것이기 때문에 이름을 소문자로 시작할 것입니다. 이 다음의 4단계로 작업을 진행합니다.

1. 새로운 객체를 생성합니다. 객체를 만드는데는 다양한 방법이 있습니다. 객체 리터럴로 만들 수도 있고, new 연산자를 사용하면서 생성자 함수를 호출할 수도 있고, 기존의 객체에서 새로운 인스턴스를 만들어주는 Object.create 메소드를 사용할 수도 있으며, 객체를 반환하는 함수를 호출할 수도 있습니다.

2. 필요한 private 변수와 메소드를 정의합니다. 이것들은 단지 함수 안의 일반적인 변수입니다.

3. that에 새로운 객체를 할당하고 메소드를 추가합니다. 이때 추가되는 메소드들은 함수의 매개변수와 2번째 단계에서 정의한 변수들을 접근할 수 있는 권한을 갖습니다.

4. 새로운 객체 that을 반환합니다.

다음은 이러한 함수를 위한 의사(pseudocode) 템플릿입니다.

```javascript
var constructor = function(spec, my) {
  var that, 필요한 private 변수들;
  my = my || {};

  공유할 변수와 함수를 my에 추가

  that = 새로운 객체

  앞서 정의한 변수들에 접근할 권한이 있는 메소드들을 that에 추가

  return that;
}
```

spec 객체는 constructor가 인스턴스를 만드는데 필요한 모든 정보가 있습니다. spec의 내용들은 private 변수에 복사되거나 다른 함수에 의해서 처리될 수 있습니다. 또한 메소드에서 필요한 정보를 spec에서 얻을 수도 있습니다.(간단한 방법은 spec을 하나의 값으로 대체하는 것입니다. 객체를 생성하는데 전체 명세를 나타내는 spec객체가 필요없는 경우에는 이러한 방법이 유용합니다.)

my 객체는 상속 연결상에서 생성자와 공유하게 되는 비밀들을 담는 컨테이너입니다. my 객체를 사용하는 것은 선택사항입니다. my 객체가 전달되지 않으면 내부에서 이 객체가 만들어집니다.

다음은 private 변수와 메소드를 정의하는 것입니다. 방법은 간단합니다. 단지 constructor 내부에서 변수와 함수를 정의하면 이것들이 private 변수와 함수가 됩니다. 내부 함수는 spec, my, that과 함께 정의된 모든 (private) 변수를 다 접근할 수 있습니다.

다음은 공유할 private 요소들을 my 객체에 추가하는 것입니다. 방법은 다음과 같이 할당하는 것입니다.

```javascript
my.member = value;
```

이제 새로운 객체를 만들고 that에 할당합니다. 새로운 객체는 다양한 방법으로 만들 수 있습니다. 객체 리터럴로 만들 수도 있고, new 연산자를 사용하는 의사 클래스 생성자로 만들 수도 있으며, prototype 객체에 Object.create 메소드를 사용할 수도 있습니다. 또한 별도의 함수형 생성자에 spec, my 객체를 넘겨 만들 수도 있습니다(물론 spec과 my 객체는 constructor에 넘어온 것 그대로 넘길 수 있습니다). my 객체는 별도의 생성자와 my에 넣은 것들을 공유하게 합니다. 여기에서 사용되는 별도의 생성자도 my 객체에 자신만의 비밀을 담아 constructor에 전달할 수 있습니다.

다음은 객체의 인터페이스를 담당하게 될 메소드들을 that에 추가하는 것입니다(이 메소드들은 private 변수들을 접근할 수 있습니다). 새로운 함수를 that의 구성요소로 추가하거나, 더 안전하게 다음과 같이 일단 새로운 함수를 private 메소드로 정의한 다음에 이 함수를 that에 할당할 수 있습니다.

```javascript
var methodical = function(){
  ...
};
that.methodical = methodical;
```

이렇게 두 단계를 거처 methodical을 정의하면 좋은 점은 methodical을 호출하기 원하는 다른 메소드가 `that.methodical()`로 호출하는 대신 바로 `methodical()`로 호출할 수 있다는 것입니다. 또한 `that.methodical`이 대체되여 변경이 된다 하더라도 private인 methodical은 이러한 변경에 영향을 받지 않기 때문에, methodical을 호출하는 메소드는 계속해서 같은 작업을 수행할 수 있게 됩니다.

마지막으로 that을 반환합니다.

이제 앞서 살펴본 mammal 예제에 이 패턴을 적용해 보겠습니다. 여기서는 my가 필요 없기 때문에 my는 없애고 spec 객체만 사용할 것입니다.

다음과 같이 함수를 사용한 패턴을 적용하면 name과 saying은 완전한 private 속성이 됩니다. 이 속성들은 get_name과 says 메소드만이 접근할 수 있습니다.

```javascript
var mammal = function(spec) {
  var that = {};

  that.get_name = function(){
    return spec.name;
  };
  that.says = function(){
    return spec.saying || '';
  };
  return that;
};

var myMammal = mammal({name: 'Herb'});
```

의사 클래스 패턴에서는 Cat 생성자 함수가 Mammal 생성자가 하는 작업과 같은 작업을 중복해서 해야만 했습니다. 하지만 함수형 패턴에서는 Cat 생성자가 Mammal 생성자를 호출하고 Mammal 생성자가 객체 생성을 위해 필요한 대부분의 작업을 하기 때문에 이러한 작업이 필요 없습니다. Cat은 다만 자신에게 추가되는 부분만 신경 쓰면 됩니다. 

```javascript
var cat = function(spec) {
  spec.saying = spec.saying || 'meow';
  var that = mammal(spec);
  that.purr = function(n) {
    var i, s = '';
    for (i=0; i < n; i += 1) {
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };
  that.get_name = function(){
    return that.says() + ' ' + spec.name + ' ' + that.says();
    return that;
  };
  var myCat = cat({name: 'Henrietta'});
}
```

함수형 패턴은 또한 super 메소드를 다룰 수 있는 방법을 제공합니다. 이제 메소드 이름을 받아서 해당 메소드를 실행하는 함수를 반환하는 superior라는 메소드를 만들어 보겠습니다. superior 메소드가 반환하는 함수는 속성이 변경되더라도 원래 함수를 호출합니다.

```javascript
Object.method('superior', function(name){
  var that = this,
  method = that[name];
  return function(){
    return method.apply(that, arguments);
  };
});
```

이제 cat과 같으면서 추가적으로 super 메소드를 호출하는 메소드인 get_name을 가진 coolcat을 통해 시험해 보겠습니다. 이를 위해서는 준비하 필요한데, super_get_name이라는 변수를 선언하고 여기에 superior 메소드를 호출한 결과를 할당하는 것입니다.

```javascript
var coolcat = function(spec) {
  var that = cat(spec),
  super_get_name = that.superior('get_name');
  that.get_name = function(n) {
    return 'like ' + super_get_name() + ' baby';
  };
  return that;
};

var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name();
// 'like meow Bix meow baby'
```

함수형 패턴은 유연성이 매우 좋습니다. 이 패턴은 의사 클래스 패턴보다 작업량이 적고 캡슐화와 정보은닉 그리고 super 메소드에 접근할 수 있는 방법까지 제공합니다.

객체의 상태 모두가 private 이면 객체는 방탄이 됩니다. 객체의 속성은 대체되거나 삭제될 수 있지만 객체의 무결성은 전혀 영향을 받지 않습니다. 함수형 스타일로 객체를 만들고 객체의 모든 메소드가 this나 (this를 할당받는) that을 사용하지 않는다면 이 객체는 영구적으로 변치 않습니다. 이러한 객체는 단순히 다양한 기능을 하는 함수들을 모아 놓은 집합 역할을 합니다.

이러한 객체는 절대 타협하지 않습니다. 이러한 객체는 주어진 메소드 외에는 내부 상태를 접근할 수 없기 때문에 악의적인 공격자들로부터 안전합니다.

## 클래스 구성을 위한 부속품

제품을 만들 때 부속품들을 가져다 조립을 하듯이 객체를 구성할 때도 같은 방법으로 할 수 있습니다. 간단하게 이벤트 처리 기능을 객체에 추가하는 함수의 예를 통해 이를 살펴보겠습니다. 이 함수는 on, fire 메소드와 이벤트 목록을 관리하는 private 속성의 registry를 객체에 추가합니다.

```javascript
var eventuality = function(that) {
  var registry = {};

  that.fire = function(event) {
  // 객체에서 이벤트에 상응하는 처리기를 실행시킴
  // 매개변수 event는 이벤트 이름을 퐇마하는 문자열이거나
  // 이벤트 이름을 갖고 있는 type 속성을 가진 객체일 수 있음.
  // on 메소드에 의해 등록되는 이벤트 이름과 같은 처리 함수가 호출됨.

    var array,
        func,
        handler,
        i,
        type = typeof event === 'string'  ?
                      event: event.type;
  // 해당 이벤트에 상응하는 처리 함수 목록 배열이 있으면 루프를 돌면서 이 배열에 등록돼 있는 모든 처리 함수를 실행시킴
    if (registry.hasOwnProperty(type)){
      array = registry[type];
      for(i = 0; i < array.length; i += 1) {
        handler = array[i];
  // 처리 함수 배열에 속하는 항목 하나는 처리 함수인 method와 매개변수인 parameters라는 배열로 구성됨.
  // (parameters는 옵션). method가 함수 자체가 아니라 이름이면 this에서 해당 함수를 찾음.
        func = handler.method;
        if(typeof func === 'string') {
          func = this[func];
        }
    // 처리 함수 호출. parameters가 있으면 이를 넘김
    // 만약 없으면 event 객체를 넘김
        func.apply(this, handler.parameters || [event]);
      }
    }
    return this;
  };
  that.on = function(type, method, parameters) {
  // 이벤트 등록. handler 항목을 만들고 해당 이벤트 타입의 배열에 추가.
  // 만약 기존에 배열이 없다면 해당 이벤트 타입에 대해 새로운 배열 생성.
    var handler = {
      method: method,
      parameters: parameters
    };
    if (registry.hasOwnProperty(type)) {
      registry[type].push(handler);
    } else {
      registry[type] = [handler];
    }
    return this;
  };
  return that;
};
```

이제 원하는 객체에 특정 이벤트 처리를 위해 eventuality를 호출할 수 있습니다. 또한 앞서 살펴본 constructor 함수에서 that을 반환하기 전에 다음과 같이 eventuality를 호출할 수도 있습니다.

```
eventuality(that)
```

이러한 방법으로 constructor는 객체에 필요한 기능을 마치 부품을 가져다 조립하듯 추가할 수 있습니다(즉, 이 예처럼 객체에 이벤트 관련 기능이 필요한 경우 eventuality라는 수복을 사용하여 해당 기능을 추가할 수 있습니다). 자바스크립트의 엄격하지 않은 데이터 타입 체크는 이런 부분에서 큰 이점을 줍니다. 왜냐하면 클래스의 상속 계통에서 일일이 데이터 타입 체계를 신경쓸 필요가 없기 때문입니다. 대신에 각각이 가진 내용과 기능들에만 초점을 맞추면 됩니다.

만약 eventuality에서 객체의 private 부분들을 접근하기 원한다면 my를 넘기면 됩니다.