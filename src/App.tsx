import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import Layout from "./shared/layout/layout";
import TutorsPage from "./pages/tutors/tutorsPage";
import SubjectsPage from "./pages/subjects/subjectsPage";
import LogsPage from "./pages/logs/logsPage";
import LoginPage from "./pages/login/login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route
          path={"*"}
          element={
            <Layout>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/tutors" element={<TutorsPage />} />
                <Route path="/subjects" element={<SubjectsPage />} />
                <Route path="/logs" element={<LogsPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
