import { Route, Routes, BrowserRouter } from "react-router";
import UserSignUp from './components/user_signup';
import UserSignIn from './components/user_signin';
import UserDashboard from './components/user_dashboard';
import AdminDashboard from './components/admin_dashboard';
import AdminSignUp from './components/admin_signup';
import AdminSignIn from './components/admin_signin';
import Main from './components/main';
import ViewAllQuizes from './components/view_all_quizes';
import AttemptQuiz from './components/attempt_quiz';
import LeaderBoard from './components/leaderboard';
import CreateQuiz from './components/createQuiz';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/user/signin" element={<UserSignIn />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/view_all_quizes" element={<ViewAllQuizes />} />
        <Route path='/attempt/:quizId' element={<AttemptQuiz />} />
        <Route path='/leaderboard/:quizId' element={<LeaderBoard />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="create_quiz" element={<CreateQuiz />} />
          <Route index element={<ViewAllQuizes />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
