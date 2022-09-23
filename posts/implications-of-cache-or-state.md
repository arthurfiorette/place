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
will assume that you are coding a web application and interacting with your rest API
developed by an unknown team.

If, and when, you have complete knowledge some sort API interactions you could expect and
use it in a more _hardcoded_ way, but thats not 99% of the cases. And client generation,
complex caching mechanisms and other things that a schematized API could provide are not
always available. So, most of the time you have to deal of writing requests methods
manually, and this is where everything goes down the road.

And, after some code, you will end up with something like this:

```js
function getUser(name) {
  return fetch('https://API.com/user/' + name);
}
```

So, you call `getUser()` whenever you need to get the data for a specific user. But what
about two components in two different component tree hierarchy in the screen that, for
example, needs to show a data of the same user? Your application will become super slow by
the amount of duplicated network requests.

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
  const user = fetch('https://API.com/user/' + name);
  state.set(name, user);

  return user;
}
```

And the 1739 XKCD comic comes to a hard reality **once again**:

<a style="text-align: center; display: block" href="https://xkcd.com/1739/">
  <img src="https://imgs.xkcd.com/comics/fixing_problems.png" alt="Xkcd: Fixing problems" />
</a>

What if another piece of code, in the same machine or in another country, mutates the
state that you are displaying? How can you know if the data became stale? How can you know
if the user still exists after a certain period of time?

## Tradeoffs chosen by state users

Well, you could choose one specific tradeoff for each case and keep your code simplicity.
We've seen some of them in the wild for a while now:

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
   for HTTP connections, or any other _cache-like_ specification for your specific
   protocol. This will probably requires a lot of glued code between some library that
   implements the thousand different and specific behaviors for each use case in the State
   Management code you are using alongside your frontend.

4. And many other solutions that don't need to be listed here..

The main misconception here is that by knowing your data, you can choose to _not have
tradeoffs_, that's because you **know your data behaviors**.

## The Cache "Statization" Phenomenon

The usage of State Management libraries are becoming more and more popular, the number of
people that tries to mimic caches by implementing them, manually, in their State
Management code is growing. We could try to call this phenomenon as **Cache
"Statization"**.

Then, you may ask, why try to _statizate_ the cache when I can just use a cache? Well,
there are **no** reasons to do that.
[Kent C. Dodds has a great tweet about it](https://t.co/BBKyDfylia).

> UI state should be separate from the server cache (often called "state" as well), and
> when you do that, you don't need anything more than React for State Management.- Kent C.
> DOdds, Nov 24, 2019.

It opens a door to a great discussion about splitting the data of your app in two
different layers: the **UI data (state)** and the **API data (cache)**.

If it's bad to mix cache into our state and API data is a thousand times easier to handle,
cache and manage, the real question is: **How can I move the maximum amount of data that
it may be UI state to the data that a server can retrieve?**.

---

<!--

hold less info in memory and just refetch as needed.

With modern javascript practices you are probably grouping cache and state together. I've never used the backbone in production, but in the documentation examples I've just read, looks like it does too.

What I mean by cache:

Extracted data from fetch/axios responses and anything else that can be retrieved easly from any API.

What I mean by state:

Data that (should) only lives in the client or data that needs to be manipulated (and accessed) frequently by multiple pieces of code.The state will almost always come from the cache data.

Here's how you can "solve" it:

When interacting with cache data:

You can use a good and easy to use request library, like axios (~5.6Kb) to make http requests, and a cache library, like axios-cache-interceptor (~3.84Kb, which i'm the maintainer btw), and let the cache plugin to take care of invalidating, requesting and storing it's data.

When interacting with state data:

Use some very small libraries specially made for your framework (Vue or React as of your example). That way, you'll receive the most important (or essencial) data cached (by the cache step above) from your API, and then manipulate it to the state.

 -->

## The Cache definition

Any kind of data that is retrieved from API responses, and can be retrieved again without
much hassle. It may be from a remote web server or even a local database. One of it's main
characteristics is that you must not be the one responsible to control its inputs and
store it.

If you have some piece of data that you have to write the input mechanism and store it,
its not a remote data, its a state.

E.g: With a rest API, you may have the ability to input more data, but you aren't the one
responsible for managing it, so all data calls from it should be stored in a cache.

## The State definition

Any kind of content that may not be able to retrieve from a remote server, or any kind of
data that is going to be lost if the application exists unexpectedly. It may be stored in
a local storage or in memory. It's main characteristic is that you are the one responsible
for managing it and the server usually does not care about, knows it existence or doesn't
care about it _for now_.

It seems a bit more complex and abstract, no? Well, not at all, if you are developing some
kind of frontend, which is the main case of this article, you can design your data flow to
be as simple as possible in the client-side. In which case, you'll end up with just
temporary input data at some component level and configuration data, like color themes or
platform-specific user preferences.

E.g:

## How to handle UI data as API cache.

First
