import React, { useState, useEffect } from "react";
import IntMap from "../comp/intMap/intMap";
import "../comp/TicketForm/TicketStyle.css"
import { useTranslation } from 'react-i18next';
import TransButton from "../comp/TransButton/TranselationButton";
import TicketForm from "../comp/TicketForm/TicketForm";
import "../local/rtl.css"
import axios from 'axios';
import Model_form from "../comp/Model_From/model_form";
import Titel from "../comp/Titel"
import { getDownloadURL, uploadBytes, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { firebaseStorage, firestoreStorage } from "../firebaseConfig/config";
import InferenceForm from "../comp/Roboflow/InferenceForm";

// const InferenceForm = () => {


//   return (
//     <div style={{ width: '10000px', height: '600px', margin: '0 auto', border: '1px solid #ccc' }}>
//       <iframe
//         src="https://detect.roboflow.com/?model=argus-test-3&version=3&api_key=WePcRMULIJPkTl9enEXl"
//         width="100%"
//         height="100%"
//         allowFullScreen
//       />
//     </div>

//   );
// };




// function TicketForm() {
//   const [isTicketVisible, setTicketVisible] = useState(true);

//   const handleCloseTicket = () => {
//     setTicketVisible(false);
//   };

//   if (!isTicketVisible) {
//     return null;
//   }

//   return (
//     <div className="card ticket" id="ticket01" style={{ display: "block" }}>
//   <div className="card-header">
//   <h4 className="m-0">Ticket details</h4>
//         <a href="#" className="close" onClick={handleCloseTicket} style={{}}>
//       <i className="far fa-times-circle" />
//     </a>
//   </div>
//   <div className="card-body">
//     <ul>
//       <li>
//         <label>
//           <i className="fa fa-file-alt" /> Ticket Number:
//         </label>
//         <span id="NumTicket">82</span>
//       </li>
//       <li>
//         <label>
//           <i className="fa fa-file-alt" /> Status of local ticket :
//         </label>
//         <span id="StatusTicket">approved</span>
//       </li>
//       <li>
//         <label style={{ whiteSpace: "nowrap" }}>
//           <i className="fa fa-file-alt" /> Status of automax ticket :
//         </label>
//         <span id="StatusAutoMaxTicket" className="text-right">
//           Sent
//         </span>
//       </li>
//       <li>
//         <label>
//           <i className="fa fa-calendar" /> Date / Time :
//         </label>
//         <span id="DateTime" className="">
//           2022-08-22 07:52:15
//         </span>
//       </li>
//       <li>
//         <label>
//           <i className="fa fa-map-pin" /> Latitude :
//         </label>
//         <span id="Lat">24.5032</span>
//       </li>
//       <li className="">
//         <label>
//           <i className="fa fa-map-pin" /> Longitude :
//         </label>
//         <span id="Long">39.5688</span>
//       </li>
//       <li>
//         <label>
//           <i className="fa fa-tag" /> Class name :
//         </label>
//         <span id="Class">Garbage</span>
//       </li>
//       <li className="">
//         <label>
//           <i className="fa fa-tag" /> Count of objects :
//         </label>
//         <span id="Count">1</span>
//       </li>
//       <li>
//         <label>
//           <i className="fa fa-tag" /> Confidence :
//         </label>
//         <span id="Confidence">46.12%</span>
//       </li>
//       <li>
//         <label>
//           <i className="fa fa-download" /> Prediction output Type :
//         </label>
//         <span id="json_link">
//           <a href="http://pocf.letsvers.com/fetch/marker/82" target="_blank">
//             JSON
//           </a>
//         </span>
//       </li>
//       <li>
//         <label>
//           <i className="fa fa-paperclip" /> Prediction output File :
//         </label>
//         <span id="outputfile">
//           <a
//             href="http://pocf.letsvers.com/raster/63d525ce69854.JPEG"
//             target="_blank"
//           >
//             Proccessed image
//           </a>
//         </span>
//       </li>
//     </ul>
//     <div className="mx-auto text-center mt-1" id="actions">
//       <a
//         href="#"
//         onclick="updateStatus(1,82)"
//         className="btn btn-success text-white mr-3"
//       >
//         Approve
//       </a>

//       <a
//         href="#"
//         onclick="updateStatus(0,82)"
//         className="btn btn-danger text-white "
//       >
//         Reject{" "}
//       </a>

//       <a
//         onclick="getAutoMaxStatus(0,82)"
//         id="sendTicket"
//         className="btn btn-info btn-block text-white mt-2"
//         target="_blank"
//       >
//         <i className="fa fa-cloud" /> Update ticket status
//       </a>
//     </div>
//   </div>
// </div>

//   );
// }




const FirnasLog = () => {
  const [t, i18n] = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [dire, setDirection] = useState('ltr');
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(firebaseStorage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
        console.log(progress)
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          addDatatoFirestore(downloadURL)
        });
      }
    );
  }
  const handleMarkerClick = () => {
    setShowForm(true);
  };

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
  };
  const addDatatoFirestore = async (url) => {
    const date = new Date()
    try {
      const docRef = await addDoc(collection(firestoreStorage, "files"), {
        timeStamp: date,
        url: url
      });

      console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>

      <Titel />
      <nav
        className="navbar navbar-expand-md sticky-top py-3 navbar-dark"
        id="mainNav"
        style={{ background: "#025F5F", color: "#00544D" }}
      >

        <div className="container">
          <TransButton onDirectionChange={handleDirectionChange} />
          <button
            data-bs-toggle="collapse"
            data-bs-target="#navcol-2"
            className="navbar-toggler"
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon" />
          </button>
          <img
            src="assets/img/Screenshot%202023-08-02%20at%204.11.46%20PM.png"
            width={347}
            height={129}
          />
          <div
            className="collapse navbar-collapse"
            id="navcol-1"
            style={{
              borderStyle: "none",
              color: "rgba(0,84,77,0)",
              marginRight: "-475px",
              paddingRight: 170,
            }}
          >
            <button
              className="btn btn-primary"
              data-bss-hover-animate="flash"
              type="button"
              style={{
                background: 'url("assets/img/logo.png") no-repeat, #00000000',
                backgroundSize: "cover, auto",
                width: 292,
                height: 102,
                transform: "perspective(0px)",
                color: "rgba(0,0,0,0)",
                marginRight: 23,
                paddingRight: 0,
                paddingBottom: 0,
                marginBottom: 21,
                borderColor: "#025F5F",
              }}
            />
            <button
              className="btn btn-primary"
              type="button"
              style={{
                background:
                  'url("assets/img/logo1.png") no-repeat, #00000000',
                backgroundSize: "cover, auto",
                width: 341,
                height: 104,
                transform: "perspective(0px)",
                color: "rgba(0,0,0,0)",
                paddingBottom: 0,
                marginBottom: 3,
                marginRight: 12,
                paddingRight: 0,
                marginTop: 34,
                borderColor: "#025F5F",
              }}
            />
            <small>
              Tex
              <i
                className="fa fa-user"
                style={{
                  fontSize: 26,
                  marginRight: 9,
                  color: "#ffffff",
                  paddingLeft: 52,
                  marginTop: 119,
                  marginLeft: 89,
                  marginBottom: "-14px",
                }}
              />
              t
            </small>
            <small
              style={{
                fontFamily: "Raleway, sans-serif",
                color: "var(--bs-primary-bg-subtle)",
                fontSize: 18,
                marginTop: 120,
                fontWeight: "bold",
                marginRight: "-2px",
                marginLeft: "-8px",
              }}
            >
              Firnas Aero
            </small>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item" />
            </ul>
          </div>
          <div
            className="collapse navbar-collapse"
            id="navcol-2"
            style={{
              borderStyle: "none",
              color: "rgba(0,84,77,0)",
              marginRight: "-475px",
              paddingRight: 170,
            }}
          />
        </div>

      </nav>

      <div style={{ direction: dire }}>
        <InferenceForm />
        <section className="py-5" style={{ background: "#ffffff" }}>
          {/* <section
            className="py-4 py-xl-5"
            style={{ marginBottom: "-29px", marginTop: "-78px" }}
          >
            <section
              className="py-4 py-xl-5"
              style={{ marginBottom: "-29px", marginTop: "-78px" }}
            />
            <div
              className="container"
              style={{ borderBottomColor: "var(--bs-secondary)" }}
            >
              <div
                className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5"
                style={{
                  height: "170.398px",
                  width: 1296,
                  color: "#327777",
                  border: "13px double var(--bs-secondary)"
                }}
              >
                <div
                  className="pb-2 pb-lg-1"
                  style={{ borderStyle: "solid", borderBottomStyle: "none" }}
                >
                  <h2
                    className="fw-bold mb-2"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontSize: 30,
                      color: "#327777",
                      borderColor: "var(--bs-secondary)",
                      fontWeight: "bold"
                    }}
                  >
                    <strong style={{ alignSelf: "right" }} >{t("Upload_image")}</strong>
                  </h2>
                  <p
                    className="mb-0"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontSize: 24,
                      color: "#327777",
                      borderColor: "var(--bs-secondary)",
                      fontWeight: "bold",
                      direction: 'rtl'
                    }}
                  >
                    {t("Upload_image_dec")}
                  </p>
                </div>
              </div>
            </div>
          </section> */}
          {/* <div className="container">
            <div className="files color form-group mb-3">
              <form onSubmit={handleSubmit} className='form'>
                <input
                  type="file"
                  multiple=""
                  name="files"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    background: "rgb(255,255,255)",
                    borderColor: "var(--bs-primary)",
                    marginBottom: "-13px",
                    fontWeight: "bold"
                  }}
                />
                <button type='submit'>Upload</button>
              </form>
            </div>
          </div> */}
          <section
            className="py-4 py-xl-5"
            style={{ marginTop: "-30px", marginBottom: "-33px" }}
          >
            <div className="container">
              <div
                className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5"
                style={{
                  paddingBottom: 23,
                  marginBottom: "-13px",
                  marginTop: "-1px"
                }}
              >
                <div
                  className="pb-2 pb-lg-1"
                  style={{ marginRight: 0, paddingRight: 0 }}
                >
                  <h2
                    className="fw-bold mb-2"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontSize: 30,
                      color: "#327777",
                      fontWeight: "bold"
                    }}
                  >
                    {t("Interactive_map")}
                  </h2>
                  <p
                    className="mb-0"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      color: "#327777",
                      fontWeight: "bold",
                      fontSize: 24
                    }}
                  >
                    {t("Interactive_map_dec_firnas")}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <h1
            style={{
              fontFamily: "Raleway, sans-serif",
              textAlign: "center",
              fontSize: 35
            }}
          />


          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <IntMap onMarkerClick={handleMarkerClick} alfirnas={true} />
            </div>
            {showForm && (
              <div style={{ flex: 1 }}>
                <TicketForm />
              </div>
            )}
          </div>


          <footer className="text-center">
            <div className="container text-muted py-4 py-lg-5">
              <p className="mb-0" style={{ fontFamily: "Raleway, sans-serif" }}>
                Firnas Aero © 2023
              </p>
            </div>
          </footer>
        </section>
      </div>
      <section />
      <section />
    </div>


  );
};

export default FirnasLog;

