const rendering = {
    renderToDom(location, htmlString) {
        const formContainer = document.querySelector("#form")
        formContainer.innerHTML += htmlString
    },

    renderInterests(location, htmlString) {
        const interestsList = document.querySelector("#formOutput")
        interestsList.innerHTML += htmlString
    }
}

export default rendering