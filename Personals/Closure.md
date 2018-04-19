> 기본적으로 자바스크립트는 ECMAScript 언어 명세를 따르고 있다. 이 명세 8장의 실행코드와 실행 컨텍스트 부분에서 스코프에 관한 동작 방식을 확인할 수 있으며, 또 중요한 개념인 1급 객체로서의 함수는 그 특징을 명세의 전반적인 부분에서 나타내고 있다. 
>
> 그리고, 클로저(Closure)에 대한 정의는 없다. 클로저는 자바스크립트가 채용하고 있는 기술적 기반 혹은 컨셉으로, 자바스크립트는 클로저를 이용하여 스코프적 특징과 일급 객체로서의 함수에 대한 명세를 구현한 것이다.



## 스코프

프로그래밍에서는 변수나 함수에 이름을 부여하여 의미를 갖도록 한다. 프로그램은 "이름:값"의 대응표를 만들어 사용한다. 

초기 프로그래밍 언어는 이 대응표를 프로그램 전체에서 하나로 관리했는데, 여기에는 이름 충돌의 문제가 있었다. 충돌을 피하기 위해, 각 언어마다 **스코프**라는 규칙을 만들어 정의하였다. 자바스크립트도 마찬가지로 자신의 스코프 규칙이 있다. ES6는 함수 레벨과 블록 레벨의 렉시컬 스코프규칙을 따른다.



### 스코프 레벨

자바스크립트는 **전통적으로 함수 레벨 스코프를 지원**해왔고, ECMAScript 6부터 **블록 레벨 스코프를 지원**하기 시작했다.



#### 함수 레벨 스코프

`var`키워드로 선언된 변수나, 함수 선언식으로 만들어진 함수는 함수 내부 전체에서 유효한 식별자인 함수 레벨 스코프를 갖는다. 

```javascript
function foo() {
  if (true) {
    var color = 'blue';
  }
  console.log(color); // blue
}
foo();
```

만약 `var i`가 블록 레벨 스코프였다면?

`color`는 if문이 끝날 때 없어지고 console.log에서 잘못된 참조로 에러가 발생할 것이다. 
그렇지만 `color`는 함수 레벨의 스코프이기 때문에 `function foo` 내 어디서든 에러 발생 없이 참조할 수 있다.



#### 블록 레벨 스코프

ES6의 let, const키워드는 블록 레벨 스코프 변수를 만들어 준다.

```javascript
function foo() {
  if (true) {
    let color = 'blue';
    console.log(color); // blue
  }
  console.log(color); // ReferenceError: color is not defined
}
foo();
```

`let color`를 if 블록 내부에서 선언한다면 if 블록 내부에서 참조할 수 있으며, 그 밖의 영역에서 잘못된 참조로 에러가 발생한다.



#### `var`  VS  `let`, `const`

ES6가 표준화되면서, 블록 레벨과 함수 레벨을 모두 지원하게 되었다. 그렇지만 요즈음 ES6 코드 대부분은 var를 사용하지 않는다. var는 let과 const로 모두 대체가 가능하고, var자체가 함수 레벨의 스코프를 가지기 때문에 블록 레벨 스코프보다 더 많은 혼란을 야기하기 때문이다.



### 렉시컬 스코프

렉시컬 스코프(Lexical scope)는 보통 동적 스코프(Dynamic scope)와 많이 비교한다.

위키피디아를 보면 동적 스코프와 렉시컬 스코프를 다음과 같이 정의하고 있다.



- 동적 스코프

  The name resolution depends upon the program state when the name is encountered which is determined by the execution context or calling context.

- 렉시컬 스코프 (정적 스코프(Static scope) 또는 수사적 스코프(Rhetorical scope))

  The name resolution depends on the location in the source code and the lexical context, which is defined by where the named variable or function is defined.

  ​

동적 스코프는 프로그램의 런타임 도중의 실행 컨텍스트나 호출 컨텍스트에 의해 결정되고, 렉시컬 스코프에서는 소스코드가 작성된 그 문맥에서 결정된다. 현대 프로그래밍에서 대부분의 언어들은 렉시컬 스코프 규칙을 따르고 있다.

