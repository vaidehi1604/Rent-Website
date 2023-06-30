import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ShowProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, " => ", doc.data());
        });
        console.log(list);
        setData(list);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="m-auto">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {data.map((item) => (
              <div key={item.id} className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <img
                    className="h-40 rounded w-full min-w-[280px] object-cover object-center mb-6"
                    src={item.image}
                    alt={item.name}
                  />
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-1">
                    {item.name}
                  </h2>

                  <h3 className="tracking-widest text-cyan-700 text-xs font-medium title-font">
                    <label className="text-sm">₹</label>
                    {item.price}
                    <label className="text-sm p-2">per/day</label>
                  </h3>
                  <p className="leading-relaxed text-base">
                    {item.description}
                  </p>
                  <button className="flex p-2 mt-1 justify-center text-center rounded  bg-cyan-700 text-white">
                    PAY RENT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowProducts;
