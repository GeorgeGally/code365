var MY_FFT_SIZE = 256
var SAMPLE_RATE = 44100;
var FFT_FREQ_RES = (SAMPLE_RATE/2)/(MY_FFT_SIZE/2);

var notes = {"A#1" : 58.2705, "B1" : 61.7354, "C2" : 65.4064, 
            "C#2" : 69.2957, "D2" : 73.4162, "D#2" : 77.7817, "E2" : 82.4069, 
            "F2" : 87.3071, "F#2" : 92.4986, "G2" : 97.9989, "G#2" : 103.826, 
            "A2" : 110, "A#2" : 116.542, "B2" : 123.471, "C3" : 130.813, 
            "C#3" : 138.591, "D3" : 146.832, "D#3" : 155.563, "E3" : 164.814, 
            "F3" : 174.614, "F#3" : 184.997, "G3" : 195.998, "G#3" : 207.652, 
            "A3" : 220, "A#3" : 233.082, "B3" : 246.942, "C4" : 261.626, 
            "C#4" : 277.183, "D4" : 293.665, "D#4" : 311.127, "E4" : 329.628, 
            "F4" : 349.228, "F#4" : 369.994, "G4" : 391.995, "G#4" : 415.305, 
            "A4" : 440, "A#4" : 466.164, "B4" : 493.883, "C5" : 523.251, 
            "C#5" : 554.365, "D5" : 587.330, "D#5" : 622.254, "E5" : 659.255, 
            "F5" : 698.456, "F#5" : 739.989, "G5" : 783.991, "G#5" : 830.609, 
            "A5" : 880, "A#5" : 932.328, "B5" : 987.767, "C6" : 1046.5, 
            "C#6" : 1108.73, "D6" : 1174.66, "D#6" : 1244.51, "E6" : 1318.51, 
            "F6" : 1396.91, "F#6" : 1479.98, "G6" : 1567.98, "G#6" : 1661.22, 
            "A6" : 1760, "A#6" : 1864.66, "B6" : 1975.53, "C7" : 2093, 
            "C#7" : 2217.46, "D7" : 2349.32, "D#7" : 2489.02, "E7" : 2637.02, 
            "F7" : 2793.83, "F#7" : 2959.96, "G7" : 3135.96, "G#7" : 3322.44, 
            "A7" : 3520, "A#7" : 3729.31, "B7" : 3951.07, "C8" : 4186.01};



// =============================================================================
// FFT Functions
// =============================================================================

// -----------------------------------------------------------------------------
// computeFreqFromFFT function. Input: none. Output: frequency of the sound 
// picked up by the microphone, computed via FFT. Automatically grabs the 
// current microphone data from the timeData global variable and uses the FFT
// defined in DSP.JS. Interpolates the FFT power spectrum to more accurately
// guess the actual value of the peak frequency of the signal.

    function computeFreqFromFFT(spectrum) {
        
        // Get index of maximum in spectrum array
        var i = 0, m = spectrum[0], maxIndex = 0;

        while (++i < spectrum.length) {
            if (spectrum[i] > m) {
                maxIndex = i;
                m = spectrum[i];
            }
        }

        // Make a best guess at the frequency of the signal
        interpolatedBin = jainsMethodInterpolate(spectrum, maxIndex);
        return Math.round(interpolatedBin*FFT_FREQ_RES);
    }


// -----------------------------------------------------------------------------
// jainsMethodInterpolate function. Input: array of spectrum power values 
// returned from FFT; index of bin in spectrum array with max power value.
// Output: a fractional bin number indicating the interpolated location of
// the actual signal peak frequency. Uses neighbouring indices to the index of 
// greatest magnitude to create a more accurate estimate of the frequency. 
// Simply multiply the returned fractional bin index by the FFT spectrum 
// frequency resolution to get the estimate of the actual peak frequency.

    function jainsMethodInterpolate(spctrm, maxIndex) {
        var m1, m2, m3, n, o;
        var m1 = Math.abs(spctrm[maxIndex - 1]);
        var m2 = Math.abs(spctrm[maxIndex]);
        var m3 = Math.abs(spctrm[maxIndex + 1]);
        
        if (m1 > m3) {
            a = m2 / m1;
            d = a / (1 + a);
            return maxIndex - 1 + d;
        }
        else {
            a = m3 / m2;
            d = a / (1 + a);
            return maxIndex + d;
        }
    }


