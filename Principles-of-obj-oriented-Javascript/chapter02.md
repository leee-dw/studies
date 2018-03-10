# 함수
1장에서 보았듯 자바스크립트에서 함수는 객체이다. 다른 객체에는 없는 함수만의 특성을 꼽으라면 [[call]] 이라는 내부 속성을 뜰 수있다. 내부 속성은 코드로 접근할 수는 없지만 코드의 동작을 정의한다. 자바스크립트에는 ECMAScript에서 정한 여러 객체 내부 속성이 있는데 이러한 내부 속성은 각괄호를 두 개 겹친 표기법으로 표시한다. 

[[call]]은 함수에만 있는 속성으로 객체가 실행될 수 있는지 없는지 판단한다. 이 속성은 함수에만 있기 때문에 ECMAScript에서는 어떤 객체든 [[call]] 속성을 포함하고 있으면 typeof 연산자를 사용했을 때 “function”을 반환하도록 정의했다. 예전에는 일부 브라우저가 정규 표현식 객체에도 [[Call]] 속성을 포함하는 바람에 정규 표현식 객체가 함수인 것처럼 나타나는 문제가 있었다. 하지만 지금은 정규 표현식 객체에 typeof 연산자를 사용할 때 “function” 이라고 반환하는 브라우저가 없다.

이 장에서는 자바스크립트에서 함수를 정의하고 사용하는 다양한 방법에 대해 다루어 보겠다. 자바스크립트에서 함수는 객체이기 때문에 다른 언어와는 조금 다르게 동작하며, 이러한 동작을 잘 이해해야 자바스크립트라는 언어를 잘 이해할 수 있다.

## 선언 vs. 표현식
함수에는 두 가지 리터럴 형태가 있다. 첫 번째는 function 키워드와 바로 뒤에 적는 함수 이름을 사용하는 함수 선언(function declaration)이다. 함수의 내용은 다음과 같이 여닫는 중괄호 사이에 입력한다.

```javascript
function add(num1, num2) {
  return num1 + num2;
}
```

두 번째는 function 키워드 다음에 이름을 적지 않아도 되는 함수 표현식(function expression)이다. 이렇게 작성한 함수는 함수 객체 자체에 이름이 없어 익명 함수(anonymous function)라고도 한다. 함수 표식은 일반적으로 다음과 같이 변수나 속성에 참조된다.

```javascript
var add = function(num1, num2) {
  return num1 + num2;
};
```

이 코드는 함수값을 add라는 변수에 할당한다. 함수 표현식은 일므이 없고, 끝에 세미콜론이 있다는 점만 제외하면 함수 선언과 거의 동일하다. 할당 표현식에는 보통 다른 값을 할당할 때와 마찬가지로 끝에 세미콜론을 추가한다.

앞서 살펴본 두 형태는 매우 비슷하지만 한 가지 중요한 차이점이 있다. 함수 선언은 코드가 실행될 때 컨텍스트(선언된 함수를 포함하고 있는 함수 스코프 또는 전역 스코프) 상단에 끌어올려진다. 다시 말해 함수를 호출하는 코드가 함수를 선언한 코드보다 앞에 있어도 에러가 발생하지 않는다는 뜻이다. 예를 들어 다음 코드를 보자.

```javascript
var result = add(5, 5);
function add(num1, num2) {
  return num1 + num2;
};
```

이 코드를 실행하면 에러가 발생할 것 같지만 문제없이 잘 동작한다. 자바스크립트 엔진이 함수 선언을 끌어올려서 마치 다음과 같이 작성된 코드처럼 실행하기 때문이다.

```javascript
// 자바스크립트 엔진이 해석한 코드

function add(num1, num2) {
  return num1 + num2;
};

var result = add(5, 5);

```


