/* =========================================================
   TASK 4
   COMPLEX FORM VALIDATION
   DYNAMIC DOM MANIPULATION
   CLIENT-SIDE ROUTING
========================================================= */


/* =========================================================
   1. CLIENT-SIDE ROUTING
========================================================= */

const pages = document.querySelectorAll(".page");

const routeLinks = document.querySelectorAll(".route-link");

function getCurrentRoute() {

    const route = window.location.hash.replace("#", "");

    return route || "home";
}


function navigateTo(route) {

    const validRoutes = [
        "home",
        "about",
        "projects",
        "register"
    ];

    if (!validRoutes.includes(route)) {
        route = "home";
    }

    pages.forEach((page) => {

        page.classList.remove("active-page");

        if (page.dataset.page === route) {
            page.classList.add("active-page");
        }

    });


    /* Update active navbar link */

    document.querySelectorAll(".nav-link").forEach((link) => {

        link.classList.remove("active");

        if (link.dataset.route === route) {
            link.classList.add("active");
        }

    });


    /* Close mobile Bootstrap navbar */

    const navbar = document.querySelector("#mainNavbar");

    if (navbar.classList.contains("show")) {

        const bootstrapCollapse =
            bootstrap.Collapse.getInstance(navbar);

        if (bootstrapCollapse) {
            bootstrapCollapse.hide();
        }

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* Detect URL changes */

window.addEventListener("hashchange", () => {

    navigateTo(getCurrentRoute());

});


/* Initial route */

navigateTo(getCurrentRoute());



/* =========================================================
   2. FORM ELEMENTS
========================================================= */

const form =
    document.querySelector("#registrationForm");

const fullName =
    document.querySelector("#fullName");

const username =
    document.querySelector("#username");

const email =
    document.querySelector("#email");

const password =
    document.querySelector("#password");

const confirmPassword =
    document.querySelector("#confirmPassword");

const bio =
    document.querySelector("#bio");

const terms =
    document.querySelector("#terms");



/* =========================================================
   3. PASSWORD RULE ELEMENTS
========================================================= */

const ruleLength =
    document.querySelector("#ruleLength");

const ruleUpper =
    document.querySelector("#ruleUpper");

const ruleLower =
    document.querySelector("#ruleLower");

const ruleNumber =
    document.querySelector("#ruleNumber");

const ruleSpecial =
    document.querySelector("#ruleSpecial");

const strengthFill =
    document.querySelector("#strengthFill");

const strengthText =
    document.querySelector("#strengthText");



/* =========================================================
   4. VALIDATION HELPERS
========================================================= */

function setValid(input, errorElement) {

    input.classList.remove("input-invalid");

    input.classList.add("input-valid");

    errorElement.textContent = "";
}


function setInvalid(input, errorElement, message) {

    input.classList.remove("input-valid");

    input.classList.add("input-invalid");

    errorElement.textContent = message;
}


function clearValidation(input, errorElement) {

    input.classList.remove("input-valid");

    input.classList.remove("input-invalid");

    errorElement.textContent = "";
}



/* =========================================================
   5. NAME VALIDATION
========================================================= */

function validateName() {

    const value = fullName.value.trim();

    const error =
        document.querySelector("#nameError");


    if (value.length === 0) {

        setInvalid(
            fullName,
            error,
            "Full name is required."
        );

        return false;
    }


    if (value.length < 3) {

        setInvalid(
            fullName,
            error,
            "Name must contain at least 3 characters."
        );

        return false;
    }


    if (!/^[A-Za-z ]+$/.test(value)) {

        setInvalid(
            fullName,
            error,
            "Name can only contain letters and spaces."
        );

        return false;
    }


    setValid(fullName, error);

    return true;
}



/* =========================================================
   6. USERNAME VALIDATION
========================================================= */

function validateUsername() {

    const value =
        username.value.trim();

    const error =
        document.querySelector("#usernameError");


    if (!value) {

        setInvalid(
            username,
            error,
            "Username is required."
        );

        return false;
    }


    if (value.length < 4) {

        setInvalid(
            username,
            error,
            "Username must contain at least 4 characters."
        );

        return false;
    }


    if (value.length > 20) {

        setInvalid(
            username,
            error,
            "Username cannot exceed 20 characters."
        );

        return false;
    }


    if (!/^[a-zA-Z0-9_]+$/.test(value)) {

        setInvalid(
            username,
            error,
            "Only letters, numbers and underscore are allowed."
        );

        return false;
    }


    setValid(username, error);

    return true;
}



/* =========================================================
   7. EMAIL VALIDATION
========================================================= */

function validateEmail() {

    const value =
        email.value.trim();

    const error =
        document.querySelector("#emailError");


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!value) {

        setInvalid(
            email,
            error,
            "Email address is required."
        );

        return false;
    }


    if (!emailPattern.test(value)) {

        setInvalid(
            email,
            error,
            "Enter a valid email address."
        );

        return false;
    }


    setValid(email, error);

    return true;
}



/* =========================================================
   8. PASSWORD STRENGTH
========================================================= */

function calculatePasswordStrength(value) {

    let score = 0;


    const hasLength =
        value.length >= 8;

    const hasUpper =
        /[A-Z]/.test(value);

    const hasLower =
        /[a-z]/.test(value);

    const hasNumber =
        /[0-9]/.test(value);

    const hasSpecial =
        /[^A-Za-z0-9]/.test(value);


    if (hasLength) score++;

    if (hasUpper) score++;

    if (hasLower) score++;

    if (hasNumber) score++;

    if (hasSpecial) score++;


    return {
        score,
        hasLength,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpecial
    };
}



function updatePasswordRules(result) {

    const rules = [

        {
            element: ruleLength,
            valid: result.hasLength
        },

        {
            element: ruleUpper,
            valid: result.hasUpper
        },

        {
            element: ruleLower,
            valid: result.hasLower
        },

        {
            element: ruleNumber,
            valid: result.hasNumber
        },

        {
            element: ruleSpecial,
            valid: result.hasSpecial
        }

    ];


    rules.forEach((rule) => {

        rule.element.classList.toggle(
            "valid",
            rule.valid
        );

    });

}



function updatePasswordStrength() {

    const value =
        password.value;

    const result =
        calculatePasswordStrength(value);


    updatePasswordRules(result);


    const percentage =
        (result.score / 5) * 100;


    strengthFill.style.width =
        `${percentage}%`;


    if (value.length === 0) {

        strengthText.textContent =
            "Too weak";

        strengthText.style.color =
            "var(--danger)";

        return;
    }


    if (result.score <= 2) {

        strengthText.textContent =
            "Weak";

        strengthText.style.color =
            "var(--danger)";

    }

    else if (result.score === 3) {

        strengthText.textContent =
            "Medium";

        strengthText.style.color =
            "var(--warning)";

    }

    else if (result.score === 4) {

        strengthText.textContent =
            "Strong";

        strengthText.style.color =
            "#84cc16";

    }

    else {

        strengthText.textContent =
            "Very Strong";

        strengthText.style.color =
            "var(--success)";
    }

}



/* =========================================================
   9. PASSWORD VALIDATION
========================================================= */

function validatePassword() {

    const value =
        password.value;

    const error =
        document.querySelector("#passwordError");


    updatePasswordStrength();


    if (!value) {

        setInvalid(
            password,
            error,
            "Password is required."
        );

        return false;
    }


    const result =
        calculatePasswordStrength(value);


    if (result.score < 5) {

        setInvalid(
            password,
            error,
            "Password must satisfy all requirements."
        );

        return false;
    }


    setValid(password, error);

    return true;
}



/* =========================================================
   10. CONFIRM PASSWORD
========================================================= */

function validateConfirmPassword() {

    const value =
        confirmPassword.value;

    const error =
        document.querySelector("#confirmError");


    if (!value) {

        setInvalid(
            confirmPassword,
            error,
            "Please confirm your password."
        );

        return false;
    }


    if (value !== password.value) {

        setInvalid(
            confirmPassword,
            error,
            "Passwords do not match."
        );

        return false;
    }


    setValid(confirmPassword, error);

    return true;
}



/* =========================================================
   11. BIO VALIDATION
========================================================= */

function validateBio() {

    const value =
        bio.value.trim();

    const error =
        document.querySelector("#bioError");


    if (!value) {

        error.textContent =
            "Please write a short bio.";

        return false;
    }


    if (value.length < 20) {

        error.textContent =
            "Bio must contain at least 20 characters.";

        return false;
    }


    error.textContent = "";

    return true;
}



/* =========================================================
   12. TERMS VALIDATION
========================================================= */

function validateTerms() {

    const error =
        document.querySelector("#termsError");


    if (!terms.checked) {

        error.textContent =
            "You must accept the terms.";

        return false;
    }


    error.textContent = "";

    return true;
}



/* =========================================================
   13. LIVE PASSWORD VALIDATION
========================================================= */

password.addEventListener(
    "input",
    () => {

        updatePasswordStrength();

        if (password.value.length > 0) {
            validatePassword();
        }

        if (confirmPassword.value.length > 0) {
            validateConfirmPassword();
        }

    }
);



/* =========================================================
   14. CONFIRM PASSWORD LIVE CHECK
========================================================= */

confirmPassword.addEventListener(
    "input",
    () => {

        if (confirmPassword.value.length > 0) {
            validateConfirmPassword();
        }

    }
);



/* =========================================================
   15. LIVE FIELD VALIDATION
========================================================= */

fullName.addEventListener(
    "blur",
    validateName
);

username.addEventListener(
    "blur",
    validateUsername
);

email.addEventListener(
    "blur",
    validateEmail
);

bio.addEventListener(
    "blur",
    validateBio
);



/* =========================================================
   16. BIO CHARACTER COUNTER
========================================================= */

const bioCount =
    document.querySelector("#bioCount");


bio.addEventListener(
    "input",
    () => {

        bioCount.textContent =
            bio.value.length;

    }
);



/* =========================================================
   17. PASSWORD VISIBILITY
========================================================= */

document
    .querySelectorAll(".password-toggle")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const targetId =
                    button.dataset.target;

                const input =
                    document.querySelector(
                        `#${targetId}`
                    );

                const icon =
                    button.querySelector("i");


                if (input.type === "password") {

                    input.type = "text";

                    icon.className =
                        "bi bi-eye-slash";

                }

                else {

                    input.type = "password";

                    icon.className =
                        "bi bi-eye";

                }

            }
        );

    });



