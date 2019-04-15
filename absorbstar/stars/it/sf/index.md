1.  [专栏](/blogs)
2.  [javascript进阶](/blog/moshanghan)
3.  文章详情

 [![陌上寒](https://avatar-static.segmentfault.com/428/566/4285666371-5b5886741e892_big64)](/u/moshagnhan) 

[**陌上寒**](/u/moshagnhan) ![](https://static.segmentfault.com/v-5c8b4d77/global/img/rp.svg)1.6k 发布于 [javascript进阶](/blog/moshanghan) 关注专栏 

1 天前发布

[JavaScript中AMD和ES6模块的导入导出对比](/a/1190000018636617)
==================================================

*   [javascript](/t/javascript/blogs)
*   [es6](/t/es6/blogs)
*   [amd模块加载](/t/amd%E6%A8%A1%E5%9D%97%E5%8A%A0%E8%BD%BD/blogs)
*   [commonjs](/t/commonjs/blogs)

162 次阅读  ·  读完需要 24 分钟

45

我们前端在开发过程中经常会遇到导入导出功能，  
在导入时，有时候是require，有时候是import  
在导出时，有时候是exports，module.exports，有时候是export，export default  
今天我们对这些内容进行简单的介绍

import，export，export default
----------------------------

import，export，export default属于ES6规范

### import

**import 是在编译过程中执行**  
也就是说是在代码执行前执行，  
比如说，import后面的路径写错了，在运行代码前就会抛错，  
在编写代码时，import不是一定要写在js的最前面  
**import命令具有提升效果，会提升到整个模块的头部，首先执行。（是在编译阶段执行的）**  
**import是静态执行的**  
因为import是静态执行的，不能使用表达式和变量，即在运行时才能拿到结果的语法结构  
比如，不能再if和else中使用import  
再比如，import后的from的路径，可以是相对路径，可以是绝对路径，但是不能是根据变量得来的路径

    //import 路径不可以为变量
    var url = './output'
      import {
        a,
        b
      } from url//这么写会报错
    //------------------
    //import 的引入与否不能和代码逻辑向关联
    let status= true
    if(status){
         import {
        a,
        b
      } from url//这么写会报错
    }

**import可以使用as进行重命名**  
import 的有很多种导入方式，

      import foo from './output'
      import {b as B} from './output'
      import * as OBj from './output'
      import {a} from './output'
      import {b as BB} from './output'
      import c, {d} from './output'

导入的方式和导出有些关联，我们在下面说导出的时候，对以上这些导入方式进行逐一介绍

### exoprt和export default

将exoprt和export default放在一起，因为它们关联性很大  
简单说：export是导出，export default是默认导出  
**一个模块可以有多个export，但是只能有一个export default，export default可以和多个export共存**  
export default 为默认导出，导出的是用{}包裹的一个对象，以键值对的形式存在  
导出的方式不同，导入的方式也就不同，  
**所以建议同一个项目下使用同一的导入导出方式，方便开发**  
export default解构以后就是export  
通过两个直观的demo看下export和export default的区别  
先看一段代码(export)  
output.js

    const a = 'valueA1'
    export {a}

input.js

    import {a} from './output.js'//此处的import {a}和export {a}，两个a是一一对应关系
    console.log(a)//=>valueA1

留意上面的代码其中export {a}导出的a，和import {a}导入的a是同一个a  
再看一段代码(export default)

    const a = 'valueA1'
    export default{a}

input.js

    import a from './output.js'//此处的a和export default{a}，不是一个a，
    console.log(a)//=>{ a: 'valueA1' }

看下export default的栗子中的input.js，我们稍作改动

    import abc from './output.js'//此处的a和export default{a}，不是一个a，
    console.log(abc)//=>{ a: 'valueA1' }

我们做了些改动，但是输出没有变化，import导入的是export default下的对象，叫什么名字都可以，因为只会存在一个export default

#### exoprt和export default混合使用

exoprt和export default在同一个模块中同时使用，是支持的，虽然我们一般不会这么做  
看一个栗子  
output.js

    const a = 'valueA1'
    const b = 'valueB1'
    const c = 'valueC1'
    const d = 'valueD1'
    function foo() {
      console.log(`foo执行，c的值是${c}`);
    }
    export {a}
    export {b}
    export default { b,d,foo}

input.js

    import obj, {a,b } from './output'
    console.log(a); //=>valueA1
    console.log(b); //=>valueB1
    console.log(obj); //=>{ b: 'valueB1', d: 'valueD1', foo: [Function: foo] }

### as 重命名

通过 exoprt和export default导出的在import引入时都支持通过as进行重命名  
看个栗子  
还是上面的那个output.js

    const a = 'valueA1'
    const b = 'valueB1'
    const c = 'valueC1'
    const d = 'valueD1'
    function foo() {
      console.log(`foo执行，c的值是${c}`);
    }
    export {a}
    export {b}
    export default { b,d,foo}

input.js

    import {a as A} from './output'
    import {* as A} from './output'//这是不支持的
    import * as obj from './output'
    console.log(A); //=>valueA1
    console.log(obj); //=>{ a: 'valueA1',default: { b: 'valueB1', d: 'valueD1', foo: [Function: foo] },b: 'valueB1' }

as后面的变量是你要在input.js中使用的  
重点看这一部分

    import {* as A} from './output'//这是不支持的
    import * as obj from './output'
    console.log(obj); //=>{ a: 'valueA1',default: { b: 'valueB1', d: 'valueD1', foo: [Function: foo] },b: 'valueB1' }

*   代表了所有，包括了export和export default导出的

我们之前说import{}和export{},是一一对应关系，所以在export导出的，在import{}不支持使用\*  
关于 import，export，export default先介绍到这里，我们继续

require，exports，module.exports（记得后面的s）
--------------------------------------

这是 AMD规范

### require

**require是运行时调用，所以require理论上可以运用在代码的任何地方**

#### require支持动态引入

例如，这样是支持的

    let flag = true
    if (flag) {
      const a = require('./output.js')
      console.log(a); //支持
    }

#### require路径支持变量

    let flag = true
    let url = './output.js'
    if (flag) {
      const a = require(url)
      console.log(a); //支持
    }

通过require引入，是一个赋值的过程

### exports 与 module.exports

根据AMD规范  
每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。  
每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。

    const exports = module.exports;

所以说  
以下两种写法等价

    exports.a ='valueA1'
    module.exports.a='valueA1'

前面说在每个模块提供一个exports变量，指向module.exports。  
所以不能直接给exports赋值，赋值会覆盖

    const exports = module.exports;

直接给exports赋值会切断exports和 module.exports的关联关系  
看一个栗子  
output.js

    const a = 'valueA1'
    const b = 'valueB1'
    const c = 'valueC1'
    module.exports = { c}
    exports.b = b//当直接给 module.exports时，exports会失效
    module.exports.a = a

input.js

      const obj = require('./output.js')
      console.log(obj); //=>{ c: 'valueC1', a: 'valueA1' }

继续看代码  
output.js

    //部分省略
    exports.b = b//这样可以生效
    module.exports.a = a

input.js

      const obj = require('./output.js')
      console.log(obj); //=>{ b: 'valueB1', a: 'valueA1' }

再看一段代码  
output.js

    //部分省略
    module.exports = { c}
    module.exports.a = a

input.js

      const obj = require('./output.js')
      console.log(obj); //=>{ c: 'valueC1', a: 'valueA1' }

**当直接给 module.exports时，exports会失效**

交叉使用
----

在ES6中export default 导出的是一个对象  
在AMD中exports和module.exports导出的也都是一个对象  
所以如果你手中的项目代码支持两种规范，那么事可以交叉使用的（当然不建议这么去做）  
**通过export导出的不一定是一个对象**

### demo1

output.js

    //部分省略
    module.exports = { c}
    module.exports.a = a

inputj.s

    import obj from './output'
    import {a} from './output'
    console.log(a);//=>valueA1
    console.log(obj);//=>{ c: 'valueC1', a: 'valueA1' }

### demo2

output.js

    const a = 'valueA1'
    const b = 'valueB1'
    const c = 'valueC1'
    function foo() {
      console.log(`foo执行，c的值是${c}`);
    }
    export {a}
    export default {b,c,foo}
    export {b}

input.js

      const a = require('./output.js')
      console.log(a); //=>{ a: 'valueA1',default: { b: 'valueB1', c: 'valueC1', foo: [Function: foo] }, b: 'valueB1' }

总结
--

*   require，exports，module.exports属于AMD规范，import，export，export default属于ES6规范
*   require支持动态导入，动态匹配路径，import对这两者都不支持
*   require是运行时调用，import是编译时调用
*   require是赋值过程，import是解构过程
*   对于export和export default 不同的使用方式，import就要采取不同的引用方式，主要区别在于是否存在{},export导出的，import导入需要{},导入和导出一一对应,export default默认导出的，import导入不需要{}
*   exports是module.exports一种简写形式，不能直接给exports赋值
*   当直接给module.exports赋值时，exports会失效

更多前端资源请关注微信公众号“前端陌上寒”

[原文链接](https://www.qdtalk.com/2019/03/24/require%EF%BC%8Cexports%EF%BC%8Cmodule-exports%E5%92%8Ces6%E4%B8%AD%E7%9A%84import%EF%BC%8Cexport%EF%BC%8Cexport-default/)

参考链接  
[关于import与require的区别](https://www.jianshu.com/p/fd39e16feb60)  
[JS 中的require 和 import 区别](https://www.cnblogs.com/liaojie970/p/7376682.html)  
[module.exports和exports和export和export default的区别，import和require的区别](https://www.jianshu.com/p/f6c5a646c00b)

我的博客即将同步至腾讯云+社区，邀请大家一同入驻：[https://cloud.tencent.com/dev...](https://cloud.tencent.com/developer/support-plan?invite_code=22gdc2qyb41wg)

*   [![](https://static.segmentfault.com/v-5c8b4d77/global/img/creativecommons-cc.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
*   [](javascript:void(0);)
    *   [举报](#911)

赞  |   45 收藏  |  28  
赞赏支持

如果觉得我的文章对你有用，请随意赞赏

OA\_show(3);

#### 你可能感兴趣的

OA\_show(4);

**评论**

[默认排序](javascript:;) [时间排序](javascript:;)

载入中...

[显示更多评论](javascript:;)

![](https://static.segmentfault.com/v-5c8b4d77/global/img/user-128.png)

发布评论