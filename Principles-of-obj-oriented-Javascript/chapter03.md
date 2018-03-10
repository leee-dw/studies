자바스크립트가 많은 참조 타입을 제공하고 있음에도 불구하고 개발자가 자신만의 객체를 만들어야 할 상황은 자주 찾아온다. 객체를 만들 때, 자바스크립트의 객체는 동적이기 대문에 언제라도 바꿀 수 있다는 사실을 명심해야 한다. 클래스 기반 언어는 클래스 정의에 따라 객체를 수정할 수 없도록 만들지만 자바스크립트 객체에는 이러한 제약이 없다.

자바스크립트 프로그래밍 작업의 상당 부분은 이러한 객체를 다루는 것이므로 자바스크립트 전체를 이해하려면 객체의 동작 원리를 이해해야 한다. 이에 대해서는 이 장 후반부에서 다루도록 하겠다.

# 프로퍼티 정의

1장에서 배운 내용을 떠올려보자. 객체를 만드는 방법은 두 가지가 있다. 첫 번째는 Object 생성자를 사용하는 방법이고, 두 번째는 객체 리터럴을 사용하는 방법이다. 다음 예제를 보자

```javascript
var person1 = {
  name: "Nicholas"
};

var person2 = new Object();
person2.name = "Nicholas";

person1.age = "Redacted";
person2.age = "Redacted";

person1.name = "Greg";
person2.name = "Michael";
```

person1과 person2에는 둘 다 name이라는 프로퍼티가 있다. 예제 아래쪽 코드에서는 두 객체에 age라는 프로퍼티를 추가했따. 이 작업은 객체를 정의한 직후나 한참이 지난 뒤에 언제든 할 수 있다. 작성한 객체는 일부러 막아두지 않는 이상 언제든 수정할 수 있다(막아두는 방법은 62쪽의 "객체 수정 방지"를 참고하라). 예제 마지막 부분에서는 각 객체 name 프로퍼티의 값을 수정했다. 프로퍼티의 값도 언제든 수정할 수 있다.

자바스크립트는 프로퍼티를 처음 객체에 추가할 떄 객체에 있는 [[Put]] 이라는 내부 메소드를 호출한다. [[Put]] 메소드는 객체에 프로퍼티 저장 공간을 생성한다. 이 과정은 해시 테이블에 처음 키를 추가하는 것과 비슷하다. 이 동작은 수행하면 초기값은 물론 프로퍼티의 속성도 설정한다. 따라서 앞 예제에서는 각 객체에 name과 age 프로퍼티가 처음 정의될 때마다 [[Put]] 메소드가 호출된다.

[[Put]]을 호출하면 객체에 고유 프로퍼티(Own property)가 만들어진다. 고유 프로퍼티는 객체의 특정 인스턴스에 속해있으며 인스턴스에 바로 저장된다 또한 프로퍼티에 동작을 수행하려면 소유 객체를 거쳐야 한다. 

기존 프로퍼티에 새 값을 할당할 떄는 [[Set]]이 호출된다. [[Set]]은 프로퍼티의 현재 값을 새 값으로 교체한다. 앞 예제에서는 두 번째로 name에 값을 할당할 때 [[Set]]이 호출된다. 그림 3-1은 person1 객체의 name과 age 프로퍼티의 값이 변경될 때 일어나는 일을 단계별로 보여준다.

다이어그램의 첫 번째 부분에서는 객체 리터럴을 사용해 person1 객체를 생성했다. 이 때 묵시적으로 [[Put]]이 실행되어 name 프로퍼티가 추가된다. person1.age에 값을 할당하면 [[Put]]이 실행되어 age 프로퍼티를 추가한다. 하지만 person1.name에 "Greg"라는 새 값을 할당할 때는 [[Set]]이 name 프로퍼티에 실행되어 프로퍼티의 기존 값을 새로운 값으로 대체한다.

# 프로퍼티 탐지

프로퍼티는 언제든 추가할 수 있기 때문에 객체에 프로퍼티가 있는지 확인해야 할 때도 있다. 자바스크립트에 익숙하지 않은 개발자는 종종 다음과 같은 방식으로 객체에 프로퍼티가 있는지 확인하다.

