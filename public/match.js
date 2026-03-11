window.addEventListener('load', () => {
	// get params for user id
	const params = new URL(document.location.toString()).searchParams
	const passedUserId = params.get("userId")

	const sendLike = async (recipientId) => {
		const fadetime = document.getElementById(`fadetime-${recipientId}`)
		const likemsg = document.getElementById(`likemsg-${recipientId}`)
		const response = await fetch("/sendlike", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'recipientId': recipientId,
				'senderId': passedUserId,
				'time': fadetime.value,
				'msg': likemsg.value
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

	/**
	 * displays profile of specified id. if invalid id, displays none!
	 * @param {number} profileId - id of profile to display
	 */
	const showProfile = (profileId) => {
		if (profileViews) {
			for (const profileView of profileViews) {
				const userId = profileView.getAttribute("data-userid")
				if (userId == profileId) profileView.parentElement.removeAttribute("hidden")
				else profileView.parentElement.setAttribute("hidden", true)
			}
		}
	}

	// on load, hide all the profiles and 
	if (profileViews) {
		for (const profileView of profileViews) {
			const userId = profileView.getAttribute("data-userid")
			if (unseenProfiles.length === 0) showProfile(userId) // run on first profile
			if (userId !== passedUserId) unseenProfiles.push(userId)
		}
		console.log(`unseen profiles: ${unseenProfiles}`)
	}

	const nextProfile = () => {
		unseenProfiles.shift() // remove first element in unseenProfiles
		showProfile(unseenProfiles[0]) // show now-first element, or hide all once we run out!
		if (unseenProfiles.length === 0) {
			const lastCard = document.getElementById("no-more-profiles-card")
			lastCard.removeAttribute("hidden")
		}
	}

	const showLikeMsgBox = (id) => {
		const box = document.getElementById(`like-msg-box-${id}`)
		box.removeAttribute("hidden")
	}

	const likeButtons = document.getElementsByClassName("like-btn")
	if (likeButtons) {
		for (const button of likeButtons) {
			const userId = button.parentElement.getAttribute("data-userid")
			console.log(userId)
			button.addEventListener("click", () => {
				console.log(`like btn for userId ${userId} clicked!`)
				showLikeMsgBox(userId)
				// sendLike(userId)
				// nextProfile()
			})
		}

	}

	const dislikeButtons = document.getElementsByClassName("dislike-btn")
	if (dislikeButtons) {
		for (const button of dislikeButtons) {
			const userId = button.parentElement.getAttribute("data-userid")
			console.log(userId)
			button.addEventListener("click", () => {
				console.log(`dislike btn for userId ${userId} clicked!`)
				nextProfile()
			})
		}

	}

	const submitButtons = document.getElementsByClassName("submit-btn")
	if (submitButtons) {
		for (const button of submitButtons) {
			const userId = button.parentElement.getAttribute("data-userid")
			console.log(userId)
			const fadetime = document.getElementById(`fadetime-${userId}`)
			const likemsg = document.getElementById(`likemsg-${userId}`)
			button.addEventListener("click", () => {
				if (fadetime.validity.valid && likemsg.validity.valid) {
					sendLike(userId)
					console.log(`submit btn for userId ${userId} clicked!`)
					nextProfile()
				}

			})
		}

	}

})