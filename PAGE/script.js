
const API_URL = "https://api.adviceslip.com/advice";


const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const adviceButton = document.getElementById("advice-button");
const statusMessage = document.getElementById("status-message");


function renderAdvice(slip) {
    adviceId.textContent = `ADVICE #${slip.id}`;
    adviceText.textContent = `"${slip.advice}"`;
}


async function getAdvice() {
    try {
        
        adviceButton.disabled = true;
        statusMessage.textContent = "Loading advice...";

        
        const response = await fetch(API_URL, {
            cache: "no-store"
        });

        
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        
        const data = await response.json();

        
        const { slip } = data;

        
        if (!slip || !slip.id || !slip.advice) {
            throw new Error("Invalid advice received.");
        }

        
        renderAdvice(slip);

        
        statusMessage.textContent = "";

    } catch (error) {
        
        console.error("Failed to fetch advice:", error);
        statusMessage.textContent =
            "Unable to load advice. Please check your connection and try again.";

    } finally {
        
        adviceButton.disabled = false;
    }
}


adviceButton.addEventListener("click", getAdvice);


getAdvice();