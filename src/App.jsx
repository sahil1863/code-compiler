import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./Screens/HomeScreen";
import { PlaygroundScreen } from "./Screens/PlaygroundScreen";
import { PlaygroundProvider } from "./Providers/PlaygroundProvider";
import { ModalProvider } from "./Providers/ModalProvider";
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  return (
    <>
      <PlaygroundProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route
                path="/playground/:fileId/:folderId"
                element={<PlaygroundScreen />}
              />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </PlaygroundProvider>
     
    </>
  );
};

export default App;