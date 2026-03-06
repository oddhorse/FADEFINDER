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
		id: 0,
		name: "Danny",
		height: {
			ft: 5,
			in: 9
		},
		weight: 155, // lbs
		age: 29,
		image: "example/1.jpeg",
	},
	{
		id: 1,
		name: "Nathan",
		height: {
			ft: 5,
			in: 9
		},
		weight: 167, // lbs
		age: 34,
		image: "example/2.jpeg",
	},
	{
		id: 2,
		name: "Picard",
		height: {
			ft: 5,
			in: 6
		},
		weight: 143, // lbs
		age: 42,
		image: "example/3.jpeg",
	},
	{
		id: 3,
		name: "Astrid",
		height: {
			ft: 5,
			in: 3
		},
		weight: 121, // lbs
		age: 19,
		image: "example/4.jpeg",
	},
	{
		id: 4,
		name: "Kevin",
		height: {
			ft: 6,
			in: 1
		},
		weight: 207, // lbs
		age: 55,
		image: "example/5.jpeg",
	},
	{
		id: 5,
		name: "Jane",
		height: {
			ft: 5,
			in: 5
		},
		weight: 140, // lbs
		age: 53,
		image: "example/6.jpeg",
	},
	{
		id: 6,
		name: "Elle",
		height: {
			ft: 5,
			in: 5
		},
		weight: 139, // lbs
		age: 23,
		image: "example/7.jpeg",
	},
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