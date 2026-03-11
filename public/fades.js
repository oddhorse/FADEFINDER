window.addEventListener('load', () => {

	const answerFade = async (answer, fadeId) => {
		const response = await fetch("/answerfade", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'fadeId': fadeId,
				'answer': answer
			}),
		})
		console.log("sent to server!")
		response.json().then(data => {
			console.log(JSON.stringify(data))
		})
	}

	const likeButtons = document.getElementsByClassName("like-btn")
	if (likeButtons) {
		for (const button of likeButtons) {
			const fadeId = button.parentElement.getAttribute("data-fadeid")
			const fadeEl = document.getElementById(`fade-container-id-${fadeId}`)
			console.log(fadeId)
			button.addEventListener("click", () => {
				console.log(`like btn for fadeId ${fadeId} clicked!`)
				answerFade(true, fadeId)
				// fadeEl.remove()
				location.reload()
			})
		}

	}

	const dislikeButtons = document.getElementsByClassName("dislike-btn")
	if (dislikeButtons) {
		for (const button of dislikeButtons) {
			const fadeId = button.parentElement.getAttribute("data-fadeid")
			const fadeEl = document.getElementById(`fade-container-id-${fadeId}`)
			console.log(fadeId)
			button.addEventListener("click", () => {
				console.log(`dislike btn for fadeId ${fadeId} clicked!`)
				answerFade(false, fadeId)
				// fadeEl.remove()
				location.reload()
			})
		}

	}
})