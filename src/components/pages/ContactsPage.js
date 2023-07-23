import React, { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";


const ContactPanel = styled.div`
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: rgba(0, 10, 10, 0.9);
  justify-content: center;
`;

const Text = styled.div`
    font-size: 20px;
`;

const ContactEmail = styled.a`
  display: flex;
  align-items: center;
  color: white;
  margin-left: 10px;
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
`;

const Separator = styled.span`
  padding-left: 5px;
`;

const ContactPage = () => {

  return (
    <ContactPanel>
      <ContactEmail href={`mailto:${"support@wealthlane.co"}`}>
        <EmailIcon icon={faEnvelope} />
        <span>support@wealthlane.co</span>
      </ContactEmail>
      <Separator>|</Separator>
      <LinkedInIconWrapper           onClick={() => {
            window.open("https://www.linkedin.com/company/wealthlane-financial-inc/about/", "_blank");
          }}>
        <LinkedInIcon
          icon={faLinkedin}
          size="lg"

        />
        <Separator></Separator>
        <span>LinkedIn</span>
      </LinkedInIconWrapper>
    </ContactPanel>
  );
};

export default ContactPage;
