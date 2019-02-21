async function asyncAnswer(){
	// if 
	return
	// no this return ,await can get result 42 !error prone!!
	new Promise((resolve,reject)=>{
		setTimeout(function(){
			return resolve("42")
		},1000)
	})
	
}
(async ()=>{
	console.log("answer is ",await asyncAnswer())
})()