# 함수

자바스크립트에서 가장 좋은 점 중 하나는 함수의 구현 부분입니다. 자바스크립트에서 함수는 거의 대부분 제대로 된 특성들로 이루어져 있습니다. 하지만 예쌍할 수 있는 것처럼 모든 부분이 그런 것은 아닙니다.

함수는 실행 문장들의 집합을 감싸고 있습니다. 함수는 자바스크립트에서 모듈화의 근간입니다. 함수는 코드의 재사용이나 정보의 구성 및 은닉 등에 사용하고, 객체의 행위를 지정하는데도 사용합니다. 일반적으로 프로그래밍 기술은 요구사항의 집합을 함수와 자료구조의 집합으로 변환하는 것입니다.

## 함수 객체

자바스크립트에서 함수는 객체입니다. 객체는 앞서도 설명한 것처럼 프로토타입 객체로 숨겨진 연결을 갖는 이름/값 쌍들의 집합체입니다. 객체 중에서 객체 리터럴로 생성되는 객체는 `Object.prototype`에 연결됩니다. 반면에 함수 객체는 `Function.prototype`에 연결됩니다(Function은 Object.prototype에 연결됩니다). 또한 모든 함수는 숨겨져 잇는 두 개의 추가적인 속성이 있는데, 이 속성들은 함수의 문맥(context)과 함수의 행위를 구현하는 코드(code)입니다.

또한 모든 함수 객체는 prototype이라는 속성이 있습니다. 이 속성의 값은 함수 자체를 값으로 갖는 constructor라는 속성이 있는 객체입니다. 이는 `Function.prototype`으로 숨겨진 연결과는 구분됩니다.

함수는 객체이기 대문에 다른 값들처럼 사용할 수 있습니다. 함수는 변수나 객체, 배열 등에 저장되며, 다른 함수에 전달하는 인수로도 사용하고, 함수의 반환값으로도 사용합니다. 

함수를 다른 객체와 구분짓는 특징은 호출할 수 있다는 것입니다.

## 함수 리터럴

함수 객체는 함수 리터럴로 생성할 수 있습니다.

```javascript
// add라는 변수를 생성하고 두 수를 더하는 함수를 이 변수에 저장
var add = function (a, b) {
  return a + b;
};
```

함수 리터럴에는 네 가지 부분이 있습니다. 첫 번째 부분은 function이라는 예약어입니다.

두 번째 부분은 선택사항으로 함수의 이름입니다. 함수의 이름은 함수를 재귀적으로 호출할 때 사용하며, 디버거나 개발 툴에서 함수를 구분할 때도 사용합니다. 앞선 예처럼 함수의이름이 주어지지 않은 경우 익명함수(anonymous)라고 부릅니다.

세 번째 부분은 괄호로 둘러싸인 함수의 매개변수 집합니다. 괄호 안에 아예 없거나 하나 이상의 매개변수를 쉼표로 분리해서 열거합니다. 이 매개변수들은 함수 내에서 변수로 정의합니다. 일반적인 변수들을 undefined로 초기화하는 것과는 달리 매개변수는 함수를 호출할 떄 넘겨진 인수로 초기화합니다.

네 번째 부분은 중괄호로 둘러싸인 문장들의 집합입니다. 이러한 문장들은 함수의 몸체(body)이며 함수를 호출했을 때 실행합니다.

함수 리터럴은 표현식이 나올 수 있는 곳이면 어디든지 위치할 수 있습니다. 함수는 다른 함수 내에서도 정의할 수 있습ㄴ디ㅏ. 물론 이러한 내부 함수도 매개변수와 변수를 가질 수 있으며 자신을 포함하고 있는 함수의 매개변수와 변수에도 접근할 수 이씃ㅂㄴ디ㅏ. 함수 리터럴로 생성한 함수 객체는 외부 문맥으로의 연결이 있는데 이를 클로저(closure)라고 합니다. 클로저는 강력한 표현력의 근원입니다.

## 호출

함수를 호출하면 현재 함수의 실행을 잠시 중단하고 제어를 매개변수와 함께 호출한 함수로 넘깁니다. 모든 함수는 명시되어 있는 매개변수에 더해서 this와 arguments라는 추가적인 매개변수 두 개를 받게 됩니다. this라는 매개변수는 객체지향 프로그래밍 관점에서 매우 중요하며, 이 매개변수의 값은 호출하는 패턴에 의해 결정됩니다. 자바스크립트에는 함수를 호출하는데 메소드 호출 패턴, 함수 호출 패턴, 생성자 호출 패턴, apply 호출 패턴이라는 네 가지 패턴이 있습니다. 각각의 패턴에 따라 this라는 추가적인  매개변수를 다르게 초기화합니다. 

함수를 호출하는 호출 연산자는 함수를 나타내는 표현식 뒤에 이어지는 한 쌍의 괄호입니다. 괄호 안에는 표현식을 포함하지 않거나, 하나나 또는 쉼표로 구분해서 둘 이상의 표현식을 포함합니다. 각각의 표현식은 인수값 하나를 산출합니다 .각각의 인수값을 함수의 매개변수에 각각 할당합니다. 

### 메소드 호출 패턴

함수를 객체의 속성에 저장하는 경우 이 함수를 메소드라고 부릅니다. 메소드를 호출할 때, this는 메소드를 포함하고 있는 객체에 바인딩됩니다(즉, this는 객체 자체가 됩니다). 호출되는 표현식이 세부지정(마침표나 [])을 포함하고 있으면 이 방법이 메소드 호출 패턴입니다.

