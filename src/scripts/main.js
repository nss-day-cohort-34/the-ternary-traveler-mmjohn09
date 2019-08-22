import API from "./data"
import factory from "./factory"
import rendering from "./dom"

const initTraveler = () => {

    //========================================================
    //         Reference to main containers
    //========================================================

    const formContainer = document.querySelector("#form")

    //========================================================
    //           Initial view of application
    //========================================================

    const initialView = factory.createForm()
    rendering.renderToDom(formContainer, initialView)

    const interestsList = document.querySelector("#formOutput")
    API.getAllInterests()
        .then(interests => {
            console.log(interests)
            interests.forEach(interest => {
                const interestHTML = factory.createInterest(interest)
                rendering.renderInterests(interestsList, interestHTML)
            })
        })


    //========================================================
    //      Save interest to database and render to DOM
    //========================================================

    const hiddenId = document.querySelector("#hiddenId")

    const createInterestObject = (location, name, description, cost, review) => {
        return {
            placeId: parseInt(location.value),
            name: name.value,
            description: description.value,
            cost: cost.value,
            review: review.value
        }
    }

    formContainer.addEventListener("click", () => {
        if (event.target.id.startsWith("saveButton")) {
            const interestName = document.querySelector("#name")
            const interestCost = (parseFloat(document.querySelector("#cost")).toFixed(2))
            const interestReview = document.querySelector("#review")
            const interestLocation = document.querySelector("#location")
            const interestDescription = document.querySelector("#description")
            const hiddenId = document.querySelector("#hiddenId")
            const newInterest = createInterestObject(interestLocation, interestName, interestDescription, interestCost, interestReview)

            API.postInterest(newInterest)
            interestsList.innerHTML = ""
            API.getAllInterests()
                .then(interests => {
                    console.log(interests)
                    interests.forEach(interest => {
                        const interestHTML = factory.createInterest(interest)
                        rendering.renderInterests(interestsList, interestHTML)
                    })
                })
            interestName.value = ""
            interestCost.value = ""
            interestReview.value = ""
            interestLocation.value = ""
            interestDescription.value = ""
        }
    })

    //========================================================
    //      Delete interest from database and DOM
    //========================================================

    formContainer.addEventListener("click", () => {
        if (event.target.id.startsWith("delete")) {
            const confirmDeletion = confirm("Do you want to delete this entry?")
            if (confirmDeletion === true) {
                interestsList.innerHTML = ""
                const interestToDelete = event.target.id.split("--")[1]
                API.deleteInterest(interestToDelete)
                    .then(() => {
                        return API.getAllInterests()
                    })
                    .then(interests => {
                        interests.forEach(interest => {
                            const interestHTML = factory.createInterest(interest)
                            rendering.renderToDom(formOutput, interestHTML)
                        })
                    })
            }
        }
    })

    //========================================================
    //      Update interest in database and DOM
    //========================================================

    const updateFormField = interestId => {
        const hiddenId = document.querySelector("#hiddenId")
        const interestName = document.querySelector("#name")
        const interestCost = document.querySelector("#cost")
        const interestReview = document.querySelector("#review")
        const interestLocation = document.querySelector("#location")
        const interestDescription = document.querySelector("#description")

        return fetch(`http://localhost:8088/interests/${interestId}`)
            .then(response => response.json())
            .then(interest => {
                hiddenId.value = interest.id
                interestName.value = interest.name
                interestCost.value = interest.cost
                interestReview.value = interest.review
                interestLocation.value = interest.location
                interestDescription.value = interest.description
            })
    }

    formContainer.addEventListener("click", event => {
        if (event.target.id.startsWith("edit")) {
            const interestToEdit = event.target.id.split("--")[1]

            updateFormField(interestToEdit)
        }
    })

    const putEditedInterest = (interestId, interestToEdit) => {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interestToEdit)
        })
    }

}

initTraveler()