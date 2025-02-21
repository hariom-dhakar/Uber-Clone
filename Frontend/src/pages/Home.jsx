import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedVehicle from "../components/ConfirmedVehicle";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panel, setPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingDriver, setWaitingDriver] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const waitingDriverRef = useRef(null);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (err) {
      console.error("Error fetching destination suggestions:", err);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch (err) {
      console.error("Error fetching destination suggestions:", err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  async function findTrip() {
    setVehiclePanel(true);
    setPanel(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
  }

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0%)",
          opacity: "1",
          bottom: "0",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
          opacity: "0",
          bottom: "[-100%]",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingDriver) {
        gsap.to(waitingDriverRef.current, {
          transform: "translateY(0%)",
          opacity: "1",
        });
      } else {
        gsap.to(waitingDriverRef.current, {
          transform: "translateY(100%)",
          opacity: "0",
        });
      }
    },
    [waitingDriver]
  );

  useGSAP(
    function () {
      if (panel) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: "0",
        });
      }
    },
    [panel]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0%)",
          opacity: "1",
        });
        gsap.to(vehiclePanelCloseRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
          opacity: "0",
        });
        gsap.to(vehiclePanelCloseRef.current, {
          opacity: "0",
        });
      }
    },
    [vehiclePanel, vehiclePanelCloseRef]
  );

  useGSAP(
    function () {
      if (confirmRide) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0%)",
          opacity: "1",
          bottom: "0",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
          opacity: "0",
          bottom: "[-100%]",
        });
      }
    },
    [confirmRide]
  );

  return (
    <div className="h-screen relative w-full overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
        <div className="h-[30%] pt-5 pl-5 pr-5 pb-1 relative bg-white">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanel(false);
            }}
            className="absolute opacity-0 top-5 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find Trip</h4>
          <form
            action=""
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-600 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              value={pickup}
              type="text"
              onClick={() => {
                setActiveField("pickup");
                setPanel(true);
              }}
              onChange={handlePickupChange}
              placeholder="add a pickup location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              value={destination}
              type="text"
              onClick={() => {
                setActiveField("destination");
                setPanel(true);
              }}
              onChange={handleDestinationChange}
              placeholder="enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className="overflow-y-auto bg-white h-0 shadow-md">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed bg-white translate-y-full w-full py-6 px-4 z-10 bottom-0 
             shadow-lg rounded-t-2xl opacity-0"
      >
        <VehiclePanel
          fare={fare}
          selectVehicle={setVehicleType}
          setVehiclePanel={setVehiclePanel}
          vehiclePanelCloseRef={vehiclePanelCloseRef}
          setConfirmRide={setConfirmRide}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed bg-white translate-y-full w-full py-2 px-4 z-10 bottom-[-100%]
             shadow-lg rounded-t-2xl opacity-0"
      >
        <ConfirmedVehicle
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehiclePanel={setVehiclePanel}
          setVehicleFound={setVehicleFound}
          setConfirmRide={setConfirmRide}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed translate-y-full bg-white w-full py-2 px-4 z-10 bottom-[-100%]
             shadow-lg rounded-t-2xl opacity-0"
      >
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingDriverRef}
        className="fixed bg-white w-full translate-y-full py-6 px-4 z-10 bottom-0 
             shadow-lg rounded-t-2xl opacity-0"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          waitingDriver={waitingDriver}
          setWaitingDriver={setWaitingDriver}
        />
      </div>
    </div>
  );
}

export default Home;
