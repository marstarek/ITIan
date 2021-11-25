import "./feed.css";

import { db, storage, auth } from "../../firebase-config";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Img from "../../image1.jpg";
import { Timestamp, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Share from "../share/Share";
import Post from "../post/Post";
/* ------------------------------------imports-------------------------------------- */
export const Feed = () => {
  const [posts, setposts] = useState([]);
  const [PostText, setPostText] = useState("");
  const [allPosts, setallPosts] = useState([]);
  const [comments, setcomments] = useState(null);
  const [newcomments, setnewcomments] = useState([]);
  const [commentsText, setcommentsText] = useState("");
  const [img, setImg] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [I, setI] = useState();
  /* ------------------------------------- END Stats------------------------------------- */
  // const { curUser } = useContext(CurUserContext);
  const postsCollectionRefrance = collection(db, "posts");
  const getposts = async () => {
    const postsData = await getDocs(postsCollectionRefrance);
    setposts(postsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const [curUser, setcurUser] = useState();

  /* -------------------------------------useEffect------------------------------------- */
  useEffect(() => {
    getposts();
    getnewcomments();
    auth?.currentUser &&
      getDoc(doc(db, "users", auth.currentUser?.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          setcurUser(docSnap.data());
        }
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://firestore.googleapis.com/v1/projects/iti-test-9412d/databases/(default)/documents/posts"
    )
      .then((response) => response.json())
      .then((data) => setallPosts(data.documents));
  }, []);
  /* -----------------------------------getnewcomments--------------------------------------- */
  const newcommentsCollectionRefrance = collection(db, "comments");
  const getnewcomments = async () => {
    const newcommentsData = await getDocs(newcommentsCollectionRefrance);
    setnewcomments(
      newcommentsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setrefresh(!refresh);
  };
  /* ------------------------------------handleSubmit-------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (PostText.trim() || img) {
      const id = `${curUser.uid}${new Date().getTime()}`;
      let url;
      if (img) {
        const imgRef = ref(
          storage,
          `postsimages/${new Date().getTime()} - ${img.name}`
        );
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }
      await addDoc(collection(db, "posts"), {
        PostText,
        from: id,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        like: 0,
        islike: false,
        ownerImg: curUser.avatar,
        postOwnername: curUser.name,
      });
      const docSnap = await getDoc(doc(db, "posts", id));
      setPostText("");
      setrefresh(!refresh);
    } else {
      alert("please say something");
    }
  };
  /* -------------------------------------likeHandler------------------------------------- */
  const likeHandler = async (i) => {
    await updateDoc(doc(db, "posts", posts[i].id), {
      islike: !posts[i].islike,
      like: posts[i].islike ? posts[i].like - 1 : posts[i].like + 1,
    });
    setrefresh(!refresh);
  };
  /* ---------------------------------delatePost---------------------------------------- */

  const delatePost = async (i) => {
    if (posts[i].from.includes(curUser.uid)) {
      const postDoc = doc(db, "posts", posts[i].id);
      await deleteDoc(postDoc);
      setrefresh(!refresh);
    } else {
    }
    setrefresh(!refresh);
    alert("this is not your  post you cant delete it");
  };

  /* --------------------------------------commentsHandler------------------------------------ */
  const commentsHandler = async (i) => {
    if (commentsText) {
      await addDoc(collection(db, "comments"), {
        commentsText,
        from: curUser.uid,
        createdAt: Timestamp.fromDate(new Date()),
        postID: posts[i].id,
        commentOwnerImg: curUser.avatar,
        commentOwnername: curUser.name,
      });
      setcommentsText("");
      setrefresh(!refresh);
      showComments(i);
    } else {
      alert("please say something");
    }
  };
  /* --------------------------------------commentsHandler------------------------------------ */
  const showComments = (i) => {
    setI(i);
    Promise.all([
      fetch(
        "https://firestore.googleapis.com/v1/projects/iti-test-9412d/databases/(default)/documents/comments"
      )
        .then((value) => value.json())
        .then((value) => setcomments(value.documents)),
    ]).catch((err) => {
      alert(err);
    });
  };
  /* ---------------------------------delete comment------------------------------------ */
  const delatecomment = async (i, index) => {
    showComments(i);

    if (newcomments[index].from.includes(curUser.uid)) {
      const commentDoc = doc(db, "comments", newcomments[index].id);
      await deleteDoc(commentDoc);
      setrefresh(!refresh);
    } else {
      alert("you cant delete");
    }
    setrefresh(!refresh);
  };

  return (
    <>
      {curUser ? (
        <div className="feed">
          <div className="feedWrapper">
            <Share
              PostText={PostText}
              handleSubmit={handleSubmit}
              setPostText={setPostText}
              setImg={setImg}
              curUser={curUser}
              Img={Img}
            />
            {allPosts.map((postd, i) => {
              return (
                <Post
                  postd={postd}
                  i={i}
                  Img={Img}
                  delatePost={delatePost}
                  likeHandler={likeHandler}
                  showComments={showComments}
                  comments={comments}
                  posts={posts}
                  delatecomment={delatecomment}
                  setcommentsText={setcommentsText}
                  I={I}
                  commentsHandler={commentsHandler}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ position: "relative" }}>
            <h2
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div class="spinner-border my-5 mx-5" role="status">
                <span class="visually-hidden"> Loading... </span>
              </div>
            </h2>
          </div>
        </div>
      )}
    </>
  );
};
export default Feed;
