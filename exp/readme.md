# expross


## todo 

* url paramters parse 

  when given url /use/:id and /use/1 ,got id = 1 
  when given url /use/:fn and /use/main.gspx ,get fn = main.gspx
  when given url /use/:fn.gspx ,then filter func is gspxHandler

  make a middle ware as extension filter ,when :
  	
  	app.registExt ('gspx',handler)	
  
  all url whose ext is gspx will route to this handler

##  done 

1.1 use
   app.use(f)
   app.use([f1,f2])
   app.use(f1,f2)
1.2 get,post...

   app.get(path,f)
   app.get(path,f1,f2)
   app.get(path,[f1,f2])

