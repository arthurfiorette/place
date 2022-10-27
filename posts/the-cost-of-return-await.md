---
title: 'How Return Await can slow down your code'
date: 2022/03/26 08:17:00
preview: /images/the-cost-of-return-await.jpg
keywords: [performance, javascript]
description: Awaiting a promise before returning it slows down your code.
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
example. But, that's not how it literally works. _NodeJs_ is fast enough for almost
everything, from development to runtime speeds. The
[Techempower](https://www.techempower.com/benchmarks/) benchmark also shows that it can
handle very good results.

If you could improve just one percent of your code, for example in a web API, it would be
delivering 800 more requests if your server handles around 8K concurrent requests per
second.

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

Before explaining the problem in depth, let's build a simple benchmark to show how this
gets slower:

## The benchmark

It's good to you know that every code used here is hosted at the
**[`arthur-place/the-cost-of-return-await`](https://github.com/arthur-place/the-cost-of-return-await)**
github repository.

There is a main `work()` function. It simply returns a promise which is resolved as soon
as the [`setImmediate`](https://nodejs.dev/learn/understanding-setimmediate) function is
called.

And there are also these 3 other functions. They produce exactly the same result, but one
is _asynchronous_ and uses `await`, the other is just _asynchronous_ and the last one only
uses a raw `return` statement.

```ts:hg1,4,8,12
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
version, that's exactly what we're doing.

### Build targets and generated code

I made a simple test and transpiled the same
[`source`](https://github.com/arthur-place/the-cost-of-return-await/blob/main/index.js)
file from `ES3` to `ES2022`, all the outputs that were different are shown below:

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

And that's how I chose the necessary targets.

It is also important to show the configuration of my computer:

- Node v16.14.0
- Nvm 0.39.1
- i5 9600K @ 5GHz OC
- 32GB @ 3200Mhz
- 1TB SSD PCIe 4.0

### Benchmark Results

<iframe
  title="A benchmark of different return statements"
  src="https://arthur-place.github.io/the-cost-of-return-await/results/result.chart.html"
></iframe>

You are probably also wondering, why was Es6 considerably slower?

My simple research showed that the tslib generator polyfill
([`__generator`](https://github.com/microsoft/tslib/blob/c827964226e85118e2fd35b1cc68d4a5ad867f39/tslib.js#L122))
is faster than the Node 17 native `function*` and `yield` Node 17 implementation. But
that's a story for another day.

## What's wrong with `return await`?

The **Babel**, **ES5** and **ES6** targets are expected to have performance variations. It
is obvious because each one is using different polyfills and different **EcmaScript**
versions.

Simply put, the await instruction literally does what it says: it waits for the promise
completion before returning its evaluated result.

It also expects that the thing being waited is likely going to be a promise-like object.
That's why has the same behavior for `await (promise)` or with `await (non promise)`.

The **NodeJS Event Loop** already schedules the specified line to only run at the end of
the current iteration. Then, and only then, it will execute the rest of it and wait for
inner promises and tasks.

This is a simple way to prove the above claim:

```js
async function withAwait() {
  console.log(1);

  // This will make nodejs wait for the
  // end of the current loop. Because it
  // "expects" that a promise was given
  // in place of 0
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

Going back to the benchmark, it is the **1%** that was being talked about earlier. And
that **1%** can be `100` of `10.000` ops/s, or even a `10.000` of a `1.000.000` ops/s
server.

With that proved, you can see that by only using an `await` keyword, your function
iteration flow will be interrupted multiple times. Adding every milliseconds saved when a
`return` statement is used correctly, this can be hundreds of more operations per second.

In this way, avoiding return await can be considered a good practice that really improves
performance.

## Catching exceptions

As said before, if you don't wait the promise before returning it, that promise will be
returned in the same instant. Similar to a
[_Chain of Responsibility_](https://pt.wikipedia.org/wiki/Chain_of_Responsibility).

This means that, instead of handling what it'll return, it is going to pass that
responsibility to the caller of the function.

And then comes the one of some correct usages of `return await`: **Try-Catch blocks**.

```js
// Correct usage of `return await`
async function fn() {
  try {
    return await work();
  } catch (err) {
    return handleWorkError(error);
  }
}
```

If we change the above example and removes the `await` keyword:

```js
// return await work();
return work();
```

The catch block will never be called, even if you directly throw any exceptions inside the
function. That's because the promise returned by `work()` function is going to directly
pass its responsibility to the `fn()` caller.

If you had put a `try-catch` block outside the calling `fn()` function, the inner `fn()`
`catch` block still wouldn't have been executed, but the outer one would.

## The simplest fix - ever.

Discounting the above exception _(literally 😂)_, you can simply remove the `await` and
live your life normally.

If you are using ESLint _(And if don't, you **should**)_, you can enable the
[`no-return-await`](https://eslint.org/docs/rules/no-return-await) rule.

## Zero cost async stack traces

If you're a good reader, and you read the `no-return-await` rule, you've seen that it
talks about preserving stack traces. But if not, no problem, I'll explain.

Summing it up a bit, it says that just by returning the promise and letting the caller
handle any possible exception, you'll encounter a stack trace loss.

A simple example of it:

```js:hg2,7
async function foo() {
  await bar();
  return 42;
}

async function bar() {
  await Promise.resolve();
  throw new Error('BEEP BEEP');
}

foo().catch((error) => console.log(error.stack));
```

```sh:hg4
$ node index.js

Error: BEEP BEEP
  at bar (index.js:8:9) --> (ONLY SHOWS BAR) <--
  at process._tickCallback (internal/process/next_tick.js:68:7)
  at Function.Module.runMain (internal/modules/cjs/loader.js:745:11)
  at startup (internal/bootstrap/node.js:266:19)
  at bootstrapNodeJSCore (internal/bootstrap/node.js:595:3)
```

But as written on the official [**v8.dev**](https://v8.dev/blog) blog, they solved this
problem with something called
[zero-cost async stack traces](https://bit.ly/v8-zero-cost-async-stack-traces) and now you
can see the exact stack trace in the console:

```sh:hg4
$ node index.js

Error: BEEP BEEP
   at bar (index.js:8:9)
   at process._tickCallback (internal/process/next_tick.js:68:7)
   at Function.Module.runMain (internal/modules/cjs/loader.js:745:11)
   at startup (internal/bootstrap/node.js:266:19)
   at bootstrapNodeJSCore (internal/bootstrap/node.js:595:3)
   at async foo (index.js:2:3)
```

Im not gonna cover everything said there, but you can read more about it in their
[official blog post](https://v8.dev/blog/fast-async#improved-developer-experience).

## That's It!

I hope you learned something new and can use it in your future to improve your code. See
you next time!
