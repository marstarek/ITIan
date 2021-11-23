import styles from "./home.module.css";
// import { Topbar } from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidbar/Sidebar";
import NewSidebar from "../../components/newSidbar/NewSidebar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/Rightbar";

const Home = () => {
  return (
    <>
      {/* <Topbar /> */}

      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <NewSidebar />
          </div>
          <div className="col-6">
            <Feed />
          </div>
          <div className="col-3">
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
