[

](/post/5c39e3ff6fb9a04a027a9421)

[](/post/5c39e3ff6fb9a04a027a9421)

2019年01月12日阅读 936

\[译\] 在JavaScript中何时使用var、let及const
===================================

> *   原文链接：[var vs let vs const in javascript](https://link.juejin.im?target=https%3A%2F%2Fmedium.freecodecamp.org%2Fvar-vs-let-vs-const-in-javascript-2954ae48c037)
> *   原文作者：Tyler McGinnis
> *   译者：[Alisa](https://link.juejin.im?target=http%3A%2F%2Fwww.alisali.cn)

在这篇文章中，你将学习两种在JavaScript（ES6）中创建变量的新方法，let和const。 在此过程中，我们将研究var，let和const之间的差异，以及函数与块级作用域，变量提升和不变性等主题。

如果你更喜欢观看视频的方式，可以看这个：

[var vs let vs const: Variable declarations in ES6 | ES2015](https://link.juejin.im?target=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D6vBYfLCE9-Q)

ES2015（或ES6）引入了两种创建变量的新方法，let和const。但在我们真正深入研究var，let和const之间的差异之前，首先需要了解一些先决条件。 它们是变量声明与初始化，作用域（特别是函数作用域）和提升。

变量声明与初始化
--------

变量声明引入了新的标识符。

    var declaration
    复制代码

上面我们创建了一个名为declaration的新的标识符。在JavaScript中，变量在创建时使用`undefined`值初始化。这意味着如果我们尝试打印`declaration`变量，我们将得到undefineed。

    var declaration
    
    console.log(declaration)
    复制代码

所以如果我们打印declaration变量，得到undefined.

与变量声明相反，变量初始化是指首次为变量赋值。

    var declaration
    
    console.log(declaration) // undefined
    
    declaration = 'This is an initialization'
    
    复制代码

所以这里我们通过将变量赋值为一个字符串来初始化它。

这引出了我们的第二个概念，作用域。

作用域
---

作用域定义了在你的程序中可以访问变量和函数的位置。在JavaScript中，有两种作用域 - 全局作用域和函数作用域。根据官方规范，

> 如果变量语句出现在函数声明中，那么这个变量在该函数中作为函数局部作用域被定义。

这就意味着如果你使用`var`创建了一个变量， 那么该变量的作用域为它被创建时所在的函数，并且只能在该函数或任何嵌套函数内部访问。

    function getDate () {
      var date = new Date()
      return date
    }
    getDate()
    console.log(date) // ❌ Reference Error
    
    复制代码

现在让我们看一个更高级的例子。假设我们有一个数组`prices`，并且我们需要一个函数，接受该数组以及一个`discount`作为参数，并返回一个新的折扣后的价格数组。最终目标可能如下所示：

    discountPrices([100, 200, 300], .5)
    复制代码

并且实现可能像这样：

    function discountPrices (prices, discount) {
      var discounted = []
      for (var i = 0; i < prices.length; i++) {
        var discountedPrice = prices[i] * (1 - discount)
        var finalPrice = Math.round(discountedPrice * 100) / 100
        discounted.push(finalPrice)
      }
      return discounted
    }
    复制代码

看起来很简单，但这与作用域有什么关系？看一下`for`循环。在其内部声明的变量是否可以在其外部访问？事实证明，他们可以。

    function discountPrices (prices, discount) {
      var discounted = []
      for (var i = 0; i < prices.length; i++) {
        var discountedPrice = prices[i] * (1 - discount)
        var finalPrice = Math.round(discountedPrice * 100) / 100
        discounted.push(finalPrice)
      }
      console.log(i) // 3
      console.log(discountedPrice) // 150
      console.log(finalPrice) // 150
      return discounted
    }
    复制代码

如果JavaScript是你知道的唯一的编程语言，你可能不会想到这一点。但是，如果你从另一种编程语言（特别是一种块级作用域的编程语言）开始使用JavaScript，那么你可能会对这里发生的事情感到担忧。

它并没有真正破碎，它只是有点奇怪。在`for`循环之外，没有理由仍然可以访问`i`，`discountedPrice`和`finalPrice`。它对我们没有任何好处，甚至可能在某些情况下对我们造成伤害。但是，由于用`var`声明的变量是函数作用域内的，所以你可以这样做。

现在我们讨论了变量声明，初始化和作用域， 那么在我们深入了解`let`和`const`之前我们需要清除的最后一件事就是变量提升。

### 变量提升

记得早些时候我们说过“在JavaScript中，变量在创建时用`undefined`值来初始化。”事实证明，这就是变量提升的全部内容。JavaScript解释器将在所谓的“创建”阶段为变量声明分配默认值`undefined`。

> 有关创建阶段，变量提升和范围的更深入的指南，请参阅[The Ultimate Guide to Hoisting, Scopes, and Closures in JavaScript](https://link.juejin.im?target=https%3A%2F%2Ftylermcginnis.com%2Fultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript%2F)

我们来看看前面的例子并且研究一下变量提升是怎么影响它的。

    function discountPrices (prices, discount) {
      var discounted = undefined
      var i = undefined
      var discountedPrice = undefined
      var finalPrice = undefined
      discounted = []
      for (var i = 0; i < prices.length; i++) {
        discountedPrice = prices[i] * (1 - discount)
        finalPrice = Math.round(discountedPrice * 100) / 100
        discounted.push(finalPrice)
      }
      console.log(i) // 3
      console.log(discountedPrice) // 150
      console.log(finalPrice) // 150
      return discounted
    }
    复制代码

请注意，所有变量声明都分配了默认值`undefined`。这就是为什么如果你在实际声明之前尝试访问其中一个变量，你就会得到`undefined`。

    function discountPrices (prices, discount) {
      console.log(discounted) // undefined
      var discounted = []
      for (var i = 0; i < prices.length; i++) {
        var discountedPrice = prices[i] * (1 - discount)
        var finalPrice = Math.round(discountedPrice * 100) / 100
        discounted.push(finalPrice)
      }
      console.log(i) // 3
      console.log(discountedPrice) // 150
      console.log(finalPrice) // 150
      return discounted
    }
    复制代码

现在你已经了解了有关`var`的所有内容，让我们最后谈谈你真正关心的话题：`var`，`let`和`const`之间的区别是什么？

var 与 let 与 const
-----------------

首先，我们比较一下`var`和`let`。 `var`和`let`的主要区别在于，`let`作用域是块级的，而不是函数级别的。这意味着使用`let`关键字创建的变量在创建它的“块”内以及任何嵌套块中都可用。当我说“块”时，我指的是在`for`循环或`if`语句中用花括号`{}`包围的任何东西。

让我们最后一次回顾我们的`discountPrices`函数。

    function discountPrices (prices, discount) {
      var discounted = []
      for (var i = 0; i < prices.length; i++) {
        var discountedPrice = prices[i] * (1 - discount)
        var finalPrice = Math.round(discountedPrice * 100) / 100
        discounted.push(finalPrice)
      }
      console.log(i) // 3
      console.log(discountedPrice) // 150
      console.log(finalPrice) // 150
      return discounted
    }
    复制代码

记住，我们能够在`for`循环之外打印`i`，`discountedPrice`和`finalPrice`，因为它们是用`var`声明的，而`var`是作用域是在函数内。但是现在，如果我们将`var`声明更改为使用`let`，并尝试运行，会发生什么？

    function discountPrices (prices, discount) {
      let discounted = []
      for (let i = 0; i < prices.length; i++) {
        let discountedPrice = prices[i] * (1 - discount)
        let finalPrice = Math.round(discountedPrice * 100) / 100
        discounted.push(finalPrice)
      }
      console.log(i) // 3
      console.log(discountedPrice) // 150
      console.log(finalPrice) // 150
      return discounted
    }
    discountPrices([100, 200, 300], .5) // ❌ ReferenceError: i is not defined
    
    复制代码

:no\_good: 我们得到`ReferenceError：i is not defined`。这告诉我们的是，使用`let`声明的变量是作用于块级作用域的，而不是函数作用域。因此，尝试访问我们声明的“块”之外的`i`（或`discountedPrice`或`finalPrice`）会给我们一个引用错误，就像我们刚刚看到的那样。

    var VS let
    
    var: 作用域是函数范围的
    
    let: 作用域是块级范围的
    复制代码

下一个区别与变量提升有关。之前我们说过，变量提升的定义是“JavaScript解释器会在所谓的'创建'阶段将变量赋值为`undefined`这个默认值。”我们甚至在变量声明之前通过打印这个变量看到了这一点（你得到了`undefined`）。

    function discountPrices (prices, discount) {
      console.log(discounted) // undefined
      var discounted = []
      for (var i = 0; i < prices.length; i++) {
        var discountedPrice = prices[i] * (1 - discount)
        var finalPrice = Math.round(discountedPrice * 100) / 100
        discounted.push(finalPrice)
      }
      console.log(i) // 3
      console.log(discountedPrice) // 150
      console.log(finalPrice) // 150
      return discounted
    }
    
    复制代码

我想不出任何你会想要在声明变量之前访问它的用例。看起来抛出一个引用错误比返回`undefined`更好。

实际上，这就是`let`所做的。如果你试图在被声明之前去访问一个用`let`声明的变量，你会得到一个引用错误，而不是`undefined`。（比如使用var声明的那些变量）

    function discountPrices (prices, discount) {
      console.log(discounted) // ❌ ReferenceError
      let discounted = []
      for (let i = 0; i < prices.length; i++) {
        let discountedPrice = prices[i] * (1 - discount)
        let finalPrice = Math.round(discountedPrice * 100) / 100
        discounted.push(finalPrice)
      }
      console.log(i) // 3
      console.log(discountedPrice) // 150
      console.log(finalPrice) // 150
      return discounted
    }
    复制代码

    var 与 let
    
    var:
      函数范围的
      在变量声明之前使用时得到undefined
      
    let:
      作用范围是块级的
      在变量声明之前使用时报引用错误
     
    复制代码

let与const
---------

既然你理解了`var`和`let`之间的区别，那么`const`呢？事实证明，`const`与`let`几乎完全相同。但是，唯一的区别是，一旦使用`const`为变量赋值，就无法将其重新赋值给新值。

    let name = 'Tyler'
    const handle = 'tylermcginnis'
    name = 'Tyler McGinnis' // ✅
    handle = '@tylermcginnis' // ❌ TypeError: Assignment to constant variable.
    复制代码

上面的内容是用`let`声明的变量可以重新赋值，但用`const`声明的变量不能。

很酷，所以只要你想让一个变量是不可变的，你可以用const声明它。嗯，也不完全是这样。因为用`const`声明变量并不意味着它是不可变的。它意味着不能重新赋值。这是一个很好的例子。

    const person = {
      name: 'Kim Kardashian'
    }
    person.name = 'Kim Kardashian West' // ✅
    person = {} // ❌ Assignment to constant variable.
    复制代码

请注意，更改对象上的属性并不是重新赋值，因此即使使用`const`声明对象，也不意味着你不能改变其任何属性。它只表示您无法将其重新分配给新值。

现在我们还没有回答的最重要的问题是：你应该使用`var`，`let`还是`const`？ 最流行的观点和我赞同的观点是，除非你知道变量会发生变化，否则你应该总是使用`const`。 这样做的原因是使用`const`，你向未来的自己以及任何其他未来的开发人员发出信号，这些开发人员必须阅读你的代码，这个变量不应该改变。如果它需要更改（比如在`for`循环中），你应该使用`let`。

因此，在变化的变量和不变的变量之间，没有多少剩余。这意味着你不应该再使用`var`。

现在不受欢迎的观点，虽然它仍然有一些有效性，是你永远不应该使用`const`，因为即使你试图表明变量是不可变的，正如我们上面所看到的那样，情况并非完全如此。赞成此意见的开发人员总是使用`let`，除非他们的变量实际上是常量，如`_LOCATION_ = ...`.

所以回顾一下，`var`是作用于函数范围的，如果你尝试在实际声明之前使用一个用`var`声明的变量，你就会得到`undefined`。`const`和`let`是作用于块级范围的，如果你尝试在声明之前使用`let`或`const`声明的变量，你会得到一个引用错误。最后，`let`和`const`之间的区别在于，一旦你为`const`赋值，你就不能重新为它赋值，但是你可以使用`let`来做到重新赋值。

    var 与 let 与 const
    
    var: 
      函数范围的
      在变量声明之前使用时会得到undefined
      
    let: 
      作用范围是块级的
      在变量声明之前使用时会报引用错误
      
    const:
      作用范围是块级的
      在变量声明之前使用时会报引用错误
      不能重新赋值
    复制代码

这篇文章最初发布于[tylermcginnis.com](https://link.juejin.im?target=https%3A%2F%2Ftylermcginnis.com%2Fvar-let-const%2F)，是其 [Modern JavaScript](https://link.juejin.im?target=https%3A%2F%2Ftylermcginnis.com%2Fcourses%2Fmodern-javascript%2F)课程的一部分。