# Q1. Closure 문제

var 키워드로 선언된 변수나, 함수 선언식으로 만들어진 함수는 함수 내부 전체에서 유효한 식별자인 **함수 레벨 스코프**를 갖습니다. 예를 들어, 함수A에서 var키워드로 선언된 변수를 함수 A의 내부  함수B에서 참조할 수 있습니다.

```javascript
function A() {
  var foo = 123;
  function B() {
    return foo
  }
  return B();
}
A(); // 123
```



아래 코드는 클로저로 인해 예상과 다른 값이 출력된 코드입니다.

```javascript
const baseData = [1, 2, 3, 4, 5, 6, 100];

const asyncRun = (arr, fn) => {
  for (var i = 0; i < arr.length; i++) {
    setTimeout(() => fn(i), 1000);
  }
}
asyncRun(baseData, idx => console.log(idx));

```

저는 위 코드의 결과값으로 0,1,2,3,4,5,6이 출력되기를 기대했지만, 위 코드를 실행하면 7이 7번 출력됩니다. 

1. 그 이유는 for문의 var i는 전역 변수이기 때문입니다. 
2. asyncRun 함수가 실행되어 Call Stack에 쌓이고, setTimeout은 asyncRun Stack위에 쌓였다가 호출되면 익명함수 () =>fn(i)를 Web API에 저장해놓고 사라집니다.
3. var i는 for문을 돌아 7이 됩니다. 
4.  Web API에 저장되어 있던 7개의 익명함수 () =>fn(i)는 1000ms가 지난 뒤, Callback Queue로 이동합니다.
5. Callback Queue로 이동한 fn(i)가 하나씩 Stack으로 오면서 fn(i)의 i에는 for문을 돌며 생성된 i의 값 7이 스코프체인 되어 들어갑니다. 
6. asyncRun() 함수의 두 번째 argument인 `idx => console.log(idx)` 가 실행되면서 i의 값인 7이 익명 함수의 숫자에 따라 7번 출력되면서 결과값은 7이 7번 출력됩니다.



위 문제를 해결하는 방법은 3가지입니다.

1. for문의 var를 let으로 변환한다.

```javascript
const asyncRun = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => fn(idx), 1000);
  }
}
asyncRun(baseData, idx => console.log(idx));
```

ES6의 let, const 키워드로 선언된 변수는 **블록 레벨 스코프**를 갖습니다.  따라서 코드 블록 내에서 선언된 변수는 코드 블록 내에서만 유효하며, 코드 블록 외부에서는 참조가 불가능합니다. 또한 for문이 종료되어도 i의 값들은 block에 저장되어 i를 참조하는 함수에 참조됩니다.



2. setTimeout메서드를 즉시실행함수로 감싼다.

```javascript
const asyncRun = (arr, fn) => {
  for (var i = 0; i < arr.length; i++) {
    (index => setTimeout(() => fn(index), 1000))(i);
  }
}
asyncRun(baseData, idx => console.log(idx));
```

setTimeout 메서드를 즉시실행함수로 감싸서 실행하면 var i가 전역 스코프화 되는 문제를 해결할 수 있습니다.



3. forEach 메서드를 사용한다.

```javascript
const asyncRun = (arr, fn) => {
  arr.forEach((v, i) => {
    setTimeout(() => fn(i), 1000);
  });
}
asyncRun(baseData, idx => console.log(idx));
```





# Q2. setTimeout 무한 재귀호출시 call stack?

```javascript
function animate() {
  setTimeout(animate, 1000)
}

animate();
```



1. Call Stack에 animate() 함수가 쌓이고, animate()함수 위에 setTimeout함수가 쌓입니다.
2. setTimeout()을 실행하면 setTimeout은 사라지고, setTimeout 안에 있는 animate는 Web API로 이동합니다. 
3. 1000ms 후, Web API에 있는 animate 함수는 Callback Queue로 이동합니다.
4. Event Loop가 Call Stack이 비어있는 것을 확인하면 Callback Queue에 있는 animate함수를 Call Stack으로 옮깁니다.
5. 1~4번 과정을 반복하게 됩니다. 


setTimeout 함수를 사용하면 Call Stack에 쌓이지 않고, Web API와 Callback Queue, Call Stack을 반복하게 됩니다.

위 과정을 그림으로 표현하면 다음과 같습니다.

