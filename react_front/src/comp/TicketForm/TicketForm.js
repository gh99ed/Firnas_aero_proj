import "./TicketStyle.css"
import ticket from "../intMap/Markers.json"
import React, {useState, useEffect} from "react";

const TicketForm = ({ ticket }) => {
 
  return (
    
    <div className="card ticket" 
         id={`ticket${ticket.Ticket_ID}`} 
         style={{ display: "block" }}>

      <div className="card-header">
        <h4 className="m-0">Ticket details</h4>
      </div>
      <div className="card-body">
        {/* Display ticket information using the "ticket" prop */}
        <p>Ticket ID: {ticket.Ticket_ID}</p>
        <p>Name: {ticket.name}</p>
        <p>Latitude:{ticket.late}</p>
        <p>Longitude: {ticket.long}</p>
        {/* Provide a link to the pinned location */}
        <p>
          <a
            href={`https://www.google.com/maps/place/${ticket.late},${ticket.long}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps
          </a>
        </p>
        <img 
         src={`data:image/png;base64,${ticket.img}`}
         width={100}
         height={100}
         style={{paddingBottom:10}}
         alt="Location Picture"
        />

    
        <div className="mx-auto text-center mt-1" id="actions">
        <a
          onclick="updateStatus(1,82)"
          className="btn btn-success text-white mr-3"
        >
          Approve
        </a>
  
        <a
          onclick="updateStatus(0,82)"
          className="btn btn-danger text-white "
        >
          Reject
        </a>
        
        <a
          onclick="getAutoMaxStatus(0,82)"
          id="sendTicket"
          className="btn btn-info btn-block text-white mt-2"
          target="_blank"
        >
          <i className="fa fa-cloud" /> Update ticket status
        </a>
      </div>
      </div>
    </div>
  );
};









export default TicketForm;
