console.log('begin')
try{
	throw new Error('BANG!')
}catch(e){
	console.log(e.message)
}
console.log('end')
a()
function a(){
	console.log('tick')
	setTimeout(a,1000)
}