```javascript
// 정확하지 않은 방식
if(person1.age) {
  // age를 사용해 무언가 실행한다.
}
```

이 방식의 문제점은 자바스크립트의 타입 강제변환(coercion)이 결과에 영향을 끼친다는 것이다. if 조건문은 주어진 값이 참스러운 값(truthy value: 객체, 비어있지 않은 문자열, 0이 아닌 숫자, true)이면 true로 취급하고 주어진 값이 거짓스러운 값(falsy value: null, undefined, 0, false, NaN, 빈 문자열)이면 false로 취급한다. 객체 프로퍼티에는 거짓스러운 값이 저장될 수도 있기 때문에 예제 코드와 같은 방식은 잘못 실행될 수 있다. 예를 들어 person1.age의 값이 0이라면 프로퍼티가 있어도 if 조건문은 실행되지 않을 것이다. 더 정확하게 프로펕의 존재 여부를 확인하려면 in 연산자를 사용하는 것이 좋다. 

in 연산자는 특정 객체에 주어진 이름의 프로퍼티가 존재하는지 확인하고 존재하면 true를 반환한다. 사실 in 연산자는 해시 테이블에 주어진 키가 있는지 확인한다. 다음은 in 연산자를 사용해 person1 객체에 프로퍼티가 있는지 확인하는 예제이다.

```javascript
console.log("name" in person1); // true
console.log("age" in person1); // true
console.log("title" in person1); // false
```

자바스크립트에서 메소드는 함수를 참조하고 있는 프로퍼티이므로 메소드의 존재 여부도 같은 방식으로 확인할 수 있다. 다음은 person1에 sayName()이라는 새 함수를 추가하고 in 연산자를 사용해 함수가 있는지 확인하는 코드이다.

```javascript
var person1 = {
  name: "Nicholas",
  sayName: function() {
    console.log(this.name);
  }
};
console.log("sayName" in person1); // true
```

대개 객체에 특정 프로퍼티가 있는지 확인할 때는 in 연산자를 사용하는 것이 가장 좋다. 이 방식을 사용하면 프로퍼티의 값을 확인하지 않는다는 이점도 있다. 프로퍼티의 값을 확인하는 과정에서 성능 문제가 생기거나 에러가 발생할 수 있기 때문이다.

그런데 때로는 프로퍼티의 존재 여부를 확인하는 것에 그치지 않고 해당 프로퍼티가 객체의 고유 프로퍼티인지도 확인해야 한다. in 연산자는 고유 프로퍼티와 프로토타입 프로퍼티 둘 다 찾기 때문에 고유 프로퍼티인지 확인하고 싶다면 다른 방법을 동원해야 한다. 모든 객체에 포함되어 있는 hasOwnProperty() 메소드는 주어진 프로퍼티가 객체에 존재하는 동시에 고유 프로퍼티일 때만 true를 반환한다. 예를 들어 다음 코드는 person1의 여러 프로퍼티에 대해 in 연산자를 사용했을 때와 hasOwnProperty()를 사용했을 때 결과가 어떻게 달라지는지 보여준다.

```javascript
var person1 = {
  name: "Nicholas",
  sayName: function() {
    console.log(this.name)
  }
};

console.log("name" in person1); // true
console.log(person1.hasOwnProperty("name")); // true
console.log("toString" in person1); // true
console.log(person1.hasOwnProperty("toString")); // false
```

이 예제에서 name은 person1의 고유 프로퍼티이므로 in 연산자와 hasOwnProperty()는 둘 다 true를 반환한다. 하지만 toString() 메소드는 모든 객체에 포함되어 있는 프로토타입 프로퍼티이므로 in 연산자는 true를 반환하지만 hasOwnProperty()는 false를 반환한다. 이러한 차이는 꽤 중요하므로 이에 대해 4장에서 더 기이 살펴보도록 하겠다.

# 프로퍼티 제거