```javascript
// value와 increment 메소드가 있는 myObject 생성.
// increment 메소드의 매개변수는 선택적
// 인수가 숫자가 아니면 1이 기본값으로 사용됨.

var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment();
document.writeln(myObject.value);    // 1

myObject.increment(2);
document.writeln(myObject.value);    // 3
```

메소드는 자신을 포함하는 객체의 속성들에 접근하기 위해서 this를 사용할 수 있습니다. 즉 this를 사용해서 객체의 값을 읽거나 변경할 수 있습니다. this와 객체의 바인딩은 호출 시에 일어납니다. 이렇게 매우 늦은 바인딩은 this를 효율적으로 사용하는 함수를 만들 수 있습니다. 자신의 문맥을 this로 얻는 메소드를 퍼블릭(public) 메소드라고 부릅니다.


### 함수 호출 패턴

함수가 객체의 속성이 아닌 경우에는 함수로서 호출합니다.

```javascript
var sum = add(3, 4);     // 합은 7
```

함수를 이 패턴으로 호출할 때 this는 전역객체에 바인딩됩니다. 이런 특성은 언어 설계 단계에서의 실수입니다. 만약 언어를 바르게 설계했다면, 내부 함수를 호출할 때 이 함수의 this는 외부 함수의 this 변수에 바인딩 되어야 합니다. 이러한 오류의 결과는 메소드가 내부 함수를 사용하여 자신의 작업을 돕지 못한다는 것입니다. 왜냐하면, 내부 함수는 메소드가 객체 접근을 위해 사용하는 this에, 자신의 this를 바인딩하지 않고 엉뚱한 값(전역객체)에 연결하기 때문입니다. 다행히도 이러한 문제를 해결하기 위한 쉬운 대안이 있습니다. 그 대안은 메소드에서 변수를 정의한 후 여기에 this를 할당하고, 내부 함수는 이 변수를 통해서 메소드의 this에 접근하는 방법입니다. 관례상 이 변수의 이름을 that이라고 하면 다음의 예와 같이 구현할 수 있습니다.

```javascript
myObject.double = function() {
  var that = this;  // 대안

  var helper = function () {
    that.value = add(that.value, that.value);
  };

  helper();   // helper를 함수로 호출
};

// double을 메소드로 호출

myObject.double();
document.writeln(myObject.getValue());    // 6
```

### 생성자 호출 패턴

자바스크립트는 프로토타입에 의해서 상속이 이루어지는 언어입니다. 이 말은 객체가 자신의 속성들을 다른 객체에 바로 상속할 수 있다는 뜻입니다. 자바스크립트는 클래스가 없습니다.

이러한 특성은 현존하는 언어들의 경향과는 조금 다른 급진적인 것입니다. 오늘날 대부분의 언어는 클래스를 기반으로 하고 있습니다. 프로토타입에 의한 상속은 매우 표현적이지만 널리 알려지 있지 않습니다. 자바스크립트 자체도 자신의 프로토타입적 본성에 확신이 없었던지, 클래스 기반의 언어들을 생각나게 하는 객체 생성 문법을 제공합니다. 클래스 기반의 프로그래밍에 익숙한 프로그래머들에게 프로토타입에 의한 상속은 받아들여지지 못했고, 클래스를 사용하는 듯한 구문은 자바스크립트의 진정한 프로타입적 속성을 애매하게 만들었습니다. 이는 양쪽에게 모두 최악의 결과라고 할 수 있습니다.

함수를 new라는 전치 연산자와 함께 호출하면, 호출한 함수의 prototype 속성의 값에 연결되는 (숨겨진) 링크를 갖는 객체가 생성되고, 이 새로운 객체는 this에 바인딩 됩니다.

new 라는 전치 연산자는 return 문장의 동작을 변경합니다.

```javascript
// Quo 라는 생성자 함수를 생성
// 이 함수는 status라는 속성을 가진 객체를 생성함

var Quo = function (string) {
  this.status = string;
};

// Quo의 모든 인스턴스에 get_status라는 public 메소드를 줌.

Quo.prototype.get_status = function () {
  return this.status;
};

// Quo의 인스턴스 생성

var myQuo = new Quo("confused");

document.writeln(myQuo.get_status()); // confused
```

new라는 전치 연산자와 함께 사용하도록 만든 함수를 생성자(constructor)라고 합니다. 일반적으로 생성자는 이니셜을 대문자로 표기하여 이름을 지정합니다. 생성자를 new 없이 호출하면 컴파일 시간이나 실행시간에 어떠한 경고도 없어서 알 수 없는 결과를 초래합니다. 그러므로 대문자 표기법을 사용하며 해당 함수가 생성자라고 구분하는 것은 매우 중요합니다.

생성자 함수를 사용하는 스타일은 권장 사항이 아닙니다.

### apply 호출 패턴

자바스크립트는 함수형 객체지향 언어이기 때문에, 함수는 메소드를 가질 수 있습니다.

apply 메소드는 함수를 호출할 때 사용할 인수들의 배열을 받아들입니다. 또한 이 메소드는 this의 값을 선택할 수 있도록 해줍니다. apply 메소드에는 매개변수 두 개가 있습니다. 첫 번째는 this에 묶이게 될 값이며, 두 번째는 매개변수들의 배열입니다.

