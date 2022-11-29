

function setupTableplan() {
    
    const segmentButton = document.querySelector("button#ceateSegment")

    segmentButton.addEventListener("click", createSegment)

}

function createSegment() {

    const segmentDeskNumner = document.querySelector("input#desk").value

}

export function fetchTableplan() {

    fetch (baseURL + "/api/tableplans")

    

}

function insertSegments(segments) {

    const carRows = segments.map(segment => {
        const segmentRow  = `
            <tr>
                <td>${segment.id}</td>
                <td>${car.year}</td>
                <td>${car.make}</td>
                <td>${car.model}</td>
                <td>${car.price}</td>
            </tr>
        `

        return segmentRow
    }).join('')

    tbodyElement.innerHTML = carRows

}