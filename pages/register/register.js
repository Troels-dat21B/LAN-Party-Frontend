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
        const data = await fetch("http://localhost:8080/api/register", {
            method: 'post',
            headers: headers,
            body: jsonBody
        })
        if(data.status = 403){
            window.router.navigate("/register") 
            alert("Brugernavnet er allerede taget")
        }if(data=200){
            window.router.navigate("/")
            alert("Du er nu logget ind")
        }
    } catch (err) {
        console.error(err)
    }
}