```javascript
// 숫자 두 개를 가진 배열을 만들고 이를 더함

var array = [3, 4];
var sum = add.apply(null, array);
// 합은 7

// status라는 속성을 가진 객체를 만듦.

var statusObject = {
  status: 'A-OK'
};

// statusObject는 Quo.prototype을 상속받지 않지만,
// Quo에 있는 get_status 메소드가 statusObject를 대상으로
// 실행되도록 호출할 수 있음.

var status = Quo.prototype.get_status.apply(statusObject);
// status는 'A-OK'
```

## 인수 배열 (argument)

함수를 호출할 때 추가적으로 매개변수로 arguments라는 배열을 사용할 수 있습니다. 이 배열은 함수를 호출할 때 전달된 모든 인수를 접근할 수 있게 합니다. 여기에는 매개변수 개수보다 더 많이 전달된 인수들도 모두 포함합니다. 이 arguments라는 매개변수는 매개변수의 개수를 정확히 정해놓지 않고, 넘어오는 인수의 개수에 맞춰서 동작하는 함수를 만들 수 있게 합니다.


```javascript
  // 여러 작업을 수행하는 함수를 만듦.

  // 함수 내부에 있는 sum이라는 변수는
  // 외부에 있는 sum 변수에 영향을 미치지 않는 것에 주목.
  // 함수는 오로지 내부의 sum에만 영향을 미침

  var sum = function(){
    var i, sum = 0;
    for(i = 0; i < arguments.length; i+=1) {
      sum += arguments[i];
    }
    return sum;
  };

  document.writeln(sum(4, 8, 15, 16, 23, 42)); // 108
```

이 예제는 그다지 유용한 패턴은 아닙니다. 

설계상의 문제로 arguments는 실제 배열은 아닙니다. arguments는 배열 같은 객체입니다. 왜냐하면 arguments는 length라는 속성이 있지만 모든 배열이 가지는 메소드들은 없습니다. 이 장의 마지막에서 이러한 설계상의 오류로 인한 결과를 보게 될 것입니다.

## 반환

함수를 호출하면 첫 번째 문장부터 실행해서, 함수의 몸체를 닫는  }를 만나면 끝납니다. 함수가 끝나면 프로그램의 제어가 함수를 호출한 부분으로 반환됩니다. return 문은 함수의 끝에 도달하기 전에 제어를 반환할 수 있습니다. return 문을 실행하면 함수는 나머지 부분을 실행하지 않고 그 즉시 반환됩니다.

함수는 항상 값을 반환합니다. 반환값이 지정되지 않은 경우에는 undefined가 반환됩니다. 함수를 new라는 전치 연산자와 함께 실행하고 반환값이 객체가 아닌 경우 반환값은 this(새로운 객체)가 됩니다.


## 예외

자바스크립트는 예외를 다룰 수 있는 메커니즘을 제공합니다. 예외는 정상적인 프로그램의 흐름을 방해하는 비정상적인 사고입니다(완전히 예측 불가능한 것은 아닙니다). 이러한 사고가 발생하면 프로그램은 예외를 발생합니다.

```javascript
var add = function(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    };
  }
  return a + b;
}
```

throw 문은 함수의 실행을 중단합니다. throw 문은 어떤 예외인지 알 수 있게 해주는 name 속성과 예외에 대해 설명하는 message 속성을 가진 예외 객체를 반환해야 합니다. 물론 이 반환 객체에 필요한 속성이 더 있는 경우 추가할 수 있습니다.

예외 객체는 try 문의 catch 절에 전달됩니다.

```javascript
// 새로운 add 함수를 잘못된 방법으로 호출하는 
// try_it 함수 작성

var try_it = function() {
  try {
    add("seven");
  } catch(e) {
    document.writeln(e.name + ': ' + e.message);
  }
}

try_it();
```

try 블록 내에서 예외가 발생하면, 제어는 catch 블록으로 이동합니다.

try 문은 모든 예외를 포착하는 하나의 catch 블록만을 갖습니다. 만약 예외 상황에 따라 그에 맞게 대처하고 싶은 경우에는 예외 객체의 name 속성을 확인하여 그에 맞게 처리하면 됩니다.


## 기본 타입에 기능 추가 

자바스크립트는 언어의 기본 타입에 기능을 추가하는 것을 허용합니다. 앞선 3장에서 Object.prototype에 메소드를 추가하여 모든 객체에서 이 메소드를 사용 가능하게 하는 것을 보았습니다. 이러한 작업은 함수, 배열, 문자열, 숫자, 정규 표현식, 불리언에 모두 유효합니다.

예를 들어 다음과 같이 method라는 메소드를 Function.prototype에 추가하면 이후 모든 함수에서 이 메소드를 사용할 수 있습니다.

```javascript
Function.prototype.method = function (name, func) {
  thos.prototype[name] = func;
  return this;
};
```

이와 같이 method라는 메소드를 Function.prototype에 추가함으로써 앞으로는 Function.prototype에 메소드를 추가할 때 prototype이라는 속성 이름을 사용할 필요가 없습니다. 이로 인해 코드를 다소 보기 안 좋게 하는 부분(.prototype)이 사라집니다. (위 코드처럼 추가하던 것을 아래의 코드처럼 .prototype 부분없이 깔금하게 사용할 수 있습니다.)

