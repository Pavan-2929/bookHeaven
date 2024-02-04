import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { NavLink } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);
  const [userData, setUserData] = useState({});
  const [userListings, setUserListings] = useState([]);

  const getUserData = async () => {
    try {
      const user = await axios.get("http://localhost:3000/api/user", {
        withCredentials: true,
      });
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
  }, []);

  const handleShowListings = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/listings/${currentUser._id}`,
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
        `http://localhost:3000/api/listing/delete/${id}`,
        { withCredentials: true }
      );
      setUserListings((prev) => prev.filter((listing) => listing._id !== id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-1 text-center">
      {isLoggedIn ? (
        <div className="bg-[#282828] p-3 py-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4 text-white">
            Hello, {userData.username}!
          </h1>
          <p className="text-lg text-white">
            Welcome to our awesome platform. Explore and enjoy your time!
          </p>
          <div className="mb-4 flex justify-center">
            <NavLink
              to="/list-create"
              className="bg-purple-700 text-white p-2 mt-5 hover:bg-purple-900 rounded"
            >
              Create Listing
            </NavLink>
          </div>
          <div className="mb-4 flex justify-center">
            <button
              onClick={handleShowListings}
              className="bg-purple-700 text-white p-2 my-8 hover:bg-purple-900 rounded"
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
        <div className="bg-[#282828]  p-6 rounded-lg shadow-lg">
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
    </div>
  );
};

export default Home;
