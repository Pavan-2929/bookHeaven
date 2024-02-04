import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Conatct from "../components/Conatct";

const SingleListing = () => {
  const params = useParams();
  SwiperCore.use([Navigation]);
  const currentUser = useSelector((state) => state.currentUser);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        const listing = await axios.get(
          `http://localhost:3000/api/listing/get/${params.id}`
        );
        if (listing.status === 200) {
          setListing(listing.data);
        }
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl text-red-500">
          Something went wrong!
        </p>
      )}
      {listing && !loading && !error && (
        <div className="md:p-10 rounded p-0">
          <Swiper navigation>
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className="rounded h-[50vh] sm:h-[550px] w-full p-2"
                  style={{
                    background: `url(${url}) center/cover no-repeat`,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col w-full mx-auto p-5 md:p-14 gap-4 bg-[#282828] text-white">
            <p className="text-2xl font-semibold">
              {listing.name} - $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-3 gap-2 text-gray-400 text-sm">
              <FaMapMarkerAlt className="text-green-500" />
              {listing.address}
            </p>
            <div className="flex gap-4 cursor-pointer">
              <p className="bg-red-500 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-500 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <p className="text-gray-300 mt-3">
              <span className="font-semibold text-white">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-500 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mt-3">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.useRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 px-14 w-[30vw] mx-auto mt-6 flex justify-center items-center"
              >
                LandLord
              </button>
            )}
            {contact && <Conatct listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  );
};

export default SingleListing;