함수 호이스팅은 함수 이름을 먼저 처리하기 때문에 일어나는 현상이므로 함수 선언에만 적용된다. 함수 표현식은 변수를 통해서만 함수를 참조하기 때문에 호이스팅 되지 않는다.
따라서 다음 코드를 실행하면 에러가 발생한다.

```javascript
// 에러!
var result = add(5,5);
var add = function(num1, num2) {
  return num1 + num2;
};
```

함수를 호출하기 전에 실행하는 것이라면 함수 선언과 함수 표현식 중 무엇이든 사용할 수 있다. 

## 값으로서의 함수

자바스크립트에는 일급 함수가 있기 때문에 함수를 다른 객체처럼 다룰 수 ㅇ있다. 즉 함수를 변수에 할당할 수도 있고 객체에 추가할 수도 있으며 다른 함수에 인수로 전달하거나 함수에서 함수를 반환할 수도 있다. 참조 값을 쓸 수 있는 곳이라면 어디든 함수도 사용할 수 있다. 이러한 특성 덕분에 자바스크립트 함수는 상당히 유용하다. 다음 예제를 살펴보자.

```javascript
function sayHi() {
  console.log("Hi!");
}

sayHi(); // Hi!

var sayHi2 = sayHi;

sayHi2(); // Hi!
```

이 코드에는 sayHi라는 함수를 만드는 함수 선언이 있다. 그 후에 만들어진 sayHi2 라는 변수에는 sayHi의 값을 할당했다. sayHi와 sayHi2는 이제 같은 함수를 가리킨다. 둘 다 실행할 수 있으며 결과도 같을 것이다. 어떻게 이런 결과에 이르는지 이해하기 위해 Function 생성자를 사용해 코드를 다시 작성해보았다.

```javascript
var sayHi = new Function("console.log(\"Hi!\");");
sayHi(); // Hi!

var sayHi2 = sayHi;
sayHi2(); // Hi!
```

Function 생성자를 사용한 덕분에 다른 객체가 전달되듯 sayHi에 함수 값이 전달되었음을 명확히 알 수 있다. 함수도 객체라는 사실을 염두에 두고 있으면 상당히 많은 동작을 작성할 수 있다. 예를 들어 함수를 다른 함수에 인수로 전달할 수 있다. 자바스크립트 배열의 sort()메소드에는 비교 함수를 인수로 전달할 수 있다(생략도 가능). 비교 함수는 배열에 있는 두 값을 비교할 때 호출되는데 만약 첫 번째 값이 두 번째 값보다 작으면 비교 함수에서는 음수를 반환해야 함다. 반면 첫 번째 값이 두 번째 값보다 크면 양수를 반환해야 하고 두 값이 같을 때는 0을 반환해야 한다.

비교 함수를 전달하지 않으면 sort()는 배열에 있는 원소를 모두 문자열로 변환한 후 문자열을 비교한다. 이 때문에 숫자 배열을 정렬할 때 비교 함수를 사용하지 않으면 잘못된 결과가 나올 수 있다. 따라서 숫자 배열을 올바르게 정렬하려면 다음과 같이 비교 함수를 전달해야 한다.


```javascript
var numbers = [1, 5, 8, 4, 7, 10, 2, 6];
numbers.sort(function (first, second) {
  return first - second;
});

console.log(numbers); // "[1, 2, 4, 5, 6, 7, 8, 10]"

numbers.sort();
console.log(numbers); // "[1, 10, 2, 4, 5, 6, 7, 8]"
```

이 예제에서 sort()에 전달된 비교 함수는 사실 함수 표현식이다. 이 함수에는 이름이 없으며 다른 함수에 전달된 참조로서만 존재한다 (따라서 익명 함수이기도 하다). 비교 함수에서 두 값의 빼기를 반환하면 올바르게 정렬이 된다.

두 번재로 실행한 sort()는 비교 함수를 사용하지 않는다. 이 때 배열은 예상과 다르게 1 바로 뒤에 10이 오도록 정렬되는데, 이는 기본 비교 함수가 원소를 모두 문자열로 변환한 후 비교하기 때문이다.

