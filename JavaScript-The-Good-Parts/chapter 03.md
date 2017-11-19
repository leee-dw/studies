# 객체

자바스크립트에서 단순한 데이터 타입은 숫자, 문자열, 불리언(true / false), null, undefined가 있습니다. 이들을 제외한 다른 값들은 모두 객체입니다. 숫자와 문자열 그리고 불리언은 메소드가 있기 때문에 유사 객체라고 할 수 있습니다. 하지만 이들은 값이 한번 정해지면 변경할 수가 없습니다(immutable). 자바스크립트의 객체는 변형 가능한 속성들의 집합이라고 할 수 있습니다. 자바스크립트에서는 배열, 함수, 정규 표현식 등과 (당연히) 객체 모두가 객체입니다.

객체는 이름과 값이 있는 속성들을 포함하는 컨테이너라고 할 수 있습니다. 속성의 이름은 문자열이면 모두 가능합니다. 여기에는 빈 문자열도 포함합니다. 속성의 값은 undefined를 제외한 자바스크립트의 모든 값이 사용될 수 있습니다.

자바스크립트의 객체는 클래스가 필요 없습니다(class-free). 새로운 속성의 이름이나 값에 어떠한 제약 사항이 없습니다. 객체는 데이터를 한 곳에 모으고 구조화 하는데 유용합니다. 객체 하나는 다른 객체를 포함할 수 있기 때문에, 그래프나 트리 같은 자료구조를 쉽게 표현할 수 있습니다.

자바스크립트에는 객체 하나에 있는 속성들을 다른 객체에 상속하게 해주는 프로토타입(prototype) 연결 특성이 있습ㄴ디ㅏ. 이 특성을 잘 활용하면, 객체를 초기화하는 시간과 메모리 사용을 줄일 수 있습니다.

## 객체 리터럴

객체 리터럴은 새로운 객체를 생성할 때 매우 편리한 표기법을 제공합니다. 이 표기법은 아무 것도 없거나 하나 이상의 이름/값 쌍들을 둘러ㅓ싸는 중괄호이며, 표현식이 있을 수 있는 곳이라면 어디라도 위치할 수 있습니다. 

```javascript
var empty_object = {};

var stooge = {
  "first-name": "Jerome",
  "last-name": "Howard"
};
```

속성(property)의 이름은 어떤 문자열이라도 가능합니다. 여기에는 빈 문자열도 포함합니다. 속성 이름에 사용한 따옴표는 속성 이름이 자바스크립트에서 사용할 수 있는 유효한 이름이고 예약어가 아닐 경우에는 생략할 수 있습니다. 그러므로 "first-name"이라는 속성명은 반드시 따옴표를 사용해야 하지만, first_name은 사용해도 되고 안 해도 됩니다. 쉼표(,)는 "속성 이름": "값" 쌍들을 구분하는데 사용합니다.

속성의 값은 어떠한 표현식도 가능합니다. 여기에는 다음의 예처럼 객체 리터럴도 가능합니다(중첩된 객체).

```javascript

var flight = {
  airline: "Oceanic",
  number: 815,

  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },

  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angeles"
  }

};
```


## 속성값 읽기

 객체에 속한 속성의 값은 속성 이름을 대괄호([])로 둘러싼 형태로 읽을 수 있습니다. 속성 이름이 유효한 자바스크립트 이름이고 예약어가 아닐 경우에는 마침표(.) 표기법을 대신 사용할 수 있습니다. 마침표 표기법은 보다 간단하고 읽기가 편하기 때문에 보통 더 선호합니다.

```javascript
stooge["first-name"]         // "Joe"  
flight.departure.IATA        // "SYD"
```

객체에 존재하지 않는 속성을 읽으려고 하면 undefined를 반환합니다.

```javascript
stooge["middle-name"]  // undefined
flight.status          // undefined
stooge["FIRST-NAME"]   // undefined
```

`|| 연산자`를 사용하여 다음과 같이 기본값을 지정할 수 있습니다.

```javascript
var middle = stooge["middle-name"] || "(none)";
var status = flight.status || "unknown";
```

