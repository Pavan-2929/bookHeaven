import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Conatct = ({ listing }) => {
  const [landlord, setLandloard] = useState(null);
  const [message, setMessage] = useState("Hello");

  useEffect(() => {
    const fetchLandlordData = async () => {
      try {
        const response = await axios.get(
          `https://bookheaven-server.onrender.com/api/user/${listing.userRef}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setLandloard(response.data);
        }
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlordData();
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-bold">{landlord.username}</span> for{" "}
            <span className="font-bold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            className="w-full my-5 p-3 rounded-lg border bg-[#414141] text-[#ccc] focus:bg-none "
            onChange={handleChange}
            value={message}
            name="message"
            id="message"
            cols="30"
            rows="10"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default Conatct;