## 인수

자바스크립트 함수의 다른 특성 중 하나는 인수를 몇 개 전달하든 에러가 발생하지 않는다는 것이다. 이는 함수의 인수가 실제로는 배열과 비슷한 arguments라는 구조체에 저장되기 떄문이다. 평범한 자바스크립트 배열과 마찬가지로 arguments에 담을 수 있는 값은 개수 제한이 없다. 저장된 인수는 숫자 인덱스로 접근할 수 있으며 length 속성을 사용하면 저장된 인수의 개수를 알 수 있다.

함수 안에서는 arguments 객체가 자동으로 만들어지낟. 다시 말해 이름이 있는 인수는 편의상 둔 것일 뿐 함수에 전달할 수 있는 인수의 개수는 제한이 없다는 뜻이다.

> arguments 객체는 Array의 인스턴스가 아니기 때문에 배열 메소드를 사용할 수 없다. Array.isArray(arguments)는 항상 false를 반환한다.

그런데 이름 있는 인수가 아주 쓸모 없는 것은 아니다. 함수의 length 프로퍼티에 접근하면 함수에 전달될 것이라고 기대하는 인수의 개수를 알 수 있다. 다시 한 번 강조하지만 함수도 사실은 객체이다. 따라서 프로퍼티도 가질 수 있다. length 프로퍼티는 함수에서 선언한 인수의 개수(arity)이다. 자바스크립트에서는 함수에 전다로딘 인수가 기대했떤 것보다 많거나 적어도 에러가 발생하지 않기 때문에 원래 예상했던 인수의 개수를 알아두는 것도 중요하다. 

다음은 arguments와 선언된 인수 개수를 사용한 예제이다. 함수에 전다로딘 인수의 숫자와 인수 개수는 아무런 상관이 없다.

```javascript
function reflect(value) {
  return value;
}

console.log(reflect("Hi!")); // "Hi!"
console.log(reflect("Hi!", 25)); // "Hi!"
console.log(reflect.length); // 1

reflect = function() {
  return arguments[0];
}

console.log(reflect("Hi!")) // "Hi!"
console.log(reflect("Hi!", 25)) // "Hi!"
console.log(reflect.length); // 0
```

이 예제에서 먼저 이름 있는 인수가 하나인 reflect() 함수를 정의했다. 그러나 함수에 두 번째 인수가 전달되어도 에러는 발생하지 않는다. 그리고 이름 있는 인수는 한 개이므로 length 프로퍼티의 값은 1이 된다. 그 뒤 reflect() 함수를 다시 정의했는데 이번에는 인수를 아예 선언하지 않았다. arguments[0]을 사용하면 함수에 전달된 첫 번째 인수를 알 수있다. 새로 정의한 함수는 앞서 만들었떤 함수와 완전히 똑같이 동작하지만 length의 값은 0이 된다.

처음 만든 reflect()는 이름 있는 인수를 사용하고 있기 떄문에 훨씬 이해하기 수비다. 다른 언얼르 사용해보았따면 더욱 그럴 것이다. 두 번째 만든 reflect()는 arguments 객체를 사용하고 있는데 이름 있는 인수가 없어 다소 헷갈릴 수 있으며 인수가 사용되었는지 확인하려면 함수 내부 코드를 읽어야 한다. 이 떄문에 꼭 필요할 때가 아니면 arguments의 사용을 꺼리는 개발자가 많다. 

하지만 가끔 이름 있는 인수를 사용할 떄보다 arguments를 사용하는 것이 더 효율적일 때도 있다. 예를 들어 숫자를 몇 개든 전달할 수 있으며, 전달한 숫자의 총합을 구해서 반환하는 함수를 생각해보자. 이 함수에는 숫자가 몇 개 전달될 지 모르기 때문에 이름 있는 인수를 사용할 수 없다. 따라서 이 떄는 arguments를 사용하는 것이 가장 좋은 방법이다.

