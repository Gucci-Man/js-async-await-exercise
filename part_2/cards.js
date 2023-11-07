// 1.

let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

async function requestCard() {
    try {
        let res = await axios.get(url);
        let deck_id = res.data.deck_id;

        let card = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)

        let value = card.data.cards[0].value;
        let suit = card.data.cards[0].suit;
        console.log(`Card value is ${value} and card suit is ${suit}`);
    } catch (e) {
        console.log("Error!", e);
    }
};

requestCard();

// 2. 

async function requestTwoCards() {

    try {
        let res = await axios.get(url); // request deck_id of newly shuffled deck
        let deck_id = res.data.deck_id;

        let card1 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
        let card2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);

        let val1 = card1.data.cards[0].value;
        let suit1 = card1.data.cards[0].suit;
        let val2 = card2.data.cards[0].value;
        let suit2 = card2.data.cards[0].suit;

        console.log(`Second round card #1 value is ${val1} and card suit is ${suit1}`);
        console.log(`Second round card #2 value is ${val2} and card suit is ${suit2}`);
    } catch (e) {
        console.log("Error!", e);
    };
};
requestTwoCards();

// 3. 

const button = document.querySelector("button");
const board = document.querySelector("#board")
const body = document.querySelector("body");
let deckid = null;

async function requestCards() {

    try {
        let res = await axios.get(url);
        deckid = res.data.deck_id;
        
        button.addEventListener('click', async () => {
            let deck = await axios.get(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`);
            console.log(`Cards remaining: ${deck.data.remaining}`)

            let cardSrc = deck.data.cards[0].image;

            const newImg = document.createElement("img");
            newImg.setAttribute("src", cardSrc);
            board.append(newImg);

            if (deck.data.remaining === 0) {
                console.log("OUT OF CARDS!")
                body.removeChild(button);
            }
        })
    } catch (e) {
        console.log("Card game failed!", e);
    };
};

requestCards();