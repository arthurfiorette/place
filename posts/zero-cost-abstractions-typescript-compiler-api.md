---
title: 'Write abstractions without runtime cost using the Typescript Compiler API'
date: 2023/11/13 02:20:00
keywords: [typescript, meta programming]
description:
  Read your code and generate more code. Embrace meta programming and write type safe code
  at compile time.
discussion: 379
---

I'm not going to showcase this project for you because this is the engine that powers this
website by itself. You can check the source code, the only JS that will ever run in your
browser is my analytics script to see how famous I'm currently.

This entire website is built from ground up using two technologies: JSX to generate Html
and Parcel to bundle the assets.

Every page is a default function that returns a html string built using `Kita`'s JSX to
Html runtime.

```tsx
export default function Index(): string {
  return (
    <html>
      <head>
        <title>My website</title>
      </head>
      <body>
        <h1>Hello World!</h1>
      </body>
    </html>
  );
}

<Index /> === '<html>...</html>';
```

If the above felt super weird to you, then you're probably used to `React`. I have another
blog post that explains when you are looking to JSX and when you're actually interacting
with `React`-like libraries/frameworks:
[Detaching JSX from React](/detaching-jsx-from-react).