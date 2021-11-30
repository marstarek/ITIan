import styles from "./home.module.css";
import NewSidebar from "../../components/newSidbar/NewSidebar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/Rightbar";
import Navbar from "../../shared/layout/navbar/Navbar";
import ChatIcon from "../../shared/ChatIcon/ChatIcon";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid g-0">
        <div className="row g-0">
          <div className="col-4 col-lg-3 d-none d-sm-block">
            <NewSidebar />
          </div>
          <div className="col-12 col-sm-8 col-lg-6 ">
            <Feed />
          </div>
          <div className="col-3 d-none d-lg-block">
            <RightBar />
          </div>
        </div>
      </div>
      <ChatIcon />
    </>
  );
};

export default Home;
