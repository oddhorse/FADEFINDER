// libs
import Express from 'express'
import Multer from 'multer'

// set up applications
const app = Express() // express app normal stuff
const uploadProcessor = Multer({ dest: 'public/uploads/' }) // uses multer lib to upload files

// middlewareeeee
app.use(Express.static('public'))
app.use(Express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// global array to store all posts
let posts = []

let profiles = [
	{
		name: "Danny",
		height: {
			ft: 5,
			in: 10
		},
		weight: 162, // lbs
		age: 27,
		image: "example/1.jpeg",
	},
	{
		name: "Danny",
		height: {
			ft: 5,
			in: 10
		},
		weight: 162, // lbs
		age: 27,
		image: "example/2.jpeg",
	},
	{
		name: "Danny",
		height: {
			ft: 5,
			in: 10
		},
		weight: 162, // lbs
		age: 27,
		image: "example/3.jpeg",
	}
]

// routes
app.get('/', (req, res) => {
	res.render('index.ejs', { allPosts: posts })
})
app.get('/match', (req, res) => {
	res.render('match.ejs', { profiles: profiles })
})

// second param on post handler to process file that's uploaded
app.post('/makePost', uploadProcessor.single('myImage'), (req, res) => {
	let individualPost = {
		caption: req.body.caption
	}
	if (req.file) {
		individualPost.file = req.file.filename
	}
	console.log(individualPost)
	posts.push(individualPost)
	res.redirect('/')
})

// listen on port
app.listen(5001, () => {
	console.log('server listening on port 5001!')
})