```javascript
function sum() {
  var result = 0;
  i = 0,
  len = arguements.length;

  while (i < len) {
    result += arguments[i];
    i++;
  }
  return result;
}

console.log(sum(1, 2)); // 3
console.log(sum(3, 4, 5, 6)); // 18
console.log(sum(50)); // 50
console.log(sum()); // 0
```

위 코드에서 sum() 함수는 인수를 몇 개든지 전달받을 수 있으며 while 반복문을 사용해 arguments에 있는 값을 모두 더한다. 이 부분은 숫자 밴열에 있는 원소를 모두 더할 때오 완전히 똑같다. 이 함수는 result의 값을 0으로 초기화했으므로 전달된 인수가 전혀 없을 때도 동작한다.

## 오버로딩

대부분의 객체지향 언어는 한 함수에 여러 **시그니처**(signatures)를 두는 함수 오버로딩(function overloading)을 지원한다. 함수 시그니처는 함수의 이름과 예상 인수 개수, 인수의 타입으로 이루어진다. 따라서 같은 함수라 해도 문자열 인수 한 개를 받는 시그니처와 숫자 인수 두 개를 받는 시그니처를 가질 수 있다. 프로그래밍 언어는 전달되는 인수에 따라 호출할 함수를 선택한다.

앞에서 언급했듯이 자바스크립트 함수는 인수의 개수 제한이 없으며 인수의 타입은 아예 정하지 앟는다. 다시 말해 자바스크립트 함수에는 시그니처가 없다. 함수 시그니처가 없기 때문에 함수 오버로딩도 없다. 다음 예제는 함수 두 개를 같은 이름으로 정의하려고 할 때 발생하는 일을 보여준다.

```javascript
function sayMessage(message) {
  console.log(message);
}

function sayMessage() {
  console.log("Default message");
}

sayMessage("Hello!"); // "Default message"
```

다른 프로그래밍 언어였다면 sayMessage("Hello!")는 "Hello!" 라는 문자열을 출력했을 것이다. 하지만 자바스크립트에서는 같은 이름을 가진 함수를 여러 개 정의하려고 할 때 마지막에 정의된 함수가 이긴다. 먼저 나타난 함수 선언은 완전히 사라지고 나중에 나온 함수만 사용된다. 앞서 보았던 것처럼 객체를 사용하면 이 상황을 쉽게 이해할 수 있다.

```javascript
var sayMessage = new Function("message", "console.log(message);");
sayMessage = new Function("console.log("\Default message\");");
sayMessage("Hello!"); // "Default message" 출력
```

이 방식으로 코드를 살펴보면 앞서 작성한 코드가 작동하지 않은 이유를 조금 더 명확하게 알 수 있다. sayMessage 변수에 함수 객체가 연이어 두 번 할당되었으므로 첫 번째 함수는 당연히 사라진다. 

함수에 시그니처가 없는 자바스크립트에서도 함수 오버로딩을 흉내 낼 수 있는 방법은 있다. arguments 객체를 사용해 함수에 전달된 인수의 개수를 구하고 이를 이용해 수행할 동작을 정하면 된다. 다음 예제를 보자.

```javascript
function sayMessage(message) {
  if (arguments.length === 0) {
    message = "Default message";
  }
  console.log(message);
}

sayMessage("Hello!"); // "Hello!" 출력
```

이 예제에서 sayMessage() 함수는 전달된 인수의 개수에 따라 다르게 동작한다. 전달된 인수가 없다면 (arguments.length === 0) "Default message" 라는 기본 값이 사용된다. 전달된 인수가 있을 때는 첫 번째 인수가 메시지로 사용된다. 다른 언어의 함수 오버로딩보다는 할 일이 조금 더 많지만 어쨌든 결과는 같다. 타입까지 확인하고 싶다면 typeof 연산자와 instanceof 연산자를 사용하면 된다. 

