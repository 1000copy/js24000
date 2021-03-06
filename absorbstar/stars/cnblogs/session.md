[express 框架之session](https://www.cnblogs.com/chenchenluo/p/4197181.html)
------------------------------------------------------------------------

**一、什么是session？**

* * *

　　最近在学习node.js 的express框架，接触到了关于session方面的内容。翻阅了一些的博客，学到了不少东西，发现一篇博文讲的很好，概念内容摘抄如下：

Session是什么

Session一般译作会话，牛津词典对其的解释是进行某活动连续的一段时间。从不同的层面看待session，它有着类似但不全然相同的含义。比如，在web应用的用户看来，他打开浏览器访问一个电子商务网站，登录、并完成购物直到关闭浏览器，这是一个会话。而在web应用的开发者开来，用户登录时我需要创建一个数据结构以存储用户的登录信息，这个结构也叫做session。因此在谈论session的时候要注意上下文环境。而本文谈论的是一种基于HTTP协议的用以增强web应用能力的机制或者说一种方案，它不是单指某种特定的动态页面技术，而这种能力就是保持状态，也可以称作保持会话。

（https://developer.mozilla.org/en-US/docs/Web/HTTP/Session）

In client-server protocols, like HTTP, sessions consist of three phases:

    The client establishes a TCP connection (or the appropriate connection if the transport layer is not TCP).
    The client sends its request, and waits for the answer.
    The server processes the request, sending back its answer, providing a status code and appropriate data.

As of HTTP/1.1, the connection is no longer closed after completing the third phase, and the client is now granted a further request: this means the second and third phases can now be performed any number of times.


为什么需要session

谈及session一般是在web应用的背景之下，我们知道web应用是基于HTTP协议的，而HTTP协议恰恰是一种无状态协议。也就是说，用户从A页面跳转到B页面会重新发送一次HTTP请求，而服务端在返回响应的时候是无法获知该用户在请求B页面之前做了什么的。

对于HTTP的无状态性的原因，相关RFC里并没有解释，但联系到HTTP的历史以及应用场景，我们可以推测出一些理由： 
1. 设计HTTP最初的目的是为了提供一种发布和接收HTML页面的方法。那个时候没有动态页面技术，只有纯粹的静态HTML页面，因此根本不需要协议能保持状态； 
2. 用户在收到响应时，往往要花一些时间来阅读页面，因此如果保持客户端和服务端之间的连接，那么这个连接在大多数的时间里都将是空闲的，这是一种资源的无端浪费。所以HTTP原始的设计是默认短连接，即客户端和服务端完成一次请求和响应之后就断开TCP连接，服务器因此无法预知客户端的下一个动作，它甚至都不知道这个用户会不会再次访问，因此让HTTP协议来维护用户的访问状态也全然没有必要； 
3. 将一部分复杂性转嫁到以HTTP协议为基础的技术之上可以使得HTTP在协议这个层面上显得相对简单，而这种简单也赋予了HTTP更强的扩展能力。事实上，session技术从本质上来讲也是对HTTP协议的一种扩展。

总而言之，HTTP的无状态是由其历史使命而决定的。

但随着网络技术的蓬勃发展，人们再也不满足于死板乏味的静态HTML，他们希望web应用能动起来，于是客户端出现了脚本和DOM技术，HTML里增加了表单，而服务端出现了CGI等等动态技术。

而正是这种web动态化的需求，给HTTP协议提出了一个难题：一个无状态的协议怎样才能关联两次连续的请求呢？也就是说无状态的协议怎样才能满足有状态的需求呢？

此时有状态是必然趋势而协议的无状态性也是木已成舟，因此我们需要一些方案来解决这个矛盾，来保持HTTP连接状态，于是出现了cookie和session。

对于此部分内容，读者或许会有一些疑问，笔者在此先谈两点： 
1.   无状态性和长连接。可能有人会问，现在被广泛使用的HTTP1.1默认使用长连接，它还是无状态的吗？
连接方式和有无状态是完全没有关系的两回事。因为状态从某种意义上来讲就是数据，而连接方式只是决定了数据的传输方式，而不能决定数据。长连接是随着计算机性能的提高和网络环境的改善所采取的一种合理的性能上的优化，一般情况下，web服务器会对长连接的数量进行限制，以免资源的过度消耗。 
2.   无状态性和session。Session是有状态的，而HTTP协议是无状态的，二者是否矛盾呢？Session和HTTP协议属于不同层面的事物，后者属于ISO七层模型的最高层应用层，前者不属于后者，前者是具体的动态页面技术来实现的，但同时它又是基于后者的。在下文中笔者会分析Servlet/Jsp技术中的session机制，这会使你对此有更深刻的理解。

## Cookie和Session

上面提到解决HTTP协议自身无状态的方式有cookie和session。二者都能记录状态，前者是将状态数据保存在客户端，后者则保存在服务端。首先看一下cookie的工作原理，这需要有基本的HTTP协议基础。

Cookie是在RFC2109（已废弃，被RFC2965取代）里初次被描述的，每个客户端最多保持三百个cookie，每个域名下最多20个Cookie（实际上一般浏览器现在都比这个多，如Firefox是50个），而每个cookie的大小为最多4K，不过不同的浏览器都有各自的实现。对于cookie的使用，最重要的就是要控制cookie的大小，不要放入无用的信息，也不要放入过多信息。

无论使用何种服务端技术，只要发送回的HTTP响应中包含如下形式的头，则视为服务器要求设置一个cookie：

    Set-cookie:name=name;expires=date;path=path;domain=domain

支持cookie的浏览器都会对此作出反应，即创建cookie文件并保存（也可能是内存cookie），用户以后在每次发出请求时，浏览器都要判断当前所有的cookie中有没有没失效（根据expires属性判断）并且匹配了path属性的cookie信息，如果有的话，会以下面的形式加入到请求头中发回服务端：

    Cookie: name="zj"; Path="/linkage" 

处理，当然也可以选择直接忽略。

    这里牵扯到一个规范（或协议）与实现的问题，简单来讲就是规范规定了做成什么样子，那么实现就必须依据规范来做，这样才能互相兼容，但是各个实现所使用的方式却不受约束，也可以在实现了规范的基础上超出规范，这就称之为扩展了。无论哪种浏览器，只要想提供cookie的功能，那就必须依照相应的RFC规范来实现。所以这里服务器只管发Set-cookie头域，这也是HTTP协议无状态性的一种体现。

需要注意的是，出于安全性的考虑，cookie可以被浏览器禁用。


笔者没有找到相关的RFC，因为session本就不是协议层面的事物。它的基本原理是服务端为每一个session维护一份会话信息数据，而客户端和服务端依靠一个全局唯一的标识来访问会话信息数据。用户访问web应用时，服务端程序决定何时创建session，创建session可以概括为三个步骤： 

1. 生成全局唯一标识符（sessionid）； 
2. 开辟数据存储空间。一般会在内存中创建相应的数据结构，但这种情况下，系统一旦掉电，所有的会话数据就会丢失，如果是电子商务网站，这种事故会造成严重的后果。不过也可以写到文件里甚至存储在数据库中，这样虽然会增加I/O开销，但session可以实现某种程度的持久化，而且更有利于session的共享；
3. 将session的全局唯一标示符发送给客户端。

问题的关键就在服务端如何发送这个session的唯一标识上。联系到HTTP协议，数据无非可以放到请求行、头域或Body里，基于此，一般来说会有两种常用的方式：cookie和URL重写。 

1.  Cookie。读者应该想到了，对，服务端只要设置Set-cookie头就可以将session的标识符传送到客户端，而客户端此后的每一次请求都会带上这个标识符，由于cookie可以设置失效时间，所以一般包含session信息的cookie会设置失效时间为0，即浏览器进程有效时间。至于浏览器怎么处理这个0，每个浏览器都有自己的方案，但差别都不会太大（一般体现在新建浏览器窗口的时候）； 
2. URL重写。所谓URL重写，顾名思义就是重写URL。试想，在返回用户请求的页面之前，将页面内所有的URL后面全部以get参数的方式加上session标识符（或者加在path info部分等等），这样用户在收到响应之后，无论点击哪个链接或提交表单，都会在再带上session的标识符，从而就实现了会话的保持。读者可能会觉得这种做法比较麻烦，确实是这样，但是，如果客户端禁用了cookie的话，URL重写将会是首选。
    
到这里，读者应该明白我前面为什么说session也算作是对HTTP的一种扩展了吧。如下两幅图是笔者在Firefox的Firebug插件中的截图，可以看到，当我第一次访问index.jsp时，响应头里包含了Set-cookie头，而请求头中没有。当我再次刷新页面时，图二显示在响应中不在有Set-cookie头，而在请求头中却有了Cookie头。注意一下Cookie的名字：jsessionid，顾名思义，就是session的标识符，另外可以看到两幅图中的jsessionid的值是相同的，原因笔者就不再多解释了。另外读者可能在一些网站上见过在最后附加了一段形如jsessionid=xxx的URL，这就是采用URL重写来实现的session。

Cookie和session由于实现手段不同，因此也各有优缺点和各自的应用场景： 

1.应用场景
。Cookie的典型应用场景是Remember Me服务，即用户的账户信息通过cookie的形式保存在客户端，当用户再次请求匹配的URL的时候，账户信息会被传送到服务端，交由相应的程序完成自动登录等功能。当然也可以保存一些客户端信息，比如页面布局以及搜索历史等等。Session的典型应用场景是用户登录某网站之后，将其登录信息放入session，在以后的每次请求中查询相应的登录信息以确保该用户合法。当然还是有购物车等等经典场景； 
2.安全性。cookie将信息保存在客户端，如果不进行加密的话，无疑会暴露一些隐私信息，安全性很差，一般情况下敏感信息是经过加密后存储在cookie中，但很容易就会被窃取。而session只会将信息存储在服务端，如果存储在文件或数据库中，也有被窃取的可能，只是可能性比cookie小了太多。Session安全性方面比较突出的是存在会话劫持的问题，这是一种安全威胁。总体来讲，session的安全性要高于cookie； 
3.性能。Cookie存储在客户端，消耗的是客户端的I/O和内存，而session存储在服务端，消耗的是服务端的资源。但是session对服务器造成的压力比较集中，而cookie很好地分散了资源消耗，就这点来说，cookie是要优于session的；
4.时效性。Cookie可以通过设置有效期使其较长时间内存在于客户端，而session一般只有比较短的有效期（用户主动销毁session或关闭浏览器后引发超时）； 
5.其他。Cookie的处理在开发中没有session方便。而且cookie在客户端是有数量和大小的限制的，而session的大小却只以硬件为限制，能存储的数据无疑大了太多。

后文中我会主要针对express的session专门讲解。主要参考的博客网址如下，并对博主的无私奉献表示万分感谢。



二、express框架之session 内存存储

express-session 是基于express框专门用于处理session的中间件。这里不谈express-session怎么安装，只给出相应的实例代码。

Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work. This module now directly reads and writes cookies on req/res. Using cookie-parser may result in issues if the secret is not the same between this module and cookie-parser.


 1 var express = require('express');
 2 var session = require('express-session');
 3 var cookieParser = require('cookie-parser');
 4 
 5 var app = express(); 6 
 7 app.use(cookieParser());
 8 app.use(session({
 9     secret: '12345', 10     name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid 11     cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期 12     resave: false, 13     saveUninitialized: true, 14 })); 15 
16 
17 app.get('/awesome', function(req, res){ 18     
19     if(req.session.lastPage) { 20         console.log('Last page was: ' + req.session.lastPage + "."); 21 } 22     req.session.lastPage = '/awesome'; //每一次访问时，session对象的lastPage会自动的保存或更新内存中的session中去。 23     res.send("You're Awesome. And the session expired time is: " + req.session.cookie.maxAge); 24 }); 25 
26 app.get('/radical', function(req, res){ 27     if (req.session.lastPage) { 28         console.log('Last page was: ' + req.session.lastPage + "."); 29 } 30     req.session.lastPage = '/radical'; 31     res.send('What a radical visit! And the session expired time is: ' + req.session.cookie.maxAge); 32 }); 33 
34 app.get('/tubular', function(req, res){ 35     if (req.session.lastPage){ 36         console.log("Last page was: " + req.session.lastPage + "."); 37 } 38 
39     req.session.lastPage = '/tubular'; 40     res.send('Are you a suffer? And the session expired time is: ' + req.session.cookie.maxAge); 41 }); 42 
43 
44 app.listen(5000);

2.1 express-session中间件的使用：

　　只需要用express app的use方法将session挂载在‘/’路径即可，这样所有的路由都可以访问到session。可以给要挂载的session传递不同的option参数，来控制session的不同特性。具体可以参见官网：https://github.com/expressjs/session/blob/master/README.md。

2.2 session内容的存储和更改：

To store or access session data, simply use the request property req.session, which is (generally) serialized as JSON by the store, so nested objects are typically fine.

　　一旦我们将express-session中间件用use挂载后，我们可以很方便的通过req参数来存储和访问session对象的数据。req.session是一个JSON格式的JavaScript对象，我们可以在使用的过程中随意的增加成员，这些成员会自动的被保存到option参数指定的地方，默认即为内存中去。

2.3 session的生命周期

　　session与发送到客户端浏览器的生命周期是一致的。而我们在挂载session的时候，通过option选项的cookie.maxAge成员，我们可以设置session的过期时间，以ms为单位（但是，如果session存储在mongodb中的话，任何低于60s(60000ms)的设置是没有用的，下文会有详细的解释）。如果maxAge不设置，默认为null，这样的expire的时间就是浏览器的关闭时间，即每次关闭浏览器的时候，session都会失效。

**三、express框架之session 数据库存储**

* * *

有时候，我们需要session的声明周期要长一点，比如好多网站有个免密码两周内自动登录的功能。基于这个需求，session必须寻找内存之外的存储载体，数据库能提供完美的解决方案。这里，我选用的是mongodb数据库，作为一个NoSQL数据库，它的基础数据对象时database-collection-document 对象模型非常直观并易于理解，针对node.js 也提供了丰富的驱动和API。express框架提供了针对mongodb的中间件：connect-mongo，我们只需在挂载session的时候在options中传入mongodb的参数即可，程序运行的时候, express app 会自动的替我们管理session的存储，更新和删除。具体可以参考：

https://github.com/kcbanner/connect-mongo

　　测试代码如下：

 1 var express = require('express');
 2 var session = require('express-session');
 3 var cookieParser = require('cookie-parser');
 4 var MongoStore = require('connect-mongo')(session);
 5 var app = express(); 6 
 7 app.use(cookieParser());
 8 app.use(session({
 9     secret: '12345', 10     name: 'testapp', 11     cookie: {maxAge: 80000 }, 12     resave: false, 13     saveUninitialized: true, 14     store: new MongoStore({   //创建新的mongodb数据库 15         host: 'localhost',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机 16         port: 27017,          //数据库的端口号 17         db: 'test-app'        //数据库的名称。
18 }) 19 })); 20 
21 
22 app.get('/awesome', function(req, res){ 23     
24     if(req.session.lastPage) { 25         console.log('Last page was: ' + req.session.lastPage + "."); 26 } 27     req.session.lastPage = '/awesome'; 28     res.send("You're Awesome. And the session expired time is: " + req.session.cookie.maxAge); 29 }); 30 
31 app.get('/radical', function(req, res){ 32     if (req.session.lastPage) { 33         console.log('Last page was: ' + req.session.lastPage + "."); 34 } 35     req.session.lastPage = '/radical'; 36     res.send('What a radical visit! And the session expired time is: ' + req.session.cookie.maxAge); 37 }); 38 
39 app.get('/tubular', function(req, res){ 40     if (req.session.lastPage){ 41         console.log("Last page was: " + req.session.lastPage + "."); 42 } 43 
44     req.session.lastPage = '/tubular'; 45     res.send('Are you a suffer? And the session expired time is: ' + req.session.cookie.maxAge); 46 }); 47 
48 
49 app.listen(5000);

　　跟session的内存存储一样，只需增加红色部分的store选项即可，app会自动替我们把session存入到mongodb数据，而非内存中。

　　3.1  session的生命周期：

　　由于session是存在服务器端数据库的，所以的它的生命周期可以持久化，而不仅限于浏览器关闭的时间。具体是由cookie.maxAge 决定：如果maxAge设定是1个小时，那么从这个因浏览器访问服务器导致session创建开始后，session会一直保存在服务器端，即使浏览器关闭，session也会继续存在。如果此时服务器宕机，只要开机后数据库没发生不可逆转的破坏，maxAge时间没过期，那么session是可以继续保持的。

　　当maxAge时间过期后，session会自动的数据库中移除，对应的还有浏览器的cookie。不过，由于connect-mongo的特殊机制（每1分钟检查一次过期session），session的移除可能在时间上会有一定的滞后。

**connect-mongo uses MongoDB'****s TTL collection feature (2.2+) to have mongod automatically remove expired sessions. (mongod runs this check every minute.)**

Note: By connect/express's default, session cookies are set to expire when the user closes their browser (maxAge: null). In accordance with standard industry practices, connect-mongo will set these sessions to expire two weeks from their last 'set'. You can override this behavior by manually setting the maxAge for your cookies -- just keep in mind that any value less than 60 seconds is pointless, as mongod will only delete expired documents in a TTL collection every minute.

　　当然，由于cookie是由浏览器厂商实现的，cookie不具有跨浏览器的特性，例如，我用firefox浏览器在京东上购物时，勾选了2周内免密码输入，但是当我第一次用IE登陆京东时，同样要重新输入密码。所以，这对服务器的同一个操作，不同的浏览器发起的请求，会产生不同的session-cookie。

（大话session） http://www.cnblogs.com/shoru/archive/2010/02/19/1669395.html