import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./util.js"

import {loginSetupAuthorize} from "./pages/login/login.js"
import {registerAddEventListener} from "./pages/register/register.js"

import { fetchTableplan } from "./pages/tableplan/tableplan.js"
import { userPageSetup } from "./pages/userPage/userPage.js"
import { reservationPageSetup } from "./pages/reservationPage/reservationPage.js"

const content = 'content'

window.addEventListener("load", async () => {

  const templateHome = await loadHtml("./pages/home/home.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")
  const templateLogin = await loadHtml("./pages/login/login.html")
  const templateTableplan = await loadHtml("./pages/tableplan/tableplanView.html")
  const templateUserPage = await loadHtml("./pages/userPage/userPage.html")
  const templateRegistrer = await loadHtml("./pages/register/register.html")

  const templateReservationPage = await loadHtml("./pages/reservationPage/reservationPage.html")
  const templateReservationMade = await loadHtml("./pages/reservationPage/reservationMade.html")

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
                loginSetupAuthorize()
            },
            "/admin/bordplan": () => {
                renderTemplate(templateTableplan, content)
                fetchTableplan()
            } ,
            "/user": () => {
                renderTemplate(templateUserPage, content)
                userPageSetup()
            },
            "/register": () => {
                renderTemplate(templateRegistrer, content)
                registerAddEventListener()
            },
            "/reservation": () => {
                renderTemplate(templateReservationPage, content)
                reservationPageSetup()
            },
            "/reservationMade": () => {
                renderTemplate(templateReservationMade, content)
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


