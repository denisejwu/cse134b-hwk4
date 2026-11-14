const nameField = document.getElementById("name");
const nameError = document.getElementById("name-error");
const emailField = document.getElementById("email");
const emailError = document.getElementById("email-error");
const commentsField = document.getElementById("comments");
const commentsError = document.getElementById("comments-error");

const infoArea = document.getElementById("info-area");
const charCount = document.getElementById("char-count");
const warningAt = 50;

const form_errors=[];


function getErrorMessage(field, fieldName) {
    if(field.validity.valueMissing) {
        return fieldName + ": This field is required. Please fill it in.";
    }

    if(field.validity.typeMismatch) {
        return fieldName + ": Include an @ and a domain, like name@example.com.";
    }

    if(field.validity.tooShort) {
        return fieldName + ": Please enter at least " + field.minLength + " characters.";
    }

    return "";
}

function checkField(field, fieldName, errorElement) {
    field.setCustomValidity("");
    const message = getErrorMessage(field, fieldName);
    field.setCustomValidity(message);
    errorElement.textContent = message;
    return message;
}

function setupField(field, fieldName, errorElement) {
    field.addEventListener("change", function() {
        checkField(field, fieldName, errorElement);
    });
    field.addEventListener("invalid", function() {
        const message = checkField(field, fieldName, errorElement);
        const error = {
        field: fieldName,    // the variable, no quotes → "Name", "Email", or "Comments"
        message: message     // the variable from the line above
        };
        form_errors.push(error);
    }); 
    field.addEventListener("input", function() {
        if(errorElement.textContent !==  "") {
            checkField(field, fieldName, errorElement);
        }
    });
}
setupField(emailField, "Email", emailError);
setupField(nameField, "Name", nameError);
setupField(commentsField, "Comments", commentsError);


infoArea.hidden = false;

function updateCharCount(){
    const limit = commentsField.maxLength;
    const remaining = limit - commentsField.value.length;
    let message = "";
    let style = "";

    if(remaining === 0){
        message = "Comments: You've reached the " + limit + "-character limit.";
        style = "at-limit";
    } else if(remaining === 1){
        message = "Comments: Only " + remaining + " character left. You're close to the limit.";
        style = "warning";
    } else if(remaining <= warningAt){
        message = "Comments: Only " + remaining + " characters left. You're close to the limit.";
        style = "warning";
    } else{
        message = "Comments: " + remaining + " characters remaining.";
        style = "";
    }

    charCount.textContent = message;
    charCount.className = style;
}

commentsField.addEventListener("input", function(){
    updateCharCount();
});

updateCharCount();

const form = document.querySelector("form");
const formErrorsField = document.getElementById("form-errors");
form.addEventListener("submit", function(){
    formErrorsField.value = JSON.stringify(form_errors);

});



