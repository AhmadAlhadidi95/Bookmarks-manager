let suggestionsBox = document.querySelector(".category-list .suggestions")
let buttonsBox = document.querySelector(".bookmarks-name .buttons")
let allCategories = document.querySelector(".bookmarks")

document.querySelector(".show-all").addEventListener("click", () => {

    document.querySelector(".show-all").classList.remove("colord")
    document.querySelectorAll(".buttons button").forEach((b) => {b.classList.remove("active")})
    document.querySelector(".buttons").removeAttribute("data-type")

    displayCategories()

})

function addBookMarks() {

    let websiteName = document.querySelector(".web-name").value.trim()
    let websiteUrl = document.querySelector(".web-url").value.trim()
    let category = document.querySelector(".category").value.trim()

    if (!websiteName || !websiteUrl || !category) {

        document.querySelector(".web-name").focus()

        Swal.fire({
            title: "Opsss!",
            text: "Please, fill up the fields!",
            icon: "warning",
            background: "#6D676E",
            iconColor: "#FAA916",
            color: "#FAA916",
            confirmButtonColor: "#96031A",
            timer: 3000
        })

        return
    }

    // Convert to object and bring the bookMarks from the localStorage, if It’s not there bring empty object
    const bookMarks = JSON.parse(localStorage.getItem("bookMarks")) || {}
    // Check if the category name exist in the localStorage or not if not give me a new array
    if (!bookMarks[category]) bookMarks[category] = []
    
    bookMarks[category].push({websiteName, websiteUrl})
    
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks))

    document.querySelectorAll(".main-box input").forEach((input) => {input.value = ""})

    displayCategories()

    theListAndSuggestion()

    document.querySelector(".buttons").dataset.type ? filterByCategoryName(category) : bookMarksButtons()
    

}

function displayCategories() {

    allCategories.innerHTML = ""

    const allBookMarks = JSON.parse(localStorage.getItem("bookMarks")) || {}

    for (const category in allBookMarks) {
        // console.log(category);
        // console.log(allBookMarks[category]);
        allBookMarks[category].forEach((bookMark, i) => {

            let infoBox = document.createElement("div")
            infoBox.className = `info-box`
            
            infoBox.innerHTML = `
            <b class="cat">${category}</b>
            <a href="${bookMark["websiteUrl"]}" target="_blank" rel="noopener noreferrer">${bookMark["websiteName"]}</a>
            <button onclick="deleteBookmark('${category}', ${i})">Delete</button>` // Important: ''

            allCategories.appendChild(infoBox)
        })
    }

}
displayCategories()

function filterByCategoryName(category) {

    allCategories.innerHTML = ""

    const allBookMarks = JSON.parse(localStorage.getItem("bookMarks")) || {}

    allBookMarks[category].forEach((bookMark, i) => {

        let infoBox = document.createElement("div")
        infoBox.className = `info-box`
        
        infoBox.innerHTML = `
        <b class="number">${i + 1}</b>
        <a href="${bookMark["websiteUrl"]}" target="_blank" rel="noopener noreferrer">${bookMark["websiteName"]}</a>
        <button onclick="deleteBookmark('${category}', ${i})">Delete</button>` // Important: ''

        allCategories.appendChild(infoBox)
    })
    
    document.querySelector(".buttons").dataset.type = category

}

function theListAndSuggestion () {

    suggestionsBox.innerHTML = ""

    const allBookMarks = JSON.parse(localStorage.getItem("bookMarks")) || {}
    const objectKeys = Object.keys(allBookMarks)

    objectKeys.forEach((key) => {

        let b = document.createElement("b")
        b.innerHTML = key
        
        suggestionsBox.appendChild(b)

        b.onclick = () => {document.querySelector(".category").value = key}

    })

}
theListAndSuggestion()

function bookMarksButtons() {

    buttonsBox.innerHTML = ""

    const allBookMarks = JSON.parse(localStorage.getItem("bookMarks")) || {}
    const objectKeys = Object.keys(allBookMarks)

    objectKeys.forEach((key) => {
        
        let button = document.createElement("button")
        button.innerHTML = `${key}`

        buttonsBox.appendChild(button)
        
        button.addEventListener("click", () => {

            filterByCategoryName(key)

            document.querySelectorAll(".buttons button").forEach((b) => {b.classList.remove("active")})

            button.classList.add("active")
            document.querySelector(".show-all").classList.add("colord")

        })

    })

}
bookMarksButtons()

function deleteBookmark(category, i) {

    const allBookMarks = JSON.parse(localStorage.getItem("bookMarks")) || {}

    allBookMarks[category].splice(i, 1)
    // If the category is empty, delete the category
    if (allBookMarks[category].length === 0) delete allBookMarks[category]
    // Update
    localStorage.setItem("bookMarks", JSON.stringify(allBookMarks))

    if (allBookMarks[category] && document.querySelector(".buttons").dataset.type) {

        filterByCategoryName(category)

    } else {

        document.querySelector(".show-all").classList.remove("colord")
        
        displayCategories()
        bookMarksButtons()

    }
    
    theListAndSuggestion()

}

function myInformation(myInfo) {

    myInfo = document.createElement("div")
    myInfo.className = `my-info`

    let xLink = document.createElement("a")
    xLink.href = "https://twitter.com/AhmadAlhadidi95"
    xLink.target = "_blank"
    xLink.rel = "noopener noreferrer"
    xLink.title = "Visit my Twitter (X)"

    let xIcon = document.createElement("i")
    xIcon.className = `fa-brands fa-x-twitter`

    xLink.appendChild(xIcon)

    let myLogo = document.createElement("img")
    myLogo.src = `My-sign.png`
    myLogo.alt = `My-sign`
    myLogo.title = `Ahmad Alhadidi`
    myLogo.style.width = `50px`

    let githubLink = document.createElement("a")
    githubLink.href = "https://github.com/AhmadAlhadidi95"
    githubLink.target = "_blank"
    githubLink.rel = "noopener noreferrer"
    githubLink.title = "Visit my Github"

    let githubIcon = document.createElement("i")
    githubIcon.className = `fa-brands fa-github`

    githubLink.appendChild(githubIcon)

    myInfo.append(xLink, myLogo, githubLink)

    return myInfo

}

document.querySelector(".container").appendChild(myInformation())