import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const EditProduct = () => {
  const location = useLocation();
  const id = location.state?.data;

  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Set the product data if the document exists
          setProduct(docSnap.data());
        } else {
          // Handle case where the document doesn't exist
          console.log("Document not found!");
        }
      } catch (error) {
        console.log("Error fetching document:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEdit = async () => {
    if (product) {
      const { name, price, description, condition, city, phoneNo } = product;

      // Perform the update operation using the fetched data
      const docRef = doc(db, "products", id);
      if (image) {
        const imageUrl = await uploadImage(image);
        console.log(imageUrl);
        await updateDoc(docRef, {
          name,
          price,
          description,
          condition,
          city,
          phoneNo,
          image: imageUrl,
        });
      } else {
        await updateDoc(docRef, {
          name,
          price,
          description,
          condition,
          city,
          phoneNo,
        });
      }
      // Handle navigation or other logic after the update
      navigate("/admin");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const { price, setprice } = e.target;
    const { description, setdescription } = e.target;
    const { condition, setcondition } = e.target;
    const { city, setcity } = e.target;
    const { phoneNo, setphoneNo } = e.target;
    const { image, setimage } = e.target;
    const { images, data, files } = e.target;
    if (name === "file-upload") {
      setImage(files[0]);
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
        [price]: setprice,
        [description]: setdescription,
        [condition]: setcondition,
        [city]: setcity,
        [phoneNo]: setphoneNo,
        [image]: setimage,
        [images]: data,
      }));
    }
  };

  return (
    <div className="container pt-4 flex justify-center m-auto">
      {/* Existing code... */}
      <form className="border mt-4 sm:ml-28 sm:mr-28 border-gray-200 rounded p-4 w-full max-w-lg">
        <div className="p-3 text-2xl text-center text-gray-500">
          <h1>EDIT PRODUCT</h1>
          <hr />
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Product Name
            </label>
            <input
              onChange={handleInputChange}
              value={product?.name || ""}
              name="name"
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
              onChange={handleInputChange}
              value={product?.price || ""}
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
              onChange={handleInputChange}
              value={product?.description || ""}
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
              onChange={handleInputChange}
              value={product?.condition || ""}
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
              onChange={handleInputChange}
              value={product?.city || ""}
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
              onChange={handleInputChange}
              value={product?.phoneNo || ""}
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
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
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
                {/* )} */}
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-green-500"
                  >
                    <span className="text-center">Upload a file</span>
                    <input
                      onChange={handleInputChange}
                      files={product?.image || ""}
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
            onClick={handleEdit}
            className="block uppercase tracking-wide rounded bg-cyan-700 text-white text-xs p-4 font-bold mb-2"
          >
            Edit product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
