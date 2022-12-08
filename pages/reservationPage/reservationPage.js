let segmentDropdown
let segmentDropdown2

let chairDropdown
let chairDropdown2

let segmentChoice
let segmentChoice2

let chairChoice
let chairChoice2

let reserveButton

let chairData
let chairData2


export function reservationPageSetup() {
    segmentDropdown = document.querySelector("#segmentDropdown")
    segmentDropdown2 = document.querySelector("#segmentDropdown2")

    chairDropdown = document.querySelector("#chairDropdown")
    chairDropdown2 = document.querySelector("#chairDropdown2")

    segmentChoice = document.querySelector("#segmentChoice")
    segmentChoice2 = document.querySelector("#segmentChoice2")

    chairChoice = document.querySelector("#chairChoice")
    chairChoice2 = document.querySelector("#chairChoice2")

    reserveButton = document.querySelector("#reserveButton")

    const jsonBody = localStorage.getItem("accessToken")

    segmentDropdownFunction(segmentDropdown)
    segmentDropdownFunction(segmentDropdown2)

    segmentDropdown.addEventListener("click", segmentChosen)
    segmentDropdown2.addEventListener("click", segmentChosen2)

    chairDropdown.addEventListener("click", chairChosen)
    chairDropdown2.addEventListener("click", chairChosen2)

    reserveButton.addEventListener("click", createReservation)

}

async function segmentDropdownFunction(sD) {

    try{
        const segmentData = await fetch(baseURL + "/api/segments/")
        .then(res => handleHttpErrors(res))

        const segmentRows = segmentData.map(segment => {
            const segmentRow= `
            <li><a class="dropdown-item">${segment.segment_id}</a></li>
            <li><hr class="dropdown-divider"></li>
            `
            return segmentRow
        }).join('')
    
        sD.innerHTML = DOMPurify.sanitize(segmentRows)


    }catch (err){
        console.error(err);
    }

}

async function segmentChosen(event) {
    
    try{
        const chairFromSegment = await fetch(baseURL + `/api/chairs/segment/${event.target.text}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            } 
        })
        .then(res => handleHttpErrors(res))
        
        const chairRows = chairFromSegment.
            map(chair => {
                const chairRow = `
                <li><a class="dropdown-item">${chair.chair_id}</a></li>
                <li><hr class="dropdown-divider"></li>
                `
                return chairRow
        }).join('')

        chairDropdown.innerHTML = DOMPurify.sanitize(chairRows)

        segmentChoice.innerHTML = DOMPurify.sanitize("Segment Valgt: " + event.target.text)
    }catch (err) {
        console.error(err);
    }

}


async function segmentChosen2(event) {
    
    try{
        const chairFromSegment = await fetch(baseURL + `/api/chairs/segment/${event.target.text}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            } 
        })
        .then(res => handleHttpErrors(res))
        
        const chairRows = chairFromSegment.
            map(chair => {
                const chairRow = `
                <li><a class="dropdown-item">${chair.chair_id}</a></li>
                <li><hr class="dropdown-divider"></li>
                `
                return chairRow
        }).join('')

        chairDropdown2.innerHTML = DOMPurify.sanitize(chairRows)

        segmentChoice2.innerHTML = DOMPurify.sanitize("Segment Valgt: " + event.target.text)
    }catch (err) {
        console.error(err);
    }

}

function chairChosen(event) {

    chairData = parseInt(event.target.text);

    try{
        chairChoice.innerHTML = DOMPurify.sanitize("Plads valgt: " + chairData)
    }catch (err) {
        console.error(err)
    }

}

function chairChosen2(event) {

    chairData2 = parseInt(event.target.text);

    try{
        chairChoice2.innerHTML = DOMPurify.sanitize("Plads valgt: " + chairData2)
    }catch (err) {
        console.error(err)
    }

}



async function createReservation() {
    try {
        const data = await fetch(baseURL + `/api/reservation`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            body: JSON.stringify({chairData, chairData2})
        }).then(res => handleHttpErrors(res))

        
        reservationMadePage()

    } catch (err) {
        console.error()
    }
}

function reservationMadePage() {

    window.router.navigate("/reservationMade")
    const myTimeout = setTimeout(backToReservePage, 4000)


}

function backToReservePage() {

    window.router.navigate("/reservation")

}