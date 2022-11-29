
export async function userPageSetup() {

    const userWelcome = document.querySelector("#userWelcome")

    const jsonBody = localStorage.getItem("accessToken")

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

        userWelcome.innerHTML = "Velkommen " + DOMPurify.sanitize(data.username)

    }
    catch (err) {
        console.error(err)
        window.router.navigate("/")
    }
}
