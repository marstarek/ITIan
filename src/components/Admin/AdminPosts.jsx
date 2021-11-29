import React, { useEffect, useState } from "react";
import {
  BsFillFunnelFill,
  BsTrashFill,
  BsCardImage,
  BsCardHeading,
} from "react-icons/bs";
import { db, auth, storage } from "../../firebase-config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { Link } from "react-router-dom";
import Post from "../post/Post";

const AdminPosts = () => {
  const [error, setError] = useState();

  const [img, setImg] = useState();
  const [posts, setposts] = useState([]);

  const [PostText, setPostText] = useState("");
  const postsCollectionRefrance = collection(db, "posts");

  const [curUser, setcurUser] = useState();
  /* ------------------------------------handleSubmit-------------------------------------- */
  useEffect(() => {
    auth?.currentUser &&
      getDoc(doc(db, "users", auth.currentUser?.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          setcurUser(docSnap.data());
        }
      });
    getposts();
  }, []);

  const submitPost = async (e) => {
    setError("");
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
      getposts();
    } else {
      setError("empty post please write something");
    }
  };

  const getposts = async () => {
    const postsData = await getDocs(postsCollectionRefrance);
    setposts(postsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteposrs = async (i) => {
    const postsdoc = doc(db, "posts", posts[i].id);
    await deleteDoc(postsdoc);
    getposts();
  };
  const [query, setQuery] = useState("");

  return (
    <>
      <div className='container-fluid bg-dark text-light '>
        <h2 className='py-3 '>Posts</h2>

        <div className='row text-light '>
          <div className='col-8  text-light '>
            <div className='input-group mx-auto w-75 text-light '>
              <input
                className='form-control bg-dark text-light'
                type='text'
                name='Search'
                placeholder='Search'
                onChange={(event) => setQuery(event.target.value)}
              />{" "}
              <span className='input-group-prepend input-group-text btn-danger active btn '>
                search <BsFillFunnelFill />
              </span>
            </div>
            <div className='row flex-nowrap g-0 text-light'>
              <div className=' admincard  text-light '>
                <table className='table table-bordered text-light'>
                  <thead>
                    <tr>
                      <th>post photo</th>
                      <th className='max-width'>post ownar</th>
                      <th className='sortable'>post contant</th>
                      <th> post ID</th>
                      <th>created at</th>
                      <th>option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts
                      .filter((post) => {
                        if (query === "") {
                          return post;
                        } else if (
                          post.PostText.toLowerCase().includes(
                            query.toLowerCase()
                          )
                        ) {
                          return post;
                        }
                      })
                      .map((post, i) => (
                        <tr key={i}>
                          <td className='align-middle text-center'>
                            <div
                              className='bg-light d-inline-flex justify-content-center align-items-center align-top'
                              style={{
                                width: " 35px",
                                height: "35px",
                                "border-radius": " 3px",
                              }}>
                              <img
                                style={{
                                  width: " 35px",
                                  height: "35px",
                                  "border-radius": " 3px",
                                }}
                                src={post.media}
                                alt=''
                              />
                            </div>
                          </td>
                          <td className='text-nowrap align-middle'>
                            {post.postOwnername}
                          </td>
                          <td className=' align-middle  text-nowrap'>
                            <div
                              style={{
                                width: "250px",
                                overflow: "auto",
                              }}>
                              <p className='  text-light '>{post.PostText} </p>
                            </div>
                          </td>

                          <td className='text-center align-middle'>
                            <span>{post.id}</span>
                          </td>
                          <td className='text-center align-middle'>
                            <span>
                              {post.createdAt.toDate().toDateString()}
                            </span>
                          </td>
                          <td className='text-center align-middle'>
                            <div className='btn-group align-top'>
                              <button
                                className='btn btn-sm btn-outline-danger '
                                type='button'>
                                <BsTrashFill
                                  onClick={async () => {
                                    await deleteposrs(i);
                                  }}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className=' add-user  col-3 '>
            {" "}
            <div className=' mx-auto '>
              <div className='login text-center mx-auto '>
                {/*  */}
                <div className='img_container mx-auto'>
                  <input
                    type='file'
                    accept='image/*'
                    style={{ display: "none" }}
                    id='photo'
                    id='actual-btn'
                  />{" "}
                  {error && (
                    <div className='bg-danger rounded p-1 m-3'>{error}</div>
                  )}
                  {/* <button className='btn btn-danger mx-2 ' for='actual-btn'>
                    <BsFillCameraFill />
                    Add Photo
                  </button> */}
                </div>

                {/*  */}
                <hr className='login-hr' />

                <div className='input-group'>
                  <span className='input-group-prepend input-group-text btn-danger active'>
                    <BsCardHeading />
                  </span>
                  <input
                    className='form-control bg-dark text-light py-5'
                    type='text '
                    name='des'
                    value={PostText}
                    required
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder='what is on your mind'></input>
                </div>
                <div className='shareOption mx-1 col-4 g-0 '>
                  <span className='shareOptionText'> Photo </span>
                  <label htmlFor='img'>
                    <BsCardImage className='shareIcon text-danger' />
                  </label>
                  <input
                    onChange={(e) => setImg(e.target.files[0])}
                    type='file'
                    id='img'
                    accept='image/*'
                    style={{ display: "none" }}
                  />
                </div>
                <button
                  className=' btn btn-danger '
                  onClick={(e) => submitPost(e.target.value)}>
                  Add Post
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='row '>
          <ul className='pagination pagination-sm mx-auto justify-content-center bg-dark'>
            <li className='page-item  '>
              <Link className='page-link bg-danger text-light' to='/AdminUsers'>
                Users{" "}
              </Link>
            </li>
            <li className='page-item '>
              <Link
                className='page-link bg-danger text-light'
                to='/AdminTracks'
                tabindex='-1'>
                Track{" "}
              </Link>
            </li>
            <li className='page-item'>
              <Link
                className='page-link bg-danger text-light disabled '
                to='/AdminPosts'
                tabindex='-1'>
                Posts{" "}
              </Link>
            </li>
            <li className='page-item'>
              <Link
                className='page-link bg-danger text-light  '
                to='/AdminJobs'
                tabindex='-1'>
                Jobs{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default AdminPosts;