객체에는 언제든 프로퍼티를 추가할 수 있고, 객체에 있는 프로퍼티는 언제든 제거할 수 있다. 프로퍼티의 값을 null로 바꾸는 것만으로는 프로퍼티가 객체에서 완전히 제거되지 않는다. 값을 null로 바꾸는 동작은 [[Set]] 내부 메소드를 null과 함께 실행하므로 앞에서 보았듯 프로퍼티의 값만 달라지게 된다. 객체에서 프로퍼티를 완전히 제거할 때는 delete 연산자를 사용해야 한다.

객체 프로퍼티에 delete 연산자를 사용하면 내부적으로 [[Delete]]가 호출된다. 이 동작은 해시 테이블에서 키/값 쌍을 없애는 것으로 볼 수 있다. delete 연산자는 무사히 실행을 마쳤을 때 true를 반환한다(일부 프로퍼티는 제거할 수 없는 경우가 있는데 이에 대해서는 나중에 다루겠다). 다음은 delete 코드가 어떻게 동작하는지 보여주는 예제 코드이다.

```javascript
var person1 = {
  name: "Nicholas"
};

console.log("name" in person1); // true

delete person1.name; // true - 출력되지는 않음
console.log("name" in person1); // false
console.log(person1.name) // undefined
```

이 예제에서 name 프로퍼티는 person1 객체에서 삭제됐다. 삭제하고 난 후에 in 연산자를 사용해보면 false를 반환한다. 존재하지 않는 프로퍼티에 접근하면 undefined가 반환된다는 것도 주목해야 할 부분이다. 그림 3-2를 보면 delete가 객체를 어떻게 변화시키는지 알 수 있다.


# 열거

객체에 추가하는 프로퍼티는 기본적으로 열거(enumerable)가 가능하다. 즉 for-in 반복문을 사용해 훑을 수 있다. 열거 가능 프로퍼티에는 [[Enumerable]]이라는 내부 속성이 true로 설정되어 있다. for-in 반복문을 실행하면 객체에 있는 프로퍼티 중 열거 가능한 것을 훑는데 이떄 프로퍼티의 이름을 변수에 할당한다. 다음은 반복문을 통해 객체의 이름과 값을 출력하는 예제이다.

```javascript
var property;
for (property in object) {
  console.log("이름" + property);
  console.log("값" + object[property]);
}
```

for-in 반복문을 실행하는 동안 매 주기마다 property 변수에는 다음에 살펴볼 열거 가능 프로퍼티의 이름이 할당되며 이 동작은 프로퍼티를 전부 다 훑을 때까지 계속된다. 프로퍼티를 다 훑고 나면 반복문이 종료되고 그 뒤의 코드가 실행된다. 이 예제는 각괄호 표기법을 사용해 객체 프로퍼티의 값을 가져온 후 그 값을 콘솔에 출력했다. 자바스크립트에서 각괄호 표기법을 사용해야 할 대표적인 사례이다. 

객체 프로퍼티의 목록을 가져와야 한다면 ECMAScript 5에서 도입된 Object, Keys() 메소드가 유용하다. 이 메소드를 실행하면 다음에서 보듯 열거 가능한 객체의 이름을 배열로 구성하여 반환한다.

```javascript
var properties = Object.keys(object);

// for-in 반복문의 동작을 흉내내고 싶을 때
var i, len;

for(i = 0; len = properties.length; i < len; i++) {
  console.log("Name: " + properties[i]);
  console.log("Value: " + object[properties[i]]);
}
```

이 예제에서는 Object.keys()를 사용해 특정 객체에 있는 열거 간으한 프로퍼티의 목록을 가져왔다. 이후 for 반복문을 사용해 프로퍼티 목록을 훑으며 프로퍼티의 이름과 값을 출력했다. 일반적으로 프로퍼티 이름 목록을 배열 형태로 다루고 싶을 때는 Object.keys()를 사용하고 굳이 배열이 필요 없을 때는 for-in을 사용한다.

