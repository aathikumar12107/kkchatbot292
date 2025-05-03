import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import './AIChatbot.css';
import logo from "../src/assets/chatbot-logo.jpg";
import sendButton from "../src/assets/send-message.png";
import illustration from "./assets/illustration.jpg";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_API_KEY });
function AIChatbot() {
  const generateResponse = async () => {
    var user=document.getElementById('user').value.toLowerCase();
    var messageSection=document.getElementById('message-section');
    document.getElementById('user').value="";
    // Scroll function to the bottom of the element
    function scrollEffect(){
      messageSection.scrollTo({
        top: messageSection.scrollHeight,
        behavior: "smooth" // Adds a smooth scrolling effect
      });
    }
    //create child for usermessage
    const userMessage = document.createElement("div");
    userMessage.id="user-message";
    userMessage.textContent =user;
    //append child for usermessage
    messageSection.appendChild(userMessage);
    //call the scroll function after user message
    scrollEffect();
    //create child for AI response
    const aiMessage = document.createElement("div");
    aiMessage.id="AI-message";
   
    try {
        const res = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: user,
        });
        if(user.includes('your name') || user.includes('who are you')){
            aiMessage.textContent ="I am Edith, your AI companion created by kk! I’m here to help answer your questions, spark ideas, assist with productivity tasks, and chat with you about just about anything.";
        }
        else if(user.includes('who was developed you')|| user.includes('your developer') || user.includes('your author'))
        {
            aiMessage.textContent ="I was developed by KK! The brilliant minds at Microsoft developed me using cutting-edge AI technology to help people like you with everything from coding assistance to creative brainstorming. I'm here to be your AI companion—ready to support, inspire, and problem-solve whenever you need. What else would you like to know?";
        }
        else{
            aiMessage.textContent =res.text;
        }
        // Append child for AI response
        messageSection.appendChild(aiMessage); 
        //call the scroll function after AI response
        scrollEffect(); 
    } 
      catch (error) {
        console.error("Error generating AI response:", error);
        aiMessage.textContent="Failed to fetch response. Please try again.";
      }
  };

  //send message after click the enter button
  function enter(){
    var user=document.getElementById("user");
    document.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        if(user.value!=""){
          generateResponse();
        }
      }
    });
  }

  return (
    // <div id="chatbot-body">
    //   <h1>Gemini AI Chatbot</h1>
    //   <div id="message-response"></div>
    //   <div id="input-field">
    //     <input type="text" id="user" />
    //     <button onClick={generateResponse}>Ask AI</button>
    //   </div>
    // </div>
    <div id="body">
      <div className="containers">
      <div id="header-section">
          <img src={logo} alt="chatbot logo" />
        <div id="name">
          <h1>Edith AI</h1>
        </div>
      </div>
      <div className="content-section">
        <div id="illustration">
          <img src={illustration} alt="" />
        </div>
        <div id="chatbot-body">
          <div id="message-section">
          <DotLottieReact src="https://lottie.host/221144d4-8486-43fb-a928-99e8cb1938a4/Z6rYJ5FnVQ.lottie" loop autoplay/>
          </div>
          <div id="input-section">
            <div id="user-input">
              <input type="text" id="user" placeholder="Message here" onInput={enter} />
            </div>
            <div id="send">
              <button onClick={generateResponse} >
              <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 377 512.23"><path fill-rule="nonzero" d="M372.87 156.95a12.038 12.038 0 0 1 1.06 17.1c-4.47 5-12.2 5.47-17.26 1.04L200.78 38.97v461.11c0 6.71-5.5 12.15-12.28 12.15-6.78 0-12.28-5.44-12.28-12.15V38.97L20.33 175.09c-5.06 4.43-12.79 3.96-17.26-1.04-4.47-5.01-4-12.67 1.06-17.1L180.2 3.21c4.55-4.17 11.65-4.33 16.4-.17l176.27 153.91z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

  );
}

export default AIChatbot;
