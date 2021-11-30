import "./chatIcon.css";
import { BsFillChatTextFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ChatIcon = () => {
  return (
    <div className="">
      <Link className="sidebarButton text-dark" to="/MessagesPage">
        <BsFillChatTextFill className="chaticon" />
      </Link>
    </div>
  );
};

export default ChatIcon;
