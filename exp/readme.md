# app 

设想一个类似notes的应用

可以有这些类概念

Domain Object

1. Form =  *Field
2. Field (String[length],Int,List,Float)

UI

3. View   (Field || Formula)
4. Action (C R U D || Script)
5. Navigator(to view | Script)

Storagy

1. Mysql
2. Sqlite
3. Mongodb

用于快速构建应用中的CRUD部分。

User , Dept , Company ,Role

Form

  User = Name String[10],Sex List ,Age Int,Salary Float,Remark String(100),Dept (1 From Dept),Company(1 from $env[company])
  Dept = Name String[20],Remark String(100),Company(1 from $env[company])
  Role = Name String[20],Remark String(100),User(* From User,Save to RoleUsers)
  Company = Name String[20],Remark String(100)
  RoleUsers = Role , User

Relation:

  Company 1 = * Dept
  Dept    1 = * User
  User    * = * Role

FormUser
  {name : 'user',
   fields:[
    {name : 'name',
     type : {name:'string',len:10}},
    {name : 'sex',
     type : {name:'list',src:{female:'women',male:'man'}}},
    {name : 'salary',
     type : {name:'float'}, 
    {name : 'remark',
     type : {name:'string',len:100}, 
    {name : 'dept',
     type : {name:'select',from:'dept',multi:1}, 
   ]}
FormDept
  {name : 'dept',
   fields:[
    {name : 'name',
     type : {name:'string',len:10}},
    {name : 'remark',
     type : {name:'string',len:100}, 
    {name : 'company',
     type : {name:'select',from:'company',multi:1}, 
   ]}
FormCompany
  {name : 'company',
   fields:[
    {name : 'name',
     type : {name:'string',len:10}},
    {name : 'remark',
     type : {name:'string',len:100}, 
   ]}
FormRole
  {name : 'company',
   fields:[
    {name : 'name',
     type : {name:'string',len:10}},
    {name : 'remark',
     type : {name:'string',len:100}, 
    {name : 'user',
     type : {name:'select',from:'user',multi:'N'}, 
   ]}

#CRUD api

   add(formName='user',data={name:'',sex:'',dept:''})
   update(formName='user',data={name:'',sex:'',dept:''})
   remove(formName='user',data=user obj)

# exp

1.1 use
   app.use(f)
   app.use([f1,f2])
   app.use(f1,f2)
1.2 get,post...

   app.get(path,f)
   app.get(path,f1,f2)
   app.get(path,[f1,f2])

1.3 url paramters parse 2018-05-04

  when given url /use/:id and /use/1 ,got id = 1 
  when given url /use/:fn and /use/main.gspx ,get fn = main.gspx
  when given url /use/:fn.gspx ,then filter func is gspxHandler

1.4 add static file serve 2018-05-07
1.5 make a middle ware as extension filter ,when :2018-05-07
    
    static.addFilter()

    class MagicFilter extends Filter {
      constructor(){
        super('magicext')
      }
        pipe(req, res,ext) {
          if (ext == this.ext){
          res.setHeader('Content-type','text/plain' );
          res.end('magicext!')
          // true will stop default handler 
          return true
        }else
          return false  
      }
    }
  
  all url whose ext is gspx will route to this handler
