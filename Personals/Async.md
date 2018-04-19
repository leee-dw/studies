## Asynchronous

동기는 한 번에 하나의 일만 할 수 밖에 없다. 비효율적

동기적 흐름은 순서대로 진행됨.

첫 번째

```javascript
const baseData = [1, 2, 3, 4, 5, 6, 100];


function foo() {
  baseData.forEach((v, i) => {
    console.log("Sync: ", i);
    bar();
  })
}

function bar() {
  baseData.forEach((v, i) => {
    debugger;
    console.log("Sync2: ", i);
  })
}

foo();
```



두 번째

```javascript
setTimeout(() => console.log(10), 1000);
```



callback queue에 저장됨.



setTimeout()

안에는? 



비동기는 결과적으로 non-blocking 이다.

EventHandler



```javascript
const baseData = [1, 2, 3, 4, 5, 6, 100];

const asyncRun = (arr, fn) => {
  arr.forEach((v, i) => {
    setTimeout(() => fn(i), 1000);
  });
}

asyncRun(baseData, idx => console.log(idx));
```



forEach를 사용하면 i의 값이 결정되었기 떄문에 한번 끊겨서 참조점이 없는 값을 기억하고 있기 때문에 실행되는 것임.





```javascript
const baseData = [1, 2, 3, 4, 5, 6, 100];


function sync(){
  baseData.forEach((v,i)=>{
    console.log("sync ", i);
  });
}

const asyncRun = (arr, fn) => {
  arr.forEach((v, i) => {
    setTimeout(() => fn(i), 1000);
  });
}

function sync2(){
  baseData.forEach((v,i)=>{
    console.log("sync 2 ", i);
  });
}

asyncRun(baseData, idx => console.log(idx));
sync();
sync2();
```





숙제1: 왜 77777이 나왔나 DM으로 날리기

숙제2: setTimeout재귀호출 하면서 무한루프로 구할 수 있는데 콜스택이 어떻게 쌓이게 되는지 같이  (recursive setTimeout)



recursive setTimeout을 구현했을 때 콜스택은 어떻게 동작하는가?