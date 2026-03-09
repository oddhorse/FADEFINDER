window.onload = () => {
	// get url params
	let params = new URL(document.location.toString()).searchParams
	let name = params.get("name")

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
	const savedUserId = localStorage.getItem("userId")
	const passedUserId = params.get("userId")
	if (savedUserId && !passedUserId) {
		console.log("saved user id but no passed one! redirecting...")
		window.location.href += `?userId=${savedUserId}`
	}
	if (passedUserId && !savedUserId) {
		console.log("passed user id but no saved one!! saving now...")
		localStorage.setItem("userId", passedUserId)
	}
}