자바스크립트에는 따로 구분된 정수형이 없어서 때때로 숫자형에서 정수 부분만 추출해야 하는 경우가 생깁니다. 그런데 이러한 작업을 위해 자바스크립트가 제공하는 방법은 용이하지 않습니다. 이러한 문제를 다음의 예처럼 Number.prototype에 integer라는 메소드를 추가해서 해결할 수 있습니다. 이 메소드는 숫자의 부호에 따라 Math.ceiling이나 Math.floor를 사용합니다.

```javascript
Number.method('integer', function() {
  return Math[this < 0 ? 'ceiling' : 'floor'](this);
});
document.writeln((-10 / 3).integer()); // -3
```

자바스크립트에는 문자열의 양 끝에 있는 빈 칸을 지우는 메소드가 없습니다. 이러한 부실함을 다음과 같이 간단하게 보완할 수 있습니다.


```javascript
String.method('trim', function(){
  return this.replace(/^\s+|\s+$/g, '');
});
document.writeln('"' + "  neat ".trim()+'"');
```

trim() 메소드는 정규 표현식을 사용합니다.

이러한 방법으로 기본적인 타입에 기능을 추가함으로써 언어의 능력을 배가시킬 수 있습니다. 자바스크립트의 프로토타입에 의한 상속이라는 동적인 본성 덕분에 새로운 메소드를 추가하면 관련된 값들에는 바로 새로운 메소드들이 추가됩니다. 이러한 특성은 해당 값이 새로운 메소드가 추가되기 전에 생성됐더라도 관계 없이 적용됩니다.

기본 타입의 프로토타입은 public구조입니다. 그러므로 라이브러리들을 섞어서 사용할 때는 주의할 필요가 있습니다. 한 가지 방어적인 방법은 존재하지 않는 메소드만 추가하는 것입니다.

```javascript

// 조건에 따라 메소드를 추가.

Function.prototype.method = function(name, func) {
  if(!this.prototype[name]) {
    this.prototype[name] = func;
  }
};
```

## 재귀적 호출

재귀 함수는 직접 또는 간접적으로 자신을 호출하는 함수입니다. 재귀적 호출은 어떤 문제가 유사한 하위 문제로 나뉘어지고 각각의 문제를 같은 해결 방법으로 처리할 수 있을 때 사용할 수 있는 강력한 프로그래밍 기법입니다. 일반적으로 재귀함수는 하위 문제를 처리하기 위해 자신을 호출합니다.

하노이의 탑은 유명한 퍼즐입니다. 이 퍼즐에는 3개의 기둥과 가운데 구멍이 있는 다양한 지름의 원반이 있습니다. 먼저 시작 기둥에 원반들을 지름이 큰 것에서부터 작은 것으로 차례로 쌓습니다. 목표는 한 번에 원한 하나를 다른 기둥으로 옮기면서 최종적으로 목적 기둥에 원래의 순서대로 쌓는 것입니다. 여기서 한가지 규칙은 절대로 큰 원반이 작은 원반 위에 쌓여서는 안 된다는 것입니다. 이 퍼즐은 재귀적 호출을 위한 전형적인 문제입니다.

```javascript
var hanoi = function(disc, src, aux, dst) {
  if( disc > 0 ) {
    hanoi(disc - 1, src, dst, aux);
    document.writeln('Move disc' + disc + 'from' + src + 'to' + dst);
    hanoi(disc - 1, aux, src, dst);
  }
};

hanoi(3, 'Src', 'Aux', 'Dst');
```

이 프로그램을 실행하면 3개의 원반에 대한 다음과 같은 해결방법을 볼 수 있습니다.

```
Move disc 1 from Src to Dst
Move disc 2 from Src to Aux
Move disc 1 from Dst to Aux
Move disc 3 from Src to Dst
Move disc 1 from Aux to Src
Move disc 2 from Aux to Dst
Move disc 1 from Src to Dst
```

Hanoi 함수는 필요한 경우 보조 기둥을 사용하며 원반들을 목적지 기둥으로 옮깁니다. 이 함수는 전체적인 문제 하나를 세부 문제 세 개로 분리합니다. 먼저 위쪽에 있는 원반들을 보조 기둥으로 옮겨서 바닥에 있는 원반을 드러나게 합니다. 이렇게 하면 바닥에 있는 원반을 목적지 기둥으로 옮길 수 있습니다. 마지막으로 보조 기둥에 있는 원반을 목적지 기둥으로 옮깁니다. 보조 기둥에 있는 남은 원반들의 이동은 자신을 재귀적으로 호출하는 방식으로 수행됩니다.

hanoi 함수는 옮겨야 할 원반의 수와 사용할 수 있는 기둥 세 개를 넘겨 받습니다. hanoi는 자신을 재귀적으로 호출할 때 현재 작업하고 있는 원반의 위에 있는 원반을 처리합니다. 이러한 작업을 반복하면 결국 원반이 없는 상태에서 함수가 호출됩니다. 이런 경우 아무 것도 하지 않게 되는데 이렇게 함으로써 재귀적 호출이 무한대로 일어나지 않게 됩니다.

재귀 함수는 웹 브라우저의 DOM(Document Object Model) 같은 트리구조를 다루는데 매우 효과적입니다. 즉 각각의 재귀적 호출이 트리 구조의 항목 하나에 대해 작동하면 효율적으로 트리 구조를 다룰 수 있습니다. 

