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
const diffInDate = (date1, date2) => {
  return new Date(date1).getTime() - new Date(date2).getTime();
};
export const diffInDateForPosts = (date1, date2) => {
  return date1 - date2;
};
/* ------------------------------------imports-------------------------------------- */

export const Feed = () => {
  const [query, setQuery] = useState("");
  const [posts, setposts] = useState([]);
  const [PostText, setPostText] = useState("");
  const [allPosts, setallPosts] = useState([]);
  const [comments, setcomments] = useState(null);
  const [newcomments, setnewcomments] = useState([]);
  const [commentsText, setcommentsText] = useState("");
  const [img, setImg] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [postIndex, setpostIndex] = useState();

  /* ------------------------------------- END Stats------------------------------------- */
  const postsCollectionRefrance = collection(db, "posts");
  const getposts = async () => {
    const postsData = await getDocs(postsCollectionRefrance);
    let x = [];
    x = postsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    x.sort((b, a) => {
      return diffInDate(a.createdAt, b.createdAt);
    });
    setposts(x);

    console.log(posts);
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
  const getAllPosts = () => {
    fetch(
      "https://firestore.googleapis.com/v1/projects/new-test-7e4d3/databases/(default)/documents/posts"
    )
      .then((response) => response.json())
      .then((data) => {
        setallPosts(
          data.documents.sort((b, a) => {
            return diffInDate(
              a.fields.createdAt.timestampValue,
              b.fields.createdAt.timestampValue
            );
          })
        );
      });
    console.log(allPosts);
  };
  /* -----------------------------------getAllPosts--------------------------------------- */
  useEffect(() => {
    getAllPosts();
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
        likedby: "",
        ownerImg: curUser.avatar,
        ownerID: curUser.uid,
        postOwnername: curUser.name,
      });
      const docSnap = await getDoc(doc(db, "posts", id));
      setPostText("");
      setImg("");
      setrefresh(!refresh);
    } else {
      alert("please say something");
    }
    getAllPosts();
    getposts();
  };
  /* -------------------------------------likeHandler------------------------------------- */
  const [likes, setlikes] = useState(0);
  const likeHandler = async (from) => {
    await getAllPosts();
    await getposts();
    posts.filter(async (post, index) => {
      if (from === post.from) {
        if (post?.likedby && !post?.likedby?.includes(curUser.uid)) {
          await updateDoc(doc(db, "posts", posts[index].id), {
            likedby: post?.likedby + "," + curUser.uid,
          });
          setlikes(posts[index]?.likedby.split(",").length);
          await getAllPosts();
        } else if (
          posts[index]?.likedby?.includes(curUser.uid) ||
          posts[index]?.likedby === curUser.uid
        ) {
          let like = posts[index]?.likedby?.split(",");
          like.splice(
            posts[index]?.likedby?.split(",").indexOf(curUser.uid),
            1
          );
          await updateDoc(doc(db, "posts", posts[index].id), {
            likedby: like ? like?.join() : "",
          });
          await getAllPosts();
        } else {
          await updateDoc(doc(db, "posts", posts[index].id), {
            likedby: curUser.uid,
          });
          await getAllPosts();
        }
      }
    });
    setrefresh(!refresh);
  };

  /* ---------------------------------delatePost---------------------------------------- */

  const delatePost = async (i) => {
    posts.filter((post, index) => {
      if (allPosts[i].fields.from.stringValue === post.from) {
        try {
          if (
            posts[index].from.includes(curUser.uid) ||
            curUser.rule === "admin"
          ) {
            const postDoc = doc(db, "posts", posts[index].id);
            deleteDoc(postDoc);
            setrefresh(!refresh);
          } else {
          }
          setrefresh(!refresh);
        } catch (err) {
          alert(err);
        }
      }
    });
    getAllPosts();
    getposts();
  };

  /* --------------------------------------commentsHandler------------------------------------ */
  const commentsHandler = async (postfrom, i) => {
    if (commentsText) {
      await addDoc(collection(db, "comments"), {
        commentsText,
        from: curUser.uid,
        createdAt: Timestamp.fromDate(new Date()),
        postID: postfrom,
        commentOwnerImg: curUser.avatar,
        commentOwnername: curUser.name,
      });
      setcommentsText("");
      setrefresh(!refresh);
      await showComments(postfrom);
    } else {
      alert("please say something");
    }
    showComments(postfrom);
    setcommentsText("");
  };
  /* --------------------------------------commentsHandler------------------------------------ */
  const showComments = (postCommentFrom) => {
    console.log(postCommentFrom);
    setpostIndex(postCommentFrom);
    Promise.all([
      fetch(
        "https://firestore.googleapis.com/v1/projects/new-test-7e4d3/databases/(default)/documents/comments"
      )
        .then((value) => value.json())
        .then((value) => setcomments(value.documents)),
    ]).catch((err) => {
      alert(err);
    });
  };
  /* ---------------------------------delete comment------------------------------------ */
  const delatecomment = async (index, postcommentID) => {
    try {
      if (newcomments[index].from.includes(curUser.uid)) {
        const commentDoc = doc(db, "comments", newcomments[index].id);
        await deleteDoc(commentDoc);
        setrefresh(!refresh);
      }
      setrefresh(!refresh);
    } catch (err) {
      alert(err);
    }
    showComments(postcommentID);
  };
  return (
    <>
      {curUser ? (
        <div className="feed">
          <div className="feedWrapper">
            {curUser?.track !== "applicant" ? (
              <Share
                PostText={PostText}
                handleSubmit={handleSubmit}
                setPostText={setPostText}
                setImg={setImg}
                curUser={curUser}
                Img={Img}
                setQuery={setQuery}
                query={query}
              />
            ) : null}

            {allPosts
              .filter((post, i) => {
                if (
                  curUser.following?.includes(
                    post.fields.ownerID?.stringValue
                  ) ||
                  post.fields.ownerID?.stringValue === curUser.uid
                ) {
                  return post;
                }
              })
              .filter((postd, i) => {
                if (query === "") {
                  return postd;
                } else if (
                  postd.fields.PostText.stringValue
                    .toLowerCase()
                    .includes(query.toLowerCase())
                ) {
                  return postd;
                }
              })
              .map((postd, i) => (
                <Post
                  key={postd.id}
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
                  postIndex={postIndex}
                  curUser={curUser}
                  likes={likes}
                  commentsHandler={commentsHandler}
                  allPosts={allPosts}
                />
              ))}
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
              <div className="spinner-border my-5 mx-5" role="status">
                <span className="visually-hidden"> Loading... </span>
              </div>
            </h2>
          </div>
        </div>
      )}
    </>
  );
};
export default Feed;
