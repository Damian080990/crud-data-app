import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GetData } from "./components/GetData";
import { BrowserRouter, Route, Routes } from "react-router";
import { AddNewData } from "./components/AddNewData";
function App() {
  // zarządza stanem zapytań, pamięcią podręczną i ich automatycznym odświeżaniem
  const queryClient = new QueryClient();

  return (
    // client={queryClient} przekazujemy do niego obiekt queryClient, który zarządza wszystkimi zapytaniami w aplikacji
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<GetData />} />
          <Route path="AddNewData" element={<AddNewData />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App;
