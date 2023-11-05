const div1 = document.querySelector("#one");
const p = document.createElement("p");

// 1. Get a fact about your favorite number (90)

let url = "http://numbersapi.com/90?json"
axios.get(url)
.then(res => {
    console.log(res.data.text)

    p.innerText = res.data.text;
    div1.append(p)
})
.catch(err => console.log("REJECTED!", err))

// 2. Get data on multiple numbers in a single request

const ul = document.querySelector("#two");
const oneLi = document.createElement("li");
const twoLi = document.createElement("li");
const threeLi = document.createElement("li");
const fourLi = document.createElement("li");

let numberPromises = []; // to store promises
let responseArr = []; // to store responses

secondLi = document.createElement("li");

for (let i = 1; i < 5; i++) {
    numberPromises.push(
      axios.get(`http://numbersapi.com/${i}?json`)
    );
  }

Promise.all(numberPromises)
    .then(numbersArr => {
        for (res of numbersArr) {
            console.log(res.data.text)
            responseArr.push(res.data.text)
        }

        console.log(`length of array is ${numbersArr.length}`)
        oneLi.innerText = responseArr[0];
        twoLi.innerText = responseArr[1];
        threeLi.innerText = responseArr[2];
        fourLi.innerText = responseArr[3];

        ul.append(oneLi);
        ul.append(twoLi);
        ul.append(threeLi);
        ul.append(fourLi);
  
    })
    .catch(err => console.log("REJECTED!", err))

// 3. Use API to get 4 facts on your favorite number. Once you have them all, put them on the page.

const ol = document.querySelector("#three");
const liOne = document.createElement("li");
const liTwo = document.createElement("li");
const liThree = document.createElement("li");
const liFour = document.createElement("li");

axios.get(url)
.then(res => {
    console.log("First Promise resolved")
    console.log(res.data.text)
    liOne.innerText = res.data.text;
    ol.append(liOne)
    return axios.get(url)
})
.then(res => {
    console.log("Second Promise resolved")
    console.log(res.data.text)
    liTwo.innerText = res.data.text;
    ol.append(liTwo)
    return axios.get(url)
})
.then(res => {
    console.log("Third Promise resolved")
    console.log(res.data.text)
    liThree.innerText = res.data.text;
    ol.append(liThree)
    return axios.get(url)
})
.then(res => {
    console.log("Forth Promise resolved")
    console.log(res.data.text)
    liFour.innerText = res.data.text;
    ol.append(liFour)
    return axios.get(url)
})
.catch(err => console.log("REJECTED!", err))