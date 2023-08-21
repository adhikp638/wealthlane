import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import DataMapperPythonScript from './DataMapperPythonScript';
import ExcelMacro from "../../util/DataMapper1.xlsm";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const DataMapper = () => {
  const [response, setResponse] = useState('');
  const [jason, setJason] = useState('');
  const [error, setError] = useState('');
  const [masterSetData, setMasterSetData] = useState('');
  const [inputSetData, setInputSetData] = useState('');
  const [prompt, setPrompt] = useState('');
  const [showPythonScript, setShowPythonScript] = useState(false);

  const togglePythonScript = () => {
    setShowPythonScript(!showPythonScript);
  };




  const handleMasterSetChange = (e) => {
    setMasterSetData(e.target.value);
  };

  const handleInputSetChange = (e) => {
    setInputSetData(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
    
        const payload = {
            model: "gpt-3.5-turbo",
            temperature: 0.1,
            messages: [
              {
                role: "system",
                content: `You are a helpful assistant that can map a set of input data fields
                          to a set of master data fields. You know how to translate language if mapping
                          and input are in different languages. You can do this if input or output data
                          is spelled out in English phonetically. You can also do this if data is entered
                          in a native language using native characters.
                          You can print out the native characters in the result.`
              },
              {
                role: "user",
                content: `Master Set: ${masterSetData}
                          Input Set: ${inputSetData}`
              },
              {
                role: "assistant",
                content:  `Match the columns headers from the Input Set to the corresponding column headers 
                          into the Master Set and provide the mapped results preserving the order of the master 
                          columns as they were entered. If there is no corresponding 
                          column for a master set column found in the input set columns, print out the 
                          master column and return <undefined> 
                          for the input set column. There should be no <undefined> in the master column.` 
              },
              {
                role: "user",
                content: "Please output all of the results of the mapping in the following format:"
              },
              {
                role: "user",
                content: "MasterSet.Column Name -> InputSet.Column Name;"
              },
              {
                role: "user",
                content: `Your output should be in this format without any additional text so the output 
                          can be used as a mapping file to a python script`
              }
            ]
          };
                    
        // Convert the messages array to a formatted string
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
      //setJason(data);
      console.log(JSON.stringify(data));

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
    const mappings = response.split(';').map(item => item.trim());
  
    const formattedResponse = mappings.map(mapping => {
      const [masterColumn, inputColumn] = mapping
        .replace(/\[|\]/g, '')
        .split('->')
        .map(item => item.trim());
  
      // Only return formattedResponse if both masterColumn and inputColumn have values
      if (masterColumn && inputColumn) {
        return (
          <div key={mapping}>
            {masterColumn} -&gt; {inputColumn}
            <br />
          </div>
        );
      } else {
        return null;
      }
    });
  
    return formattedResponse;
  };
  
  
  const Container = styled.div`
    color: black;
  `;


  return (
    <div style={{ color: 'black' }}>
      <Link to="/">Go back to Home</Link>

      <h1>Enter columns (comma separated) from your master data set</h1>
      <textarea value={masterSetData} onChange={handleMasterSetChange} style={{ width: '350px', height: '100px' }} />

      <h1>Enter columns (comma separated) from your input data set </h1>
      <textarea value={inputSetData} onChange={handleInputSetChange} style={{ width: '350px', height: '100px' }} />

      <button onClick={handleButtonClick}>Get Response</button>

      {response && (
        <div>
          {/* <h1>Original Prompt</h1>
          <p>{prompt}</p>

          <h1>Original Response</h1>
          <p>{response}</p> */}

          <h1>Mapping</h1>
          <pre>{formatResponse(response)}</pre> {/* Use pre tag */}
          <h1>
            <span style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} onClick={togglePythonScript}>
              Usage Instructions (Python)
            </span>
          </h1>

            {showPythonScript && (
            <ol>
              <li>Copy the data from the mapping above into a text file, (e.g mapping.txt)
                  you can change this file if the some of the columns are not correctly mapped 
              </li>
              <li> copy the code below into a .py file (e.g. DataMapper.py)</li>
                <DataMapperPythonScript />
              <li>Make sure both files are saved in the same directory along with your input csv file (e.g input_file.csv)</li>
              <li>Install python if you don't already have it</li>
              <li>run the script like this: "python DataMapper.py mapping.txt input_file.csv output.csv</li>
              <li>output.csv is the output of the script with your mapped data</li>
            </ol>
          )}
          {/* <p>{body}</p> */}
          <h1>
            <a
              href={ExcelMacro}
              download="DataMapper1.xlsm"
              style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
            >
              Usage Instructions (Excel) - click to download macro enabled Excel file
            </a>
          </h1>
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DataMapper;
