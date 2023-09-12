import React, { useState, useRef, useEffect,useMemo } from 'react';
import L from 'leaflet';
import TicketForm from '../TicketForm/TicketForm';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig/config';
import TicketDisplay from '../TicketDisplay/TicketDisplay';

const IntMap = ({ onMarkerClick, alfirnas }) => {
  const [TicketsData, setData] = useState([]);
  const prevData = useRef([]);
  

  const fetchPost = async () => {
    let query = collection(db, 'userTickets');

    try {
      const querySnapshot = await getDocs(query);

      var newData;

      if (!alfirnas) {
        newData = querySnapshot.docs
          .filter((doc) => doc.data().status === 'Accepted')
          .map((doc, index) => ({ ...doc.data(), id: doc.id, serial_id: index + 1 }));
      } else {
        newData = querySnapshot.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, serial_id: index + 1 }));
        console.log(newData);
      }


      if (JSON.stringify(prevData.current) !== JSON.stringify(newData)) {
        setData(newData);
        prevData.current = newData; 
        console.log("Calld");
      }


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      await fetchPost();
    };
    fetchData();

    const intervalId = setInterval(fetchData, 50000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    var icon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      shadowSize: [41, 41],
      iconAnchor: [12, 41],
      shadowAnchor: [14, 41],
      popupAnchor: [0, -41],
    });

    TicketsData?.map((TData) => {
      L.marker([TData.Latitude, TData.Longitude], { icon: icon })
        .addTo(mapInstance.current)
        .on('click', () => handleMarkerClick(TData)); // Handle marker click and set the selected ticket
        
    });
  }, [TicketsData]);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicket, setShowTicket] = useState(false);

  const handleMarkerClick = (ticket) => {
    if (selectedTicket && selectedTicket.serial_id === ticket.serial_id) {
      setShowTicket(!showTicket);
    } else {
      setSelectedTicket(ticket);
      setShowTicket(true);
    }
  };

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        scrollWheelZoom: true,
        center: [24.475219749999997, 39.589692472222225], // Initial center coordinates
        zoom: 13, 
      });              

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(mapInstance.current);
    }
  }, [TicketsData]);

  return (
    <div style={{ display: 'flex' }}>
      <div ref={mapRef} style={{ height: '650px', width: '100%' }} />
      {showTicket && selectedTicket && <TicketDisplay ticket={selectedTicket} alfirnas={alfirnas} />}
    </div>
  );
};

export default IntMap;
