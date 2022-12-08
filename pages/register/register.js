export function registerAddEventListener() {
    const loginButtonInput = document.querySelector("button#registerButton")

    loginButtonInput.addEventListener("click", register)
}





async function register() {

    const usernameInput = document.querySelector("input#username").value
    const passwordInput = document.querySelector("input#password").value

    let headers = new Headers()
    headers.append("Content-Type", "application/json; charset=utf-8")
    headers.append("Accept", "application/json")

    const jsonBody = JSON.stringify({username: usernameInput, password: passwordInput})
    
    try {
        const data = await fetch(baseURL + "/api/register", {
            method: 'post',
            headers: headers,
            body: jsonBody
        }).then(res => handleHttpErrors(res))

        document.getElementById("error-on-register").innerHTML = "";
        window.router.navigate("/")
        alert("Bruger oprettet!")
        console.log("Registreret")
    } catch (err) {
        document.getElementById("error-on-register").innerHTML = DOMPurify.sanitize(err.apiError.response);
        console.error(err)
    
    }


}