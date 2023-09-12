import React, {useState} from "react";
import IntMap from "../comp/intMap/intMap";
import Iframe from 'react-iframe'; // npm install react-iframe
import TransButton from "../comp/TransButton/TranselationButton";
import { useTranslation } from 'react-i18next';
import "../comp/TicketForm/TicketStyle.css"
import "../local/rtl.css"
import Titel from "../comp/Titel"
import TicketDisplay from "../comp/TicketDisplay/TicketDisplay";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import "../pages/med_log.css";
import { dataref } from '../firebaseConfig/realtimedbconfig';
import DataTable from "../comp/DataTable/DataTable";

import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from "../firebaseConfig/config";

const MedLog = () => {
  const [t, i18n] = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [dire, setDirection] = useState('ltr');

  const [data,setData]=useState([]);


  const handleMarkerClick = () => {
    setShowForm(true);
  };

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
  };

  const getData=async ()=>{
    dataref.ref(`Sheet3`).on('value', snapshot => {
      let responselist = snapshot.val()
      setData(responselist)
     
  });

  
  }

  async function handleDownload() {
    try {
      // Replace 'your-file-path' with the actual path to the file in Firebase Storage
      console.log("Called")
      const fileRef = ref(firebaseStorage, '/TotalData/IncidentDetailsReport-Firna_s.xlsx');
  
      // Get the download URL of the file
      const downloadURL = await getDownloadURL(fileRef);
  
      // Create a link and trigger a click to start the download
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'IncidentDetailsReport-Firna_s.xlsx'; // Set the desired file name
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
  

  return (
    <>
  <header className="bg-dark">
    <Titel/>
    <nav
      className="navbar navbar-expand-md sticky-top py-3 navbar-dark"
      id="mainNav"
      style={{ background: "#025F5F", color: "#00544D" }}
    >
      <div className="container">
        <TransButton onDirectionChange={handleDirectionChange}/>
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
            paddingRight: 170
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
              borderColor: "#025F5F"
            }}
          />

          <button
            className="btn btn-primary"
            type="button"
            style={{
              background: 'url("assets/img/logo1.png") no-repeat, #00000000',
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
              borderColor: "#025F5F"
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
                marginBottom: "-14px"
              }}
            />
            t
          </small>
          <small
            style={{
              fontFamily: "Raleway, sans-serif",
              color: "var(--bs-primary-bg-subtle)",
              fontSize: 16,
              marginTop: 120,
              fontWeight: "bold",
              marginRight: "-2px",
              marginLeft: "-8px"
            }}
          >
            AlMadinah
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
            paddingRight: 170
          }}
        />
      </div>
    </nav>
  </header>
  <div style={{direction : dire}}>
    <section className="py-5" style={{ background: "#ffffff" }}>
      <section
        className="py-4 py-xl-5"
        style={{ marginBottom: "-29px", marginTop: "-78px" }}
      />
      <section
        className="py-4 py-xl-5"
        style={{ marginBottom: "-33px", marginTop: "-75px" }}
      >
        <div className="container">
          <div
            className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5"
            style={{ paddingBottom: 23, marginBottom: "-13px", marginTop: 31 }}
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
                  color: "#327777"
                }}
              >
                <strong>{t("Interactive_map")}</strong>
              </h2>
              <p
                className="mb-0"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  color: "#327777",
                  fontSize: 24
                }}
              >
                <strong>{t("Interactive_map_dec_med")}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      <h1
        style={{
          fontFamily: "Raleway, sans-serif",
          fontSize: 35
        }}
      />


      <div >
            <div >
              <IntMap  />
            </div>
          </div>


          <footer >
        <div className="container text-muted py-4 py-lg-5">
          <div
            className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5"
            style={{
              paddingBottom: 23,
              marginBottom: "-13px",
              marginTop: "-34px"
            }}
          >
            <div
              className="pb-2 pb-lg-1"
              style={{ marginRight: 0, paddingRight: 0 }}
            >
              <p
                className="bold mb-0"
                style={{
                  fontFamily: "Raleway, sans-srif",
                  fontSize: 30,
                  color: "#327777"
                }}
              >
                <strong>{t("Dashboard")}</strong>
              </p>
              <p
                className="mb-0"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  color: "#327777",
                  fontSize: 24
                }}
              >
            <strong>{t("Dashboard_dec")}
            </strong>
              </p>
        </div>
      </div>
    </div>
  </footer>

  <div className="container" style={{ width: '100%', height: '900px' }}>
    <p
      className="mb-0"
      style={{ fontFamily: "Raleway, sans-serif"}}
    >
    </p>

    {/* <Iframe 
      src="https://app.powerbi.com/view?r=eyJrIjoiYzEwMmRiNTMtN2M2Ni00MGJmLWExZDItYmUwN2Q0MTBjYzFjIiwidCI6ImI0NTNkOTFiLTZhYzEtNGI2MS1iOGI4LTVlNjVlNDIyMjMzZiIsImMiOjl9&pageName=ReportSection"
      width="1300"
      height="900"
      id="myId"
      className="myClassname"
      allowFullScreen={true}
    /> */}

<Iframe title="Report Section" width="1300" height="900" src="https://app.powerbi.com/view?r=eyJrIjoiY2ZlNjkwNDktZTAxZC00ZWM5LWEyYTgtM2MxOTAzYTc0MzE3IiwidCI6ImI0NTNkOTFiLTZhYzEtNGI2MS1iOGI4LTVlNjVlNDIyMjMzZiIsImMiOjl9" frameborder="0" allowFullScreen="true"  id="myId"
      className="myClassname"/>
  </div>
  <div className="container" style={{marginTop:20}}>
    <div style={{flexDirection:'row'}}> 
    <button className="bttn__primary" onClick={()=>getData()}>
        Display Data
    </button>
    <button className="bttn__primary"  style={{marginLeft:20}} onClick={()=>handleDownload()}>
        Download Excel
    </button>
    </div>
    {data.length!=0 ? <DataTable data={data}/> : null}

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
</>

  );
};

export default MedLog;
