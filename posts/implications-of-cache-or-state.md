---
title: 'Implications of choosing State instead of Cache'
date: 2022/09/23 07:52:00
preview: /images/implications-of-cache-or-state.png
keywords: [architecture, design pattern]
description:
  The guide towards the implications of choosing to use State to handle remote data.
---

_All concepts presented here are applicable to any other technology, even myself have been
using it with plain html and even with desktop apps in rust. All code examples are in a
"pseudo javascript code" style, don't focus literally on the code, but on the design and
architecture presented with the following examples._

## The simple problem

Everything starts out with a simple problem, you have a frontend, any frontend, and you
need to interact with some sort of internal or external API. For the sake of this post, we
will assume that you are coding a web application and interacting with a rest API with or
without caching support.

If, and when, you have complete knowledge some sort API interactions you could expect and
use and save it in a more _hardcoded_ and _smart_ way, but thats not 99% of the cases.
Client generation, complex caching mechanisms and other things that a schematized API can
provide are not always available. Said that, still most of the time you have to deal of
writing requests methods manually, and this is where everything goes down the road.

And, after some coding, you will end up with something like this:

```js
function getUser(name) {
  return fetch('https://api.com/user/' + name);
}
```

So, you call `getUser()` whenever you need to get the data for a specific user. But what
about two components in two different component hierarchy trees in the screen whose need
to show the same data from the same user? Your application will become slow and
ineffective by the amount of duplicated network requests.

## We brought another new simple problem

Well, a simple problem must have a simple solution, right? And here is were you starts
using **state** to solve your _simple-not-anymore_ problem.

```js
// This variable represents some library that shares data in a global perspective,
// like Redux for the React ecosystem.
const state = new Map();

function getUser(name) {
  // checks if the state has the user
  if (state.has(name)) {
    return state.get(name);
  }

  // fetches, if not exists, and saves the response
  const user = fetch('https://api.com/user/' + name);
  state.set(name, user);

  return user;
}
```

And the 1739 XKCD comic comes to a hard reality **once again**:

<a style="text-align: center; display: block" href="https://xkcd.com/1739/">
  <img src="https://imgs.xkcd.com/comics/fixing_problems.png" alt="Xkcd: Fixing problems" style="width: 20rem"/>
</a>

What if another piece of code, in the same machine or in another dimension, mutates the
state that you are displaying? Then, your simple state usage becomes a nightmare to debug
and solve, as it freezes the state.

You could start implementing your own cache mechanism inside your state control code. But
the hard reality is that is **HARD** to implement a _bug-free_ cache mechanism _(And I
truly mean it, because I'm the maintainer of
[![Axios Cache Interceptor](https://img.shields.io/npm/dw/axios-cache-interceptor?style=flat&label=Axios%20Cache%20Interceptor)](https://www.npmjs.com/package/axios-cache-interceptor)
)_. Most of the time, people just stick to freezing the cache by not coding some kind of
revalidation, or, for a more _time-important_ data, they never even use cache.

## Possible cache implementations

The main objective of this post is to help you avoid storing any kind of data in a state,
and interacting with your API directly with a cached api client. But, before we really
start, let's see some possible cache implementations that you could implement in your
application. I'm sure you've seen some of them in the wild for a while now.

1. Define a specific TTL (time to live) for each request, so, after **X** period of time,
   the data will be updated with what the remote server returned. This is by far the most
   used solution, as it is a middle ground between data consistency and avoiding network
   requests.

2. Listen to some kind of real-time event source, like from websockets, to update the
   data. Only the mutated piece will travel to the client, the data may or may not be
   reflected in real time to the screen, and your data consistency keeps up with _minimal_
   network connections. But this requires a **alot** of resources, work and maintenance.
   This may even be the least preferred way to solve this problem, as it increases the
   network usage, and levels up data consistency that the majority of the time is not
   needed.

3. Implement [ETag](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/ETag) and/or
   [Cache-Control](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Cache-Control)
   for HTTP connections, _(or any other cache specification for your specific protocol.)_
   This will probably requires a lot of glued code between some library that implements
   the thousand different and specific behaviors for each use case in the State Management
   code you are using alongside your frontend.

4. And many other solutions that don't
   [need to be listed here](https://www.google.com/search?q=cache+consistency)...

## The Cache "Statization" Phenomenon

The usage of State Management libraries are becoming more and more popular, the number of
people that tries to mimic cache behaviors by implementing them, manually, in their State
Management code is growing. We could try to call this phenomenon as **Cache
"Statization"**.

Then, you may ask, why try to _statizate_ the cache when I can just use a cache? Well,
there are **no** reasons to do that. Just because everyone is using global state
management in their code, doesn't mean that it solves all the problems.

[Kent C. Dodds has a great tweet about it](https://t.co/BBKyDfylia):

> UI state should be separate from the server cache (often called "state" as well), and
> when you do that, you don't need anything more than React for State Management.- Kent C.
> DOdds, Nov 24, 2019.

It opens a door to a great discussion about splitting the data of your app in two
different layers: the **UI data (state)** and the **API data (cache)**.

If it's bad to mix cache into our state and API data is a thousand times easier to handle,
cache and manage, the real question is: **How can I move the maximum amount of data that
behaves as UI state but is actually a server retrievable data?**.

## The State definition

Any kind of content that may not be able to retrieve from a remote server, or any kind of
data that is going to be lost if the application exists unexpectedly. It may be stored in
a local storage or in memory. It's main characteristic is that you are the one responsible
for managing it and the server usually does not care about, knows it existence or doesn't
care about it _for now_.

It seems a bit more complex and abstract, no? Well, not at all, if you are developing some
kind of frontend, which is the main case of this article, you can design your data flow to
be as simple as possible in the client-side. In which case, you'll end up with just
temporary component level input data, like color themes or platform-specific user
preferences.

E.g: You have a form that inputs payment information. Before you send the processed data
to the server, all of it stages are stored in a state. This means that if the user closes
the browser, if this is a web application of course, the data will be lost. The server
only cares for the final input, it does not care about the temporary text inside each
input, it only cares about the data snapshot sent to it.

## The Cache definition

Any kind of data that is retrieved from API responses, and can be retrieved again without
much hassle. It may be from a remote web server or even a local database. One of its main
characteristics is that you must not be the one responsible to handle its storage.

E.g: Within a rest API, you may have the ability to input more data, but you aren't the
one responsible for managing it, so all data calls from it should be stored in a cache.

## That's nothing new!

You may be thinking: _"That's nothing new, [`swr`](https://swr.vercel.app/pt-BR) and
[`react-query*`](https://tanstack.com/query/v4) has been doing it for years in the react
world!"_. And you are **not wrong**.

These libraries does a great job at abstracting remote data into a self built cache, so
you don't have to manage it manually. Because if you do, you'd probably _statizate your
cache_, once again.