```javascript
// 주어진 노드부터 HTML 소스 순으로 DOM 트리의
// 모든 노드를 방문하는 walk_the_DOM 함수 정의.
// 이 함수는 차례로 각각의 노드를 넘기면서 함수를 호출.
// walk_the_DOM은 각각의 자식 노드들을 처리하기 위해서
// 자신을 호출함

var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

// getElementsByAttribute 함수 정의
// 이 함수는 어트리뷰트 이름(att)과 일치하는 값(value, 이 값은 넘기지 않아도 되는 옵션임)을 인수로 받음
// 이 함수는 노드에서 어트리뷰트 이름을 찾는 함수를 전달하면서
// walk_the_DOM을 호출.
// 일치하는 노드는 results 배열에 저장됨.

var getElementsByAttribute = function (att, value) {
  var results = [];

  walk_the_DOM(document.body, function(node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if (typeof actual === 'string' && actual === value || typeof value ! == 'string') {
    results.push(node);
  }
});
return results;
};
```

몇몇 언어에서는 고리 재귀(tail recursion) 최적화를 제공합니다. 꼬리 재귀 최적화라는 것은 함수가 자신을 재귀적으로 호출하는 것을 반환하는 방법으로 진행되는 재귀적 호출(꼬리 재귀)일 경우 이를 개선하여 속도를 매우 빠르게 향상시키는 반복 실행으로 대체하는 것입니다(다음의 예 참조). 불행하게도 현재 자바스크립트는 꼬리 재귀 최적화를 제공하지 않습니다. 자신을 매우 깊은 단계까지 호출하는 함수는 반환 스택의 과다 사용으로 제대로 실행되지 않을 수 있습니다.

```javascript
// 꼬리 재귀를 하는 계승(factorial) 함수를 만듦.
// 호출 자체의 결과를 반환하기 때문에 꼬리 재귀임.

// 현재 자바스크립트는 이러한 유형에 대해 최적화를 제공하지 않음

var factorial = function factorial(i, a) {
  a = a || 1;
  if ( i < 2) {
    return a;
  }
  return factorial(i - 1, a * i);
};
document.writeln(factorial(4));     // 24
```

## 유효범위(Scope)

프로그래밍 언어에서 유효범위는 변수와 매개변수의 접근성과 생존 기간을 제어합니다. 유효범위는 이름들이 충돌하는 문제를 덜어주고 자동으로 메모리를 관리하기 대문에 프로그래머에게는 중요한 개념입니다.

```javascript
var foo = function(){
  var a = 3, b = 5;
  var bar = function() {
    var b = 7, c = 11;

    // 이 시점에서 a는 3, b는 7, c는 11

    a += b + c;

    // 이 시점에서 a는 21, b는 7, c는 11
  };

  // 이 시점에서 a는 3, b는 5, c는 정의되지 않음.
  bar();

  // 이 시점에서 a는 21, b는 5
}
```


C 언어 유형의 구문을 가진 모든 언어는 블록 유효 범위가 있습니다. 블록(중괄호로 묶인 문장들의 집합) 내에서 정의된 모든 변수는 블록의 바깥쪽에서는 접근할 수 없습니다. 블록 내에서 정의된 변수는 블록의 실행이 끝나면 해제됩니다. 이러한 구조는 좋은 구조입니다.

자바스크립트의 블록 구문은 마치 블록 유효범위를 지원하는 것처럼 보이지만 불행히도 블록 유효범위가 없습니다. 이러한 혼란은 오류의 원인이 될 여지가 충분합니다.

자바스크립트는 함수 유효범위가 있습니다. 즉 함수 내에서 정의된 매개변수와 변수는 함수 외부에서는 유효하지 않습니다. 반면에 이렇게 내부에서 정의된 변수는 함수 어느 곳에서도 접근할 수 있습니다. 

오늘날 대부분의 언어에서는 변수를 가능한 늦게, 즉 처음 사용하기 바로 전에 선언해서 사용할 것을 권하고 있습니다. 하지만 자바스크립트에서는 블록 유효범위를 지원하지 않기 때문에 이러한 권고가 적용되지 않습니다. 대신에 자바스크립트에서는 함수에서 사용하는 모든 변수를 함수 첫 부분에서 선언하는 것이 최선의 방법입니다.

## 클로저(closure)

유효범위에 관한 좋은 소식 하나는 내부 함수에서 자신을 포함하고 있는 외부 함수의 매개변수와 변수들을 접근할 수 있다는 것입니다(this와 arguments는 예외입니다). 이러한 특성은 매우 유용합니다.

내부 함수에서 외부 함수의 변수에 접근할 수 있는 예는 앞서 재귀적 호출에서 살펴봤던 getElementsByAttribute 함수에서 볼 수 있습니다. 이 함수에는 results라는 변수가 선언돼 있는데 이 results라는 변수를 walk_the_DOM의 인수로 넘긴 (내부) 함수에서 접근하고 있습니다.

이러한 특성과 관려하여 더 흥미로운 경우는 외부 함수보다 내부 함수가 더 오래 유지될 때입니다.

03. 호출 절에서 value라는 속성과 increment라는 메소드를 가진 myObject를 살펴봤습니다. 이제 myObject 객체에서 허락되지 않은 경우에는 value 속성의 값을 변경할 수 없게 하고 싶다고 가정해 보겠습니다.

