# 배열

배열은 해당 항목의 오프셋을 계산할 수 있는 정수를 통해 각 항목들을 접근할 수 있는 연속적인 메모리 할당입니다. 보통 배열은 매우 빠른 데이터 구조입니다. 하지만 불행하게도 자바스크립트에는 이런 류의 배열은 없습니다.

대신에 자바스크립트는 배열 같은 특성을 지닌 객체를 제공합니다. 자바스크립트는 배열 첨자를 문자로 변환하여 속성을 만듭니다. 이는 실제 배열보다 심각하게 느리지만, 사용하는데는 더 편리할 수 있습니다. 속성들을 읽거나 갱신하는 작업은 정수형 이름을 가진 속성에 좀 특별한 트릭이 있다는 것을 제외하고는 일반 객체와 똑같습니다. 배열에는 자신만의 리터럴 형식이 있습니다. 또한 배열에는 매우 유용한 내장 메소드들이 있습니다.

## 배열 리터럴

배열 리터럴은 새로운 배열을 만드는데 매우 편리한 표기법으로 값이 없거나 하나 이상의 값을 쉼표로 구분하여 대괄호로 묶은 것입니다. 배열 리터럴은 표현식이 위치할 수 있는 곳이라면 어디에라도 위치할 수 있습니다. 배열의 첫 번째 값은 속성 '0'으로 읽을 수 있습니다. 두 번째는 '1', 세 번째는 '2' 이런 식으로 배열 요소들을 읽을 수 있습니다.

```javascript
var empty = [];
var numbers = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
];
empty[1]    // undefined
numbers[1]  // 'one'

empty.length  // 0
numbers.length // 10
```

다음은 유사한 결과를 보이는 객체 리터럴입니다.

```javascript
var numbers_object = {
  '0': 'zero',
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine'
};
```


numbers와 numbers_object 모두 10개의 속성을 가졌고 각 속성은 모두 같은 이름과 같은 값이 있습니다. 하지만 두 객체에 근본적인 차이점이 있는데, numbers는 Array.prototype을 상속했고, numbers_object는 Object.prototype을 상속했다는 점입니다. 그래서 numbers만이 많은 수의 유용한 메소드를 상속하게 됩니다. 또한 numbers는 numbers_object가 가지지 못한 length라는 신비한 속성이 있습니다.

대부분의 언어에서 배열의 구성요소들은 모두 같은 데이터 타입이어야 합니다. 하지만 자바스크립트에서는 배열 하나에 어떤 데이터 타입의 조합이라도 다 포함될 수 있습니다.

```javascript
var misc = [
  'string', 98.6, true, null, undefined, ['nedsted', 'array'], {object: true}, NaN, Infinity
];
misc.length    // 10
```


## length 속성

모든 배열은 length 속성이 있습니다. 여타 다른 언어들과는 달리 자바스크립트에서 배열의 길이는 상계(upper bound) 기반이 아닙니다. 만약 현재 length보다 더 큰 첨자로 항목을 추가하면 length는 새로운 항목을 추가할 수 있게 늘어납니다. 어떠한 배열 경계 오류도 발생하지 않습니다.

length 속성은 배열의 가장 큰 정수 속성 이름보다 하나 더 큰 값입니다. 그렇기 때문에 length의 값이 배열에 있는 속성의 수와 반드시 일치하는 것은 아닙니다.

```javascript
var myArray = [];
myArray.length   // 0

myArray[1000000] = true;
myArray.length        // 1000001
// myArray는 단지 하나의 속성만 가짐
```

첨자를 둘러싸는 [] 연산자는 안족의 표현식이 toString 메소드를 가진 경우 이를 사용하여 표현식을 문자열로 변환합니다. 이렇게 변환된 문자열이 속성 이름으로 사용됩니다. 만약 문자열이 배열의 현재 length 값보다 크거나 같은 양수이면서 4,294,967,295보다 작은 경우 배열의 length 속성의 값은 새로운 참자에 1이 더해진 값으로 할당됩니다.

