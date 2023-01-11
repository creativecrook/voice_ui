// reactstrap components
import React, { useState } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useHistory } from "react-router-dom";
import eventBus, { publish, publishClear, publishSearch } from "../../EventBus";

const Footer = () => {
  let showingResults = false;
  let history = useHistory();
  const [message, setMessage] = useState("");
  const commands = [
    {
      command: "go to *",
      callback: (link) => gotToCommand(link),
    },
    {
      command: "navigate to *",
      callback: (link) => gotToCommand(link),
    },
    {
      command: "open *",
      callback: (link) => gotToCommand(link),
    },
    {
      command: "I would like to order *",
      callback: (food) => setMessage(`Your order is for: ${food}`),
    },
    {
      command: "The weather is :condition today",
      callback: (condition) => setMessage(`Today, the weather is ${condition}`),
    },
    {
      command: "My top sports are * and *",
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`),
    },
    {
      command: "Pass the salt (please)",
      callback: () => setMessage("My pleasure"),
    },
    // {
    // command: ['Hello', 'Hi'],
    // callback: (text) => searchProducts(text)
    // callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
    // matchInterim: true
    // },
    // {
    //   command: "search for *",
    //   callback: (link) => searchProducts(link),
    // },
    {
      command: ["search *", "show *", "show me *", "get me *"],
      callback: (link) => searchProducts(link),
    },
    {
      command: "Beijing",
      callback: (command, spokenPhrase, similarityRatio) =>
        setMessage(
          `${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`
        ),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: ["eat", "sleep", "leave"],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true,
    },
    {
      command: ["clear", "clear search"],
      callback: ({ resetTranscript }) => clearSearch(),
    },
  ];

  const {
    transcript,
    listening,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  const clearSearch = () => {
    publishClear("");
    resetTranscript();
  };

  const gotToCommand = (link) => {
    // eventBus.dispatch("applySearch", { message: "search for pepsi 2 Litre" });
    // This will navigate to first component
    const linkurl = link === "add product" ? "addproduct" : link;
    const utterance = (value) => new SpeechSynthesisUtterance(value);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance(`Sure`));
    history.push(`/admin/${linkurl}`);
    setTimeout(() => {
      resetTranscript();
    }, 100);
  };

  const searchProducts = (text) => {
    if (text) {
      showingResults = true;
      publishSearch(text);
      // eventBus.remove("applySearch");
      // eventBus.dispatch("applySearch", { message: text });
    }
  };

  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="8">
          <div>
            {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
            {listening && browserSupportsSpeechRecognition && (
              <div className="circles">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
              </div>
            )}
            {!listening && browserSupportsSpeechRecognition && (
              <div className="mic" onClick={SpeechRecognition.startListening}>
                <span className="material-symbols-outlined">mic_off</span>
              </div>
            )}
            {listening && browserSupportsSpeechRecognition && (
              <div
                className="mic active"
                onClick={SpeechRecognition.stopListening}
              >
                <span className="material-symbols-outlined">mic</span>
              </div>
            )}
            {/* <button onClick={SpeechRecognition.startListening}>Start</button> */}
            {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
            {/* <button onClick={resetTranscript}>Reset</button> */}

            {transcript && !showingResults && (
              <div className="transcript">
                {transcript}
                <span className="arrow"></span>
              </div>
            )}
            {transcript && showingResults && (
              <div className="transcript">
                Showing Results Now <br />
                <small>"{transcript}"</small>
                <span className="arrow"></span>
              </div>
            )}
          </div>
        </Col>
        <Col xl="4"></Col>
      </Row>
    </footer>
  );
};

export default Footer;
