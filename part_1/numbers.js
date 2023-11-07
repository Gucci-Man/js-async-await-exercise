const div1 = document.querySelector("#one");
const p = document.createElement("p");

// 1. Get a fact about your favorite number (90)

let url = "http://numbersapi.com/90?json"

async function getFavoriteNumber() {
    try {
        const res = await axios.get(url);

        console.log(res.data.text);
        p.innerText = res.data.text;
        div1.append(p);
    } catch (e) {
        console.log("Error!", e.message);
    }
    
};

getFavoriteNumber();

// 2. Get data on multiple numbers in a single request

const ul = document.querySelector("#two");
const oneLi = document.createElement("li");
const twoLi = document.createElement("li");
const threeLi = document.createElement("li");
const fourLi = document.createElement("li");

let numberPromises = []; // to store promises

for (let i = 1; i < 5; i++) {
    numberPromises.push(
      axios.get(`http://numbersapi.com/${i}?json`)
    );
  }

async function multiNumberFacts() {

    try {
        let respArr = await Promise.all(numberPromises);

        /* console.log(`length of array is ${respArr.length}`);
        console.log(respArr); */
        oneLi.innerText = respArr[0].data.text;
        twoLi.innerText = respArr[1].data.text;
        threeLi.innerText = respArr[2].data.text;
        fourLi.innerText = respArr[3].data.text;

        ul.append(oneLi);
        ul.append(twoLi);
        ul.append(threeLi);
        ul.append(fourLi);
    } catch (e) {
        console.log("Error!", e);
    }
}
multiNumberFacts();

// 3. Use API to get 4 facts on your favorite number. Once you have them all, put them on the page.

const ol = document.querySelector("#three");
const liOne = document.createElement("li");
const liTwo = document.createElement("li");
const liThree = document.createElement("li");
const liFour = document.createElement("li");

async function favNumberFacts() {

    try {
        let f1 = await axios.get(url);
        let f2 = await axios.get(url);
        let f3 = await axios.get(url);
        let f4 = await axios.get(url);

        liOne.innerText = f1.data.text;
        liTwo.innerText = f2.data.text;
        liThree.innerText = f3.data.text;
        liFour.innerText = f4.data.text;

        ol.append(liOne);
        ol.append(liTwo);
        ol.append(liThree);
        ol.append(liFour);
    } catch (e) {
        console.log("Error!", e);
    }
};

favNumberFacts();