## 객체 메소드

1장에서 언급했듯이 객체의 프로퍼티는 언제든 추가하거나 제거할 수 있다. 그런데 프로퍼티의 ㄱ밧이 함수라면 해당 프로퍼티는 메소드라고 볼 수 있으므로, 객체에 프로퍼티를 추가하듯 같은 방식으로 메소드도 추가할 수 있다. 예를 들어 다음 코드에서 person 변수에는 name이라는 속성과 sayName이라는 메소드가 있는 객체 리터럴이 할당되어 있다. 

```javascript
var person = {
  name: "Nicholas",
  sayName: function() {
    console.log(person.name);
  }
};
person.sayName();  // "Nicholas" 출력
```

데이터 프로퍼티의 문법과 메소드의 문법은 이름 뒤에 콜론과 값을 쓰는 부분이 완전히 똑같다. 단지 sayName 메소드에서는 값이 함수일 뿐이다. 일단 정의한 후에는 person.sayName("Nicholas")처럼 객체에서 메소드를 바로 호출할 수 있다. 

### this 객체

앞서 살펴본 예제에서 이상한 점을 하나 발견했을 것이다. sayName() 메소드는 person.name을 직접 참조하고 있어 객체와 메소드 간에 강한 결합(tight coupling)이 만들어졌는데, 이는 문제의 소지가 많은 방법이다. 첫째, 변수 이름을 바꿀 때는 반드시 메소드 안에 있는 참조 코드도 바꿔줘야 한다. 둘째, 이런 식으로 강한 결합이 이루어지면 같은 함수를 여러 객체에 사용하기 어렵다. 다행히 이 문제를 해결할 수 있는 방법도 자바스크립트에 있다. 

자바스크립트의 모든 스코프에는 함수를 호출하는 객체를 뜻하는 this 객체가 있다. 전역 스코프에서 this는 전역 객체(웹 브라우저에서는 window)를 참조한다. 객체에 붙어있는 함수를 호출하면 this의 값은 해당 객체가 된다. 따라서 메소드 안에서라면 객체를 직접 참조하는 대신 this를 참조할 수 있다. 예를 들어 this를 사용해 앞에서 보았떤 코드를 다시 작성하면 다음과 같다.

```javascript
var person = {
  name: "Nicholas",
  sayName: function() {
    console.log(this.name);
  }
};

person.sayName(); // "Nicholas" 출력
```

이 코드는 앞서 보았던 코드와 똑같이 독작하지만 이번에는 sayName()에서 person 대신 this를 참조했다. 이제는 변수의 이름ㅇ르 수비게 바꿀 수 있으며 sayName 함수를 다른 객체에 재사용하기도 쉬워졌다.

```javascript
function sayNameForAll() {
  console.log(this.name);
}

var person1 = {
  name: "Nicholas",
  sayName: sayNameForAll
};

var person2 = {
  name: "Greg",
  sayName: sayNameForAll
};

var name = "Michael";

person1.sayName(); // "Nicholas"
person2.sayName(); // "Greg"
sayNameForAll(); // "Michael"
```

이 예제는 sayName 함수를 먼저 정의했다. 그 후 두 객체 리터럴을 만들면서 sayName에 sayNameForAll 함수를 할당했다. 함수는 참조 값이므로 객체가 몇 개든 상관없이 객체의 속성으로 함수를 할당할 수 있다. person1 객체에서 sayName() 함수를 호출할 때는 "Nicholas" 가 출력되지만 person2 객체에서 호출할 때는 "Greg" 를 출력한다. 이는 함수가 호출될 때 this가 설정되고 그 후 this.name의 값을 가져왔기 때문이다. 

이 예제의 마지막 부분에서는 name이라는 전역 변수를 정의했다. 전역 변수는 전역 객체의 속성이나 마찬가지이므로 sayNameForAll() 함수를 바로 호출하면 전역 변수 name의 값을 가져오는 것이다.


