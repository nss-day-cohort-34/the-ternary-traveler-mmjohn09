const API = {
    getAllInterests() {
        return fetch("http://localhost:8088/interests?_expand=place")
            .then(response => response.json())
    },

    postInterest(interestObject) {
        return fetch("http://localhost:8088/interests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interestObject)
        })
            .then(response => response.json())
    },

    deleteInterest(interestId) {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    },

    getSingleInterest(interestId) {
        return fetch(`http://localhost:8088/interests/${interestId}`)
            .then(response => response.json())
    },

    putEditedInterest(interestId, interestToEdit) {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interestToEdit)
        })
    }
}

export default API