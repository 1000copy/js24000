const expross = require('../lib/expross')
const app = expross()
const port = 3000
app.get('/', (req, res,next) => {
	next('route')
})
app.get('/', (req, res) => {
	res.send('2')
})
// console.log(app._router.stack[0].route)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))