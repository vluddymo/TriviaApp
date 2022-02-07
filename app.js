const game = document.querySelector("#game");
const scoreDisplay = document.querySelector("#score");
let score = 0;

const genres = [
    {
        name: "film",
        id: 11
    },
    {
        name: "video games",
        id: 15
    },
    {
        name: "nature",
        id: 17
    },
    {
        name: "music",
        id: 12
    }
];


const levels = ["easy", "medium", "hard"];

function addGenre(genre) {
  const column = document.createElement("div");
  column.classList.add("genre-column");
  column.innerHTML = genre.name;
  game.append(column);

  levels.forEach((level) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (level === "easy") {
      card.innerHTML = 100;
    }

    if (level === "medium") {
      card.innerHTML = 200;
    }

    if (level === "hard") {
      card.innerHTML = 300;
    }

    fetch(
      `https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`
    )
      .then((response) => response.json())
      .then((data) => {
          card.setAttribute('data-question', data.results[0].question);
          card.setAttribute('data-answer', data.results[0].correct_answer);
          card.setAttribute('data-value', card.getInnerHTML());
          console.log(data)
        })
        .then(done => card.addEventListener('click', flipCard))
})
}

genres.forEach(genre => {
    addGenre(genre)
})

function flipCard(){
    console.log("clicked");
    this.style.fontSize = "15px";
    this.innerHTML = "";
    const textDisplay = document.createElement("div");
    const trueButton = document.createElement("button");
    const falseButton = document.createElement("button");
    trueButton.classList.add("true-button")
    falseButton.classList.add("false-button")
    trueButton.innerHTML = "True";
    falseButton.innerHTML = "False";
    trueButton.addEventListener("click", getResult);
    falseButton.addEventListener("click", getResult);
    textDisplay.innerHTML = this.getAttribute("data-question");
 

    this.append(textDisplay, trueButton, falseButton);

    const allCards = Array.from(document.querySelectorAll(".card"));
    allCards.forEach(card => card.removeEventListener("click", flipCard));
}

function getResult(){
    const cardOfButton = this.parentElement;
    console.log(cardOfButton.getAttribute("data-answer"));
    console.log(this.innerHTML)
    if (cardOfButton.getAttribute("data-answer") === this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute("data-value"));
        scoreDisplay.innerHTML = score;
        cardOfButton.classList.add("correct-answer");
        setTimeout(() => {
            while (cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute("data-value");
        }, 100)
    } else {
        cardOfButton.classList.add("wrong-answer");
        setTimeout(() => {
            while (cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0;
        }, 100)
    }

    const allCards = Array.from(document.querySelectorAll(".card"));
    allCards.forEach(card => card.addEventListener("click", flipCard));

    cardOfButton.removeEventListener("click", flipCard);

}
