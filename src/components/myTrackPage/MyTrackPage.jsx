import "./myTrackPage.css";
import Online from "../online/Online";
import MyTrackFeed from "../../components/myTrackfeed/MyTrackFeed";
import Navbar from "../../shared/layout/navbar/Navbar";
import MyTrackSidebar from "../myTrackSidbar/MyTrackSidebar";
import MyTrackRightbar from "../myTrackRightbar/MyTrackRightbar";
import ChatIcon from "../../shared/ChatIcon/ChatIcon";

const MyTrackPage = () => {
  return (
    <>
      <Navbar />
      <div className=" homeContain">
        <div className="row justify-content-center g-0">
          <div className="col-3 g-0 d-none  d-md-block ">
            <MyTrackSidebar />
          </div>{" "}
          <div className="col-6  ">
            <MyTrackFeed />
          </div>
          <div className="col-3  ">
            <MyTrackRightbar />
          </div>
        </div>
      </div>
      <ChatIcon />
    </>
  );
};

export default MyTrackPage;
