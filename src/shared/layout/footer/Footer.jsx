import styles from "./footer.module.css";
import {
  BsLinkedin,
  BsFacebook,
  BsYoutube,
  BsTelephoneFill,
  BsMapFill,
  BsMailbox2,
} from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <div class="navBar    container-fluid   sticky-bottom text-light ">
        <footer class=" text-light  d-flex flex-wrap justify-content-between align-items-center py-4   ">
          <div class="col-md-4 d-flex align-items-center">
            <ul calssName="lh-1">
              <li className="fs-3 fw-bold lh-2">Contact Us</li>
              <li className=" ">
                <div className="py-2">
                  <svg class="bi" width="24" height="24">
                    <BsMapFill calssName="fs-1  me-5" />{" "}
                  </svg>

                  <span>
                    &nbsp;28 Km by Cairo / Alexandria Desert Road, 6 October,
                    B148,
                  </span>
                </div>
              </li>
              <li className=" ">
                <div className="py-2">
                  <svg class="bi" width="24" height="24">
                    <BsTelephoneFill calssName="fs-1 me-5" />
                  </svg>
                  <span calssName="">&nbsp;(+202) 353-55656</span>
                </div>
              </li>
              <li className=" ">
                <div className="py-2">
                  <svg class="bi" width="24" height="24">
                    <BsMailbox2 calssName="fs-1  me-5" />
                  </svg>
                  <span>&nbsp;ITIinfo@iti.gov.eg</span>
                </div>
              </li>
            </ul>
          </div>

          <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li class="ms-3">
              <a
                class="text-light"
                href="https://www.linkedin.com/school/information-technology-institute-iti-/"
              >
                <svg class="bi" width="40" height="40">
                  <BsLinkedin class="fs-3" />
                </svg>
              </a>
            </li>
            <li class="ms-3">
              <a class="text-light" href="https://www.facebook.com/ITIchannel/">
                <svg class="bi" width="40" height="40">
                  <BsFacebook class="fs-3" />{" "}
                </svg>
              </a>
            </li>
            <li class="ms-3">
              <a
                class="text-light"
                href="https://www.youtube.com/user/itichannel"
              >
                <svg class="bi" width="40" height="40">
                  <BsYoutube class="fs-3" />
                </svg>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Footer;
