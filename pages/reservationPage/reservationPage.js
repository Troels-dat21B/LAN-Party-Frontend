let segmentDropdown
let segmentDropdown2
let segmentDropdown3
let segmentDropdown4

let dropdownSeat1
let dropdownSeat2
let dropdownSeat3
let dropdownSeat4

let chairDropdown
let chairDropdown2
let chairDropdown3
let chairDropdown4

let segmentChoice
let segmentChoice2
let segmentChoice3
let segmentChoice4

let chairChoice
let chairChoice2
let chairChoice3
let chairChoice4

let reserveButton

let chairData
let chairData2
let chairData3
let chairData4


export function reservationPageSetup() {
    segmentDropdown = document.querySelector("#segmentDropdown")
    segmentDropdown2 = document.querySelector("#segmentDropdown2")
    segmentDropdown3 = document.querySelector("#segmentDropdown3")
    segmentDropdown4 = document.querySelector("#segmentDropdown4")

    chairDropdown = document.querySelector("#chairDropdown")
    chairDropdown2 = document.querySelector("#chairDropdown2")
    chairDropdown3 = document.querySelector("#chairDropdown3")
    chairDropdown4 = document.querySelector("#chairDropdown4")

    segmentChoice = document.querySelector("#segmentChoice")
    segmentChoice2 = document.querySelector("#segmentChoice2")
    segmentChoice3 = document.querySelector("#segmentChoice3")
    segmentChoice4 = document.querySelector("#segmentChoice4")

    chairChoice = document.querySelector("#chairChoice")
    chairChoice2 = document.querySelector("#chairChoice2")
    chairChoice3 = document.querySelector("#chairChoice3")
    chairChoice4 = document.querySelector("#chairChoice4")

    reserveButton = document.querySelector("#reserveButton")

    const jsonBody = localStorage.getItem("accessToken")

    segmentDropdownFunction(segmentDropdown)
    segmentDropdownFunction(segmentDropdown2)
    segmentDropdownFunction(segmentDropdown3)
    segmentDropdownFunction(segmentDropdown4)

    segmentDropdown.addEventListener("click", segmentChosen)
    segmentDropdown2.addEventListener("click", segmentChosen2)
    segmentDropdown3.addEventListener("click", segmentChosen3)
    segmentDropdown4.addEventListener("click", segmentChosen4)

    chairDropdown.addEventListener("click", chairChosen)
    chairDropdown2.addEventListener("click", chairChosen2)
    chairDropdown3.addEventListener("click", chairChosen3)
    chairDropdown4.addEventListener("click", chairChosen4)

    reserveButton.addEventListener("click", createReservation)

    document.getElementById("seat-1").classList.add("hidden")
    document.getElementById("seat-2").classList.add("hidden")
    document.getElementById("seat-3").classList.add("hidden")
    document.getElementById("seat-4").classList.add("hidden")

    dropdownSeat1 = document.querySelector("#dropdownSeat1")
    dropdownSeat2 = document.querySelector("#dropdownSeat2")
    dropdownSeat3 = document.querySelector("#dropdownSeat3")
    dropdownSeat4 = document.querySelector("#dropdownSeat4")

    dropdownSeat1.addEventListener("click", showSeatButton1)
    dropdownSeat2.addEventListener("click", showSeatButton2)
    dropdownSeat3.addEventListener("click", showSeatButton3)
    dropdownSeat4.addEventListener("click", showSeatButton4)


}

function showSeatButton1(){
    document.getElementById("seat-1").classList.remove("hidden")
    document.getElementById("seat-2").classList.add("hidden")
    document.getElementById("seat-3").classList.add("hidden")
    document.getElementById("seat-4").classList.add("hidden")
}
function showSeatButton2(){
    document.getElementById("seat-1").classList.remove("hidden")
    document.getElementById("seat-2").classList.remove("hidden")
    document.getElementById("seat-3").classList.add("hidden")
    document.getElementById("seat-4").classList.add("hidden")

}
function showSeatButton3(){
    document.getElementById("seat-1").classList.remove("hidden")
    document.getElementById("seat-2").classList.remove("hidden")
    document.getElementById("seat-3").classList.remove("hidden")
    document.getElementById("seat-4").classList.add("hidden")

}
function showSeatButton4(){
    document.getElementById("seat-1").classList.remove("hidden")
    document.getElementById("seat-2").classList.remove("hidden")
    document.getElementById("seat-3").classList.remove("hidden")
    document.getElementById("seat-4").classList.remove("hidden")
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
async function segmentChosen3(event) {
    
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

        chairDropdown3.innerHTML = DOMPurify.sanitize(chairRows)

        segmentChoice3.innerHTML = DOMPurify.sanitize("Segment Valgt: " + event.target.text)
    }catch (err) {
        console.error(err);
    }
}

async function segmentChosen4(event) {
    
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

        chairDropdown4.innerHTML = DOMPurify.sanitize(chairRows)

        segmentChoice4.innerHTML = DOMPurify.sanitize("Segment Valgt: " + event.target.text)
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
function chairChosen3(event) {

    chairData3 = parseInt(event.target.text);

    try{
        chairChoice3.innerHTML = DOMPurify.sanitize("Plads valgt: " + chairData3)
    }catch (err) {
        console.error(err)
    }

}
function chairChosen4(event) {

    chairData4 = parseInt(event.target.text);

    try{
        chairChoice4.innerHTML = DOMPurify.sanitize("Plads valgt: " + chairData4)
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
            body: JSON.stringify({chairData, chairData2, chairData3, chairData4})
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