모든 프로퍼티를 열거할 수 있는 것은 아니다. 사실 객체의 네이티브 메소드는 대부분 [[Enumerable]] 속성이 false로 설정되어 있다. 특정 프로퍼티가 열거 가능한지 확인할 때는 propertyIsEnumerable() 메소드를 사용하면 된다. 이 메소드는 모든 객체에 포함되어 있다.

```javascript
var person1 = {
  name: "Nicholas"
};

console.log("name" in person1) // true
console.log(person1.propertyIsEnumerable("name")); // true

var properties = Object.keys(person1);

console.log("length" in properties); // true
console.log(properties.propertyIsEnumerable("length")) // false
```

이 예제에서 name은 person1에 직접 추가한 프로퍼티이므로 열거 간으한다. 반면 properties 배열의 length 프로퍼티는 Array.prototype의 내장 프로퍼티이므로 열거 가능하지 않다. 나중에 알게 되겠지만 네이티브 프로퍼티는 대부분 기본적으로 열거 가능하지 않다.


# 프로퍼티 종류

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분한다. 데이터 프로퍼티는 앞에서 살펴본 예제의 name 프로퍼티처럼 값을 포함하고 있따. 데이터 프로퍼티는 [[Put]] 메소드의 기본 동작을 통해 생성되며 이 장에서 지금까지 살펴본 예제는 모두 데이터 프로퍼티를 사용한 것이었다. 접근자 프로퍼티는 값을 포함하지 않는 대신 프로퍼티를 읽었을 때 호출할 함수(게터(getter)라고 부른다)의 ㄱ밧을 설정할 때 호출할 함수(세터(setter)라ㅗㄱ 부른다)를 정의한다. 접근자 프로퍼티는 게터 또는 세터 둘 중 하나만 사용할 수도 있고 둘 다 사용할 수도 있다.

다음 예제는 객체 리터럴을 사용해 접근자 프로퍼티를 정의하는 특수한 문법을 사용한다.

```javascript

var person1 = {
  _name: "Nicholas",
  get name() [
    console.log("name 읽는중");
    return this._name;
  ],

  set name(value) {
    console.log("name의 값을 %s로 설정하는 중", value);
    this._name = value;
  }
};

console.log(person1.name); // "name 읽는중" 출력 후 "Nicholas" 출력
person1.name = "Greg";
console.log(person1.name); // "name의 값을 Greg로 설정하는 중" 출력 후 "Greg" 출력
```

이 예제는 name이라는 접근자 프로퍼티를 정의하고 있다. 접근자 프로퍼티에서 사용할 실제 값은 _name이라는 데이터 프로퍼티에 저장한다(프로퍼티 이름을 언더 스코어 문자로 시작하면 이를 비공개 프로퍼티처럼 취급하겠다는 뜻이 된다. 하지만 실제로는 공개 프로퍼티이다). name의 게터와 세터를 정의할 때는 function 키워드가 없다는 점만 제외하면 함수를 정의하는 문법과 비슷하다. get 또는 set이라는 특수한 키워드를 접근자 프로퍼티 이름 앞에 사용하고 이름 뒤에는 골호와 함수 코드를 입력하낟. 게터는 값을 반환해야 하고 세터는 프로퍼티에 할당할 값을 인수로 전달받을 수 있어야 한다.

예제에서는 프로퍼티 데이터를 저자하기 위해 _name을 사용했는데 사실 동작 자체는 다른 변수나 객체에 데이털르 저장하는 것과 크게 다르지 않다. 예제 코드는 프로퍼티를 다루는 한편 콘솔에 기록도 남기도록 작성되었다. 단순히 다른 프로퍼티에 데이터를 저장했다가 가져오는 정도만 수행한다면 대개는 접근자 프로퍼티 대신 해당 프로퍼티에 직접 데이터를 저장한다. 접근자 프로퍼티는 값을 할당할 때, 어떤 동작을 추가로 더 수행하고자 할 떄, 또는 값을 읽을 때 추가적인 계산을 통해 변환 값을 만들어야 할 때 유용하다.


# 프로퍼티 속성

