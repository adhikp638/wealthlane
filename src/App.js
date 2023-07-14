import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Main from "./components/Main";
import ThreePanelPage from "./components/pages/ThreePanelPage";
import ContactPage from "./components/pages/ContactsPage";


const AppContainer = styled.div`
  box-sizing: border-box;
`;

const App = () => {


  return (
    <AppContainer>
      <Header />
      <Main />
      <ThreePanelPage />
      <ContactPage/>
    </AppContainer>
  );
};

export default App;
