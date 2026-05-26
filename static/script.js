async function translateText() {
    const text = document.getElementById("inputText").value;
    const src = document.getElementById("sourceLang").value;
    const dest = document.getElementById("targetLang").value;

    if (text.trim() === "") {
        alert("Please enter text");
        return;
    }

    document.getElementById("loader").style.display = "block";

    try {

        const response = await fetch("/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text,
                src,
                dest
            })
        });

        const data = await response.json();

        document.getElementById("outputText").innerText =
            data.translated_text;
        addToHistory(text, data.translated_text);

    } catch (error) {

        alert("Translation failed");
    }

    document.getElementById("loader").style.display = "none";
}
function toggleTheme() {

    document.body.classList.toggle("light-mode");
}
function addToHistory(original, translated) {

    const historyList =
        document.getElementById("historyList");

    const li = document.createElement("li");

    li.innerHTML = `
        <strong>Input:</strong> ${original}<br>
        <strong>Output:</strong> ${translated}
    `;

    historyList.prepend(li);
}