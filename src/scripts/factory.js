const factory = {
    createForm() {
        return `
                <fieldset>
                <input type="hidden" id="hiddenId" value=""></input>
                <legend>Ternary Traveler</legend>
                    <label for="pointOfInterest">Point of Interest:</label>
                    <input id="name" type="text" name="name">
                    <br>
                    <label for="description">Description:</label>
                    <input id="description" type="text" name="description">
                    <br>
                    <label for="cost">Cost:</label>
                    <input id="cost" type="text" name="cost">
                    <br>
                    <label for="review">Review:</label>
                    <input id="review" type="text" name="review">
                    <br>
                    <label for="location">Location:</label>
                    <select id="location" class="css" name="locations">
                        <option value="">Select Country</option>
                        <option value="1">Italy</option>
                        <option value="2">Switzerland</option>    
                        <option value="3">France</option>
                    </select>
                    <br><br>
                    <button id="saveButton" class="btn">Save</button>
                </fieldset>
                <div id="formOutput"></div>
        `
    },

    createInterest(interestObject) {
        return `
        <section class="interestCard" "interestObject--${interestObject.id}">
          
                <h3><em>${interestObject.name}</em></h3>
                <p>Description: ${interestObject.description}</p>
                <p>Cost: ${interestObject.cost}</p>
                <p>Review: ${interestObject.review}</p>
                <p>Location: ${interestObject.place.name}</p>
            
            <div>
            <button id="deleteButton--${interestObject.id}" class="deleteBtn" type="button">Delete</button>
            <button id="editButton--${interestObject.id}" class="editBtn" type="button">Edit</button>
            </div>
        </section>
        `
    }
}

export default factory