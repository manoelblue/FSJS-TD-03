console.log('test');

//Global variables:
const inputName = document.getElementById("name");
const inputOtherJob = document.getElementById("other-job-role");
const selectJob = document.getElementById("title");
const selectColor = document.getElementById("color");
const selectDesign = document.getElementById("design");

// Global variables for payment:
const selectPayment = document.getElementById("payment");
const paymentOptions = document.querySelectorAll("select#payment option");
const paymentMenus = buildPaymentMenus(paymentOptions);
let chosenPaymentIndex = selectPayment.options.selectedIndex;
let chosenPaymentMethod = paymentOptions[chosenPaymentIndex].value;

// Global variables for activities fieldset:
const activitiesField = document.getElementById("activities");
const activitiesCostElem = document.getElementById("activities-cost");
let activitiesCostValue = 0;

// Global functions:
/**
 * @function buildPaymentMenus
 * @description Creates a nodelist with all menu divs
 * @param {NodeList} - nodelist with possible options of payment
 */
function buildPaymentMenus(paymentOptions) {
    let menus = [];
    for (let i = 0; i < paymentOptions.length; i++) {
        let menu = document.getElementById(paymentOptions[i].value);
        menus.push(menu);
    }

    return menus;
};

// Highlight name input when page first loads:
inputName.focus();

//Hide the other-job-role input by default:
inputOtherJob.style.display = "none";

//Listen to changes on select Job and show/hide input other job:
selectJob.addEventListener("change", (e) => {
    let selectedIndex = e.target.options.selectedIndex;
    let selectedOption = e.target[selectedIndex].value;

    console.log(selectedIndex);
    console.log(selectedOption);

    if(selectedOption === "other") {
        inputOtherJob.style.display = "block"
    } else {
        inputOtherJob.style.display = "none";
    }
})

// Disable select color:
selectColor.disabled = true;
console.dir(selectColor);

// Listen to change in selectDesgin:
selectDesign.addEventListener("change", (e) => {
    let selectedIndex = e.target.options.selectedIndex;
    let selectedOption = e.target[selectedIndex].value;
    let options = document.querySelectorAll("option[data-theme]");

    selectColor.disabled = false;
    for ( let i = 0; i < options.length; i++) {
        let dataTheme = options[i].dataset.theme;
        console.log(dataTheme);

        if (selectedOption !== dataTheme) {
            options[i].hidden = true;
        } else {
            options[i].hidden = false;
        }
    }
})

// Listen for change in the Activities fieldset:
activitiesField.addEventListener("change", (e) => {
    let cost = parseInt(e.target.dataset.cost);

    if (e.target.checked) {
        activitiesCostValue += cost;
    } else {
        activitiesCostValue -= cost;
        if (activitiesCostValue <= 0) {
            activitiesCostValue = 0;
        }
    }

    activitiesCostElem.textContent = `Total: $${activitiesCostValue}`
})

/**
 * @function choosePaymentMethod
 * @param {number} - sets the chosen payment method index
 * @description chooses the payment method
 */
function choosePaymentMethod(paymentIndex) {
    chosenPaymentIndex = paymentIndex;
    chosenPaymentMethod = paymentOptions[paymentIndex].value;

    for (let i = 0; i < paymentMenus.length; i++) {
        if (paymentMenus[i]) {
            paymentMenus[i].style.display = "none";
            paymentMenus[chosenPaymentIndex].style.display = "block";
        }
    }
}

// Display only payment chosen payment section:
selectPayment.addEventListener("change", (e) => {
    choosePaymentMethod(e.target.options.selectedIndex);
})

// Select the creadit card paymentoption by default:
choosePaymentMethod(1);