myObject를 객체 리터럴로 초기화하는 대신에 다음에 나오는 코드처럼 객체 리터럴을 반환하는 함수를 호출하여 초기화합니다. 이렇게 하면 increment와 getValue를 통해 value라는 변수에 접근할 수 있지만 함수 유효범위 때문에 프로그램의 나머지 부분에서는 접근할 수가 없습니다.

```javascript
var myObject = function () {
  var value = 0;

  return {
    increment: function (inc) {
      value += typeof inc === 'number' ? inc: 1;
    },
    getValue: function () {
      return value;
    }
  };
}();
```

코드를 잘 살펴보면 myObjec변t에 함수를 할당한 것이 아니라 함수를 호출한 결과를 호출한 결과를 할당하고 있습니다. 맨 마지막 줄에 있는 ()를 주목할 필요가 있습니다. 함수는 메소드 두 개를 가진 객체를 반환하며 이 두 메소드는 계속해서 value라는 변수에 접근할 수 있습니다.

03절의 생성자 호출 패턴에서 살펴봤던 Quo 생성자는 status라는 속성과 get_status라는 메소드를 가진 객체를 생성합니다. 하지만 status라는 변수를 바로 접근할 수 있기 때문에 getter 역할을 하는 get_status는 별 쓸모가 없어 보입니다. get_status가 쓸모 가 있으려면 status 속성이 private이어야 할 것입니다. 그러면 이제 그렇게 되도록 quo라는 함수를 정의해 보겠습니다. 

```javascript
// quo 라는 함수를 생성
// 이 함수는 get_status라는 메소드와
// status라는 private 속성을 가진 객체를 반환

var quo = function (status) {
  return {
    get_status: function(){
      return status;
    }
  };
};

// quo의 인스턴스를 실행

var myQuo = quo("amazed");

document.writeln(myQuo.get_status());
```

quo 함수는 new 키워드 없이 사용하게 설계됐습니다. 그래서 이름을 대문자로 표기하지 않았습니다. quo를 호출하면 get_status 메소드가 있는 객체를 반환합니다. 이 객체에 대한 참조는 myQuo에 저장됩니다. get_status 메소드는 quo가 이미 반환된 뒤에도 quo의 status에 계속해서 접근할 수 있는 권한을 가지게 됩니다. get_status는 status 매개변수의 복사본에 접근할 수 있는 권한을 갖는 것이 아니라 매개변수 그 자체에 대한 접근 권한을 갖습니다. 이러한 것이 가능한 것은 함수가 자신이 생성된 함수, 즉 자신을 내포하는 함수의 문맥(context)에 접근할 수 있기 때문입니다. 이러한 것을 `클로저(closure)`라고 부릅니다.

좀 더 유용한 예제를 살펴보겠습니다.

```javascript

var fade = function (node) {
  var level = 1;
  var step = function() {
    var hex = level.toString(16);
    node.stylebackgroundColor = '#FFFF' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};
fade(document.body);
```

`document.body(HTML<body> 태그에 의해서 만들어지는 노드)`를 넘기면서 fade를 호출합니다. fade는 level의 값을 1로 설정합니다. 그리고 step이라는 함수를 정의하고, setTimeout을 호출하여 이 함수를 100 밀리 초 후에 실행하게 합니다. 여기까지 수행을 한 후 fade는 종료합니다.

약 10분의 1초 뒤에 step 함수가 호출됩니다. 이 함수는 fade의 level 값을 16진수로 변환한 후 이를 이용하여 fade의 매개변수인 node의 배경색을 변경합니다. 그리고 나서 fade의 level 값을 살펴본 후 아직 배경색이 흰색이 되지 않았으면 level의 값을 증가시킨 후, setTimeout을 사용하여 같은 작업을 반복하게 합니다.

이제 다시 step 함수가 호출되면 이번에는 fade 내의 변수 level의 값이 2입니다. fade 함수는 이미 반환됐지만 함수 안의 변수는 이를 필요로 하는 내부 함수가 하나 이상 존재하는 경우 계속 유지됩니다.

내부 함수가 외부 함수에 있는 변수의 복사본이 아니라 실제 변수에 접근한다는 것을 이해해야 합니다. 그렇지 않으면 다음과 같은 문제가 발생할 수 있습니다.

```javascript
// 나쁜 예제

// 잘못된 방법으로 노드 배열에 이벤트 핸들러 함수를 할당하는 함수 정의
// 노드를 클릭하면 해당 노드가 몇 번째 노드인지를 경고창으로 알려주는 것이
// 함수의 목적
// 하지만 항상 전체 노드의 수만을 보여줌
var add_the_handlers = function (nodes) {
  var i;
  for (i=0; i < nodes.length; i += 1) {
    nodes[i].onclick = function(e) {
      alert(i);
    };
  }
};
// 나쁜 예제 끝.
```

add_the_handlers 함수는 각각이 핸들러에 유일한 번호(i)를 전달하도록 고안됐습니다. 하지만 이러한 의도대로 동작하지 않는데 그 이유는 핸들러 함수가 받는 i가 함수가 만들어지는 시점의 i가 아니라 그냥 변수 i에 연결되기 때문입니다.

```javascript

// 더 나은 예제

// 올바른 방법으로 노드 배열에 이벤트 핸들러 함수를 할당하는 함수 정의.
// 노드를 클릭하면 해당 노드가 몇 번째 노드인지를 경고창으로 알려줌.

var add_the_handlers = function(nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function(i) {
      return function (e) {
        alert(i);
      };
    } (i);
  }
};
```