동적 스코프와 렉시컬 스코프는 자바스크립트와 Perl을 비교하여 확인할 수 있다. 아래는 자바스크립트와 Perl로 같은 코드를 작성하였을 때 나오는 결과이다.

자바스크립트는 렉시컬 스코프 규칙을 통해 global, global을 출력하였으며, Perl은 동적 스코프 규칙을 통해 local, global을 출력하였다. (참고로 Perl에서 local대신 my키워드를 사용하면 변수의 유효범위를 제한하여, 자바스크립트와 같은 결과를 얻을 수 있다.)

렉시컬 스코프 규칙을 따르는 자바스크립트의 함수는 호출 스택과 관계없이 각각의 (this를 제외한)대응표를 소스코드 기준으로 정의하고, 런타임에 그 대응표를 변경시키지 않는다. (사실 런타임에 렉시컬 스코프를 수정할 수 있는 방법들(eval, with)이 있지만, 권장하지 않는다.)

### 중첩 스코프(스코프 체인 또는 스코프 버블)

우리가 말하는 이 자바스크립트의 스코프는 ECMAScript 언어 명세에서 렉시컬 환경(Lexical environment)과 환경 레코드(Environment Record)라는 개념으로 정의되었다.

> 6.2.5 The Lexical Environment and Environment Record Specification Types
>
> The Lexical Environment and Environment Record types are used to explain the behaviour of name resolution in nested functions and blocks. These types and the operations upon them are defined in 8.1.

간단하게 그림으로 표현해보면 아래와 같은 형태로 볼 수 있다.

앞에서 설명한 "이름:값의 대응표"가 환경 레코드와 같다고 볼 수 있고, 렉시컬 환경은 이 환경 레코드와 상위 렉시켤 환경(Outer lexical environment)에 대한 참조로 이루어진다.

현재-렉시컬 환경의 대응표(환경 레코드)에서 변수를 찾아보고, 없다면 바깥 렉시컬 환경을 참조하여 찾아보는 식으로 중첩 스코프가 가능해진다. 이 중첩 스코프 탐색은 해당하는 이름을 찾거나 바깥 렉시컬 환경 참조가 null이 될 때 탐색을 멈춘다.

참고: ECMA-262 Edition3를 보면 자바스크립트의 스코프적 특징은 Scope chain(=list)과 Activation Object등의 개념으로 설명하였다. 그리고 이 설명들이 전반적으로 널리 알려졌지만, 이 다음 명세인 ECMA262 Edition5부터는 Lexical Environment와 Environment Record의 개념으로 스코프를 설명하고 있다.

## 호이스팅

전통적인 자바스크립트 스코프의 특징은 다음 두 가지라는 것을 알았다.

- 렉시컬 스코프
- 함수 레벨 스코프 (+ 블록 레벨 스코프-ES6)

그럼 아래와 같은 상황에선 어떤 값이 출력될까?

```javascript
function foo() {
  a = 2;
  var a;
  console.log(a);
}
foo();
```

2가 정상적(?)으로 출력된다. 그럼 다음은 어떨지 생각해보자.

```javascript
function foo() {
  console.log(a);
  var a = 2;
}
foo();
```

이번에는 undefined가 출력된다. 조금 터무니없다고 느낄 수 있지만, 알고보면 그렇게까지 터무니없는 것은 아니다. 자바스크립트 엔진은 코드를 인터프리팅 하기 전에 그 코드를 먼저 컴파일한다. var a = 2;를 하나의 구문으로 생각할 수도 있지만, 자바스크립트는 다음 두 개의 구문으로 분리하여 본다.

1. var a;
2. a = 2;

변수 선언(생성) 단계와 초기화 단계를 나누고, 선언 단계에서는 그 선언이 소스코드의 어디에 위치하든 해당 스코프의 컴파일단계에서 처리해버리는 것이다. (언어 스펙상으로 변수는 렉시컬 환경이 인스턴스화되고 초기화될 때 생성된다고 한다.) 때문에 이런 선언단계가 스코프의 꼭대기로 호이스팅("끌어올림")되는 작업이라고 볼 수 있는 것이다.

