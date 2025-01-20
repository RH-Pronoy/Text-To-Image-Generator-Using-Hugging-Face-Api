const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

const loading = document.createElement("img");
loading.src = "PVtR.gif";
loading.alt = "Loading...";
loading.style.display = "none";
loading.style.marginTop = "20px";
loading.style.width = "50px";
document.body.appendChild(loading);

const t = "";
async function query() {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
            headers: { Authorization: `Bearer ${t}` },
            method: "POST",
            body: JSON.stringify({ inputs: inputTxt.value }),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.blob();
    return result;
}

button.addEventListener("click", async function () {
    if (!inputTxt.value.trim()) {
        alert("Please enter some text!");
        return;
    }

    loading.style.display = "block";
    image.hidden = true;

    try {
        const response = await query();
        const objectURL = URL.createObjectURL(response);

        image.src = objectURL;
        image.hidden = false;
    } catch (err) {
        console.error("Error generating image:", err);
        alert("Failed to generate the image. Please try again.");
    } finally {
        loading.style.display = "none";
    }
});
