import "./myTrackPage.css";
import MyTrackPageSidebar from "../myTrackPageSidebar/MyTrackPageSidebar";
import Online from "../online/Online";
import Sidebar from "../sidbar/Sidebar";
import Feed from "../../components/feed/Feed";
import Navbar from "../../shared/layout/navbar/Navbar";
import NewSidebar from "../newSidbar/NewSidebar";

const MyTrackPage = () => {
  return (
    <>
      <Navbar />
      <div className=" homeContain">
        <div className="row justify-content-center g-0">
          <div className="col-4 g-0 d-none  d-md-block ">
            <NewSidebar />
          </div>{" "}
          <div className="col-7  ">
            <Feed />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTrackPage;
