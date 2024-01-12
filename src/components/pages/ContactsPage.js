import React, { useState } from "react";
import {styled, keyframes} from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ContactPanel = styled.div`
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: rgba(0, 10, 10, 0.9);
  justify-content: center;
`;

const Separator = styled.span`
  padding-left: 5px;
`;

const ContactEmail = styled.a`
  display: flex;
  align-items: center;
  color: white;
  margin-left: 10px;
  cursor: pointer;
`;

const EmailIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  margin-top: 6px;
`;

const LinkedInIcon = styled(FontAwesomeIcon)`
  color: white;
  margin-left: 10px;
  cursor: pointer;
  margin-top: 2px;
  content: "blah";
`;

const LinkedInIconWrapper = styled.div`
  cursor: pointer;
  text-decoration: underline;
  margin-left: 10px;
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ResizableModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: absolute;
  width: 35%;
  top: 20%;
  left: 15%;
  height: auto;

  @media (max-width: 768px) {
    width: 80%;
    top: 10%;
    left: 5%;
    font-size: 10px;
    height: auto;
  }

  animation: ${fadeIn} 0.5s ease-in-out; /* Adjust the duration and timing function as needed */

`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  font-color: rgba(0, 10, 10, 0.9);

  @media (max-width: 768px) {
    font-size: 18px;
    font-weight: bold;
    right: 0px;
    top: 0px;
    padding-right: 10px;
    padding-top:5px;
  }
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid darkgray; /* Add a border style */
`;

const ModalButton = styled.button`
  background-color: rgba(0, 10, 10, 0.9);
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: #555555;
`;

const ContactPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");

  const handleClosePopup = () => {
    setShowModal(false);
    setSubject("");
    setReplyTo("");
    setMessage("");
  };

  const handleSendEmail = async () => {

    // FEhdawh1SM1YzliEt2RvG5zIKoYpp579wgt6mEm5
    try {

      const apiKey = process.env.REACT_APP_WL_EMAIL_API_KEY;
      const apiEndpoint = process.env.REACT_APP_WL_EMAIL_API_URL;
      
      console.log("API KEY:", apiKey);
      console.log("API ENDPOINT:", apiEndpoint);
      
      await axios.post(apiEndpoint, {
        replyTo,
        subject,
        message,
      }, {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
      });

      setSubject("");
      setReplyTo("");
      setMessage("");
      setShowModal(false);
      toast.success('Your email has been sent!', {
        onClose: handleClosePopup,
      });
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error('Error sending email', {
        onClose: handleClosePopup,
      });
    }
  };

  return (
    <>
      <ContactPanel>
        <ContactEmail onClick={() => setShowModal(true)}>
          <EmailIcon icon={faEnvelope} />
          <span>Support / Inquiry</span>
        </ContactEmail>
        <Separator>|</Separator>
        <LinkedInIconWrapper
          onClick={() => {
            window.open(
              "https://www.linkedin.com/company/wealthlane-financial-inc/about/",
              "_blank"
            );
          }}
        >
          <LinkedInIcon icon={faLinkedin} size="lg" />
          <Separator></Separator>
          <span>LinkedIn</span>
        </LinkedInIconWrapper>
      </ContactPanel>

      <ModalOverlay show={showModal} onClick={() => setShowModal(false)}>
        <ResizableModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleClosePopup}>X</CloseButton>
          <Label>Subject</Label>
          <ModalInput
            type="text"
            placeholder="Brief Reason for Inquiry"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: '60%', padding: '10px', marginBottom: '10px', border: '2px solid darkgray' }}
            />
          <Label>Reply To</Label>
          <ModalInput
            type="text"
            placeholder="Email we can reply to"
            value={replyTo}
            onChange={(e) => setReplyTo(e.target.value)}
            style={{ width: '60%', padding: '10px', marginBottom: '10px', border: '2px solid darkgray' }}

          />
          <Label>Your Inquiry</Label>
          <ModalInput
            as="textarea"
            placeholder="Detailed Reason for Inquiry"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: '95%', padding: '10px', marginBottom: '10px', border: '2px solid darkgray' }}

          />
          <br/>
          <ModalButton onClick={handleSendEmail}>Submit</ModalButton>
        </ResizableModalContent>
      </ModalOverlay>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          fontSize: '14px',
          color: 'red',
          '--toastify-icon-color-success': '#003300',
          top: '50px',
        }}
        progressStyle={{
          background: '#003300',
        }}
        closeButton={{
          color: '#003300',
        }}
      />
    </>
  );
};

export default ContactPage;