이제 onclick에 함수를 할당하는 대신에 새로 함수를 정의하고 여기에 i를 넘기면서 곧바로 실행시켰습니다. 실행된 함수는 add_the_handlers에 정의된 i가 아니라 넘겨받은 i의 값을 이벤트 핸들러 함수에 연결하여 반환합니다. 이 반환되는 이벤트 핸들러 함수는 onclick에 할당합니다.



## 콜백

함수는 비연속적인 이벤트를 다루는 것을 좀더 쉽게 할 수 있는 방법을 제공합니다. 예를 들어 사용자와 상호작용으로 시작해서 서버로 요청을 하고 마지막으로 요청에 대한 응답을 보여주는 일련의 작업 흐름이 있다고 가정해 보겠습니다. 이러한 작업을 처리하는 가장 고지식한 방법은 다음과 같은 것입니다.

```javascript

request = prepare_the_request();
response = sen_request_synchronously(request);
display(response);
```

이러한 방법으로 작업을 해결할 때의 문제는 동기화된 요청을 하기 때문에 서버로부터 응답이 올 때까지 클라이언트는 꼼짝없이 멈춰서 기다려야 한다는 것입니다. 만약 네트워크나 서버가 느리다면 이 애플리케이션은 응답성에 있어서 이해할 수 없을 만큼 최악일 것입니다.

이런 작업을 처리하는 좋은 방법은 서버로 요청을 비동기식으로 하고 서버의 응답이 왔을 때 호출되는 콜백 함수를 제고앟는 것입니다. 비동기식 함수는 서버의 응답을 기다리지 않고 그 즉시 반환되기 때문에 클라이언트는 멈춤 상태로 빠지지 않습니다.

```javascript
request = prepare_the_request();
send_request_asynchronously(request, function(response) {
  display(response);
});
```

send_request_asynchronously 함수에 함수를 매개변수로 전달하여 서버로부터 응답이 왔을 때 호출되게 합니다.

## 모듈

함수와 클로저를 사용해서 모듈을 만들 수 있습니다. 모듈은 내부의 상태나 구현 내용은 숨기고 인터페이스만 제공하는 함수가 객체입니다. 모듈을 만들기 위해서 함수를 사용하면 전역변수 사용을 거의 대부분 제거할 수 있기 때문에 결국 자바스크립트의 최대 약점 주 ㅇ하나를 보완할 수 있습니다.

예를 들어 String 객체에 deentityify 메소드를 추가한다고 가정해 보겠습니다. 이 메소드는 문자열에서 HTML 엔티티들을 찾고 이들을 그에 상응하는 문자로 대체하는 기능을 합니다. deentityify는 엔티티의 이름과 상응하는 문자들이 담긴 객체를 사용해야 합니다. 그런데 이 객체를 어디에 간직해야 할까요? 간단히 생각해서 이 객체를 전역변수로 지정할 수 있습니다. 하지만 전역변수는 사용해서는 안 되는 나쁜 것입니다. 또 다른 방법으로 이 객체를 함수 자체 내에 정의할 수도 있습니다. 하지만 이 역시도 함수가 호출될 때마다 매번 객체 리터럴을 객체화(evaluate)하는 실행시간 비용(runtime cost) 부담이 있습니다. 이상적인 해결 방법은 이 객체를 클로저에 두고 이 객체에 HTML 엔티티를 추가할 수 있는 메소드를 따로 두는 것입니다.

```javascript
String.method('deentityify', function(){
  // 엔티티 테이블. 엔티티 이름을 문자에 대응시킴
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };
  // deentityify 메소드 반환.
  return function() {
    // 여기가 deentityify 메소드
    // 문자열의 replace 메소드를 호출하여 &로 시작하고 ;로 끝나는
    // 부분을 찾고 &와 ; 사이의 문자열이 엔티티 테이블에 잇으면
    // 해당 문자로 엔티티를 대체. 정규표현식 사용
    return this.replace(/&([^&;]+);/g,
      function (a, b) {
        var r = entity[b];
        return typeof r === 'string' ? r : a;
      }
    );
  };
}());
```

코드의 마지막 줄을 잘 보기 바랍니다 () 연산자를 사용하여 방금 막 정의한 함수를 바로 호출하는 것을 볼 수 있습니다. 이 호출로 deentityify 메소드가 되는 함수를 생성해서 반환합니다.

```javascript

document.wiriteln(
  '&lt;&quot&gt;'.deentityify());     // <">
```

모듈 패턴은 바인딩과 private을 위해 함수의 유효범위와 클로저를 이용합니다. 이 예제에서는 deentityify 메소드만이 엔티티들을 담고 있는 데이터 구조인 entity 객체에 접근할 수 있습니다. 

모듈의 일반적인 패턴은 private 변수와 함수를 정의하는 함수입니다. 클로저를 통해 private 변수와 함수에 접근할 수 있는 권한이 있는 함수를 생성하고 이 함수를 반환하거나 접근 가능한 장소에 이를 저장하는 것입니다. 모듈 패턴을 사용하면 전역변수 사용을 없앨 수 있습니다. 이 패턴은 정보은닉과 그 외 다른 좋은 설꼐 방식을 따를 수 있게 하고, 애플리케이션이나 다른 싱글톤(singleton) 패턴들을 효과적으로 캡슐화할 수 있게 합니다.

