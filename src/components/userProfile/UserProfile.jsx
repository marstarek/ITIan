import "./userprofile.css";
import Img from "../../image1.jpg";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { storage, db, auth } from "../../firebase-config";
import NewSidebar from "../newSidbar/NewSidebar";
import { BsTrashFill } from "react-icons/bs";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const UserProfile = (paramz, { user1, selectUser, chat }) => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  let [refresh, setrefresh] = useState(false);
  const [users, setUsers] = useState();
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
        // console.log(user);
      }
    });
  }, []);
  /* ---------------------------------msg----------------------------------------- */
  const [data, setData] = useState("");
  const user2 = user?.uid;
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);
  /* -------------------------------------------------------------------------- */
  const [myprofile, setmyprofile] = useState([]);
  const [myNEWprofile, setmyNEWprofile] = useState(null);

  const myprofileCollectionRefrance = collection(db, "myprofile");
  const getmyprofile = async () => {
    const myprofileData = await getDocs(myprofileCollectionRefrance);
    await setmyprofile(
      myprofileData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getmyprofile();
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(
        "https://firestore.googleapis.com/v1/projects/iti-test-9412d/databases/(default)/documents/myprofile"
      )
        .then((value) => value.json())
        .then((value) => setmyNEWprofile(value.documents)),
    ]).catch((err) => {
      console.log(err);
    });
  }, []);
  useEffect(() => {
    Promise.all([
      fetch(
        "https://firestore.googleapis.com/v1/projects/iti-test-9412d/databases/(default)/documents/users"
      )
        .then((value) => value.json())
        .then((value) => setUsers(value.documents)),
    ]).catch((err) => {
      console.log(err);
    });
  }, []);
  const history = useHistory();
  function nav(x) {
    history.push({
      pathname: "/MessagesPage",
      params: x,
    });
  }
  // console.log(users[paramz.location.params].fields.uid.stringValue);
  return user && users ? (
    <section className="profile">
      <div className="container ">
        <div className="profile-container mx-auto my-5">
          <div className="profile-head mt-5 px-2 py-5 align-items-center g-0 row">
            <div className="col-6 mx-auto">
              <div className="img_container">
                <img
                  className="profile-img "
                  src={
                    users[paramz.location.params].fields.avatar.stringValue ||
                    Img
                  }
                  alt="avatar"
                />
              </div>
            </div>
            <div className="col-6  mx-auto">
              <div className=" text-center  mx-auto">
                <h2>{users[paramz.location.params].fields.name.stringValue}</h2>

                <h4>Front End Dev</h4>
                <small>
                  Joined on: {user.createdAt.toDate().toDateString()}
                </small>

                <button className="btn btn-danger rounded-pill px-3  d-block my-1 mx-auto">
                  Follow
                </button>
              </div>
            </div>
          </div>
          {/* ADD SKILLS */}
          <div className="SKILLS-head  py-5 px-4 text-center   row">
            <div className="col-6">
              <div className="skill-card">
                <h3> Skills</h3>
                <>
                  <ul className="text-center">
                    {users[paramz.location.params].fields?.SKILLS?.stringValue
                      .split(",")
                      .map((s) => {
                        return <li>{s}</li>;
                      })}
                  </ul>
                </>
              </div>
            </div>
            <div className="col-6 align-bottom">
              <div className="skill-card">
                <h3> EXPERIANCES</h3>

                <ul className="text-center">
                  {users[
                    paramz.location.params
                  ].fields?.EXPERIANCES?.stringValue
                    .split(",")
                    .map((E) => {
                      return <li>{E}</li>;
                    })}
                </ul>
              </div>
            </div>
          </div>
          {/* edite password */}

          <div className="SKILLS-head  py-5 px-4 text-center   row">
            <div className="col-6">
              <label for="CONTACTS"></label>
              <div className="skill-card">
                <h3> CONTACTS</h3>
                <ul className="text-center">
                  {users[paramz.location.params].fields?.CONTACTS?.stringValue
                    .split(",")
                    .map((C) => {
                      return <li>{C}</li>;
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default UserProfile;