### this값 변경

자바스크립트에서 객체지향 프로그래밍을 잘 하려면 함수의 this값을 잘 다루고 사용할 수 있어야 한다. 함수는 여러 컨텍스트에서 사용되므로 각 상황에 맞게 동작해야 한다. 일반적으로 this의 값은 자동으로 할당되지만 목적에 따라 바꿀 수도 있다. 자바스크르비트에서 this의 값을 바꿀 대 사용할 수 있는 함수 메소드는 세 종류가 있다(함수는 객체이고 객체는 메소드를 가질 수 있으므로 함수도 메소드를 가질 수 있다는 사실을 기억하자).

#### call() 메소드

this를 조작할 때 사용할 수 있는 첫 번째 함수 메소드는 call()이다. 이 메소드는 this의 값을 바꾸는 것은 물론 인수도 전달하며 함수를 실행할 수 있다. call() 메소드의 첫 번째 인수는 함수를 실행할 때 this로서 사용될 값이다. 두 번째 인수부터는 함수를 실행할 때 그대로 전달된다. 다음 코드는 인수를 한 개 전달받도록 sayNameForAll() 함수를 조금 수정한 것이다. 

```javascript
function sayNameForAll(label) {
  console.log(label + ":" + this.name);
}

var person1 = {
  name: "Nicholas"
};

var person2 = {
  name: "Greg"
};

var name = "Michael";

sayNameForAll.call(this, "global"); // "global: Michael"
sayNameForAll.call(person1, "person1"); // "person1: Nicholas"
sayNameForAll.call(person2, "person2"); // "person2: Greg"
```
이 예제에서 sayNameForAll() 함수에는 출력 문자열에 사용할 인수가 한 개 전달되어야 한다. 이 함수는 총 세 번 호출되었는데 함수를 바로 실행하지 않고 마치 객체처럼 접근해서 사용했기 때문에 함수 이름 바로 뒤에는 괄호가 없다. 처음 호출할 때는 전역 컨텍스트 this를 사용하고 "global"을 인수로 전달하여 "global:Michael"이 출력되었다. 똑같은 함수를 두 번 더 호출했는데 이때는 person1과 person2를 컨텍스트로 사용했다. call() 메소드 덕분에 각 객체에 직접 함수를 추가하지 않고도 명시적으로 this의 값을 설정할 수 있었다.

#### apply() 메소드

this를 조작할 때 사용할 수 있는 두 번째 함수 메소드는 apply()이다. apply()메소드는 call()과 완전히 똑같이 동작하지만 인수를 두 개만 사용한다는 점이 다르다. apply() 메소드의 첫 번째 인수는 this로 사용할 값이고, 두 번째 인수는 함수에 전달할 인수를 담고 있는 배열 또는 배열과 유사한 객체이다. 즉 두 번째 인수로 arguments를 전달할 수도 있다. 따라서 call()을 사용해 각 인수를 일일이 전달하는 대신 apply()를 사용하면 손쉽게 전달할 값의 배열을 두 번째 인수로 전달할 수 있다. 이 점을 제외하면 call()과 apply()는 똑같이 동작한다. 다음은 apply() 메소드를 사용하는 예제이다.

```javascript
function sayNameForAll(label) {
  console.log(label + ":" + this.name);
}

var person1 = {
  name: "Nicholas"
};

var person2 = {
  name: "Greg"
};

var naem = "Michael"

sayNameForAll.apply(this, ["global"]); // "global:Michael"
sayNameForAll.apply(person1, ["person1"]); // "person1:Nicholas"
sayNameForAll.apply(person2, ["person2"]);// "person2:Greg"
```

이 코드는 앞서 살펴본 예제에서 call() 대신 apply()를 사용한 것이다. 결과는 완전히 똑같다. 일반적으로는 가지고 있는 데이터의 종류에 따라 call() 또는 apply() 중 하나를 선택한다. 데이터가 이미 배열 형태로 존재한다면 apply()를 사용하는 편이 좋고 데이터가 개별 변수로 존재한다면 call()을 사용하는 편이 좋다.