length의 값은 명시적으로 설정할 수 있습니다. length 값을 크게 설정해도 배열을 위해 더 많은 공간이 할당되지는 않습니다. 하지만 length 값을 현재보다 작게 설정했을 경우 설정한 값보다 크거나 같은 첨자에 해당하는 속성은 모두 삭제됩니다.

```javascript
numbers.length = 3;
// members is ['zero', 'one', 'two']
```

새로운 항목을 배열의 현재 length 값으로 추가하면 배열의 끝에다 추가할 수 있습니다.

```javascript
numbers[numbers.length] = 'shi';
// numbers is ['zero', 'one', 'two', 'shi']
```

배열의 마지막에 새로운 항목을 추가하는 것은 때때로 push 메소드를 사용하는 것이 더욱 편리합니다.

```javascript
numbers.push('go');
// numbers is ['zero', 'one', 'two', 'shi', 'go']
```


## 삭제

자바스크립트의 배열은 실제 객체이기 때문에 배열의 요소를 삭제하는데 delete 연산자를 사용할 수 있습니다.

```javascript
delete numbers[2]
// numbers는 ['zero', 'one', undefined, 'shi', 'go']
```

불행히도 이런 식으로 배열의 요소를 삭제하면 그 위치에 구멍이 생기게 됩니다. 즉 삭제한 요소의 오른쪽에 있는 것들은 계속해서 자신의 원래 이름을 유지합니다. 하지만 배열의 한 요소를 삭제했을 때 보통 원하는 것은 삭제한 요소 오른쪽 요소들의 이름이 수치적으로 하나씩 줄어들게 변하는 것입니다.

다행히도 자바스크립트 배열에는 spice라는 메소드가 있습니다. 이 메소드는 배열을 수술할 수 있는 능력이 있는데, 즉 배열 요소의 일부를 삭제하고 이를 나머지 요소들로 대체할 수 있습니다. 이 메소드의 첫 번째 인수는 배열의 시작점이고 두 번째 인수는 삭제할 요소의 수입니다. 이 외의 추가적인 인수들은 배열의 삭제한 지점에 추가되는 요소들입니다.

```javascript
numbers.splice(2, 1);
// numbers는 ['zero', 'one', 'shi', 'go']
```

값이 'shi'인 속성의 이름은 3에서 2로 변경됩니다. 삭제된 속성 뒤에 있는 모든 속성으 ㄴ삭제된 후에 새로운 이름으로 다시 삽입됩니다. 이러한 과정을 거치기 때문에 배열이 아주 큰 경우에는 빠르게 동작하지 않을 수 있습니다.

## 열거

계속 언급되지만 자바스크립트의 배열은 실제 객체이기 때문에 for in 문으로 배열의 모든 속성을 열거할 수 있습니다. 하지만 for in 문이 배열을 열거하는데 그다지 ㅈ거합한 편은 아닙니다 왜냐하면 대부분의 배열을 열거하는 작업에서는 배열의 첨자 순으로 열거되는 것을 당연하게 생각하는데 반해 for in 문은 속성들의 순서를 보장하지 않습니다. 또한 for in 문을 사용하면 프로토타입 체인 (prototype chain)에 있는 예상치 못한 속성도 열거될 수 있습니다.

다행히도 일반적인 for 문을 사용하여 이러한 문제를 피할 수 있습니다. 다음의 예처럼 배열의 length 속성을 반복 횟수의 조건으로 하여 for 문을 사용하면 됩니다.

```javascript
var i;
for (i = 0; i < myArray.length; i += 1) {
  document.writeln(myArray[i]);
}
```

## 객체와 배열의 혼동

자바스크립트 프로그램에서 흔한 오류 중 하나는 배열이 필요할 때 객체를 사용한다거나 객체가 필요할 때 배열을 사용하는 경우입니다. 규칙은 간단합니다. 속성 이름이 작은 크기의 연속된 정수이면 배열을 사용하고 그렇지 않으면 객체를 사용하는 것입니다. 자바스크립트 자체도 배열과 객체의 차이점을 혼동하고 있다고 볼 수 있습니다. 왜냐하면 typeof 연산자로 배열의 타입을 확인해보면 'array'가 아니라  'object'라고 알려주기 때문입니다.

