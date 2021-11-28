import "./profile.css";
import Img from "../../image1.jpg";
import { useState, useEffect, useRef } from "react";
import { storage, db, auth } from "../../firebase-config";
import { BsTrashFill } from "react-icons/bs";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { useHistory } from "react-router-dom";
import { updatePassword, signInWithEmailAndPassword } from "firebase/auth";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();

  const history = useHistory("");
  let [refresh, setrefresh] = useState(false);
  const confirmPasswordRef = useRef();
  const newPasswordRef = useRef();
  const currentPasswordRef = useRef();
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
      setrefresh(!refresh);
    }
  }, [img]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar:
            "https://www.duke-nus.edu.sg/images/librariesprovider5/people/1-placeholder.png?sfvrsn=61a8955c_0",
          avatarPath: "",
        });
        history.replace("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  /* -------------------------------------------------------------------------- */
  const [myprofile, setmyprofile] = useState([]);
  const [error, setError] = useState("");
  const [myNEWprofile, setmyNEWprofile] = useState(null);
  const [SKILLS, setSKILLS] = useState("");
  const [EXPERIANCES, setEXPERIANCES] = useState("");
  const [CONTACTS, setCONTACTS] = useState("");
  const [newSkills, setnewSkills] = useState([]);
  const [newEXPERIANCES, setnewEXPERIANCES] = useState([]);
  const [newCONTACTS, setnewCONTACTS] = useState([]);
  const myprofileCollectionRefrance = collection(db, "myprofile");
  const [userr, setUserr] = useState(null);
  const [loading, setLoading] = useState(true);
  const getmyprofile = async () => {
    const myprofileData = await getDocs(myprofileCollectionRefrance);
    await setmyprofile(
      myprofileData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getmyprofile();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserr(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const saveChangs = async (e) => {
    if (SKILLS.trim()) {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        SKILLS: SKILLS,
      });
      setrefresh(!refresh);
    } else {
      alert("enter your skills");
    }
    if (EXPERIANCES.trim()) {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        EXPERIANCES: EXPERIANCES,
      });
      setrefresh(!refresh);
    } else {
      alert("enter your EXPERIANCES");
    }
    if (CONTACTS.trim()) {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        CONTACTS: CONTACTS,
      });
      setrefresh(!refresh);
    } else {
      alert("enter your CONTACTS");
    }
    getmyprofile();
  };
  const [TO1, setTO1] = useState(true);

  const toggle1 = async () => {
    if (!TO1) {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        SKILLS: SKILLS,
      });
    }
    setTO1(!TO1);
  };
  const [TO2, setTO2] = useState(true);

  const toggle2 = async () => {
    if (!TO2) {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        EXPERIANCES: EXPERIANCES,
      });
    }
    setTO2(!TO2);
  };
  const [TO3, setTO3] = useState(true);

  const toggle3 = async () => {
    if (!TO3) {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        CONTACTS: CONTACTS,
      });
    }
    setTO3(!TO3);
  };
  /////////
  const [TO4, setTO4] = useState(true);

  const toggle4 = async () => {
    setError("");
    if (TO4 && currentPasswordRef?.current?.value?.length > 5) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          userr.email,
          currentPasswordRef.current.value
        );
        await updateDoc(doc(db, "users", user.user.uid), {
          isOnline: true,
        });
        setTO4(!TO4);
      } catch (error) {
        setError(error.message);
      }
    }
    if (
      !TO4 &&
      confirmPasswordRef?.current?.value?.length > 5 &&
      newPasswordRef?.current?.value?.length > 5 &&
      confirmPasswordRef?.current?.value?.length > 5 ===
        newPasswordRef?.current?.value?.length > 5
    ) {
      setTO4(!TO4);
      changepassword();
    }
  };
  //////
  useEffect(() => {
    Promise.all([
      fetch(
        "https://firestore.googleapis.com/v1/projects/test-29153/(default)/documents/myprofile"
      )
        .then((value) => value.json())
        .then((value) => setmyNEWprofile(value.documents)),
    ]).catch((err) => {
      console.log(err);
    });
  }, []);
  const changepassword = async () => {
    if (newPasswordRef?.current?.value?.length > 5) {
      try {
        await updatePassword(userr, newPasswordRef.current.value);
        if (!error) {
          setError("password changed successfully");
        }
      } catch (error) {
        setError("weak network please refresh and try again");
      }
    } else {
      setError("password at least 6 digits");
    }
    // "weak network please refresh and try again
    // console.log(passwordRef.current.value)
  };

  return user ? (
    <section className="profile">
      <div className="container ">
        <div className="profile-container mx-auto my-5">
          <div className="profile-head mt-5 px-2 py-5 align-items-center g-0 row">
            <div className="col-lg-6 mx-auto">
              <div className="img_container d-flex flex-column justify-content-center align-items-center">
                <img
                  className="profile-img"
                  src={user.avatar || Img}
                  alt="avatar"
                />

                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="actual-btn"
                  onChange={(e) => setImg(e.target.files[0])}
                  id="actual-btn"
                />

                <div className="d-flex justify-content-center algin-items-center mt-5">
                  {user.avatar ? (
                    <BsTrashFill
                      className=" deleteIcon fs-2 m-1 text-danger "
                      onClick={deleteImage}
                    />
                  ) : null}
                  <label
                    className="btn btn-danger rounded-pill"
                    for="actual-btn"
                  >
                    change photo
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-6 tex mx-auto">
              <div className="text-sm-center text-lg-start">
                <h2 className={`text-sm-center text-lg-start text-capitalize`}>
                  {user.name}
                </h2>
                <p className="">{user.email}</p>
                <h4 className="">Front End Dev</h4>
                <small className="">
                  Joined on: {user.createdAt.toDate().toDateString()}
                </small>
              </div>
            </div>
          </div>
          {/* ADD SKILLS */}
          <div className="SKILLS-head  pt-5 px-4 text-center row">
            <div className="col-lg-6 mt-lg-0">
              <div className="skill-card">
                <h3>SKILLS</h3>
                {TO1 ? (
                  <>
                    <ul className="text-center">
                      {user?.SKILLS?.split(",").map((E) => {
                        return <li>{E}</li>;
                      })}
                    </ul>
                  </>
                ) : (
                  <>
                    <label htmlFor="skills"></label>

                    <textarea
                      id="skills"
                      name="skills"
                      rows="4"
                      cols="50"
                      placeholder="split every skill by comma"
                      defaultValue={[...user.SKILLS].join("")}
                      onChange={(e) => setSKILLS(e.target.value)}
                    ></textarea>
                  </>
                )}
                <button
                  type="button"
                  className="mt-2 shareButton"
                  onClick={toggle1}
                >
                  Edit Skills
                </button>
              </div>
            </div>
            <div className="col-lg-6 align-bottom mt-5 mt-lg-0">
              <div className="skill-card">
                <h3> EXPERIANCES</h3>
                {TO2 ? (
                  <>
                    <ul className="text-center">
                      {user?.EXPERIANCES?.split(",").map((E) => {
                        return <li>{E}</li>;
                      })}
                    </ul>
                  </>
                ) : (
                  <>
                    <label htmlFor="EXPERIANCES"></label>

                    <textarea
                      id="EXPERIANCES"
                      name="EXPERIANCES"
                      rows="4"
                      cols="50"
                      placeholder="Write youe Experiance"
                      defaultValue={[...user.EXPERIANCES].join("")}
                      onChange={(e) => setEXPERIANCES(e.target.value)}
                    ></textarea>
                  </>
                )}
                <button
                  type="button"
                  className="mt-2 shareButton"
                  onClick={toggle2}
                >
                  Edit Experiance
                </button>
              </div>
            </div>
          </div>
          <div className="SKILLS-head px-4 text-center row pb-5">
            <div className="col-lg-6 mt-5">
              <div className="skill-card">
                <h3> CONTACTS</h3>
                {TO3 ? (
                  <>
                    <ul className="text-center">
                      {user?.CONTACTS?.split(",").map((E) => {
                        return <li>{E}</li>;
                      })}
                    </ul>
                  </>
                ) : (
                  <>
                    <label htmlFor="CONTACTS"></label>

                    <textarea
                      id="CONTACTS"
                      name="CONTACTS"
                      rows="4"
                      cols="50"
                      placeholder="split every CONTACTS by space"
                      defaultValue={[...user.CONTACTS].join("")}
                      onChange={(e) => setCONTACTS(e.target.value)}
                    ></textarea>
                  </>
                )}
                <button
                  type="button"
                  className="mt-2 shareButton"
                  onClick={toggle3}
                >
                  Edit contacts
                </button>
              </div>
            </div>
            <div className="set-password col-lg-6 mt-5">
              <div className="skill-card">
                <h3> Change Password</h3>
                {error && (
                  <div className="bg-danger rounded p-2 m-3 text-light">
                    {error}
                  </div>
                )}

                {TO4 ? (
                  <>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label>Current Password</label>
                          <input
                            className="form-control"
                            type="password"
                            placeholder="••••••"
                            ref={currentPasswordRef}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>New Password</label>
                            <input
                              className="form-control"
                              type="password"
                              placeholder="555"
                              ref={newPasswordRef}
                              required
                              minLength={6}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>
                              Confirm{" "}
                              <span className="d-none d-xl-inline">
                                Password
                              </span>
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              placeholder="••••••"
                              ref={confirmPasswordRef}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="button"
                  className="mt-5 shareButton"
                  onClick={toggle4}
                >
                  Change password
                </button>
              </div>

              {/* <button
                type="button"
                className="btn btn-danger shareButton  btn-sm fs-6 m-4 "
                onClick={saveChangs}
              >
                save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