모듈 패턴은 또한 안전한 객체를 생성하는데도 사용할 수 있습니다. 이제 시리얼 번호를 생성하는 객체를 만든다고 가정해 보겠습니다.

```javascript
var serial_maker = function () {
  // 유일한 문자열을 생성하는 객체 생성.
  // 유일한 문자열은 접두어와 연속된 숫자 두 부분으로 구성됨
  // 객체에는 접두어와 연속된 숫자를 설정하는 메소드와
  // 유일한 문자열을 생성하는 gensym 메소드가 있음.

  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function(p) {
      prefix = String(p);
    },
    set_seq: function(s) {
      seq = s;
    },
    gensym: function(){
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym(); // unique는 "Q1000"
```

메소드가 this나 앞서 살펴본 that(03절의 함수 호출 패턴 예제 참조)을 사용하지 않기 때문에 seqer 내부의 변수를 접근할 수 있는 방법은 없습니다. 즉 해당 변수를 다루도록 정의된 메소드를 제외하고는 prefix나 seq의 값을 얻거나 변경할 수 있는 방법은 없습니다. seqer객체는 변형될 수 있기 때문에 가지고 있는 메소드들은 다른 메소드로 대체될 수 있지만 그렇다고 해서 대체된 메소드들이 숨겨져 있는 prefix와 seq를 접근할 수는 없습니다. seqer은 단순히 함수들의 집합처럼 보이지만, 이 함수들만이 숨겨진 변수들을 사용하거나 수정할 수 있는 권한이 있습니다.

seqer.gnesym을 써드 파티 함수에 넘기면 유일한 문자열을 생성할 수 있지만 써드 파티 함수가 prefix나 seq를 변경할 수 없습니다.

## 연속 호출(Cascade)

일부 메소드는 반환값이 없습니다. 예를 들어 객체의 상태를 변경하거나 설정하는 메소드들은 일반적으로 반환값이 없습니다. 만약 이러한 메소드들이 undefined 대신에 this를 반환한다면 연속 호출이 가능합니다. 연속 호출을 사용하면 같은 객체에 대해 문장 하나로 연속되는 많은 메소드를 호출할 수 있습니다. 연속 호출을 가능하게 하는 Ajax 라이브러리를 사용하면 다음과 같은 스타일의 프로그래밍이 가능합니다.

```javascript
getElement('myBoxDiv').
  move(350, 150).
  width(100).
  height(100).
  color('red').
  border('10px outset').
  padding('4px').
  appendText("Please stand by").
  on('mousedown', function(m) {
    this.startDrag(m, this.getNinth(m));
  }).
  on('mousemove', 'drag').
  on('mouseup', 'stopDrag').
  later(2000, function(){
    this.
      color('yellow').
      setHTML("What hath God wraught?").
      slide(400, 40, 200, 200);
  }).
  tip('This box is resizeable');
```

이 예제에서 getElement 함수는 id가 myBoxDiv인 DOM 엘리먼트에 여러 기능을 추가한 객체를 만환합니다. 이 객체에는 엘리먼트를 이동할 수 있는 메소드, 크기나 스타일을 변경하거나 특정 행동을 추가할 수 있는 메소드들이 포함됩니다. 각각의 메소드는 객체를 반환하기 떄문에 각 메소드 호출 결과를 다음 호출에 사용할 수 있습니다.

연속 호출은 매우 표현적인 인터페이스를 제공할 수 있게 합니다. 연속 호출은 한 번에 많은 작업을 할 수 있는 인터페이스를 만드는데 도움이 됩니다.

## 커링(Curry)

함수는 값(Value)이며, 이 함수값을 흥미로운 방법으로 다룰 수 있습니다. 커링은 함수와 인수를 결합하여 새로운 함수를 만들 수 있게 합니다.

```javascript
var add1 = add.curry(1);
document.writeln(add1(6));    // 7
```

add1은 add의 curry 메소드에 1을 넘겨서 생성한 함수입니다. add1 함수는 자신의 인수에 1을 더합니다. 자바스크립트는 curry 메소드가 없지만 다음과 같이 Function.prototype에 이를 추가할 수 있습니다.

```javascript
Function.method('curry', function(){
  var args = arguments, that = this;
  return function(){
    return that.apply(null, args.concat(arguments));
  };
});     // 뭔가 잘못된 점이...
```

curry 메소드는 커링할 원래 함수와 인수를 유지하는 클로저를 만드는 방식으로 동작합니다. 이 Curry 메소드는 새로운 함수를 만들어 반환하는데 이렇게 반환되는 함수는 curry 메소드를 호출할 때 받은 인수와 자신을 호출할 때 받게 되는 인수를 결합하여 curry를 실행한 원래 함수를 호출합니다. curry 메소드는 arguments 배열 두 개를 연결하기 위해 배열의 concat 메소드를 사용합니다. 

불행하게도 앞서 살펴본 것처럼 arguments 배열은 배열이 아닙니다. 그래서 arguments는 concat이라는 메소드가 없습니다. 이 문제를 해결하기 위해 arguments 배열 두 개에 배열의 slice 메소드를 적용할 것입니다. 이렇게 하면 concat 메소드를 포함하는 진정한 배열이 반환됩니다.

```javascript
Function.method('curry', function(){
  var slice = Array.prototype.slice,
      args = slice.aaply(arguments),
      that = this;
      return function(){
        return that.apply(null, args.concat(slice.apply(arguments)));
      };
    });
```


## 메모이제이션(memoization)

















