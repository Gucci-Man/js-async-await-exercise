// 1.

let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
axios.get(url)
.then(res => {

    let deck_id = res.data.deck_id;
    return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
})
.then(res => {
    let value = res.data.cards[0].value;
    let suit = res.data.cards[0].suit;
    console.log(`Card value is ${value} and card suit is ${suit}`);
})
.catch(err => console.log("Rejected!", err))

// 2. 

let = cardsArr = []; // will hold the two card promises
axios.get(url)
.then(res => {

    let deck_id = res.data.deck_id;

    for (let i=0; i<2; i++) {
        cardsArr.push(
            axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            );
    }

    Promise.all(cardsArr)
        .then(chosenArr => {
            for (res of chosenArr) {
                let value = res.data.cards[0].value;
                let suit = res.data.cards[0].suit;
                console.log(`Second round card value is ${value} and card suit is ${suit}`);
            }
        })
        .catch(err => console.log(err));
})
.catch(err => console.log("Rejected!", err))

// 3. 

const button = document.querySelector("button");
const board = document.querySelector("#board")
const body = document.querySelector("body");
let deckid = null;

axios.get(url)
.then(res => {
    deckid = res.data.deck_id;
})
.catch(err => console.log("Rejected!", err))

button.addEventListener('click', () => {
    axios.get(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`)
    .then( res => {
        
        console.log(`Cards remaining: ${res.data.remaining}`)
        let cardSrc = res.data.cards[0].image;

        const newImg = document.createElement("img");
        newImg.setAttribute("src", cardSrc);
        board.append(newImg);

        if (res.data.remaining === 0) {
            console.log("OUT OF CARDS!")
             body.removeChild(button);
        }
    })
    .catch( err => console.log("Rejected!", err)
    );
});