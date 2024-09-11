---
title: 'Detaching JSX from React'
date: 2024/9/13 14:57:00
keywords: [javascript, react]
description: Learn how to use the best templating language of all times to your advantage.
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

If your mind is screaming: **"React! React! React!"**, then this article is for you.

`React.createElement` is not React, `</>` is the syntax sugar for a JSX call. Although we focus on removing the `React === Javascript` brainwashing made somewhere
between the **create-react-app fever** and the **learn react in 2 weeks google search tutorial free
course 2020** era, firstly you need to understand a few things that makes React works so
well with JSX.

## JSX is not HTML
