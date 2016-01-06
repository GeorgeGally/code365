// use these functions
// mic.getSprectrum(x);
// mic.getNote(1);
// mic.getNoteCents(1)[1]
// getFreq(2)

var mic;
var play = false;

function checkMic() {
    
    if (typeof mic != 'undefined'  && !mic.isInitialized()) {
        setTimeout("checkMic();", 500);
        return;
    } else if (typeof mic != 'undefined'){
        mic.startListening();
        window.clearInterval('soundIn');
        play = true;
    }
}


function startListening(){

    console.log("======= startListening")

    play = true;
    if (typeof mic != 'undefined'){
    mic.startListening();
    }
 
}

function stopListening(){

    console.log("======= stopListening")
 
    play = false;
    if (typeof mic != 'undefined'){
    mic.stopListening(); 
    }

}

function mapFreqency(i, count){
    min = 0;
    max = 60;
    return Math.round(map(i, 0,count, 0, max));
}


//$(document).ready (function () {

    mic = new Microphone();
    mic.initialize()
    checkMic();



// var soundIn = setInterval(function() {
// // 	//if (play != false){
// // 	// document.getElementById('autoNote').innerHTML = mic.getNote(1);
// // 	// document.getElementById('autoCents').innerHTML = mic.getNoteCents(1)[1];
// // 	// document.getElementById('fftNote').innerHTML = mic.getNote(2);
// // 	// document.getElementById('fftCents').innerHTML = mic.getNoteCents(2)[1];
// // 	// document.getElementById('fftFreq100').innerHTML = mic.getSprectrum(100);
// // 	// document.getElementById('fftFreq1000').innerHTML = mic.getSprectrum(200);
// // console.log(mic.getSprectrum(200));
// //console.log(mic.getFreq(2));
// //     //console.log(mic.getNote(2));
// //     checkMic();
// // 	//audioAvailable(mic);
// // 	//}
// }, 100);


//})

