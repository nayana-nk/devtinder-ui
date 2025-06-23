import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import "./profile.css";
import { useNavigate } from "react-router-dom";

const IMGBB_API_KEY = "0ee641718617b2bd483116d88a3f77a5";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const photoUploadHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Only JPG and PNG images are allowed.");
      return;
    }

    if (file.size > 1024 * 1024) {
      setError("File size must be less than 1MB.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData
      );
      const imageUrl = res.data.data.url;
      setPhotoUrl(imageUrl);
    } catch (uploadError) {
      console.error("Image upload failed", uploadError);
      setError("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const saveProfile = async () => {
    setError("");
    if (isUploading) {
      setError("Please wait until the image upload is complete.");
      return;
    }

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
       
     setTimeout(() => {
  setShowToast(false);
  navigate("/feed");
}, 3000);
       
    } catch (err) {
      setError(err?.response?.data || "Profile update failed.");
    }
  };

  return (
    <>
      <div className="editProfile justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name:</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Last Name:</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Upload Photo:</span>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  className="file-input file-input-bordered w-full max-w-xs"
                  onChange={photoUploadHandler}
                />
                {isUploading && (
                  <span className="text-sm text-blue-500 mt-1">Uploading image...</span>
                )}
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Age:</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Gender:</span>
                </div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">About:</span>
                </div>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              <p className="text-red-500">{error}</p>

              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile} disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Save Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          
          </div>
         
        </div>
        
      )}
    </>
  );
};

export default EditProfile;
