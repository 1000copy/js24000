# 编写第一个Chrome Extension

在编码过程中，我常常需要创建一些占位图片，以便验证UI布局和效果。因此我想要创建一个Chrome Extension，当用户打开新的页面时，使用一个生成PlaceHolder的链接群替代默认的新页面。

## 最少结构

一个Chrome Extension最低需求的文件是manifest.json、必要的html 
可选的图标、CSS、JS等。这里的文件清单如下：

	manifect.json 元文件
	newtab.html   HTML文件
	120.png 	  图标文件

## 元文件manifect.json

元文件用于描述一个Chrome Extension的信息，是创建一个Chrome Extension所必须的。

此文件是一个Json文件，在我们这次需求中文件如下：

	{
	"manifest_version": 2,
	"name": "PlaceHolderImage",
	"description": "Make PlaceHolder Image",
	"version": "1",
	"author": "Reco",
	"browser_action": {
	   "default_icon": "120.png",
	   "default_title": "PlaceHolder Factory"
	 },
	"chrome_url_overrides" : {
	  "newtab": "newtab.html"
	},
	"permissions": ["activeTab"]
	}

接下来就非常关键的几个字段做出说明：

1. permissions字段指明应用需要的权限。因为我们需要覆盖默认的Chrome新建页面的内容，因此需要使用permissions字段，指明需要控制activeTab权限
2. chrome_url_overrides字段，指明覆盖Chrome新建页面的页面，这里是newtab.html文件。此文件就是一个我们熟悉的任何的HTML文件，其中可以使用任何合法的HTML标签，以及包含和引入CSS、JS文件
3. browser_action字段也是非常关键的，用来指明Chrome Extension在Chrome工具条的图标和抬头。加载任何一个扩展后，会在Chrome浏览器工具条上显示此指定的图标，当鼠标移动到此图标时会显示此指定抬头
4. 其他字段，这样用于显示和备注目的，比如作者author，扩展名字name等。它们不是关键字段，但是也需要学习了解

## 新页面文件和图标

在manifest文件内指定了newtab.html，会在用户创建新页面的时候显示，因此是一个关键的文件。我们需要再次列出常见的需要生成PlaceHolder图片的链接，内容如下：

	<h1>Image PlaceHolder!</h1>
	<ul>
		<li><a href="https://via.placeholder.com/640X400">640X400</li>
		<li><a href="https://via.placeholder.com/640">640X640</li>	
		<li><a href="https://via.placeholder.com/32">32X32</li>	
	</ul>

因为只是测试，可以生成一个占位图来做图标，我们通过链接`https://via.placeholder.com/120`创建一个突破，并保存到
	
	120.png

文件内。

现在文件准备完毕，可以去看效果了。

## 测试效果

打开[扩展加载链接](chrome://extensions/)，进入Chrome扩展管理页面，并打开`开发者模式`,点击"加载已解压的扩展程序"按钮，在对话框内选择你的开发目录，即可加载扩展，你可以看到在Chrome工具栏内的此扩展的图标，可以把鼠标移动到该图标上查看扩展的标题，点击“新标签页“菜单，可以看到你的newtab.html被显示出来。

如果这样验证都是如期望的话，就表明你的第一个扩展已经开发成功。

## 正式发布

可以在[Chrome Dashboard](https://chrome.google.com/webstore/developer/dashboard)内发布扩展，只要点击进入后，按照操作指示即可。

## 进一步

在此扩展的开发过程中，我们了解到了类似

1. permissions
2. chrome_url_overrides
3. browser_action

等特定于Chrome Extension的特定开发技术概念，可以在Chrome开发者指导内找到[更多API信息](https://developer.chrome.com/extensions/devguide)。

我个人想要做一个按键后拷贝当前页面的Title和URL的扩展，可以从此扩展[Copy URL + Title](https://github.com/ishu3101/copy-url-and-title)内学习到更多的开发知识。
