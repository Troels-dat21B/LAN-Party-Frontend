let segmentDropdown

let chairDropdown

let segmentChoice

let chairChoice

let reserveButton

let chairData

let chairDataList
export function reservationPageSetup() {
    segmentDropdown = document.querySelector("#segmentDropdown")

    chairDropdown = document.querySelector("#chairDropdown")

    segmentChoice = document.querySelector("#segmentChoice")

    chairChoice = document.querySelector("#chairChoice")

    reserveButton = document.querySelector("#reserveButton")

    const jsonBody = localStorage.getItem("accessToken")

    segmentDropdownFunction()

    segmentDropdown.addEventListener("click", segmentChosen)

    chairDropdown.addEventListener("click", chairChosen)

    reserveButton.addEventListener("click", createReservation)

}

async function segmentDropdownFunction() {

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
    
        segmentDropdown.innerHTML = DOMPurify.sanitize(segmentRows)


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

function chairChosen(event) {

    chairData = parseInt(event.target.text);

    try{
        chairChoice.innerHTML = DOMPurify.sanitize("Plads valgt: " + chairData)
    }catch (err) {
        console.error(err)
    }

}

async function createReservation() {
    console.log(chairChoice)

    try {
        const data = await fetch(baseURL + `/api/reservation`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            body: JSON.stringify({chairId: chairData}) 
        }).then(res => handleHttpErrors(res))

        reservationMadePage()

    } catch (err) {
        console.error(err)
    }
}

function reservationMadePage() {

    window.router.navigate("/reservationMade")
    const myTimeout = setTimeout(backToReservePage, 4000)


}

function backToReservePage() {

    window.router.navigate("/reservation")

}