// -----------------------------------------------------------------------------
// getMixFromFFT function. Computes the current frequency with 
// computeFreqFromFFT, then returns bass, mids and his
// sub bass : 0 > 100hz
// mid bass : 80 > 500hz
// mid range: 400 > 2000hz
// upper mid: 1000 > 6000hz
// high freq: 4000 > 12000hz
// Very high freq: 10000 > 20000hz and above

//n * SAMPLE_RATE / MY_FFT_SIZE
//0:   0 * 44100 / 512 =      0.0 Hz
//1:   1 * 44100 / 512 =     86.1 Hz
//2:   2 * 44100 / 512 =   172.27 Hz
//3:   3 * 44100 / 512 =    258.4 Hz
//4:   4 * 44100 / 512 =    344.5 Hz
//5:   5 * 44100 / 512 =   430.66 Hz
//6:   5 * 44100 / 512 =    516.8 Hz

    function getMixFromFFT(spectrum) {
        var mix = [];
        var bass_count = 0;
        var bass_freq = 0;
        var mids_count = 0;
        var mids_freq = 0;
        var highs_count = 0;
        var highs_freq = 0;
        for (var i = 0; i < spectrum.length; i++) {
            var band = i * SAMPLE_RATE / MY_FFT_SIZE;
            if (band < 500) {
                bass_freq += spectrum[i];
                bass_count++;
            } 
            if (band > 400 && band < 6000) {
                mids_freq += spectrum[i];
                mids_count++;
            }
            if (band > 4000) {
                highs_freq += spectrum[i];
                highs_count++;
            }
            
        }
        
        var bass = bass_freq/bass_count;
        var mids = mids_freq/mids_count;
        var highs = highs_freq/highs_count;
        mix.push(bass);
        mix.push(mids);
        mix.push(highs);

        return mix;
    }


    // -----------------------------------------------------------------------------
// getNoteFromFFT function. Computes the current frequency with 
// computeFreqFromFFT, then determines the current note by feeding the current
// frequency to matchNote

    function getNoteFromFFT(spectrum) {
        var currFreq = computeFreqFromFFT(spectrum);
        var noteInfo = matchNote(currFreq);
        return noteInfo[0];
    }

// -----------------------------------------------------------------------------
// getNoteCentsFromFFT function. Computes the current frequency with 
// computeFreqFromFFT, then determines the current note by feeding the current
// frequency to matchNote, and finally computes the cents offset from the 
// current note

    function getNoteCentsFromFFT(spectrum) {
        var currFreq = computeFreqFromFFT(spectrum)
        var noteInfo = matchNote(currFreq);
        var noteFreq = noteInfo[1];
        var cents = 1200*(Math.log(currFreq/Math.round(noteFreq))/Math.log(2));
        return [noteInfo[0], Math.round(cents)];
    }



    // -----------------------------------------------------------------------------
// matchNote function. Input: frequency, in Hertz. Output: closest note 
// value to that frequency. This function iterates over the JSON lookup table
// to find the nearest note to the input frequency and returns the note as a
// string.

    function matchNote(freq) {
        var closest = "A#1"; // Default closest note
        var closestFreq = 58.2705;
        for (var key in notes) { // Iterates through note look-up table
                // If the current note in the table is closer to the given
                // frequency than the current "closest" note, replace the 
                // "closest" note.
            if (Math.abs(notes[key] - freq) <= Math.abs(notes[closest] - 
                    freq)) {
                closest = key;
                closestFreq = notes[key];
            }
            // Stop searching once the current note in the table is of higher 
            // frequency than the given frequency.
            if (notes[key] > freq) {
                break;
            }
        }

        return [closest, closestFreq];
    }  