/* =========================================================
   18. FORM SUBMISSION
========================================================= */

form.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const nameValid =
            validateName();

        const usernameValid =
            validateUsername();

        const emailValid =
            validateEmail();

        const passwordValid =
            validatePassword();

        const confirmValid =
            validateConfirmPassword();

        const bioValid =
            validateBio();

        const termsValid =
            validateTerms();


        const formIsValid =
            nameValid &&
            usernameValid &&
            emailValid &&
            passwordValid &&
            confirmValid &&
            bioValid &&
            termsValid;


        if (!formIsValid) {

            const firstInvalid =
                document.querySelector(
                    ".input-invalid"
                );

            if (firstInvalid) {

                firstInvalid.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                firstInvalid.focus();

            }

            return;
        }


        showSuccess();

    }
);



/* =========================================================
   19. SUCCESS STATE
========================================================= */

function showSuccess() {

    const registrationForm =
        document.querySelector(
            "#registrationForm"
        );

    const successPanel =
        document.querySelector(
            "#formSuccess"
        );

    const successText =
        document.querySelector(
            "#successText"
        );


    const name =
        fullName.value.trim();


    successText.textContent =
        `Welcome ${name}! Your form passed all validation rules successfully.`;


    registrationForm.classList.add(
        "d-none"
    );

    successPanel.classList.remove(
        "d-none"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =========================================================
   20. RESET FORM
========================================================= */

document
    .querySelector("#resetFormBtn")
    .addEventListener(
        "click",
        () => {

            form.reset();


            document
                .querySelectorAll(
                    ".input-valid, .input-invalid"
                )
                .forEach((element) => {

                    element.classList.remove(
                        "input-valid",
                        "input-invalid"
                    );

                });


            document
                .querySelectorAll(
                    ".validation-message"
                )
                .forEach((element) => {

                    element.textContent = "";

                });


            document
                .querySelectorAll(".rule")
                .forEach((rule) => {

                    rule.classList.remove(
                        "valid"
                    );

                });


            strengthFill.style.width =
                "0%";

            strengthText.textContent =
                "Too weak";

            strengthText.style.color =
                "var(--danger)";


            bioCount.textContent =
                "0";


            document
                .querySelector("#registrationForm")
                .classList.remove("d-none");


            document
                .querySelector("#formSuccess")
                .classList.add("d-none");

        }
    );



/* =========================================================
   21. DYNAMIC DOM DEMO
========================================================= */

const domDemoBtn =
    document.querySelector("#domDemoBtn");

const dynamicMessage =
    document.querySelector("#dynamicMessage");


let domUpdated = false;


domDemoBtn.addEventListener(
    "click",
    () => {

        domUpdated = !domUpdated;


        if (domUpdated) {

            dynamicMessage.textContent =
                "DOM updated successfully! JavaScript changed this text dynamically.";

            dynamicMessage.style.color =
                "var(--success)";

            domDemoBtn.innerHTML =
                '<i class="bi bi-check-circle"></i> DOM Updated';

        }

        else {

            dynamicMessage.textContent =
                "Click the button to modify this DOM element.";

            dynamicMessage.style.color =
                "";

            domDemoBtn.textContent =
                "Update DOM";

        }

    }
);



/* =========================================================
   22. DYNAMIC CHARACTER COUNTER DEMO
========================================================= */

const demoInput =
    document.querySelector("#demoInput");

const demoCount =
    document.querySelector("#demoCount");


demoInput.addEventListener(
    "input",
    () => {

        demoCount.textContent =
            demoInput.value.length;

    }
);



/* =========================================================
   23. PASSWORD DEMO BUTTON
========================================================= */

const demoPasswordBtn =
    document.querySelector(
        "#demoPasswordBtn"
    );


let demoPasswordVisible =
    false;


demoPasswordBtn.addEventListener(
    "click",
    () => {

        demoPasswordVisible =
            !demoPasswordVisible;


        if (demoPasswordVisible) {

            demoPasswordBtn.innerHTML =
                '<i class="bi bi-eye-slash"></i> Password Visible';

        }

        else {

            demoPasswordBtn.innerHTML =
                '<i class="bi bi-eye"></i> Try interaction';

        }

    }
);