참고: 블록스코프인 let도 호이스팅이 된다. 그렇지만 선언 전에 참조할 경우 undefined를 반환하지 않고 ReferenceError를 발생시키는 특징이 있다.



## 클로저(Closure)

자바스크립트에서 (언어 명세에 없는) 클로저에 대한 정의는 꽤 많은 사람들이 가장 궁금해하는 부분이다.

아래는 실제 v8엔진의 클로저 테스트코드와 사람들이 말하는 클로저의 의미들이다.

종합해보면 함수가 무언가를 기억하고 그것을 다시 사용한다는 것을 알 수 있지만, 여전히 모호하게 느껴진다. 이 모호함을 없애기 위해 클로저의 탄생부터 알아봐야 할 것 같다.

클로저가 가장 처음 등장한 1964년, [Peter J. Landin](https://en.wikipedia.org/wiki/Peter_Landin)의 논문[The Mechanical Evaluation of Expressions](http://comjnl.oxfordjournals.org/content/6/4/308)을 보면 클로저를 다음과 같이 정의하고 있다.

위 정의를 토대로, 클로저를 현대 프로그래밍에서 다음과 같이 해석하여 정의할 수 있을것 같다.

클로저 = 함수 + 함수를 둘러싼 환경(Lexical environment)

함수를 둘러싼 환경이라는 것이 바로 앞에서 설명했던 렉시컬 스코프이다. 함수를 만들고 그 함수 내부의 코드가 탐색하는 스코프를 함수 생성 당시의 렉시컬 스코프로 고정하면 바로 클로저가 되는 것이다.

이제 이 클로저가 자바스크립트에 어떻게 녹아 들어갔는지 살펴보도록 하자.

### 자바스크립트의 클로저

자바스크립트에서 클로저는 함수가 생성되는 시점에 생성된다. = 함수가 생성될 때 그 함수의 렉시컬 환경을 포섭(closure)하여 실행될 때 이용한다. 

따라서 개념적으로 자바스크립트의 모든 함수는 클로저이지만, 실제로 우리는 자바스크립트의 모든 함수를 전부 클로저라고 부르지는 않는다.

다음 예시들을 통해서 클로저를 조금 더 정확하게 파악할 수 있다.

```javascript
function foo() {
  var color = 'blue';
  function bar() {
    console.log(color);
  }
  bar();
}
foo();
```



bar함수는 우리가 부르는 클로저일까 아닐까?

일단 bar는 foo안에 속하기 때문에 foo스코프를 외부 스코프(outer lexical environment) 참조로 저장한다. 그리고 bar는 자신의 렉시컬 스코프 체인을 통해 foo의 color를 정확히 참조할 것이다.

그럼 클로저라 볼 수 있지 않을까?

아니다. 우리가 부르는 클로저라고 하기에는 약간 거리가 있다. bar는 foo안에서 정의되고 실행되었을 뿐, foo밖으로 나오지 않았기 때문에 클로저라고 부르지 않는다.

대신, 다음 코드는 우리가 실제로 부르는 클로저를 나타내고 있다.

```javascript
var color = 'red';

function foo() {
  var color = 'blue'; // 2
  function bar() {
    console.log(color); // 1
  }
  return bar;
}
var baz = foo(); // 3
baz(); // 4
```

1. bar는 color를 찾아 출력하는 함수로 정의되었다.
2. 그리고 bar는 outer environment 참조로 foo의 environment를 저장하였다.
3. bar를 global의 baz란 이름으로 데려왔다.
4. global에서 baz(=bar)를 호출했다.
5. bar는 자신의 스코프에서 color를 찾는다.
6. 없다. 자신의 outer environment 참조를 찾아간다.
7. outer environment인 foo의 스코프를 뒤진다. color를 찾았다. 값은 blue이다.
8. 때문에 당연히 blue가 출력된다.



이게 바로 클로저다. 그냥 단순하게 보면 "이 당연하게 왜?"라고 생각할 수 있지만, 조금 더 자세히 따져보도록 하자.

일단 중요한 부분은 2~4번, 그리고 7번이다. bar는 자신이 생성된 렉시컬 스코프에서 벗어나 global에서 baz라는 이름으로 호출이 되었고, 스코프 탐색은 현재 실행 스택과 관련 없는 foo를 거쳐 갔다. baz를 bar로 초기화할 때는 이미 bar의 outer lexical environment를 foo로 결정한 이후이다. 때문에, bar의 생성과 직접적인 관련이 없는 global에서 아무리 호출하더라도 여전히 foo에서 color를 찾는 것이다. 이런 bar(또는 baz)와 같은 함수를 우리는 클로저라고 부른다.

여기에서 다시 한번 강조하지만 JS의 스코프는 렉시컬 스코프, 즉 이름의 범위는 소스코드가 작성된 그 문맥에서 바로 결정되는 것이다.

추가로, foo의 렉시컬환경 인스턴스는 foo();수행이 끝난 이후 GC가 회수해야 하는데 사실을 그렇지 않다. 앞에 설명했듯 bar는 여전히 바깥 렉시컬 환경인 foo의 렉시컬 환경을 계속 참조하고 있고, 이 bar는 baz가 여전히 참조하고 있기 때문이다.(baz(=bar) -> foo)

### 유명하고 또 유명한 반복문 클로저

function count() {

​    var i;

​    for (i = 1; i < 10; i += 1) {

​        setTimeout(function timer() {

​            console.log(i);

​        }, i*100);

​    }

}

count();

이 코드는 1, 2, 3, ... 9를 0.1초마다 출력하는 것이 목표였는데, 결과로는 10이 9번 출력되었다. 왜일까?

timer는 클로저로 언제 어디서 어떻게 호출되던지 항상 상위 스코프인 count에게 i를 알려달라고 요청할 것이다. 그리고 timer는 0.1초 후 호출된다. 그런데 첫 0.1초가 지날 동안 이미 i는 10이 되었다. 그리고 timer는 0.1초 주기로 호출될 때마다 항상 count에서 i를 찾는다. 결국, timer는 이미 10이 되어버린 i만 출력하게 된다.

그럼 의도대로 1~9까지 차례대로 출력하고 싶으면 어떻게 해야 할까?

1. 새로운 스코프를 추가하여 반복 시마다 그곳에 각각 따로 값을 저장하는 방식
2. ES6에서 추가된 블록 스코프를 이용하는 방식

이렇게 두 가지가 있을 것이다.

다음 코드는 원래 의도대로 동작한다.

1. 새로운 스코프를 추가하여 반복 시마다 그곳에 각각 따로 값을 저장하는 방식

   function count() {

   ​     var i;

   ​     for (i = 1; i < 10; i += 1) {

   ​         (function(countingNumber) {

   ​             setTimeout(function timer() {

   ​                 console.log(countingNumber);

   ​             }, i * 100);

   ​         })(i);

   ​     }

   }

   count();

2. ES6에서 추가된 블록 스코프를 이용하는 방식

   function count() {

   ​     'use strict';

   ​     for (let i = 1; i < 10; i += 1) {

   ​         setTimeout(function timer() {

   ​             console.log(i);

   ​         }, i * 100);

   ​     }

   }

   count();

## Reference

- 니시오 히로카즈, 『코딩을 지탱하는 기술』, 김완섭, 비제이퍼블릭(2013)

- 니콜라스 자카스, 『JavaScript for Web Developers』, 한선용, 인사이트(2013)

- 카일 심슨, 『You don't know JS - 스코프와 클로저』, 최병현, 한빛미디어(2015)

- ECMAScript 2015 Language Specification, <http://www.ecma-international.org/ecma-262/6.0/>

- Wikipedia, 『Scope』, <https://en.wikipedia.org/wiki/Scope_(computer_science>))

- 『Temporal dead zone and errors with let』

  <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let>

- 『var, let, const』

  <https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75>