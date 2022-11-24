import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./util.js"

import {loginSetup} from "./pages/login/login.js"

const content = 'content'

window.addEventListener("load", async () => {

  const templateHome = await loadHtml("./pages/home/home.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")
  const templateLogin = await loadHtml("./pages/login/login.html")
  adjustForMissingHash()

    const router = new Navigo("/", {hash: true});
    //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
    window.router = router

    router
        .hooks({
            before(done, match) {
                setActiveLink("menu", match.url)
                done()
            }
        })
        .on({

          "/": () => {
            renderTemplate(templateHome, content)
            },

            "/login": () => {
                renderTemplate(templateLogin, content)
                loginSetup()
            }
        })
        .notFound(() => {
            renderTemplate(templateNotFound, content)
        })
        .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
        + ' Column: ' + column + ' StackTrace: ' + errorObj);
}


