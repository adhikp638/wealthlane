import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";


const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;


const QA = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };


  const handleButtonClick = async () => {
    setResponse("");
    try {
      const payload = {
        model: "gpt-3.5-turbo",
        temperature: 0.1,
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that understands the ins and out of equity award administration.
                      You have information about the following react pages (routes) in a equity awards management
                       application: 
                       /overview
                        /settings
                        /settings/organization-settings/:slug
                        /settings/organization-settings/:slug/:id
                        /settings/organization-settings/election-window-config
                        /participants
                        /participants/audit-log
                        /participants/form/:slug
                        /task/participants-approval
                        /task/plan-approval
                        /task/pre-clearance-requests
                        /awards/rsu-awards
                        /awards/rsu-awards/:slug
                        /awards/option-awards
                        /awards/option-awards/:slug
                        /task/rsu-awards-approval
                        /task/option-awards-approval
                        /task/participants-approval
                        /task/settlement-config-approval
                        /task/user-approval
                        /task/rsu-vesting
                        /task/option-vesting
                        /task/federal-tax-approval
                        /task/state-tax-approval
                        /task/local-tax-approval
                        /task-management-console
                        /reports
                        /reports/report-designer
                        /reports/custom-report-designer
                        /reports/participant
                        /reports/rsu-cancellation
                        /reports/rsu-vesting
                        /reports/vesting
                        /reports/option
                        /reports/option-vesting
                        /reports/retirement-eligibility
                        /reports/termination
                        /transactions/release
                        /transactions/release/form/:slug
                        /transactions/release/view
                        /transactions/transfer-and-allocate
                        /transactions/transfer-and-allocate/form/:slug
                        /profile
                        /security
                        /design
                        /udf
                        /task/tax-setup-approval
                        /task/tax-setup-approval/approver-history/:id
                        /notification
                        /check-user
                        /page-not-found
                        /settings/organization-settings/company-profile
                        /settings/organization-settings/users
                        /settings/organization-settings/roles
                        /settings/organization-settings/department
                        /settings/organization-settings/job-title
                        /settings/organization-settings/employee-types
                        /settings/organization-settings/plan-management
                        /settings/organization-settings/vesting-templates
                        /settings/organization-settings/tax-period
                        /settings/organization-settings/tax-setup
                        /settings/organization-settings/tax-library
                        /settings/organization-settings/finch
                        /settings/organization-settings/terms-and-conditions
                        /settings/organization-settings/trade-pre-clearance
                        /settings/organization-settings/trading-black-out-configuration
                        /settings/organization-settings/bank-account
                        /settings/organization-settings/udf
                        /settings/organization-settings/tax-management
                        /settings/organization-settings/blackout-config
                        /settings/organization-settings/settlement-config
                        /settings/organization-settings/retirement-config
                        /settings/organization-settings/system-approvers
                        /settings/organization-settings/grant-management/:id
                        /settings/organization-settings/grant-list
                        /settings/organization-settings/user-defined-field
                        /settings/organization-settings/participant-broadcast
                        /settings/organization-settings/company-profile
                        /settings/organization-settings/vesting-templates
                        /settings/organization-settings/trade-pre-clearance
                        /settings/organization-settings/trading-black-out-configuration
                        /settings/organization-settings/notification
                        /settings/organization-settings/users
                        /settings/organization-settings/settlement-config
                        /settings/organization-settings/retirement-config
                        /settings/organization-settings/election-window-config
                        /settings/organization-settings/plan-management
                        /settings/organization-settings/roles
                        /settings/organization-settings/department
                        /settings/organization-settings/job-title
                        /settings/organization-settings/employee-types
                        /settings/organization-settings/system-approvers
                        /settings/organization-settings/grant-management
                        /settings/organization-settings/grant-list
                        /settings/organization-settings/plan-approvals
                        /settings/organization-settings/bank-account
                        /settings/organization-settings/rsu-awards
                        /settings/organization-settings/option-awards
                        /settings/organization-settings/participants
                        /settings/organization-settings/terms-and-conditions
                        /settings/organization-settings/user-defined-field
                        /settings/organization-settings/participant-broadcast
                        /settings/organization-settings/tax-setup
                        /settings/organization-settings/tax-period
                        /settings/organization-settings/reports
                        /settings/organization-settings/task-management-console
                        /task/user-approval
                        /task/participants-approval
                        /task/rsu-awards-approval
                        /task/plan-approval
                        /task/settlement-config-approval
                        /task/option-awards-approval
                        /task/pre-clearance-requests
                        /settings/organization-settings/plan-management
                        /settings/organization-settings/plan-management
                        /task/tax-setup-approval
                        /awards/rsu-awards
                        /awards/option-awards
                        /transactions/release
                        /transactions/transfer-and-allocate
                        /task-management-console
                        /reports


                      You are able to infer what functionality these pages may provide. Upone User question, you
                      will use your general knowledge of equity award administration to provide a 3 line answer about 
                      what the question means from a equity administration perspective along 
                      with the path from the list above that would be a page that may be related to their query.
                      In your response, prepend the path with 
                      https://wealthlane-customer-uat.wealthlane.co/ , put each link in a newline and do not include any punctuation or extra characters
                      at the end`
          },
          {
            role: "user",
            content: `Question: ${question}`
                      
          }
          
        ]
      };
      const formattedMessages = payload.messages.map(message => `${message.role}: ${message.content}`).join('\n');
      setPrompt(formattedMessages);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setResponse(data.choices[0].message.content);
        setError('');
      } else {
        setError(data.error.message);
        setResponse('');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setResponse('');
    }
  };

  const formatResponse = (response) => {
    const clickableResponse = response.replace(
      /(https:\/\/wealthlane-customer-uat\.wealthlane\.co\/\S+)/g,
      (match) => `<br/><a href="${match}" target="_blank">${match}</a><br />`
    );
  
    return (
      <div style={{ fontSize: '16px', width: '900px', padding: '10px' }} dangerouslySetInnerHTML={{ __html: clickableResponse }} />
    );
  };
  
  
  const Container = styled.div`
    color: black;
  `;

  return (
    <div style={{ color: 'black' }}>
      <Link to="/">Go back to Home</Link>

      <h1>What yould you like to do in the Wealthlane system?</h1>
      <textarea value={question} onChange={handleQuestionChange} style={{ width: '350px', height: '100px' }} />


      <button onClick={handleButtonClick}>Get Response</button>

      {response && (
        <div>
          <h1>Response</h1>
          {formatResponse(response)}{/* Use pre tag */}
        
        </div>
      )}

      {error && <p>Error: {error}</p>}
      
    </div>
  );
};

export default QA;
