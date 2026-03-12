// libs
import Express from 'express'
import Multer from 'multer'

// set up applications
const app = Express() // express app normal stuff
const uploadProcessor = Multer({ dest: 'public/uploads/' }) // uses multer lib to upload files

// middlewareeeee
app.use(Express.static('public'))
app.use(Express.json()) // needed for pushing json data in a post request https://www.geeksforgeeks.org/web-tech/express-js-express-json-function/
app.use(Express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

/**
 * gets age from birthdate
 * @param {Date} birthDateObj Date obj representing birthdate
 */
const getAgeFromDate = (birthDateObj) => {
	// https://www.w3resource.com/javascript-exercises/javascript-date-exercise-18.php
	let ageDate = new Date(Date.now() - birthDateObj.valueOf())
	let age = ageDate.getUTCFullYear() - 1970
	return age
}

// global array to store all posts
let posts = []

const starterProfiles = [
	{
		id: 0,
		name: "Danny",
		height: {
			ft: 5,
			in: 9
		},
		weight: 155, // lbs
		birthday: new Date("1995-11-23"),
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
		birthday: new Date("1992-12-03"),
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
		birthday: new Date("1970-04-10"),
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
		birthday: new Date("2006-01-02"),
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
		birthday: new Date("1968-11-09"),
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
		birthday: new Date("1970-12-17"),
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
		birthday: new Date("2002-06-21"),
		image: "example/7.jpeg",
	},
]

let profiles = new Map()
for (const profile of starterProfiles) {
	profiles.set(profile.id, profile)
	console.log(profiles.get(0))
}

let fades = [
	{
		id: 0,
		instigator: profiles.get(0),
		opponent: profiles.get(1),
		time: new Date(),
		loc: "Washington Square Park",
		winner: 0,
		confirmed: true,
		denied: false,
	}
]

const filterFadeRequests = (fade, userId) => {
	if (
		fade.opponent.id === Number(userId) &&
		fade.confirmed === false &&
		fade.denied === false &&
		fade.time.valueOf() > Date.now() // if fade request is for already-passed time, kill it!
	) return true
	else return false
}

const filterUpcomingFades = (fade, userId) => {
	if (
		fade.opponent.id === Number(userId) &&
		fade.confirmed === true &&
		fade.denied === false &&
		fade.time.valueOf() > Date.now() // if fade request is for already-passed time, kill it!
	) return true
	else return false
}

// routes
app.get('/', (req, res) => {
	res.render('index.ejs', { currentPage: "index" })
})

app.get('/start', (req, res) => {
	res.render('start.ejs', { currentPage: "start" })
})

app.get('/match', (req, res) => {
	const userId = req.query.userId
	res.render('match.ejs', { userId, profiles, getAgeFromDate, currentPage: "match" })
})
app.get('/likes', (req, res) => {
	const userId = req.query.userId
	let likeProfiles = []
	if (userId) {
		const likes = profiles.get(Number(userId)).likes
		console.log(likes)
		for (const likeId of likes) {
			if (profiles.has(likeId)) {
				console.log(profiles.get(likeId))
				likeProfiles.push(profiles.get(likeId))
			}
		}
	}
	res.render('likes.ejs', { userId, profiles: likeProfiles, getAgeFromDate, currentPage: "likes" })
})
app.get('/fades', (req, res) => {
	const userId = req.query.userId
	res.render('fades.ejs', { userId, fades, currentPage: "fades", filterFadeRequests, filterUpcomingFades })
})

app.post('/signup', uploadProcessor.single('profileImage'), (req, res) => {
	const birthday = new Date(req.body.birthday)

	console.log(getAgeFromDate(birthday))

	// what type of data structure is this?
	// A: object
	let data = {
		id: profiles.size,
		name: req.body.firstName,
		height: {
			ft: req.body.heightFeet,
			in: req.body.heightIn
		},
		weight: req.body.weight, // lbs
		birthday: new Date(req.body.birthday),
	}

	// why do we write this if statement?
	// A: image is not required; we only should handle it if it's present
	if (req.file) {
		data.image = '/uploads/' + req.file.filename
	}

	// what does the push function do?
	// A: adds an item to back of array
	profiles.set(profiles.size, data)

	// add some example fade requests
	fades.push(
		{
			id: fades.length,
			instigator: profiles.get(3),
			opponent: profiles.get(data.id),
			time: new Date(Date.now() + 500000000), // now + like uhhh 4 or 5 days??
			loc: "Washington Square Park",
			winner: 0,
			confirmed: false,
			denied: false,
		},
		{
			id: fades.length + 1,
			instigator: profiles.get(6),
			opponent: profiles.get(data.id),
			time: new Date(Date.now() + 864000000), // now + 10 days
			loc: "Muji Union Square",
			winner: 0,
			confirmed: false,
			denied: false,
		}
	)

	res.redirect(`/match?userId=${data.id}`)
})

app.post('/sendlike', (req, res) => {
	console.log(req.body)
	const sender = profiles.get(Number(req.body.senderId))
	if (!sender) return
	// console.log(sender)
	const recipient = profiles.get(Number(req.body.recipientId))
	console.log(
		`like sent by user ${sender.name} (id ${sender.id})
		for user ${recipient.name} (id ${recipient.id})!
		proposed time is ${new Date(req.body.time)}.
		attached message is "${req.body.msg}"`)

	const fade = {
		id: fades.length,
		instigator: sender,
		opponent: recipient,
		time: new Date(req.body.time),
		loc: req.body.msg,
		winner: 0,
		confirmed: false,
		denied: false,
	}
	fades.push(fade)

	console.log(recipient)

	res.send({ "status": "success" })
})

app.post('/answerfade', (req, res) => {
	console.log(req.body)
	console.log(
		`fade request with id ${req.body.fadeId} answered!
		answer is ${req.body.answer}`)

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
	const fadeInQuestion = fades.find((fade) => fade.id === Number(req.body.fadeId))
	console.log(fadeInQuestion)
	if (req.body.answer === true) fadeInQuestion.confirmed = true
	else fadeInQuestion.denied = true

	res.send({ "status": "success" })
})

// listen on port
app.listen(5001, () => {
	console.log('server listening on port 5001!')
})