import React,{useState,useRef} from 'react'
import "./TicketStyle.css";
import { doc,updateDoc } from "firebase/firestore";
import {db} from '../../firebaseConfig/config';
import { dataref } from '../../firebaseConfig/realtimedbconfig';


function TicketDisplay({ticket,alfirnas}) {

  const [status, setStatusText] = useState('');
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState('');
  const closeImageModal = () => {
    setImageModalOpen(false);
    setImageModalUrl('');
  };

  const openImageModal = (imageUrl) => {
    setImageModalUrl(imageUrl);
    setImageModalOpen(true);
  };
  
  const lastUsedIdRef = useRef(4998);
  const lastusedticketid=useRef(4999);
  //handleTranslate(ticket.status);

  const formatDate = (inputDateString) => {
    const dateObject = new Date(inputDateString);
    const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    return formattedDate;
  };

  const formattedDate = formatDate(ticket.TicketDate);



  const generateNextId = () => {
    lastUsedIdRef.current += 1;
    return lastUsedIdRef.current;
  };

  const generateNextTicketId = () => {
    lastusedticketid.current += 1;
    return lastusedticketid.current;
  };

    const UpdateStatus= async (type)=>{
      
      
        const taskDocRef = doc(db, 'userTickets', ticket.id)
        try{
            await updateDoc(taskDocRef, {
                status:type
            })
            alert("Status Updated");
        
          } catch (err) {
            alert(err)
          }  finally{
            const id=generateNextId();
            const ticket=generateNextTicketId();
            dataref.ref("Sheet1").child(id).set({
                "التاريخ":formattedDate, //date
              "الحالة":ticket.status,    //Status
              "الحي":ticket.name,   //Neighbourhood
             "الفئة":"حواجز خرسانية", //Categories
              "رقم التذكرة": ticket
            }).catch(alert);
            window.location.reload();
          }
          
      

    }
    
  return (
    <div className="ticket">
      <div className="header">
        <h2>Ticket details</h2>
        <button className="close">X</button>
      </div>
      <div className="details">
        <p>Number of ticket:{ticket.serial_id}</p>
        <p>Status of local ticket:{ticket.status}</p>
        <p>Date/Time:{ticket.TicketDate}</p>
        <p>Latitude:{ticket.Latitude}</p>
        <p>Longitude:{ticket.Longitude}</p>
        <p>Class name:{ticket.className}</p>
        <p>Prediction Quantity:{ticket.prediction_quantity}</p>
        <p>Prediction output type:{ticket.prediction}</p>
        <img 
         src={ticket.image}
         width={100}
         height={100}
         style={{paddingBottom:10,cursor: 'pointer' }}
         alt="Location Picture"
         onClick={() => openImageModal(ticket.image)}
        />
                  {isImageModalOpen && (
            <div className="image-modal">
              <button className="close" onClick={closeImageModal}>
                X
              </button>
              <img
                src={imageModalUrl}
                alt="Large Image"
                style={{ maxWidth: '80%', maxHeight: '80%', margin: 'auto', display: 'block' }}
              />
            </div>
          )}
        <p>
          <a
            href={`https://www.google.com/maps/place/${ticket.Latitude},${ticket.Longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps
          </a>
        </p>
      </div>
      
      {alfirnas?
    <div>
     
      <div className="actions">
        <button className="approve" onClick={()=>UpdateStatus('Accepted')}>Approve</button>
        <button className="reject" onClick={()=>UpdateStatus('Rejected')}>Reject</button>
      </div>
        
       
      <div className="update">
        <button className="update-status" >Update ticket status</button>
      </div>
        
      </div>:null
    }

    </div>
  )
}

export default TicketDisplay