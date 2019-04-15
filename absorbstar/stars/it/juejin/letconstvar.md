
\[译\] ES6新特性：let及const
===================================


ES6引入了新的创建变量的新方法，let和const，用以替代var。 了解两个新特性的价值之前，我们得首先弄明白var存在的问题。

变量声明与初始化
--------

变量声明引入了新的标识符：

    var v1
    
上面我们创建了一个名为v1的新变量。如果变量没有初始化，那么它的值为undefined:

    var v1
    console.log(v1)
    // undefined

可以声明变量时初始化:

    var v1 = 'inited'
    console.log(v1) // inited

或者随时通过赋值初始化：
    
    var v1 
    v1 = 'inited'
    console.log(v1) // inited    
    

作用域
---

作用域定义了可以访问变量的区域。如果变量语句出现在函数声明中，那么这个变量在该函数中作为函数局部作用域被定义。

比如变量v1定义在getValue函数内，就只能在此函数内访问：

    function getValue () {
      var v1 = 1
      return v1
    }
    getValue()
    console.log(v1) // Reference Error
    
但是如果在声明之前使用它，并不会报Reference Error:

    function getValue () {
      console.log(v1) // undefined
      var v1 = 1
      return v1
    }
    getValue()

这有点令人困惑，是因为JS有一个**变量提升**的特性--函数内定义的变量，会自动提升此定义到函数体的入口。因此以上代码，其实等同于：


    function getValue () {
      var v1 
      console.log(v1) // undefined
      v1 = 1
      return v1
    }
    getValue()


老实说，这个变量提升特性并不讨好，在复杂代码调试的时候，此特性甚至令人意外。引入let，其实是为了解决此问题，就是说let定义的变量不会被自动提升。我们会在随后的内容继续讨论。


再者是一个块级作用域的问题。我们来看看一个打印数组的案例来说明此问题：

    
    (function(){
      for (var i = 0; i < 3; i++) {
        console.log(i)
      }
      console.log(i) // 3
    })()
    
变量局部化，是软件编码中非常有价值的一个特性。然而，var定义的i变量，并不是局部于for循环控制块内的。实际上最后一行是可以访问i变量的。

ES6的let，就是针对var的两个问题：

1. 变量不要提升（Hoist）
2. 支持块级作用域

var 与 let 
-----------------

`let`作用域是块级的，而不是函数级别的。当我说“块”时，我指的是在`for`循环或`if`语句中用花括号`{}`包围的任何东西。

    (function(){
      for (let i = 0; i < 3; i++) {
        console.log(i)
      }
      console.log(i) // ReferenceError
    })()    

通过let定义的变量，就会局部在代码块内，这里的代码块就是for的花括号内，在此代码块外的代码是无法访问的。
    
下一个区别与变量提升有关：

    function getValue () {
      console.log(v1) // ReferenceError
      let v1 = 1
      return v1
    }
    getValue()
    

在变量声明前引用它的话，它会报错ReferenceError，而不是undefined。显然前者更加符合实情，更加不令人感到意外。

let与const
---------

`const`与`let`在作用域和变量提升方面的特性是一样的。唯一的区别是，`const`只能赋值一次，所以，const定义的是一个常量。

    const v1 = 'value'
    v1 = 'value2' // TypeError: Assignment to constant variable.
    

常量意味着不能重新赋值，但是如果常量是一个对象的话，其内容是可以修改的：

    const person = {
      name: 'reco'
    }
    person.name = 'reco1' 
    console.log(person.name) //reco1
    
所以，let就是拿来替代var的，尽可能使用let，因为它可以做到变量的块级局部化，还可以避免因为变量提升带来的怪异问题。

> *   原文链接：[var vs let vs const in javascript](https://link.juejin.im?target=https%3A%2F%2Fmedium.freecodecamp.org%2Fvar-vs-let-vs-const-in-javascript-2954ae48c037)
> *   原文作者：Tyler McGinnis
> *   译者：[Alisa](https://link.juejin.im?target=http%3A%2F%2Fwww.alisali.cn)