자바스크립트에는 배열과 객체를 구분하는 마땅한 메커니즘이 없습니다. 이러한 결점을 보완하기 위해 다음과 같은 is_array 함수를 만들어 사용할 수 있습니다.

```javascript
var is_array = function(value) {
  return value && typeof value === 'object' &&
  value.constructor === Array;
};
```

이 함수는 한가지 문제가 있는 데 다른 창(window)이나 프레임에서 생성한 배열은 구분하지 못한다는 것입니다. 이러한 문제점을 고치려면 다음과 같이 좀더 작업을 해야 합니다.

```javascript
var is_array = function (value) {
  return value &&
      typeof value === 'object' &&
      typeof value.length === 'number' &&
      typeof value.splice === 'function' && 
      ! (value.propertyIsEnumerable('length'));
};
```

먼저 value가 참인지를 확인합니다. 이렇게 함으로써 null이나 여타 다른 거짓값을 배제할 수 있습니다. 두 번째로 typeof value가 'object'인지 확인합니다. value가 객체나 배열 또는 (조금 이상하지만) null인 경우에 참이 됩니다. 세 번째로 value에 숫자값을 가진 length 속성이 있는지를 확인합니다. 이 부분은 배열인 경우에 항상 참이며 객체인 경우에는 보통 거짓입니다. 네 번째로 value가 splice 메소드를 가졌는지를 확인합니다. 이 부분은 배열인 경우에만 참이 됩니다. 마지막으로 length 속성이 열거 가능한지를 확인합니다. 즉 for in 문으로 열거 가능한지를 확인하는 것입니다. 배열인 경우 length는 열거할 수 없습니다. 이러한 방법이 필자가 찾아낸 가장 신뢰할 만한 방법입니다. 이 방법의 문제점이라면 절차가 좀 복잡하다는 것입니다.

이러한 확인 방법을 사용하면 넘어온 값이 단일 값인지 배열인지를 구분하여 그에 맞는 작업을 하는 함수를 만들 수 있습니다.


## 배열의 메소드

자바스크립트는 배열에 동작하는 메소드들을 제공합니다. 이 메소드들은 Array, prototype에 저장돼 있는 함수들입니다. 3장에서 Object.prototype에 원하는 것들을 추가하는 것을 살펴본 것처럼, Array.prototype에도 원하는 메소드를 추가할 수 있습니다. 예를 들어 배열을 대상으로 연산을 할 수 있는 메소드를 추가하고 싶다면 가정해 보겠습니다.

```javascript
Array.method('reduce', function(f, value) {
  var i;
  for (i = 0; i < this.length; i += 1) {
    value = f(this[i], value);
  }
  return value;
});
```

Array.prototype에 함수를 추가하면 모든 배열이 추가한 메소드를 상속받게 됩니다. 이제 함수와 시작값을 취하는 reduce라는 메소드를 정의했습니다. 배열의 각 요소들은 reduce에 넘겨진 함수에 value와 같이 넘겨지고 계산된 값이 다시 value에 저장됩니다. 모든 작업을 마쳤을 때 value를 반환합니다. 만약 두 수를 더하는 함수를 넘겼다면 reduce 호출의 결과는 배열 요소들 전체의 합이 되고, 두 수를 곱하는 함수를 넘겼다면 전체의 곱이 됩니다.

```javascript
// 숫자들이 요소인 배열 생성.
var data = [4, 8, 15, 16, 23, 42];

// 간단한 함수 두 개를 정의
// 하나는 두 수를 더하는 함수이고 다른 하나는 두 수를 곱하는 함수.

var add = function(a, b) {
  return a + b;
};

var mult = function(a, b) {
  return a * b;
};

// add 함수를 넘기면서 data의 reduce 메소드 호출.
var sum = data.reduce(add, 0);    // 합은 108

// multiply 함수를 넘기면서 reduce 메소드를 다시 호출.

var product = data.reduce(mult, 1);
// 곱은 7418880
```

