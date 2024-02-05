import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { NavLink, Link } from "react-router-dom";
import SearchListing from "../components/SearchListing";

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);
  const [userData, setUserData] = useState({});
  const [userListings, setUserListings] = useState([]);

  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  const getUserData = async () => {
    try {
      const user = await axios.get(
        "https://bookheaven-server.onrender.com/api/user",
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(user.data));
      setUserData(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }

    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
  }, []);

  const handleShowListings = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://bookheaven-server.onrender.com/api/user/listings/${currentUser._id}`,
        { withCredentials: true }
      );

      console.log(response);

      setUserListings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      const response = await axios.delete(
        `https://bookheaven-server.onrender.com/api/listing/delete/${id}`,
        { withCredentials: true }
      );
      setUserListings((prev) => prev.filter((listing) => listing._id !== id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOfferListings = async () => {
    try {
      const response = await axios.get(
        `https://bookheaven-server.onrender.com/api/listing/get?offer=true&limit=4`
      );

      setOfferListings(response.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRentListings = async () => {
    try {
      const response = await axios.get(
        `https://bookheaven-server.onrender.com/api/listing/get?type=rent&limit=4`
      );

      setRentListings(response.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSaleListings = async () => {
    try {
      const response = await axios.get(
        `https://bookheaven-server.onrender.com/api/listing/get?type=sale&limit=4`
      );

      setSaleListings(response.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-1">
      {isLoggedIn ? (
        <div className="bg-[#282828] p-3 py-6 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-semibold mb-4 text-white">
            Hello, {userData.username}!
          </h1>
          <p className="text-lg text-white">Welcome to our awesome platform.</p>
          <p className="text-lg text-white">Find your next perfect Home</p>
          <div className="mb-2 flex justify-center">
            <NavLink
              to="/list-create"
              className="bg-purple-700 text-white p-2 mt-4 hover:bg-purple-900 rounded"
            >
              Create Listing
            </NavLink>
          </div>
          <div className="mb-1 flex justify-center">
            <button
              onClick={handleShowListings}
              className="bg-purple-700 text-white p-2 my-4 hover:bg-purple-900 rounded"
            >
              Show Listings of yours
            </button>
          </div>
          <div className="flex flex-wrap justify-center">
            {userListings &&
              userListings.length > 0 &&
              userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="flex justify-between p-2 border rouned items-center mb-5 w-full sm:w-[51%] "
                >
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing image"
                    className="w-14 h-14 object-contain rounded-lg"
                  />
                  <p>{listing.name}</p>
                  <div>
                    <NavLink
                      to={`/list-update/${listing._id}`}
                      className="p-1 text-yellow-700 rounded-lg uppercase hover:opacity-75"
                    >
                      Update
                    </NavLink>
                    <button
                      type="button"
                      className="p-1 text-red-700 rounded-lg uppercase hover:opacity-75"
                      onClick={() => handleDeleteListing(listing._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#282828]  p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-semibold mb-4">
            You need to login/Register first
          </h1>
          <p className="text-lg">
            Sign in or register to access exclusive features and content.
          </p>
          <div className="mt-8">
            <NavLink
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Login
            </NavLink>
            <span className="ml-2">or</span>
            <NavLink
              to="/register"
              className="bg-green-500 text-white px-4 py-2 rounded-full ml-2"
            >
              Register
            </NavLink>
          </div>
        </div>
      )}
      <div className="w-full mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-3xl font-semibold">Recent offers :-</h2>
            </div>
            <div className="flex flex-wrap gap-4 justify-evenly">
              <SearchListing listings={offerListings} />
            </div>
          </div>
        )}
      </div>
      <div className="w-full mx-auto p-3 flex flex-col gap-8 my-10 flex-wrap">
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-3xl font-semibold">Homes for rents :-</h2>
            </div>
            <div className="flex flex-wrap gap-4 justify-evenly">
              <SearchListing listings={rentListings} />
            </div>
          </div>
        )}
      </div>
      <div className="w-full mx-auto p-3 flex flex-col gap-8 my-10 flex-wrap">
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-3xl font-semibold">Homes for sales :-</h2>
            </div>
            <div className="flex flex-wrap gap-4 justify-evenly">
              <SearchListing listings={saleListings} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
