import React from "react";
import "./aboutTrack.css";
import {
  BsSun,
  BsKeyboard,
  BsTools,
  BsBank,
  BsTagsFill,
  BsGenderAmbiguous,
  BsFlagFill,
  BsFillAwardFill,
} from "react-icons/bs";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import CoursCard from "../../shared/card/CoursCard";
import ShowMoreText from "react-show-more-text";
import Navbar from "../../shared/layout/navbar/Navbar";

const AboutTrack = () => {
  return (
    <>
      <Navbar />
      <div className='trackheader row m-0'>
        <div className='text-center my-auto '>
          <h1> Front End Developmant </h1>
          <p className=''>All you need to be able to join the track.</p>
        </div>
      </div>
      {/* <!-- About track  --> */}
      <section className='AboutTrack mb-5 '>
        <div className='container'>
          <div className='AboutTrack_items row'>
            <div className='AboutTrack_left col-md-6'>
              <img src='assets/frontend-development.png' alt='' />
            </div>
            <div className='AboutTrack_right col-md-6 my-auto'>
              <article>
                <h2 className=' text-md-start'> What is Front End ? </h2>
                <p>
                  The front - end of a website is the part that users interact
                  with. Everything that you see when you’re navigating around
                  the Internet, from fonts and colors to dropdown menus and
                  sliders, is a combo of HTML, CSS, and JavaScript being
                  controlled by your computer’s browser.
                </p>
                <div className=''>
                  <h3>Job profiles</h3>
                  <ul>
                    <li>
                      <BsSun className='fs-5 me-2' /> UI Developer
                    </li>
                    <li>
                      <BsKeyboard className='fs-5 me-2' />
                      Frontend Developer
                    </li>
                    <li>
                      <BsTools className='fs-5 me-2' />
                      JavaScript Developer
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className='apply text-center py-5 '>
        <div className='container'>
          <h2 className=' text-md-center'> who can apply </h2>
          <p>
            All University Graduates with prerequisites of the following: he
            must have a first degree from a recognized university or institution
            of higher education, or provide documentation indicating that they
            will earn such a first degree before enrolment in the 3-month or
            6-month program. Admission Requirements for Students vary depending
            on the student's area of study.
          </p>
          <div className='apply-container row mt-5     justify-content-center'>
            <article className='apply-item col-md-6 col-lg-2 '>
              <p className='d-flex'>
                {" "}
                <h5 className='item_head'> Gender</h5>{" "}
                <h5>
                  {" "}
                  <BsGenderAmbiguous className='d-flex mx-2' size={25} />
                </h5>
              </p>
              <ul>
                {" "}
                <li> Male , Female </li>{" "}
              </ul>{" "}
            </article>
            <article className='apply-item  col-md-6 col-lg-2'>
              <p className='d-flex'>
                {" "}
                <h5 className='item_head'> Nationality </h5>{" "}
                <h5>
                  {" "}
                  <BsFlagFill className='d-flex mx-2' size={25} />
                </h5>
              </p>
              <ul>
                {" "}
                <li> Egyptians </li>
              </ul>{" "}
            </article>
            <article className='apply-item  col-md-6 col-lg-2'>
              <p className='d-flex'>
                {" "}
                <h5 className='item_head '>Degree </h5>{" "}
                <h5>
                  <BsBank className='d-flex ms-2' size={30} />{" "}
                </h5>
              </p>
              <ul>
                {" "}
                <li> Bachelor Degree </li>
              </ul>{" "}
            </article>
            <article className='apply-item  col-md-6 col-lg-2 '>
              <p className='d-flex'>
                {" "}
                <h5 className='item_head'> Military Service </h5>{" "}
                <h5>
                  {" "}
                  <BsTagsFill className='d-flex mx-2' size={25} />
                </h5>
              </p>
              <ul>
                {" "}
                <li> Defered, Exempted or Completed </li>
              </ul>
            </article>
            <article className='apply-item  col-md-6 col-lg-2'>
              <p className='d-flex'>
                {" "}
                <h5 className='item_head'> Graduation Year </h5>{" "}
                <h5>
                  {" "}
                  <BsFillAwardFill className='d-flex mx-2' size={25} />
                </h5>
              </p>
              <ul>
                {" "}
                <li>Last 10 Years (not always 10 years) </li>
              </ul>
            </article>
          </div>
        </div>
      </section>
      {/* BEFORE YOU APPLY
       */}
      <section>
        <div className='container'>
          <div className='AboutTrack_items row g-0 my-5 py-3 align-items-center'>
            <div className='AboutTrack_right col-md-6'>
              <Accordion defaultActiveKey='0' className='Accordion my-4'>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>IQ Exam</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      The IQ exam has a specific duration and a time counter
                      that moves downward during your solution to the exam, so
                      what is the number of minutes set for each exam of them
                      and how to act smart and collect the largest number of
                      points in the exam, all of this you will find clarified in
                      this video:
                      <br />
                      https://www.youtube
                      <br />
                      .com/watch?v=L2ckEbIC9pY
                    </p>
                    <ul>
                      <li> Challenge 501 book</li>
                      <li> Ultimate Book</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                  <Accordion.Header>ٌEnglish Exam</Accordion.Header>
                  <Accordion.Body>
                    The English exam has a specific duration and a time counter
                    that moves downward during your solution to the exam, so
                    what is the number of minutes set for each exam of them and
                    how to act smart and collect the largest number of points in
                    the exam, all of this you will find clarified in this video:
                    <br />
                    https://www.youtube
                    <br />
                    .com/watch?v=L2ckEbIC9pY
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className=' AboutTrack_left mt-3 col-md-6'>
              <h2 className=' text-md-start'> English & IQ Exam </h2>
              <p>
                You should pass both two exams to be able join the interview.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='before-apply py-5  my-5 '>
        <div className='container'>
          <div className='AboutTrack_items row d-flex align-items-center'>
            <div className='AboutTrack_left col-md-6'>
              <img src='assets/pp.png' alt='' />
            </div>
            <div className='AboutTrack_right col-md-6 text-sm-center text-md-start'>
              <article>
                <h2 className=' text-md-start'> BEFORE YOU APPLY </h2>
                <p className=' text-sm-center text-md-start'>
                  You can us these resources to prepare to the interview :
                </p>
                <Dropdown>
                  <Dropdown.Toggle variant='danger' id='dropdown-basic'>
                    Study resources
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href='https://alligator.io/css/ https://css-tricks.com/'>
                      css-tricks
                    </Dropdown.Item>
                    <Dropdown.Item href='http://www.maharatech.gov.eg'>
                      Web Fundamentals
                    </Dropdown.Item>
                    <Dropdown.Item href='https://tutorialzine.com/tag/css'>
                      tutorialzine css
                    </Dropdown.Item>
                    <Dropdown.Item href='http://www.maharatech.gov.eg'>
                      Javascript
                    </Dropdown.Item>
                    <Dropdown.Item href='https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-javascript'>
                      Javascript freecodecamp
                    </Dropdown.Item>
                    <Dropdown.Item href='https://skillcrush.com/blog/skills-tobecome-a-front-end-developer/'>
                      Frontend handbook
                    </Dropdown.Item>
                    <Dropdown.Item href='https://helpx.adobe.com/photoshop/tutorials.html'>
                      Adobe Photoshop
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </article>
            </div>
          </div>
        </div>
      </section>
      {/* map */}
      <section className='study-map text-center my-5'>
        <div className='container'>
          <h2>Study Map</h2>
          <div className='row my-5 '>
            <div className='col-md-6 col-lg-3 '>
              <CoursCard
                coursedesc={
                  "HTML, or Hyper Text Markup Language, is a standard set of tags you will use to tell the web browser how the content of your web pages and applications are struc"
                }
                photo={"assets/courses/html.png"}
                title={"HTML&CSS"}
                link1={"https://maharatech.gov.eg/enrol/index.php?id=36"}
                coursname1={"Mahara Tech "}
                link2={
                  "https://www.udacity.com/course/intro-to-html-and-css--ud001"
                }
                coursname2={"U D A C I T Y"}
                link3={"https://elzero.org/study/css-2021-study-plan/"}
                coursname3={"ELZERO WEB SCHOOL"}
              />
            </div>
            <div className='col-md-6 col-lg-3 '>
              <CoursCard
                coursedesc={
                  "Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins."
                }
                photo={"assets/courses/Bootstrap.png"}
                title={"Bootstrap"}
                link1={"https://maharatech.gov.eg/enrol/index.php?id=36"}
                coursname1={"Mahara Tech "}
                link2={"https://maharatech.gov.eg/enrol/index.php?id=36"}
                coursname2={"U D A C I T Y"}
                link3={"https://maharatech.gov.eg/enrol/index.php?id=36"}
                coursname3={"ELZERO WEB SCHOOL"}
              />
            </div>
            <div className='col-md-6 col-lg-3 '>
              <CoursCard
                coursedesc={
                  "JavaScript is the world's most popular programming language and the programming language of the Web."
                }
                photo={"assets/courses/js.png"}
                title={"JS&ES6"}
                link1={"https://maharatech.gov.eg/course/view.php?id=36"}
                coursname1={"Mahara Tech "}
                link2={"https://maharatech.gov.eg/enrol/index.php?id=36"}
                coursname2={"U D A C I T Y"}
                link3={"https://maharatech.gov.eg/enrol/index.php?id=36"}
                coursname3={"ELZERO WEB SCHOOL"}
              />
            </div>
            <div className='col-md-6 col-lg-3 '>
              <CoursCard
                coursedesc={
                  "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes."
                }
                photo={"assets/courses/react.png"}
                title={"React"}
                link1={"https://maharatech.gov.eg/enrol/index.php?id=36"}
                coursname1={"Mahara Tech "}
                link2={"https://maharatech.gov.eg/enrol/index.php?id=36"}
                coursname2={"U D A C I T Y"}
                link3={"https://maharatech.gov.eg/enrol/index.php?id=36"}
                coursname3={"ELZERO WEB SCHOOL"}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutTrack;
