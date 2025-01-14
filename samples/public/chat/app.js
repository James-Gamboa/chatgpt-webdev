const OPENAI_KEY = "";
const price = 0.0002/1000;

const messages = [];
let totalTokens = 0;

async function sendChat() {
    const prompt = document.querySelector("#prompt").value;
    document.querySelector("#prompt").value = "";
    document.querySelector("ul").innerHTML += `<li><b>${prompt}</b></li>`;

    // TODO make query and parse results
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    }
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify(data)
    });
    
    const json = await response.json();
    const messages = json.choices[0].message.content;
    document.querySelector("ul").innerHTML += `<li>${messages}</li>`;

    document.querySelector("#prompt").value = "";
    document.querySelector("input").focus();
}