import React, { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const Products = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const productId = uuidv4();

  const createProduct = (e) => {
    e.preventDefault();
    if (image == null) return;
    const productData = {
      id: productId,
      name: name,
      price: price,
      description: description,
      condition: condition,
      city: city,
      image: image,
      phoneNo: phoneNo,
      timeStamp: serverTimestamp(),
    };

    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + (image ? image.name : ""));
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    console.log(uploadTask);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error.message);

        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", getDownloadURL);
          const data = setDoc(doc(db, "products", productId), {
            ...productData,
            image: downloadURL,
          })
            .then(() => {
              console.log("Product created successfully");
              toast.success("Successfully Created Product!");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            })
            .catch((error) => {
              console.log("Error creating product:", error);
              toast.error("Product not created!");
            });
          console.log(data);
        });
      }
    );
  };
  // navigate("/product");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setPreview(file);
      const reader = new FileReader();
      // uploadImage(file);
      reader.onload = () => {
        const imagePreview = document.getElementById("image-preview");
        if (imagePreview) {
          imagePreview.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(""); // Allow null value for the image field
      const imagePreview = document.getElementById("image-preview");
      if (imagePreview) {
        imagePreview.src = ""; // Reset the image preview
      }
    }
  };

  return (
    <div className="container pt-4 flex justify-center m-auto">
      <form className="border mt-4 sm:ml-28 sm:mr-28 border-gray-200 rounded p-4 w-full max-w-lg">
        <div className="p-3 text-2xl text-center text-gray-500">
          <h1>ADD PRODUCT</h1>
          <hr />
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Product Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Product Name"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              product price(₹)
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Full Day Price"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              product Description
            </label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Product Description"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              condition
            </label>
            <select
              onChange={(e) => setCondition(e.target.value)}
              value={condition}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              City
            </label>
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="Enter City"
            />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              PhoneNo
            </label>
            <input
              onChange={(e) => setPhoneNo(e.target.value)}
              value={phoneNo}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="9999999999"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              product image
            </label>
            <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {image ? (
                  <img
                    className="m-auto h-28 w-28 rounded-sm"
                    id="image-preview"
                    src={image}
                    alt=""
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <div className="mt-2 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-green-500"
                  >
                    <span className="m-auto text-center">Upload a file</span>
                    <input
                      onChange={(e) => {
                        handleImageChange(e);
                        setImage(e.target.files[0]);
                      }}
                      files={image}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={(e) => createProduct(e)}
            className="block uppercase tracking-wide rounded bg-cyan-700 text-white text-xs p-4 font-bold mb-2"
          >
            Add product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Products;
