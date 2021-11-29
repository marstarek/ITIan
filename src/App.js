import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../src/pages/home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AboutTracks from "../src/components/aboutTracks/AboutTracks";
import AboutTrack from "../src/components/aboutTrack/AboutTrack";
import Profile from "../src/components/profile/Profile";
import Jobs from "../src/components/Jobss/Jobs";
import AdminHome from "../src/components/Admin/AdminHome";
import MessagesPage from "../src/components/messeges/MessagesPage";
import PrivateRoute from "./context/PrivateRouth";
import Footer from "../src/shared/layout/footer/Footer";
import MyTrackPage from "./components/myTrackPage/MyTrackPage";
import UserProfile from "./components/userProfile/UserProfile";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminTracks from "./components/Admin/AdminTracks";
import AdminPosts from "./components/Admin/AdminPosts";
import AdminNews from "./components/Admin/AdminNews";
import AdminJobs from "./components/Admin/AdminJobs";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />{" "}
            <Route path="/login" component={Login} />{" "}
            <Route path="/register" component={Register} />{" "}
            <PrivateRoute path="/about" component={AboutTracks} />{" "}
            <PrivateRoute path="/track" component={AboutTrack} />{" "}
            <PrivateRoute path="/Profile" component={Profile} />{" "}
            <PrivateRoute path="/AdminHome" component={AdminHome} />{" "}
            <PrivateRoute path="/Jobs" component={Jobs} />{" "}
            <PrivateRoute
              path="/UserProfile"
              component={UserProfile}
              render={(params) => <UserProfile {...params} />}
            />
            <PrivateRoute path="/MessagesPage" component={MessagesPage} />{" "}
            <PrivateRoute path="/AdminLogin" component={AdminLogin} />{" "}
            <PrivateRoute path="/AdminUsers" component={AdminUsers} />{" "}
            <PrivateRoute path="/AdminTracks" component={AdminTracks} />{" "}
            <PrivateRoute path="/AdminPosts" component={AdminPosts} />{" "}
            <PrivateRoute path="/AdminJobs" component={AdminJobs} />{" "}
            <PrivateRoute path="/MyTrackPage" component={MyTrackPage} />{" "}
            <PrivateRoute path="/AdminNews" component={AdminNews} />{" "}
          </Switch>{" "}
          <Footer />
        </Router>{" "}
      </div>{" "}
    </>
  );
}

export default App;
