function calculate() {
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    let result = document.getElementById("result_out");

    // Simple validation
    if (weight === "" || height === "" || weight <= 0 || height <= 0) {
        result.innerText = "Enter valid values";
        return;
    }

    height = height / 100;           // convert cm into meters
    let bmi = weight / (height * height); //BMI formula

    result.innerText = "BMI: " + bmi.toFixed(2); //upto 2 decimal points
}