export async function loginSetup() {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken != null) {
        try {
            await fetch("http://localhost:8080/api/auth/authorize", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({accessToken: accessToken})
            }).then(res => handleHttpErrors(res))

            window.router.navigate("/")
            console.log('ran')
        } catch {

        }
    }

    const loginButtonInput = document.querySelector("button#loginButton")

    loginButtonInput.addEventListener("click", login)
}

async function login() {

    const usernameInput = document.querySelector("input#username").value
    const passwordInput = document.querySelector("input#password").value

    let headers = new Headers()
    headers.append("Content-Type", "application/json; charset=utf-8")
    headers.append("Accept", "application/json")

    const jsonBody = JSON.stringify({username: usernameInput, password: passwordInput})

    try {
        const data = await fetch("http://localhost:8080/api/auth/signIn", {
            method: 'post',
            headers: headers,
            body: jsonBody
        }).then(res => handleHttpErrors(res))

        localStorage.setItem("accessToken", data.accessToken)

        window.router.navigate("/")
    } catch (err) {
        console.error(err)
    }


}
