const lengthSlider = document.querySelector(".pass-length input"),
    options = document.querySelectorAll(".option input"),
    passwordInput = document.querySelector(".input-box input"),
    passIndicator = document.querySelector(".pass-indicator"),
    copyIcon = document.querySelector(".input-box span"),
    generateBtn = document.querySelector(".generate-btn")

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWZYZ",
    numbers: "0123456789",
    symbols: "@#$%^&()_;:*-+|[],.{}<>~"

}



const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value

    // looping through each option's checkbox
    options.forEach(option => {
        if (option.checked) { // if checkbox is checked
            // if checkbox id isn't exc-duplicate and spaces
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                 // adding particular key value from character object to staticPassword
                staticPassword += characters[option.id]
            }
            else if (option.id == "spaces"){  // if checkbox id is spaces
                staticPassword += ` ${staticPassword} ` // adding space at the beginning and end of staticPassword
            }
            else{
                excludeDuplicate = true
            }
           
        }
    })

    for (let i = 0; i < passLength; i++) {
        // getting random character from the static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
        if(excludeDuplicate){   // if exclude character is true
            // if randomPassword doesn't contains the current random character or randomChar is equal
            // to spaces " " then add random character to randomPassword else decrement i by -1
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--
        }
        else{
            randomPassword += randomChar
        }
        passwordInput.value = randomPassword  // passing random password to password input 
    }
    
}

const updatePassIndicator = () =>{
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong"
}


const updateSlider = () => {
    // passing slider value as counter text
    document.querySelector(".pass-length span").innerText = lengthSlider.value
    generatePassword()
    updatePassIndicator()
}

updateSlider()


const copyPassword = () =>{
    navigator.clipboard.writeText(passwordInput.value) // copying random password
    copyIcon.innerText = "check"                       // changing copy icon to tick
    setTimeout(() => {                                 // afer 1500ms chaging tick icon to copy
    copyIcon.innerText = "copy_all"
    }, 1500)
}


lengthSlider.addEventListener("input", updateSlider)
copyIcon.addEventListener("click", copyPassword)
generateBtn.addEventListener("click", generatePassword)