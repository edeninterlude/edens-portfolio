const MIN_MESSAGE_LENGTH = 20;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const form = document.querySelector("#contactform");

if (form) {
    const feedback = document.querySelector("#feedback");
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");
    const counter = document.querySelector("#counter");

    function showFeedback(text, type) {
        feedback.textContent = text;
        feedback.classList.remove("error", "success");
        feedback.classList.add(type);
    }

    function getError(name, email, message) {
        if (name === "") {
            return { text: "Please enter your name.", field: nameInput };
        }
        if (email === "") {
            return { text: "Please enter your email.", field: emailInput };
        }
        if (!EMAIL_PATTERN.test(email)) {
            return { text: "Please enter an email address in a valid format.", field: emailInput };
        }
        if (message.length < MIN_MESSAGE_LENGTH) {
            return {
                text: `Please write at least ${MIN_MESSAGE_LENGTH} characters (you have ${message.length}).`,
                field: messageInput
            };
        }
        return null;
    }

    messageInput.addEventListener("input", () => {
        counter.textContent = `${messageInput.value.trim().length} characters entered`;
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        const error = getError(name, email, message);

        if (error) {
            showFeedback(error.text, "error");
            error.field.focus();
            return;
        }

        showFeedback(`Thanks, ${name}! Your form passed validation.`, "success");
        form.reset();
        counter.textContent = "0 characters entered";
    });
}