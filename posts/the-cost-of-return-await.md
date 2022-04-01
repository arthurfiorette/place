---
title: 'How return await can slow down your code'
date: 2022/03/26 08:17:00
preview: /images/the-cost-of-return-await.jpg
keywords: [performance, javascript]
description: Awaiting a promise before returning it can lead to a 50% slower code.
---

<h2 style="margin-bottom: 3rem">
  <b>TL;DR</b>:
  Enable the
  <a href="https://eslint.org/docs/rules/no-return-await">
    <code>no-return-await</code>
  </a>
  ESLint rule.
</h2>

A major paradigm of large-scale application development is choosing to code in high-level
languages. They speed up development stages but with a tradeoff to be slower at runtime.
Which, in our case, `Javascript` was chosen.

You might be thinking: _"If I really need performance, I should be coding in Rust"_, for
example. But, that's not how it literally works. NodeJs can be pretty _fastish_ for almost
everything. The [Techempower](https://www.techempower.com/benchmarks/) benchmark shows
that he can handle very good results.

If you could only improve one percent of your code, for example a web api that only
handles around 8K concurrent requests per second, that would be 80 more requests than you
could've been delivering.

And that brings us to the _today's percent_:

## Awaiting promises before returning.

A very common pattern in **Asynchronous Javascript Programming** is to code functions that
waits and wraps many other async function calls:

```js
async function example() {
  const server = await createServer();
  const endpoints = await createEndpoints(server);

  return await startServer(server, endpoints);
}
```

As you can see, the above function has an `await` before a `return` statement. And that's
exactly where it gets **tricky**.

Before explaining the problem in depth, let's build a simple benchmark to show how this is
tricky:

## The benchmark

It's good to you know that every code used here is hosted at the
**[`arthur-place/the-cost-of-return-await`](https://github.com/arthur-place/the-cost-of-return-await)**
github repository.

There is a main `work()` function. It simply returns a promise which is resolved as soon
as the `setImmediate` function is called.

And there are also these 3 other functions. They produce exactly the same result, but one
is _asynchronous_ and uses `await`, the other is just _asynchronous_ and the last one uses
only a raw `return` statement.

```ts
// function work(): Promise<any>;

async function doWait() {
  return await work();
}

async function dontWait() {
  return work();
}

function justReturn() {
  return work();
}
```

In a real world scenario, the javascript is transpiled to a much more older **EcmaScript**
version, and we will do the same.

### Build targets and generated code

I made a simple test and transpiled the same
[`source`](https://github.com/arthur-place/the-cost-of-return-await/blob/main/index.js)
from `ES3` to `ES2022`, all different outputs are shown below:

<details>
<summary>Babel (Regenerator Runtime)</summary>

```js
function doWait() {
  return _doWait.apply(this, arguments);
}

function _doWait() {
  _doWait = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
      return _regenerator['default'].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return work();

            case 2:
              return _context.abrupt('return', _context.sent);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  return _doWait.apply(this, arguments);
}

function dontWait() {
  return _dontWait.apply(this, arguments);
}

function _dontWait() {
  _dontWait = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2() {
      return _regenerator['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              return _context2.abrupt('return', work());

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    })
  );
  return _dontWait.apply(this, arguments);
}
```

</details>
<details>
<summary>ES5 (Tslib Awaiter and Tslib Generator)</summary>

```js
function doWait() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, work()];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
}
function dontWait() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2 /*return*/, work()];
    });
  });
}
```

</details>
<details>
<summary>ES6 (Tslib Awaiter)</summary>

```js
function doWait() {
  return __awaiter(this, void 0, void 0, function* () {
    return yield work();
  });
}
function dontWait() {
  return __awaiter(this, void 0, void 0, function* () {
    return work();
  });
}
```

</details>
<details>
<summary>ES2017 (Native)</summary>

```js
async function doWait() {
  return await work();
}
async function dontWait() {
  return work();
}
```

</details>

These are the collected results at my machine.

- Node v16.14.0
- Nvm 0.39.1
- i5 9600K @ 5GHz OC
- 32GB @ 3200Mhz
- 1TB SSD PCIe 4.0

<iframe
  title="A benchmark of different return statements"
  src="https://arthur-place.github.io/the-cost-of-return-await/results/result.chart.html"
></iframe>

You are probably also wondering, why was Es6 considerably slower?

A simple research shows that the tslib generator polyfill
([`__generator`](https://github.com/microsoft/tslib/blob/c827964226e85118e2fd35b1cc68d4a5ad867f39/tslib.js#L122))
is faster than the Node 17 native `function*` and `yield` Node 17 implementation. But
that's a story for another day.

## What's wrong with `return await`?

The **Babel**, **ES5** and **ES6** are expected to have performance variations. It is
obvious because each one is using different **EcmaScript** compatibility and polyfills.

Simply put, the await instruction literally does what it says: it waits for the promise
completion before returning its resulted value. It also implies that the thing being
waited is likely going to be a promise-like object.

The **NodeJS Event Loop** already schedules the specified line to only run at the end of
the current loop. Then, and only then, it will execute the rest of it and wait for inner
promises and tasks.

This is simple way to prove the above claim:

```js
async function withAwait() {
  console.log(1);

  // This is going to make the nodejs wait
  // for the end of the current loop.
  await 0;

  console.log(2);
}

async function withoutAwait() {
  console.log(3);
}

withAwait();
withoutAwait();
```

```sh
$ node example.js
#> 1
#> 3
#> 2
```

Going back to the benchmark, that was is the **1%** that was being talked about earlier.
And that **1%** can be `10` of `10.000` ops/s, even or `1000` of a `1.000.000` ops/s.

With that proved, you can see that by only using an `await` keyword, your function
execution flow will be interrupted multiple times. Summing up every time it's correctly
used a `return` statement, this can increase hundreds executions per second.

This way, avoiding `return await` can literally be considered a good practice that really
improves performance.

## Catching exceptions

As said before, if you don't wait the promise before returning it, that promise will be
returned in the same instant. Similar to a
[_Chain of Responsibility_](https://pt.wikipedia.org/wiki/Chain_of_Responsibility).

This means that, instead of handling what it'll return, it is going to pass that
responsibility to the caller of the function.

And then comes the only correct use of `return await`: **Try-Catch blocks**.

```js
async function fn() {
  try {
    return await work();
  } catch (err) {
    return handleWorkError(error);
  }
}
```

In the above example, if you remove the above `await`. The catch block will never be
called, even if you directly throw any exceptions inside the function.

```js
// return await work();
return work();
```

And now the catch block will never be called. That's because the promise returned by
`work()` function is going to directly pass its responsibility to the `fn()` caller.

If you had put a `try-catch` block outside the calling `fn()` function, the inner `fn()`
`catch` block still wouldn't have been executed, but the outer one will.

## The simplest fix ever.

Discounting the above exception, you can simply remove the `await` and live your life
normally.

If you are using ESLint _(And if don't, you **should**)_, you can enable the
[`no-return-await`](https://eslint.org/docs/rules/no-return-await) rule.

## That's It!

I hope you learned something new and can use it in your future to improve your code. See
you next time!
