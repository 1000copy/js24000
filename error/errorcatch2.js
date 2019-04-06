console.log('begin')
try{
	setTimeout(
		()=>{
			try{
				throw new Error('BANG!')
			}catch(e){
				// next(e)
			}
			throw new Error('BANG!')
		}
		,2000)
	
}catch(e){
	console.log('Sync:'+e.message)
}
console.log('end')
a()
function a(){
	console.log('tick')
	setTimeout(a,1000)
}
function next(e){
	console.log('Async'+e.message)
}