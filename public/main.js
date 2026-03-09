// apparently window.onload only saves one function at a time, while addEventListener can stack. functionally fires at the same time!
window.addEventListener('load', () => {
	// get url params
	let params = new URL(document.location.toString()).searchParams

	// MAKE TYPES OF DATA CARDS EXPANDABLE ON CLICK
	const profileCards = document.getElementsByClassName("profile-card")
	if (profileCards) {
		for (const card of profileCards) {
			card.addEventListener("click", () => {
				card.classList.toggle("expanded")
			})
		}

	}

	const fadeCards = document.getElementsByClassName("fade-card")
	if (fadeCards) {
		for (const card of fadeCards) {
			card.addEventListener("click", () => {
				card.classList.toggle("expanded")
			})
		}

	}

	// check if account is already registered and pass that to server
	// now this does all reconciliation between localstorage and uri user id
	const savedUserId = localStorage.getItem("userId")
	const passedUserId = params.get("userId")
	console.log(`saved userId: ${savedUserId}, passed userId: ${passedUserId}`)
	if (savedUserId && !passedUserId) {
		console.log("saved user id but no passed one! redirecting...")
		window.location.href += `?userId=${savedUserId}`
	} else if (passedUserId && !savedUserId) {
		console.log("passed user id but no saved one!! saving now...")
		localStorage.setItem("userId", passedUserId)
	} else if (savedUserId && passedUserId) {
		if (savedUserId !== passedUserId) {
			localStorage.setItem("userId", passedUserId)
		}
	}
})