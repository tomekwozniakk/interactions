import '../scss/main.scss';

// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */

console.log('HELLO 🚀');

const button = document.querySelector('.button');
const inputOne = document.querySelector('.drug__name-first--js');
const inputTwo = document.querySelector('.drug__name-second--js');
const disclaimer = document.querySelector('.disclaimer');
const comment = document.querySelector('.comment');


button.addEventListener('click', (e) =>{
    const dataOne = inputOne.value;
    const dataTwo = inputTwo.value;
    comment.innerHTML = '';
    disclaimer.innerHTML = '';
    fetch(`https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${dataOne}&maxEntries=1&option=1`)
    .then(resp => resp.json())
    .then(resp => {
        let resultOne = resp.approximateGroup.candidate[0].rxcui;
        
    fetch(`https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${dataTwo}&maxEntries=1&option=1`)
    .then(resp => resp.json())
    .then(resp => {
        let resultTwo = resp.approximateGroup.candidate[0].rxcui;
    
    fetch(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${resultOne}+${resultTwo}&sources=DrugBank`)
    .then(resp => resp.json())
    .then(resp => {
        let disclaimerText = resp.nlmDisclaimer;
        disclaimer.innerHTML = disclaimerText;
        if(resp.fullInteractionTypeGroup) {
        let commentText = resp.fullInteractionTypeGroup[0].fullInteractionType[0].interactionPair[0].description;
        comment.innerHTML = commentText;
        console.log(commentText);
        }
        else {
            comment.innerHTML = `There was no interactions to display.` 
        }
})})})
    
    .catch()
})
