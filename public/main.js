window.onload = () => {
	const profileCards = document.getElementsByClassName("profile-card")
	if (profileCards) {
		for (const card of profileCards) {
			card.addEventListener("click", () => {
				card.classList.toggle("expanded")
			})
		}

	}

}