let reservationer

export async function userPageSetup() {

    reservationer = document.querySelector("#reservationer")

    const userWelcome = document.querySelector("#userWelcome")

    const jsonBody = localStorage.getItem("accessToken")

    listOfReservations()

    try{
        const data = await fetch(baseURL + "/api/user/findUser", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accessToken: jsonBody
            })
        }).then(res => handleHttpErrors(res))

        userWelcome.innerHTML = DOMPurify.sanitize(data.username)

    }
    catch (err) {
        console.error(err)
        window.router.navigate("/")
    }
}


async function listOfReservations() {

    try{
        const reservationData = await fetch(baseURL + "/api/reservation", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        })
            .then(res => handleHttpErrors(res))

        const reservationRows = reservationData.map(reservation => {
            const reservationRow = `
            <li>${reservation.id}</li>
                <li><hr</li>
            `
            return reservationRow
        }).join('')

        revervationer.innerHTML = DOMPurify.sanitize(reservationRows)

    }catch (err){
        console.error(err)
    }
}
