VAR, LET and CONST -Hoisting, and Scope
=======================================

[![Go to the profile of Harrison Grant-Favor](https://cdn-images-1.medium.com/fit/c/100/100/0*uKjUFOMjgCldszRp.)](https://blog.usejournal.com/@harrisongrantfavor?source=post_header_lockup)

[Harrison Grant-Favor](https://blog.usejournal.com/@harrisongrantfavor)BlockedUnblockFollowFollowing

Mar 11

![](https://cdn-images-1.medium.com/freeze/max/60/1*k3cDk06MO3SFjgCUrC3ttg.jpeg?q=20)

<img class="progressiveMedia-noscript js-progressiveMedia-inner" src="https://cdn-images-1.medium.com/max/1200/1\*k3cDk06MO3SFjgCUrC3ttg.jpeg">

nothing to see here, just an image of a nucleus.

JavaScript, like a lot of more modern languages, provides a host of different methods for variable declaration. JavaScript has the **_var_**, **_let_** and **_const_** keywords for variable declarations and with each comes a different use case. This article aims to dive in-depth into the caveats and nuances which you might encounter when using either of these variable declaration methods.

For a bit more context, see the definitions of each of the keywords as defined in the [official ECMAScript specifications](https://www.ecma-international.org/ecma-262/6.0) and [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

> **Var** keyword declares a variable which is scoped to its current execution context, optionally initializing to a value.

> **Let** keyword declares a block scoped variable, optionally initializing it to a value.

> **Const** keyword declares constants which are block scoped much like variables defined using **let** but the value of a constant cannot change. The **const** declaration creates a read-only reference to a value.