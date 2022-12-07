let segmentDropdown

let chairDropdown

let segmentChoice

let chairChoice

let reserveButton

let chairData

let seatButton


export function reservationPageSetup() {
    

    reserveButton = document.querySelector("#reserveButton")

    seatButton = document.querySelector("#seatAmount")

    const jsonBody = localStorage.getItem("accessToken")
    

    reserveButton.addEventListener("click", createReservation)

    seatButton.addEventListener("click", amountOfSeats)
    

}

function segmentAndChairSetup(){
    segmentDropdown = document.querySelector("#segmentDropdown")

    chairDropdown = document.querySelector("#chairDropdown")

    segmentChoice = document.querySelector("#segmentChoice")

    chairChoice = document.querySelector("#chairChoice")

    segmentDropdown.addEventListener("click", segmentChosen)

    chairDropdown.addEventListener("click", chairChosen)

    segmentDropdownFunction()
    
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

async function amountOfSeats(event) {
    document.getElementById("seat-holder").innerHTML = "";
{event.target.text}
let counter = event.target.text;

let amountOfCards;
for (let i = 0; i < counter; i++) {
    const reserveCards = `
                <div class="row">
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Vælg et segment</h5>
                      <p class="card-text">Du skal vælge det segment du ønsker at sidde i.</p>
                      <div class="dropdown" style="padding-right:20px ;">
                        <button class="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Vælg Segment
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark" id="segmentDropdown${i+1}">
                            
                        </ul>
                          
                        <p id="segmentChoice" style="display:inline-flex"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Vælg en plads</h5>
                      <p class="card-text">Du skal vælge den plads du gerne vil sidde på.</p>
                      <div class="dropdown">
                        <button class="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Vælg Stol
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark" id="chairDropdown${i+1}">
                            
                        </ul>
                          
                        <p id="chairChoice" style="display:inline-flex"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                `

    console.log(reserveCards)
        document.getElementById("seat-holder").innerHTML += reserveCards;
}
    segmentAndChairSetup()
                

}








function reservationMadePage() {

    window.router.navigate("/reservationMade")
    const myTimeout = setTimeout(backToReservePage, 4000)


}

function backToReservePage() {

    window.router.navigate("/reservation")

}


