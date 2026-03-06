window.onload = () => {
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

}