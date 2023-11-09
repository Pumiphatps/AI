
const button = document.querySelector("button.submit");
const imageContainer = document.querySelector("section.imageContainer");
const form = document.querySelector("form");
const input = document.querySelector("input.description");
const OPENAI_API_KEY = "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";

function handleForm(event) {
  event.preventDefault();
}

form.addEventListener("submit", handleForm);

const getImage = async () => {
  if (input.value === "") {
    return;
  } else {
   
    imageContainer.classList.add("loading");

    imageContainer.innerHTML = "";

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Create an amazing image using this description: ${input.value}`,
          n: 4,
          size: "256x256",
        }),
      }
    );

    const result = await response.json();
    console.log(result);

    imageContainer.classList.remove("loading");


    result.data.forEach((item) => {
      if (item.url) {
        const img = document.createElement("img");
        img.src = item.url;
        img.alt = "Generated image";
        imageContainer.appendChild(img);
      }
    });

    input.value = "";
  }
};

button.addEventListener("click", getImage);
