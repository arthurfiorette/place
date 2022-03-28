---
title: 'How return await can slow down your code'
date: 2022/03/26 08:17:00
author: Arthur Fiorette
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

A major paradigm of large-scale application development is to prefer a high-level
language. which speeds up development stages and is slower in runtime or at a medium to
lower level language that is faster at runtime but slower to develop.

With that in mind, many managers and developers prefer the first option, a high-level
language with some runtime disadvantages. Which, in our case, is `Javascript`.

You might be thinking: _"If I really need performance, I shouldn't be using Javascript"_.
But, that's not how it literally works. NodeJs can be pretty _fastish_ for almost
everything. The [Techempower](https://www.techempower.com/benchmarks/) benchmark shows
that he can handle very good results.

If you could only improve one percent of your code, with a web server that can only handle
~8k concurrent requests, that would be 80 more requests than you could have been
delivering.

And that brings us to a simple thing that can improve your code:

## Awaiting before returning.

A very common pattern in **Asynchronous Javascript Programming** is to create a function
that expects and wraps many other async function calls:

```js
async function example() {
  const server = await createServer();
  const endpoints = await createEndpoints(server);

  return await startServer(server, endpoints);
}
```

As you can see, the above function has an `await` before a `return` statement. And that's
exactly where it gets complicated.

Before explaining the problem in depth, let's build a simple benchmark:

## The benchmark

Before everything, it's good to you know that every code used here is hosted at the
[`arthur-place/the-cost-of-return-await`](https://github.com/arthur-place/the-cost-of-return-await)
Github repository.

Let's explain how the benchmark was done:

There is a `work()` function. It returns a promise which is resolved as soon as the
`setImmediate` function is called.

And there are also these 3 other functions. They are exactly the same, but one is
`asynchronous` and uses `await`, the other just uses `async` and the last one uses only a
raw `return` statement.

```ts
function work(): Promise<any>;

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

The `async` / `await` standards are too modern, normally the source is transpiled. And
this benchmark does it too.

- `Es2017` _(Native)_
- `Es6` _(`__awaiter`)_
- `Es5` _(`__awaiter` and `__generator`)_
- `Babel` _(`runtime-generator`)_.

Remembering, you can see the benchmark
[source](https://github.com/arthur-place/the-cost-of-return-await/).

<iframe
  frameborder="0"
  width="100%"
  height="550px"
  src="https://arthur-place.github.io/the-cost-of-return-await/results/result.chart.html"
></iframe>

You are probably also wondering, why was Es6 considerably slower?

My simple research showed that the generator polyfill (`__generator`) is faster than the
native `function*` and `yield` Node 17 implementation. But that's a story for another day.

## What's wrong with `return await`?

**Babel**, **ES5** and **ES6** have different operating rates per second _(ops/s)_ because
of their different polyfills used. You can see them in the
[`dist`](https://github.com/arthur-place/the-cost-of-return-await/tree/main/dist) folder.

Simply put, the await instruction literally does what it says: it waits the completion
before returning it's values. This also implies that the thing being waited is likely
going to be a promise-like object.

And with that, NodeJS already schedules that line to start executing at the end of the
current loop. Then, and only then, it will execute the rest of it and wait for inner
promises and tasks.

A simple way to prove the above claim is this simple code.

```js
async function asyncFn() {
  console.log(1);

  // This will make the nodejs waits for the end of the current loop.
  await 0;
  console.log(2);
}

function syncFn() {
  console.log(3);
}

asyncFn();
syncFn();

// Outputs:
//> 1
//> 3
//> 2
```

## Catching exceptions

If you don't wait the promise before returning it, it will return that promise in the same
instant. Similar to a
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
called. That's because the promise returns without any pending handle _(or anything
similar)_. Because only the `fn()` caller will receive the error thrown by `work()`.

## The simplest fix ever.

Discounting the above exception, you can simply remove the `await` and live your life
normally.

If you are using ESLint _(And if don't, you **should**)_, you can enable the
[`no-return-await`](https://eslint.org/docs/rules/no-return-await) rule.

## That's It!

I hope you've learned something new from this article. See you next time!

Also, it's the first time I've written something in English. Please
[DM](https://arthur.place/r/twitter) me if you find any errors.
