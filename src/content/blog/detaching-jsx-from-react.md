---
title: 'Detaching JSX from React'
date: 2023/11/13 02:20:00
keywords: [javascript, react]
description: Learn how to use the best templating language of all times to your advantage.
issue: 403
color: '#fff'
---

First of all, let me show this code snippet:

```jsx
export function App() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
```

If the first thing that comes to your mind is "React", then this article is for you.

`React.createElement` is React, `<div />` is just a JSX call.

Although we focus on removing the `React === Javascript` brainwashing made somewhere
between the `create-react-app` fever and the _learn react in 2 weeks google search tutorial free
course 2020_ era, firstly you need to understand a few things that makes React works so
well with JSX.

## JSX is not HTML