존재하지 않는 속성, 즉 undefined의 속성을 참조하려 할 때 TypeError 예외가 발생합니다. 이런 상황을 방지하기 위해서 다음과 같이 && 연산자를 사용할 수 있습니다.

```javascript
flight.equipment                            // undefined
flight.equipment.model                      // throw "TypeError"
flight.equipment  && flight.equipment.model // undefined
```

## 속성값의 갱신

객체의 값은 할당에 의해 갱신합니다. 만약 할당하는 표현식에서 속성 이름이 이미 객체 안에 존재하면 해당 속성의 값만 교체합니다.

```javascript
stooge['first-name'] = 'Jerome';
```

이와 반대로 속성이 객체 내에 존재하지 않는 경우에는 해당 속성을 객체에 추가합니다.

```javascript
stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';
flight.equipment = {
  model: 'Boeing 777'
};
flight.status = 'overdue';
```


## 참조

객체는 참조 방식으로 전달됩니다. 결코 복사되지 않습니다.

```javascript
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
  // x와 stooge가 모두 같은 객체를 참조하기 때문에,
  // 변수 nick의 값은 'Curly'.

var a = {}, b = {}, c = {};
  // a, b, c는 각각 다른 빈 객체를 참조
a = b = c = {};
  // a, b, c는 모두 같은 빈 객체를 참조
```

## 프로토타입(Prototype)

모든 객체는 속성을 상속하는 프로토타입 객체에 연결돼 있습니다. 객체 리터럴로 생성되는 모든 객체는 자바스크립트의 표준 객체인 Object의 속성인 prototype(Object.prototype) 객체에 연결됩니다.

객체를 생성할 때는 해당 객체의 프로토타입이 될 객체를 선택할 수 있습니다. 이를 위해 자바스크립트가 제공하는 메커니즘은 좀 까다롭고 복잡하지만 조금만 신경을 쓰면 매우 단순화할 수 있습니다. 이제 Object 객체에 create라는 메소드를 추가할 것입니다. create는 넘겨받은 객체를 프로토타입으로 하는 새로운 객체를 생성하는 메소드입니다.

```javascript
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}
var another_stooge = Object.create(stooge);
```

프로토타입 연결은 값의 갱신에 영향을 받지 않습니다. 즉 객체를 변경하더라도 객체의 프로토타입에는 영향을 미치지 않습니다.

```javascript
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';
```

프로토타입 연결은 오로지 객체의 속성을 읽을 때만 사용합니다. 객체에 있는 특정 속성의 값을 읽으려고 하는데 해당 속성이 객체에 없는 경우 자바스크립트는 이 속성을 프로토타입 객체에서 찾으려고 합니다. 이러한 시도는 프로토타입 체인(prototype chain)의 가장 마지막에 있는 Object.prototype까지 계속해서 이어집니다. 만약 찾으려는 속성이 프로토타입 체인 어디에도 존재하지 않는 경우 undefined를 반환합니다. 이러한 이렬ㄴ의 내부 동작을 위임(delegation)이라고 합니다.

프로토타입 관계는 동적 관계입니다. 만약 프로토타입에 새로운 속성이 추가되면, 해당 프로토타입을 근간으로 하는 객체들에는 즉각적으로 이 속성이 나타납니다.

```javascript
stooge.profession = 'actor';
another_stooge.profession     // 'actor'
```

## 리플렉션(reflection)

객체에 어떤 속성들이 있는지는 특정 속성을 접근해서 반환하는 값을 보면 쉽게 알 수 있습니다. 이때 typeof 연산자는 속성의 타입을 살펴본ㄴ데 매우 유용합니다.

```javascript
typeof flight.number       // 'number'
typeof flight.status       // 'string'
typeof flight.arrival      // 'object'
typeof flight.manifest     // 'undefined'
```

때때로 해당 객체의 속성이 아니라 프로토타입 체인 상에 있는 속성을 반환할 수 있기 때문에 주의할 필요가 있습니다.

```javascript
trypeof flight.toString      // 'function'
trypeof flight.constructor   // 'function'
```