배열은 실제 객체이기 때문에 다음과 같이 개별 배열에 직접적으로 메소드를 추가할 수 있습니다.

```javascript
// data 배열에 total 메소드 추가
data.total = function(){
  return this.reduce(add, 0);
};
total = data.total(); // total은 108
```

문자열 'total'은 정수가 아니기 때문에, total 속성을 추가한다고 해도 length의 값은 변하지 않습니다. 배열은 속성들의 이름이 정수일 때 가장 유용하지만 배열은 객체이고 객체는 어떠한 문자열도 속성 이름으로 허용합니다.

Object.create 메소드는 배열이 아니라 객체를 반환하기 때문에 배열에 사용하는 것은 별로 유용하지 않습니다. Object.create로 배열을 받아 만들어진 객체는 배열의 값과 메소드를 상속받기는 하지만 배열의 특수 속성인 length는 갖지 못합니다.



## 배열의 크기와 차원

자바스크립트의 배열은 보통 초기화되지 않습니다. 만약 새로운 배열을 []로 만들게 되면 배열은 비어있게 됩니다. 그리고 존재하지 않는 요소를 접근하게 되면 undefined 값을 얻게 됩니다. 이러한 사실을 알고 있거나 또는 배열 요소를 참조하기 전에 모든 배열 요소의 값을 설정한다면 배열을 사용하는데 아무런 문제가 없습니다. 하지만 만약에 배열의 모든 요소가 0과 같이 알 수 잇는 값으로 시작한다고 가정하는 알고리즘을 구현하는 경우라면 이에 문제가 없게 배열을 준비시켜야 합니다. 이를 위해 자바스크립트는 Array.dim 같은 메소드를 제공했어야 합니다. 하지만 현실은 그렇지 못하며 다음과 같은 메소드를 정의함으로써 이러한 결점을 고칠 수 있습니다.

```javascript
Array.dim = function(dimension, initial) {
  var a = [], i;
  for (i = 0; i < dimension; i += 1) {
    a[i] = initial;
  }
  return a;
};

// 10가의 0을 갖는 배열 생성.
var myArray = Array.dim(10, 0);
```

자바스크립트에는 다차원 배열이 없지만 대부분 C 유형의 언어처럼 다음과 같이 배열의 배열을 사용할 수 있습니다.
```javascript
var matrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6 7, 8]
];
matrix[2][1]    // 7
```

2차원 배열이나 배열들의 배열을 만들기 위해서는 다음과 같이 직접 배열을 만들어야 합니다.

```javascript
for(i = 0; i < n; i += 1 ) {
  my_array[i] = [];
}

// 주의: Array.dim(n,[])는 여기에서 동작하지 않음.
// 각각의 요소들이 같은 배열의 참조를 갖게 됨.
```

이 코드는 각 배열들을 초기화하지 못합니다. my_array의 요소들인 각 배열을 초기화하려면 일일이 명시적으로 설정해야 합니다. 이런 경우를 위해 자바스크립트가 행렬을 위한 메소드를 지원하면 좋겠지만 역시 그렇지 못합니다. 다시 한번 이러한 결점을 다음과 같은 코드로 보완할 수 있습니다.

```javascript
Array.matrix = function(m, n, initial) {
  var a, i, j, mat = [];
  for (i = 0; i < m; i += 1) {
    a = [];
    for (j = 0; j < n; j += 1) {
      a[j] = initial;
    }
    mat[i] = a;
  }
  return mat;
};
// 0으로 채워진 4 * 4 행렬 생성.

var myMatrix = Array.matrix(4, 4, 0);
document.writeln(myMatrix[3][3]);   // 0
// 행과 열이 같은 수의 행렬을 만드는 메소드
Array.identity = function(n) {
  var i, mat = Array.matrix(n, n, 0);
  for(i = 0; i < n; i += 1) {
    mat[i][i] = 1;
  }
  return mat;
};

myMatrix = Array.identity(4);
document.writeln(myMatrix[3][3]);   // 1
```
