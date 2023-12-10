
const cards = [
    [
        "Generative AI can be used to mimic a persons voice. This can be used in cases where people are unable to speak, or lose their speech later in life. Voice generators have already been used by many people prior to the genesis of generative AI, but if it's known someone is going to lose their speech, this can be used to train a model on their voice, preserving it after they lose it.",
        "https://youtube.com/embed/Ck8gFM3wu2U?controls=1",
        "On the contrary, generative AI can be used to maliciously use other people's voices, or can be used to break trust barriers. For example, YouTuber Kwebbelkop transitioned to fully AI-generated content, which has become increasingly popular with short-form content.<br/><br/><b>Algorithmic bias</b> in the YouTube algorithm has been prioritizing this AI-generated short-form content, which people have complained about.",
        "https://youtube.com/embed/9zK0FMKmyK4?controls=1"
    ],
    [
        "For people with physical or cognitive disability, generative AI can be used to create art or writing for them based off of simple prompts. This gives them the ability to visualize ideas without being hampered by their conditions. This image shows a happy little bee to show how generative AI can be used for fun and simple prompts.",
        "./images/bee.png",
        "On the contrary, generative AI can be used to mimic a popular artists style, essentially stealing their art as the generative AI has to use information specifically from their context. This image shows an AI-generated Starry Night, which would be considered stolen content.<br/><br/><b>Algorithmic bias</b> may impact art depicting people as the training data may perpetuate racial, gender, or socio-economic bias.",
        "./images/starry.png"
    ],
    [
        "Generative AI can also be used as an assistance tool for software developers. GitHub Copilot and ChatGPT are both commonly used solutions, with GitHub Copilot working inside of the popular IDE Visual Studio Code. There are other solutions similar to these that have broken out onto the market, so it's clear there will be large amounts of innovation in this area in the coming years.",
        "./images/copilot.png",
        "On the contrary, the rapid rise of generative AI will likely disrupt the job market as it grows more and more capable of developing large codebases. For example, ChatGPT can give fairly accurate code blocks for complex applications, including most, if not all, modern software languages.<br/><br/><b>Algorithmic bias</b> may negatively impact it's decisions when assising people with job selection, financial decisions, etc.",
        "./images/jobless.png"
    ]
];

function getInputData() {
    let dataToPost = new FormData();
    document.querySelector(".radio-1").querySelectorAll("input").forEach(input => {
        if (input.checked) {
            dataToPost.append("entry.2060839021", input.value);
        }
    });
    document.querySelector(".radio-2").querySelectorAll("input").forEach(input => {
        if (input.checked) {
            dataToPost.append("entry.1143883225", input.value);
        }
    });
    document.querySelector(".radio-3").querySelectorAll("input").forEach(input => {
        if (input.checked) {
            dataToPost.append("entry.1033589578", input.value);
        }
    });
    document.querySelector(".radio-4").querySelectorAll("input").forEach(input => {
        if (input.checked) {
            dataToPost.append("entry.24547023", input.value);
        }
    });
    return dataToPost;
}

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSeIbUmHyK-bO4h3hfXivUrF7oGCPOhNNXAJnx95357KkTfFaQ/formResponse", {
        method: "POST",
        mode: "no-cors",
        header: {
            'Content-Type': 'application/json'
        },
        body: getInputData()
    }).then(data => {
        document.querySelector("form").parentElement.innerHTML = "<div style='margin-top: 50%; text-align: center; width: stretch; font-size: 2vw; font-weight: 600;'>Thanks for participating!</div>";
    }).catch(err => console.error(err));
});

const card_container = document.querySelector(".card_container");
const read_cards = document.querySelector(".read_cards");

cards.forEach((card, index) => {
    const front = card[0], back = card[2], frontUrl = card[1], backUrl = card[3];
    const container = document.createElement("div");
    container.classList.add("container");
    container.style.setProperty("display", index === 0 ? "flex" : "none");

    const card_div = document.createElement("div");
    card_div.classList.add("card");
    card_div.dataset.front = frontUrl;
    card_div.dataset.back = backUrl;

    const card_front = document.createElement("div");
    card_front.classList.add("card_front", "face");
    card_front.innerHTML = front;
    card_div.appendChild(card_front);

    const card_back = document.createElement("div");
    card_back.classList.add("card_back", "face");
    card_back.innerHTML = back;
    card_div.appendChild(card_back);
    card_div.onclick = function (evt) {
        const parent = evt.currentTarget.parentElement;
        const card_elmt = evt.currentTarget;
        if (!parent.classList.contains("read_cards")) {
            card_elmt.nextElementSibling.firstElementChild.src = card_elmt.dataset.back;
        }
        if (card_elmt.style.transform === 'rotateY(180deg)' && !parent.classList.contains("read_cards")) {
            const front_url = document.createElement("a");
            front_url.href = frontUrl;
            front_url.innerHTML = "<br />media";
            front_url.onclick = function (evt) {
                evt.stopPropagation();
            }
            front_url.target = "_blank";
            card_front.appendChild(front_url);

            const back_url = document.createElement("a");
            back_url.href = backUrl;
            back_url.innerHTML = "<br />media";
            back_url.onclick = function (evt) {
                evt.stopPropagation();
            }
            back_url.target = "_blank";
            card_back.appendChild(back_url);

            read_cards.appendChild(card_elmt);
            parent.nextElementSibling?.style.setProperty("display", "flex");
            parent.remove();
            if (index === cards.length - 1) {
                document.querySelector(".form").style.setProperty("display", "block");
            }
        }
        flipCard(card_elmt);
    }

    container.appendChild(card_div);

    const media_container = document.createElement("div");
    media_container.classList.add("media_container");

    if (frontUrl.includes("https")) {
        const iframe = document.createElement("iframe");
        iframe.style.setProperty("height", "20.8888888889vw");
        iframe.style.setProperty("width", "11.75vw");
        iframe.src = frontUrl;
        media_container.classList.add("video");
        media_container.appendChild(iframe);
    } else {
        const image = document.createElement("img");
        image.style.setProperty("width", "stretch");
        image.src = frontUrl;
        media_container.classList.add("image");
        media_container.style.setProperty("height", "min-content")
        media_container.appendChild(image);
    }
    container.appendChild(media_container);
    card_container.appendChild(container);
});

/**
 * @param {HTMLElement} card
 */
function flipCard(card) {
    card.style.transform = card.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
}