리플렉션을 할 때 원하지 않는 속성을 배제하기 위한 두 가지 방법이 있습니다. 첫 번째 방법은 함수값을 배제하는 방법입니다. 일반적으로 리플렉션을 할 때는 데이터에 관심이 있기 때문에 함수가 반환되는 경우를 염두에 두고 있다가 배제시키면 원하지 않는 속성을 배제할 수 있습니다.

또 다른 방법은 객체에 특성 속성이 있는지를 확인하여 true/false 값을 반환하는 hasOwnProperty 메소드를 사용하는 것입니다. hasOwnProperty 메소드는 프로토타입 체인을 바라보지 않습니다.

```javascript
flight.hasOwnProperty('number')       // true
flight.hasOwnProperty('constructor')  // false
```

## 열거(Enumeration)

for in 구문을 사용하면 객체에 있는 모든 속성의 이름을 열거할 수 있습ㄴ디ㅏ. 이러하 ㄴ열거 방법에는 함수나 프로토타입에 있는 속성 등 모든 속성이 포함되기 때문에 원하지 않는 것들을 걸러낼 필요가 있습니다. 가장 일반적인 필터링 방법은 hasOwnProperty 메소드와 함수를 배제하기 위한 typeof를 사용하는 것입니다.

다음은 그 예입니다.

```javascript
var name;
for (name in another_stooge) {
  if (typeof another_stooge[name] !== 'function') {
    document.writeln(name + ': ' + another_stooge[name]);
  }
}
```

for in 구문을 사용하면 속성들이 이름순으로 나온다는 보장이 없습니다. 그러므로 만약 특정 순으로 속성 이름들이 열거되기를 원한다면 for in 구문을 사용하지 말고, 다음의 예처럼 속성이 열거되기 원하는 순서를 특정 배열로 지정하고 이 배열을 이용하여 객체의 속성을 열거할 수 있습니다.

```javascript
var i;
var properties = [
'first-name',
'middle-name',
'last-name',
'profession'
];
for (i = 0; i < properties.length; i+=1){
  document.writeln(properties[i] + ': ' +
    another_stooge[properties[i]]);
}
```

이렇게 하면 프로토타입 체인에 있는 속성들이 나오지 않을까 염려할 필요도 없으며 원하는 순서대로 속성들을 리플렉션할 수 있습니다.

## 삭제

delete 연산자를 사용하면 객체의 속성을 삭제할 수 있습니다. delete 연산자는 해당 속성이 객체에 있을 경우에 삭제를 하며 프로토타입 연결 상에 있는 객체들은 접근하지 않습니다.

객체에서 특정 속성을 삭제했는데 같은 이름의 속성이 프로토타입 체인에 있는 경우 프로토타입의 속성이 나타납니다. 다음의 예제를 보기 바랍니다.

```javascript
another_stooge.nickname

// another_stooge에서 nickname을 제거하면
// 프로토타입에 있는 nickname이 나타남.

delete another_stooge.nickname;

another_stooge.nickname  // 'Curly'
```

## 최소한의 전역변수 사용

자바스크립트에서는 전역변수 사용이 매우 쉽습니다. 불행히도 전역변수는 프로그램의 유연성을 약화하기 때문에 가능하면 피하는 것이 좋습니다.

전역변수 사용을 최소화하는 방법 한 가지는 애플리케이션에서 전역변수 사용을 위해 다음과 같이 전역변수 하나를 만드는 것입니다.

```javascript
var MYAPP = {};
```


이제 이 변수를 다른 전역변수를 위한 컨테이너로 사용합니다.
```javascript
MYAPP.stooge = {
  "first-name": "Joe",
  "last-name": "Howard"
};

MYAPP.flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },

  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angeles"
  }
};
```

이러한 방법으로 애플리케이션에 피룡한 전역 변수를 이름 하나로 관리하면 다른 애플리케이션이나 위젯 또는 라이브러리들과 연동할 때 발생하는 문제점을 최소화할 수 있습니다. MYAPP.stooge가 명시적으로 전역변수라는 것을 나타내기 때문에 프로그램의 가독성도 높입니다. 다음 장에서는 정보은닉을 위해 클로저(closure) 사용 방법을 살펴볼 것인데, 이 방법은 전역변수 사용을 줄이는 효과적인 방법 중에 하나입니다.