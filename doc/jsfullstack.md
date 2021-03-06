自从一年前发布了[Vuejs小书](http://www.ituring.com.cn/book/1956)的电子书，也有些日子没有碰过它们了，现在因为项目的缘故，需要使用JavaScript全栈开发。所以，我得把这个全栈环境搭建起来。

说起来搭建JS全栈开发环境，设计到的东西真的不少。

大的选择是这样的：
1. 前端采用Vuejs
2. 后端采用Nodejs
3. 存储使用Mongodb。

大的定了，小的也就跟着来，前端配套的话需要：

1. vue-router，前端路由管理
2. vuex,前端数据管理，专业一点的说法，就是状态管理，这些数据，可能是属性，数组，对象等等，可以跨组件访问，而不像是data函数那样提供的数据只能被本组件访问，可以想到，稍微大一点的前端工程都必须前端状态管理的。
2. axios，前端HTTP访问，以promise的形式，封装了类似fetch，AJAX的能力
3. buefy，前端微型框架，可以使用自定义标签使用自定义组件，并且CSS框架为Bulma
4. Bulma，尽管使用了微框架，只是让对CSS framework的了解降到最低，但是不是说就不需要了解了。还是得学习的。Bulma相对于老牌的Bootstrap，是不需要依赖于JS框架，也没有任何JS代码，因此可以和任何一框架很好的结合，比如这里的Vuejs。这就是我选择它的原因
5. webpack&babel。有了vue-cli，对webpack&babel的了解可以降到最低，但是也不能不学，稍微需要一些定制的配置，也是离不开它的。起码得知道如何启动一个开发服务器，已经发布build，还有把前端服务经过proxyChain跳转到后端服务去等等。
6. vue-cli，前端脚手架工具，它可以把以上的组件整合起来到一个工程内，这是我们的全栈开发的开始，因此这个工具也是需要学习的，尽管它并不难

一个最为基础的vue-cli工程脚手架的创建，现在得需要160M左右的空间占用。在我的电脑和网络情况下，需要2分半的时间才会完成，可见如今的前端开发已经变得越来越复杂了。

接下来看后端，一般习惯就是使用Nodejs+Express.js的搭配。这个没有多少说的，都是老东西了。为了访问Mongodb,也需要一套框架，基于Callback的，或者基于Promise+Await+Async的，也是需要选择的。

为了便于理解，我会用一个最小的案例完成整个开发过程，就是案例在现实中并不存在，但是也是有用的，就是你可以当它们是模板，直接拷贝代码，然后填充你的内容。天下代码一大抄嘛，没有什么不对的，毕竟这些写代码是最快的。这个案例的数据模型就是对一个{id，name}的对象进行CRD（创建删除列表）。

所以，文章会包括这些：

1. 使用Vuejs脚手架，快速搭建一个{id，name}的对象进行CRD的界面。这里会使用vuex管理状态，使用vue-router管理路由。完成部分验证代码，代码位于github：https://github.com/1000copy/vuetodo
2. 使用Mongodb存储和提供后端CRD服务。第一版完成： https://juejin.im/post/5b727a9451882561195114cd
3. 使用Nodejs搭建{id，name}的对象的后端CRD服务。计划参考之前我自己的2篇文章和一个SO关于如何在AJAX内创建PUT请求的问答
- https://juejin.im/post/59125c13128fe10058660800
- https://segmentfault.com/a/1190000007749465,
- https://stackoverflow.com/questions/9311579/put-ajax-request
- https://stackoverflow.com/questions/44103187/axios-put-request-to-server
4. 使用Axios访问后端CRD服务
5. 使用bulfy的美化组件的方法
5. 整合全栈服务

整个系列，是会采用我的一贯风格，就是不疾不徐，娓娓道来，学习完毕，你可以掌握我提到的全系列的知识，并把它用到你的项目中。

前端说就是一些脚本和标签，其实复杂度真的不低，这篇文章的图，可以窥视到前端复杂的一角了。[Modern Frontend Developer in 2018](https://medium.com/tech-tajawal/modern-frontend-developer-in-2018-4c2072fa2b9c)

