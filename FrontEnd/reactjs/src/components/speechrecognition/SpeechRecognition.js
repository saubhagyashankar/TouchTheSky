import React, { useState } from "react";

const SpeechRecognitionObj =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognitionObj();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

const SpeechRecognition = () => {
    const [transcript, setTranscript] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + " ";
            } else {
                interimTranscript += transcript;
                setTranscript(interimTranscript)
            }
        }
        // setTranscript(finalTranscript);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };

    const startRecognition = () => {
        recognition.start();
        setIsRecording(true);
    };

    const stopRecognition = () => {
        recognition.stop();
        setIsRecording(false);
    };

    return (
        <div>
            <button onClick={startRecognition}>Start</button>
            <button onClick={stopRecognition}>Stop</button>
            {isRecording && <p>Voice Recording Started...</p>}
            <p>{transcript}</p>
        </div>
    );
};

export default SpeechRecognition;
