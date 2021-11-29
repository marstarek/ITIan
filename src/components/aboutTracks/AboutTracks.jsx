import "bootstrap/dist/css/bootstrap.min.css";
import "./aboutTracks.css";
import Carousel from "react-bootstrap/Carousel";
import Cards from "../../shared/card/Cards";
import Navbar from "../../shared/layout/navbar/Navbar";

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
            text={
              "Praesent commodo cursus magna, vel scelerisque nisl consecteturPraesent commodo cursus magna, vel scelerisque nisl consectetur"
            }
            photo={"assets/news/about (2).jpg"}
            title={"Front End"}
          />{" "}
          <Cards
            text={
              "Praesent commodo cursus magna, vel scelerisque nisl consecteturPraesent commodo cursus magna, vel scelerisque nisl consectetur"
            }
            photo={"assets/news/about (3).png"}
            title={"Back End"}
          />{" "}
          <Cards
            text={
              "Praesent commodo cursus magna, vel scelerisque nisl consecteturPraesent commodo cursus magna, vel scelerisque nisl consectetur"
            }
            photo={"assets/news/about (2).jpg"}
            title={"Front End"}
          />{" "}
          <Cards
            text={
              "Praesent commodo cursus magna, vel scelerisque nisl consecteturPraesent commodo cursus magna, vel scelerisque nisl consectetur"
            }
            photo={"assets/news/about (1).png"}
            title={"Front End"}
          />{" "}
          <Cards
            text={
              "Praesent commodo cursus magna, vel scelerisque nisl consecteturPraesent commodo cursus magna, vel scelerisque nisl consectetur"
            }
            photo={"assets/news/about (1).png"}
            title={"Front End"}
          />{" "}
          <Cards
            text={
              "Praesent commodo cursus magna, vel scelerisque nisl consecteturPraesent commodo cursus magna, vel scelerisque nisl consectetur"
            }
            photo={"assets/news/about (1).png"}
            title={"Front End"}
          />{" "}
          <Cards
            text={
              "Praesent commodo cursus magna, vel scelerisque nisl consecteturPraesent commodo cursus magna, vel scelerisque nisl consectetur"
            }
            photo={"assets/news/about (1).png"}
            title={"Front End"}
          />{" "}
          <Cards
            text={
              "Praesent commodo cursus magna, vel scelerisque nisl consecteturPraesent commodo cursus magna, vel scelerisque nisl consectetur"
            }
            photo={"assets/news/about (1).png"}
            title={"Front End"}
          />{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};
export default AboutTracks;
