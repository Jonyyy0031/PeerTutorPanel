import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Layout from "./shared/layout/layout";
import TutorsPage from "./pages/tutors/tutorsPage";
import SubjectsPage from './pages/subjects/subjectsPage';
import LogsPage from './pages/logs/logsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutors" element={<TutorsPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
