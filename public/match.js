window.addEventListener('load', () => {
	// get params for user id
	const params = new URL(document.location.toString()).searchParams
	const passedUserId = params.get("userId")

	const sendLike = async (recipientId) => {
		const response = await fetch("/sendlike", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'recipientId': recipientId,
				'senderId': passedUserId
			}),
		})
		console.log("sent to server!")
		response.json().then(data => {
			console.log(JSON.stringify(data))
		})
	}


	// 	

	let unseenProfiles = []
	// TODO: save this value in user data serverside

	const profileViews = document.getElementsByClassName("profile-card")

	const showProfile = (profileId) => {
		if (profileViews) {
			for (const profileView of profileViews) {
				const userId = profileView.getAttribute("data-userid")
				if (userId == profileId) profileView.parentElement.removeAttribute("hidden")
				else profileView.parentElement.setAttribute("hidden", true)
			}
		}
	}

	if (profileViews) {
		for (const profileView of profileViews) {
			const userId = profileView.getAttribute("data-userid")
			if (unseenProfiles.length === 0) showProfile(userId)
			if (userId !== passedUserId) unseenProfiles.push(userId)
		}
		console.log(`unseen profiles: ${unseenProfiles}`)
	}

	const nextProfile = () => {
		unseenProfiles.shift() // remove first element in unseenProfiles
		showProfile(unseenProfiles[0]) // show now-first element
	}

	const likeButtons = document.getElementsByClassName("like-btn")
	if (likeButtons) {
		for (const button of likeButtons) {
			const userId = button.parentElement.getAttribute("data-userid")
			console.log(userId)
			button.addEventListener("click", () => {
				console.log(`like btn for userId ${userId} clicked!`)
				sendLike(userId)
				nextProfile()
			})
		}

	}

	const dislikeButtons = document.getElementsByClassName("dislike-btn")
	if (likeButtons) {
		for (const button of dislikeButtons) {
			const userId = button.parentElement.getAttribute("data-userid")
			console.log(userId)
			button.addEventListener("click", () => {
				console.log(`dislike btn for userId ${userId} clicked!`)
				nextProfile()
			})
		}

	}

})