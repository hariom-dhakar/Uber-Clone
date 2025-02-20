import React, { useRef } from 'react'

const VehiclePanel = (props) => {

    return (
        <>
            <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
        <h5
                ref={props.vehiclePanelCloseRef}
                onClick={() => {
                    props.setVehiclePanel(false);
                }}
                className="absolute opacity-0 top-5 right-6 text-2xl"
            >
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
        <div 
        onClick={()=>{
            props.setConfirmRide(true)
            props.selectVehicle('car')
        }}
        className="bg-gray-100 mb-2 flex justify-between items-center active:border-2 p-3 rounded-xl w-full ">
            <img
                className="h-12"
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
                alt=""
            />
            <div className="w-1/2">
                <h4 className="text-base font-medium ">
                    Uber Go{" "}
                    <span className="">
                        <i className="ri-user-fill">4</i>
                    </span>
                </h4>
                <h5 className="text-base font-medium "> 2 mins away 15:24</h5>
                <p className="text-xs font-normal text-gray-600">
                    {" "}
                    Affordable compact rides
                </p>
            </div>
            <h4 className="text-xl font-semibold">₹{props.fare.car}</h4>
        </div>
        <div
        onClick={()=>{
            props.setConfirmRide(true)
            props.selectVehicle('auto')
        }} 
        className="bg-gray-100 mb-2 flex justify-between items-center active:border-2 p-3 rounded-xl w-full ">
            <img
                className="h-10"
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                alt=""
            />
           
            <div className="w-1/2">
                <h4 className="text-base font-medium ">
                    Uber Auto{" "}
                    <span className="">
                        <i className="ri-user-fill">3</i>
                    </span>
                </h4>
                <h5 className="text-base font-medium "> 2 mins away 15:24</h5>
                <p className="text-xs font-normal text-gray-600">
                    {" "}
                    Affordable compact rides
                </p>
            </div>
                <h4 className="text-xl font-semibold">₹{props.fare.auto}</h4>
        </div>
        <div
        onClick={()=>{
            props.setConfirmRide(true)
            props.selectVehicle('motorcycle')
        }}
        className="bg-gray-100 mb-2 flex justify-between items-center active:border-2 p-3 rounded-xl w-full ">
            <img
                className="h-13"
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                alt=""
            />
            <div className="w-1/2">
                <h4 className="text-base font-medium ">
                    Uber Moto{" "}
                    <span className="">
                        <i className="ri-user-fill">1</i>
                    </span>
                </h4>
                <h5 className="text-base font-medium "> 2 mins away 15:24</h5>
                <p className="text-xs font-normal text-gray-600">
                    {" "}
                    Affordable compact rides
                </p>
            </div>
            <h4 className="text-xl font-semibold">₹{props.fare.motorcycle}</h4>
        </div>
</>
)
}

export default VehiclePanel