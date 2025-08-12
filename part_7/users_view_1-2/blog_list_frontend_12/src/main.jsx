import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { ShowblogContextProvider } from "./contexts/ShowblogContext";
import { ToggleContextProvider } from "./contexts/ToggleContext";
import { UserContextProvider } from "./contexts/UserContext";
import { UserListContextProvider } from "./contexts/UserListContext";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <ShowblogContextProvider>
            <ToggleContextProvider>
              <UserListContextProvider>
                <App />
              </UserListContextProvider>
            </ToggleContextProvider>
          </ShowblogContextProvider>
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>,
  </Router>
);
