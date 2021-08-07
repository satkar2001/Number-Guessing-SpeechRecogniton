const msgEl=document.getElementById('msg');
const randnum=getRandomNumber();

console.log(randnum);
window.SpeechRecognition= window.SpeechRecognition||window.webkitSpeechRecognition;
let recognition=new window.SpeechRecognition();
recognition.start();
function onSpeak(e){
    const mg=e.results[0][0].transcript;
    writeMessage(mg);
    checkNumber(mg);
}
function writeMessage(mg){
    msgEl.innerHTML=`
    <div>you said:</div>
        <span class="box">${mg}</span>
    `;
}
function checkNumber(mg){
    const num= +mg;
    if(Number.isNaN(num)){
        msgEl.innerHTML=`<div> this is not a valid number</div>`;
        return;
    }
    if(num>100||num<1){
        msgEl.innerHTML=`<div> number must be between 1 and 100</div>`
    }
    if(num==randnum){
        document.body.innerHTML=`<h2>congrats you have guessed it correctly<br></br>
        it was ${num}</h2>
        <button class="play-again" id="play-again">play again</button>`;
    }
    else if(num > randnum){
        msgEl.innerHTML +=`<div>go lower</div>`;
    }
    else{
        msgEl.innerHTML +=`<div>go higher</div>`;
    }
}

function getRandomNumber(){
 return Math.floor(Math.random() *100)+1;

}
recognition.addEventListener('result',onSpeak);

recognition.addEventListener('end',()=>recognition.start());

document.addEventListener('click',e=>{
 if(e.target.id=='play-again'){
     window.location.reload();
 }
});