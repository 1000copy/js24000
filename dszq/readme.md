# 2019年05月17日

如何通过curl上传文件？这样就可以不必一遍遍的点击选择文件和submit按钮了

	curl  -F "userid=1" -F "filecomment=d" -F "image=@./reco.jpg" localhost:3000/

如何判断对象是一个流？


上传4本书

	curl  -F "title=vuejs" -F "cover=@./img/vuejs.jpg" localhost:3000/book?_method=PUT 
	curl  -F "title=http" -F "cover=@./img/http.jpg" localhost:3000/
	curl  -F "title=git" -F "cover=@./img/git.jpg" localhost:3000/
	curl  -F "title=swift" -F "cover=@./img/swift.png" localhost:3000/