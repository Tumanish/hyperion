const app = require('./application')
const port = process.env.PORT || 3000

app.listen(port, () =>{
	console.log(`Start on port ${port}`)
})
