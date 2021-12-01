import "bootstrap/dist/css/bootstrap.min.css";
import "./aboutTracks.css";
import Carousel from "react-bootstrap/Carousel";
import Cards from "../../shared/card/Cards";
import Navbar from "../../shared/layout/navbar/Navbar";
import ChatIcon from "../../shared/ChatIcon/ChatIcon";

export const AboutTracks = () => {
  return (
    <>
      <Navbar />
      <div className="slider   ">
        <Carousel className="Carousel  w-100 g-0 ">
          <Carousel.Item className="CarouselItem">
            <img
              className="d-block w-100 img-fluid "
              src="assets/news/iti3.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <p className={`text-light  d-none d-lg-block  fs-3`}>
                We conduct regular focus groups with industry leaders to better
                understand existing and future market demand, and provide
                training
              </p>{" "}
            </Carousel.Caption>{" "}
          </Carousel.Item>{" "}
          <Carousel.Item className="CarouselItem">
            <img
              className="d-block w-100 img-fluid "
              src="assets/news/iti2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <p className={`text-light d-none d-lg-block  fs-3`}>
                Our programs provide more than 32 ICT disciplines that cover a
                wide technological spectrum including for example but not
                limited
              </p>{" "}
            </Carousel.Caption>{" "}
          </Carousel.Item>{" "}
          <Carousel.Item className="CarouselItem">
            <img
              className="d-block w-100 img-fluid"
              src="assets/news/itivally (1).jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <p className={`text-light d-none d-lg-block  fs-3`}>
                Our programs provide more than 32 ICT disciplines that cover a
                wide technological spectrum including for example but not
                limited
              </p>{" "}
            </Carousel.Caption>{" "}
          </Carousel.Item>{" "}
        </Carousel>{" "}
      </div>{" "}
      {/* cards */}{" "}
      <div className="containerr w-75 text-center mx-auto">
        <div className="flex mx-auto">
          <Cards
            className=" w-100"
            text={
              "The front end of web development or the front end that is dealt with for web sites and applications using HTML, CSS, JavaScript, PHP, ASP, and others."
            }
            photo={"assets/news/about (2).jpg"}
            title={"Front End"}
          />{" "}
          <Cards
            text={
              "In the computer world, the backend refers to any part of a website or software program that users do not see. It contrasts with the frontend, which refers to a program's or website's user interface. ... Everything that happens before the page is displayed in a web browser is part of the backend"
            }
            photo={
              "https://www.thebalancecareers.com/thmb/e4jb75zz3oTp1EQ_MmLQhv-vRoo=/672x0/filters:max_bytes(150000):strip_icc():format(webp)/backenddeveloper-2502825a14ff440eb775dc4244e7ed4d.png"
            }
            title={"Back End"}
          />{" "}
          <Cards
            text={
              "Database developers ensure that database management systems (DBMS) can handle massive quantities of data. Also called database programmers, developers usually work as part of a software development team"
            }
            photo={
              "https://www.interhuss.com/wp-content/uploads/2017/08/11763-59a364f7dfede.jpg"
            }
            title={"DataBase"}
          />{" "}
          <Cards
            text={
              "MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.MongoDB - document database Express(.js) - Node.js web framework React(.js) - a client-side JavaScript framework Node(.js) - the premier JavaScript web server"
            }
            photo={"https://i.morioh.com/bb436ff064.png"}
            title={"MERN"}
          />{" "}
          <Cards
            text={
              "A full stack web developer is a person who can develop both client and server software. In addition to mastering HTML and CSS, he/she also knows how to: Program a browser (like using JavaScript, jQuery, Angular, or Vue) Program a server(like using PHP, ASP, Python, or Node) Program a database (like using SQL, SQLite, or MongoDB)"
            }
            photo={"assets/news/about (3).png"}
            title={"Full Stack "}
          />{" "}
          <Cards
            text={
              "Software developers are the creative, brainstorming masterminds behind computer programs of all sorts. While some software developers may focus on a specific program or app, others create giant networks or underlying systems that help trigger and power other programs. This is why there are two main classifications of developers: applications software developers and systems software developers."
            }
            photo={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvpZ9S5JmFxAtgxwaElO8WTST-uHA-KnJT7A&usqp=CAU"
            }
            title={"Software "}
          />{" "}
          <Cards
            text={
              "The internet of things, or IoT, is a system of interrelated computing devices, mechanical and digital machines, objects, animals or people that are provided with unique identifiers (UIDs) and the ability to transfer data over a network without requiring human-to-human or human-to-computer interaction."
            }
            photo={
              "https://blazent.com/wp-content/uploads/2017/01/bigstock-Internet-Of-Things-Concept-118680695-768x571.jpg"
            }
            title={"Lot Application"}
          />{" "}
          <Cards
            text={
              "An enterprise application (EA) is a large software system platform designed to operate in a corporate environment such as business or government. EAs are complex, scalable, component-based, distributed and mission critical. EA software consists of a group of programs with shared business applications and organizational modeling utilities designed for unparalleled functionalities. EAs are developed using enterprise architecture. EA software is a critical component of any computer-based information system. EA software ultimately enhances efficiency and productivity through business level support functionality. "
            }
            photo={
              "https://www.singlemindconsulting.com/wp-content/uploads/2020/08/top-4-enterprise-application-integration-benefits.jpg"
            }
            title={"EA"}
          />{" "}
          <Cards
            text={
              "An end-to-end approach to device security in the IoT means extending security mechanisms from the device to the cloud to the application, in a seamless and fully integrated manner. Each of these levels uses different protocols and standards to achieve security"
            }
            photo={
              "data:image/png;base64,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"
            }
            title={"iot end to end"}
          />{" "}
        </div>{" "}
      </div>{" "}
      <ChatIcon />{" "}
    </>
  );
};
export default AboutTracks;
