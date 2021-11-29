import "./myTrackPage.css";
import Online from "../online/Online";
import Sidebar from "../sidbar/Sidebar";
import MyTrackFeed from "../../components/myTrackfeed/MyTrackFeed";
import Navbar from "../../shared/layout/navbar/Navbar";
import MyTrackSidebar from "../myTrackSidbar/MyTrackSidebar";

const MyTrackPage = () => {
  return (
    <>
      <Navbar />
      <div className=" homeContain">
        <div className="row justify-content-center g-0">
          <div className="col-4 g-0 d-none  d-md-block ">
            <MyTrackSidebar />
          </div>{" "}
          <div className="col-7  ">
            <MyTrackFeed />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTrackPage;
