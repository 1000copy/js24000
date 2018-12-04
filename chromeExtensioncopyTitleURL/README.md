# 编写第二个Chrome Extension+Copy URL+Title

我们在上网时，常常需要把刚兴趣的文章记录下来，方便以后继续细看。如果记录为Markdown格式的话，还可以方便的把文章链接加入到自己创作的文章内。

今天编写的小工具，就是一个Chrome Extension，当用户在当前页面上按快捷键Command+Shift+Y的时候，可以把当前页面的标题和URL组合保存到剪贴板，如下形式：

	[Title](URL)

在阅读此文之前，如果你没有看过[# 编写第一个Chrome Extension - 掘金](https://juejin.im/post/5c03ed44e51d456ac27b48c4)，建议首先阅读此文。

## 添加键盘快捷键的方法

Chrome提供了Command API，可以通过它来添加触发Chrome Extension中操作的快捷键。可以在manifect.json内声明如下:

	{
		"commands": {
			"Run": {
				"suggested_key": {
				  "default": "Ctrl+Shift+Y",
				  "mac": "Command+Shift+Y"
			},
			"description": "Toggle feature foo"
		},
	}

这意味着在用户按下指定按钮（Ctrl+Shift+Y），会触发一个叫做Run的操作。

在后台页面中，您可以通过onCommand.addListener将处理程序绑定到清单中定义的命令。 例如：

      chrome.commands.onCommand.addListener(function(command) {
        console.log('Command:', command);//Run
      });

## 拷贝到剪贴板的方法

可以在你的background.html内添加一个textarea，用于拷贝到剪贴板的中转：

	<textarea id="clipboard"></textarea>

需要执行操作的时候，会把内容写入此textarea，然后执行命令完成剪贴动作：

	document.execCommand("copy", false, null);

整合后的js代码如下：

	function copyTitleURL() {
	  chrome.tabs.getSelected(null, function(tab) {
	    copyToClipboard( "["+tab.title + "](" + tab.url +")");    
	  });
	}
	function copyToClipboard(str) {
	    var obj=document.getElementById("clipboard");
	    if( obj ) {
	        obj.value = str;
	        obj.select();
	        document.execCommand("copy", false, null);
	    }
	}
	chrome.commands.onCommand.addListener(function(command) {
		 if("Run" === command){
		 	copyTitleURL()
		 }
	});


## 总结

本文学习了Chrome Extension的键盘快捷键的声明和响应的方法，更多的Chrome Extension API请看官方文档[chrome.commands - Google Chrome](https://developer.chrome.com/apps/commands)