ECMAScript 5 명세 전에는 프로퍼티의 열거 가능 여부를 설정할 수 있는 방법이 없었다. 사실 프로퍼티의 내부 속성에 접근할 방법 자체가 없었다는 말이 더 정확하다. ECMAScript 5에서는 프로퍼티 속성을 바로 다룰 수 있는 방법이 몇 가지 추가되었고 여러 기능을 지원할 수 있는 속성도 몇 가지 추가되었다. 덕분에 이제는 자바스크립트의 네이티브 프로퍼티와 똑같이 동작하는 프로퍼티도 작성할 수 있다. 이 절에서는 데이터 프로퍼티와 접근자 프로퍼티의 속성에 대해 자세히 알아볼 것이다. 먼저 두 프로퍼티가 공통적으로 가진 속성에 대해 살펴보자

## 공통속성

데이터 프로퍼티와 접근자 프로퍼티의 공통 속성은 두 가지이다. 하나는 [[Enumerable]]인데 프로퍼티가 열거 가능한지 정하는 속성이고 다른 하나는 [[Configurable]]로서 프로퍼티를 변경할 수 있는지 정하는 속성이다. [[Configurable]] 속성이 있는 설정 가능 프로퍼티(configurable property는 delete 연산자를 사용해 언제든 제거할 수 있고 프로퍼티의 속성도 언제든 변경할 수 있다. 다시 말해 설정 가능 프로퍼티는 데이터 프로퍼티를 접근자 프로퍼티로 바꾸거나 그 반대로 바꾸는 것도 가능하다. 객체의 모든 프로퍼티는 따로 설정을 하지 않는 한 열거 가능하며 설정 가능하다.

프로퍼티 속성을 바꾸고 싶을 때는 Object.defineProperty() 메소드를 사용할 수 있다. Object.defineProperty() 메소드에는 인수를 세 개 전달하는데 첫 번째 인수는 프로퍼티를 소유하고 있는 객체이고 두 번째 인수는 프로퍼티 이름, 세 번째 인수는 설정할 프로퍼티 속성 값을 포함하고 있는 **프로퍼티 서술자** 객체이다. 서술자 객체에는 설정할 내부 속성의 이름을 각괄호 없이 사용하며 ㄴ된다. 따라서 enumerable을 사용함면 [[Enumerable]]을 설정하고 configurable을 사용하면 [[Configurable]]을 설정ㅎㄴ다. 다음은 열거 불가능하며 설정 불가능한 객체 프로퍼티를 작성하는 예제이다.

```javascript
var person1 = {
  name: "Nicholas"
};

Object.defineProperty(person1, "name", {
  enumerable: false
});

console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")); // false

var properties = Object.keys(person1);
console.log(properties.length); // 0

Object.defineProperty(person1, "name", {
  configurable: false
});

// 프로퍼티 제거 시도
delete person1.name;
console.log("name" in person1);
console.log(person1.name);

Object.defineProperty(person1, "name", {
  configuralbe: true
});
```

name 프로퍼티는 평범하게 정의되었지만 이후 [[Enumerable]] 속성을 false로 설정했다. 따라서 propertyIsEnumerable() 메소드는 새로 변경된 [[Enumerable]]의 값을 참조하여 false를 반환한다. 그 후에는 name 프로퍼티를 설정 불가능하도록 만들었따. 이제 name 속성은 수정할 수 없는 프로퍼티이기 때문에 제거하려고 해도 제거할 수 없다. 따라서 person1에는 name이 그대로 남아있게 된다. 이때는 name에 Object.defineProperty()를 다시 실행해도 프로퍼티의 속성을 변경할 수 없다. name은 person1의 프로퍼티로 사실상 고정되어버린 셈이다. 

마지막 부분에서는 name을 다시 설정 가능한 프로퍼티로 바꾸려 했으나, 이때 name은 설정 불가능한 프로퍼티이기 때문에 설정 가능하도록 바꾸려고 시도하면 에러가 발생한다. 이때는 데이터 프로퍼티를 접근자 프로퍼티로 바꾸거나 접근자 프로퍼티를 데이터 프로퍼티로 바꾸려 해도 에러가 발생한다.

## 데이터 프로퍼티 속성

데이터 프로퍼티에는 접근자 프로퍼티에 없는 두 종류의 내부 속성이 있다. 첫 번째는 [[Value]]인데 프로퍼티의 ㄱ밧을 저장하고 있다. 객체에 프로퍼티를 만들면 자동으로 이 속성에 값이 저장된다. 프로퍼티의 값은 심지어 값이 함수일 때도 모두 [[Value]]에 저장된다.

두 번째 속성은 [[Writable]]이다. 이 속성은 프로퍼티에 값을 저장할 수 있는지 정의하는 불리언 값이다. 따로 설정하지 않으면 객체의 모든 프로퍼티는 프로퍼티에 값을 저장할 수 있도록 설정된다.

앞서 살펴본 두 속성과 Object.defineProperty()를 사용하면 데이터 프로퍼티를 정의할 수 있으며, 이 방식은 프로퍼티가 실제로 존재하지 않는 경우에도 사용할 수 있다. 다음과 같은 코드가 있다고 생각해보자.

```javascript
var person1 = {
  name: "Nicholas"
};
```

계속 보아왔던 이 예제는 person1이라는 새로운 객체를 만들면서 name 프로퍼티를 정의하고 프로퍼티의 값을 설정한다. 다음은 위 코드와 실행 결과가 똑같지만 조금 더 복잡해 보이는 코드이다.

```javascript
var person1 = {};
Object.defineProperty(person1, "name", {
  value: "Nicholas",
  enumerable: true,
  configurable: true,
  writable: true
});
```

Object.defineProperty()를 실행하면 먼저 해당 프로퍼티가 있는지 확인한다. 프로퍼티가 없다면 새 프로퍼티를 추가하고 프로퍼티 서술 객체에서 정의한 대로 속성을 설정한다. 이 예제에서 name은 person1의 프로퍼티가 아니었기 때문에 새로 작성된다. 

Object.defineProperty()를 사용해 새 프로퍼티를 정의할 때 서술자에 없는 속성은 모두 false로 설정된다. 따라서 필요한 속성은 반드시 서술자에 포함시켜 두어야 한다. 다음 예제는 Object.defineProperty()를 호출할 때 명시적으로 true라고 설정한 속성이 없었기 때문에 열거 불가능, 설정 불가능, 쓰기 불가능한 name 프로퍼티를 만든다.

```javascript
var person1 = {};
Object.defineProperty(person1, "name", {
  value: "Nicholas"
});

console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")) // false

delete person1.name;
console.log("name" in person1); // true

person1.name = "Greg";
console.log(person1.name); // "Nicholas"
```

이 코드에서 name 프로퍼티로는 값을 읽어오는 것만 할 수 있다. 다른 작업은 모두 속성이 차단했기 때문이다. 이미 존재한느 프로퍼티는 미리 수정할 수 있도록 설정해 둔 프로퍼티만 바꿀 수 있다.

## 접근자 프로퍼티 속성

접근자 프로퍼티에만 필요한 속성도 두 가지가 있다. 접근자 프로퍼티는 저장할 값이 없으므로 [[Value]]나 [[Writable]] 속성은 필요 없는 대신 각각 게터 함수와 세터 함수를 나타내는 [[Get]]과 [[Set]] 속성이 필요하다. 게터와 세터를 리터럴 형식으로 정의할 때처럼 프로퍼티를 생성할 때는 두 속성 중 하나만 정의해도 상관없다.

접근자 프로퍼티를 정의할 때 객체 리터럴 형식 대신 접근자 프로퍼티 속성을 사용하면 기존에 있던 객체에도 프로퍼티를 추가할 수 있다는 장점이 있다. 접근자 프로퍼티를 정의할 때 객체 리터럴 형식을 사용하려면 다음과 같이 작성한다.

```javascript
var person1 = {
  _name: "Nicholas"
};

Object.defineProperty(person1, "name", {
  get: function() {
    console.log("name 읽는중");
    return this._name;
  }
});

console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")); // false
delete person1.name;
console.log("name" in person1); // true
person1.name = "Greg"
console.log(person1.name); // "Nicholas"
```

이 코드에서 name 프로퍼티는 게터만 정의된 접근자 프로퍼티이다. 세터도 없고 명시적으로 true라고 설정된 속성도 없으므로 이 프로퍼티는 읽기 전용으로만 사용할 수 잇으며 값을 수정하거나 속성을 변경할 수 없다.


## 여러 프로퍼티 정의하기

Object.defineProperty() 대신 Object.defineProperties()를 사용하면 동시에 여러 프로퍼티를 설정할 수 있다. Object.defineProperties() 메소드에는 인수를 두 개 전달한다. 첫 번째 인수는 대상 객체이고 두 번째 인수는 정의할 프로퍼티의 정보를 담고 있는 객체이다. 두 번째 인수의 키는 프로퍼티의 이름이며 값은 해당 프로퍼티의 속성을 정의한느 프로퍼티 서술 객체이다. 다음은 프로핕 두 개를 정의하는 예제이다.

```javascript
var person1 = {};

Object.defineProperties(person1, {
  // 데이터를 정의할 데이터 프로퍼티
  _name: {
    value: "Nicholas",
    enumerable: true,
    configurable: true,
    writable: true
  },
  // 접근자 프로퍼티 
  name: {
    get: function() {
      console.log("name 읽는중");
      return this._name;
    },
    set: function() {
      console.log("name의 값을 %s로 설정하는 중", value);
      this._name = valeu;
    },
    enumerable: true,
    configurable: true
  }
});
```

이 예제는 정보를 저장할 _name이라는 데이터 프로퍼티와 name이라는 접근자 프로퍼티를 정의한다. Object.defineProperties()를 사용하면 프로퍼티를 몇 개든 정의할 수 있으며 기존 프로퍼티 수정과 새 프로퍼티 추가를 동시에 수행할 수도 있다. 이 메소드는 Object.defineProperty()를 여러 번 실행한 것과 같은 효과를 낸다.


## 프로퍼티 속성 가져오기

프로퍼티 속성을 가져오고 싶을 때는 Object.getOwnPropertyDescriptor() 메소드를 사용한다. 이 메소드는 이름에서 보듯 고유 프로퍼티에만 사용할 수 있다. 이 메소드에 전달하는 인수는 두 개인데 첫 번째 인수는 대상 객체이고 두 번째는 정보를 가져올 프로퍼티의 이름이다. 인수로 이름을 전달한 프로퍼티가 존재하면 프로퍼티의 속성 정보를 포함한 객체가 반환되며 이 객체에는 configurable, enumerable을 비롯한 네 종류의 키가 설정되어 있다. 나머지 두 개는 프로퍼티의 종류에 따라 달라진다. 다음 코드는 프로퍼티를 생성한 후 이 프로퍼티의 속성을 확인한다.

```javascript
var person1 = {
  name: "Nicholas"
};

var descriptor = Object.getOwnPeopertyDescriptor(person1, "name");

console.log(descriptor.enumerable); // true
console.log(descriptor.configurable); // true
console.log(descriptor.writable); // true
console.log(descriptor.value); // "Nicholas"
```

이 코드에서 name 프로퍼티는 객체 리터럴을 사용해 정의되었다. Object.getOwnPropertyDescriptor()를 호출하여 name 프로퍼티의 정보를 살펴보면 enumerable, configurable, writable, value 프로퍼티를 포함하고 있는 객체가 반환된다. Object.defineProperty()를 통해 명시적으로 설정하지 않은 속성인데도 기본 값을 사용해 설정되어 있는 것이다.

# 객체 수정 방지

객체에도 프로퍼티와 마찬가지로 객체의 동작을 제엉하는 내부 속성이 있따. 속성 중 하나인 [[Extensible]]은 객체 자체의 수정 가능 여부를 가리키는 불리언 값이다. 우리가 작성하는 모든 객체는 기본적ㅇ로 이 속성이 켜져 있는 **확장 가능한**(extensible) 객체이다. 