#### bind() 메소드

this를 바꿀 때 사용할 수 있는 세 번째 함수 메소드는 bind()이다. 이 메소드는 ECMAScript 5에서 추가되었고 앞서 살펴본 두 메소드와 완전히 다르게 동작한다. bind()의 첫 번째 인수는 새 함수에서 this로 사용할 값이다. 그 밖의 인수는 새 함수를 실행할 때 항상 전달되는 고정 인수를 의미한다. 물론 고정 인수 외에 다른 인수도 전달할 수 있다.

다음 코드는 bind()의 두 가지 사용법을 보여준다. sayNameForPerson1() 함수는 this 값을 person1로 바꾸면서 작성한 함수이고 sayNameForPerson2() 함수는 this 값을 person2로 바꾸면서 작성한 함수이다. 또한 sayNamePerson2() 함수의 첫 번째 인수로는 항상 "person2"가 전달된다.

```javascript
function sayNameForAll(label) {
  console.log(label + ":" + this.name);
}

var person1 = {
  name: "Greg"
};

// this가 person1에 고정된 함수를 작성

var sayNameForPerson1 = sayNameForAll.bind(person1);
sayNameForPerson1("person1"); // "person1: Nicholas"

var sayNameForPerson2 = sayNameForAll.bind(person2, "person2");
sayNameForPerson2(); // "person2: Greg"

person2.sayName = sayNameForPerson1;
person2.sayName("person2"); // "person2: Nicholas"
```

sayNameForPerson1() 에는 고정된 인수가 없으므로 실행할 때는 출력 문자열에 포함할 텍스트를 전달해줘야 한다. 반면 sayNameForPerson2()는 this가 person2로 고정된 것은 물론 첫 번째 인수도 "person2"로 고정되었다. 따라서 sayNameForPerson2()를 호출할 때는 아무런 인수를 전달하지 않아도 된다. 예제 마지막 부분에서는 sayNameForPerson1()을 person2 객체에 sayName이라는 이름으로 축했다. 이 함수의 this는 이미 고정되었으므로 sayNamePerson1을 person2에 추가해도 this의 값은 바뀌지 않는다. 따라서 person2.sayName()은 여전히 person1.name의 값을 출력한다.

## 요약

자바스크립트의 함수는 매우 특이하다. 함수도 객체이기 때문에 접근하고 복사하고 다시 정의할 수도 있고 다른 객체 값을 다루듯 사용할 수 있다. 자바스크립트에서 함수와 다른 객체의 가장 큰 차이점은 특수한 내부 속성 [[Call]]의 존재이다. [[Call]]에는 함수의 실행 동작이 정의되어 있다. typeof 연산자는 객체에 [[Call]] 내부 프로퍼티가 있는지 찾아보고 있으면 "function"을 반환한다. 

함수 리터럴 형식은 선언과 표현식이라는 두 종류가 있다. 함수 선언은 function 키워드 다음에 함수의 이름이 오며, 함수가 선언된 컨텍스트의 가장 위에서 정의된 것처럼 다루어진다(Hoisting). 함수 표현식은 평범한 값처럼 사용할 수 있어 할당 표현식, 함수 인수, 다른 함수의 반환 값등에 사용된다.

함수는 객체이기 때문에 Function이라는 생성자가 존재한다. Function 생성자를 사용하면 새 함수를 작성할 수 있지만 코들르 이해하기 어렵게 만들고 디버그하기도 훨씬 힘들어져서 일반적으로는 권장하지 않는 방법이다. 자바스크립트에는 클래스라는 개념이 없기 때문에 함수 및 다른 객체만을 사용해 집합(aggregation)과 상속(inheritance)를 구현해야 한다.















