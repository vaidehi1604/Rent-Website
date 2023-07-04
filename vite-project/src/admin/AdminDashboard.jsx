import React, { Fragment, useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [deleteproduct, setDeleteProduct] = useState(false);
  const [open, setOpen] = useState(false);
  const [formId, setFormId] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editproduct = (data) => {
    console.log("hello");
    console.log(data);
    setFormId(data);
    navigate("/editproduct", { state: { data } });
  };

  const handleDel = () => {
    setDeleteProduct(true);
  };

  const handleclos = () => {
    setDeleteProduct(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setData(data.filter((item) => item.id !== id));
      toast.success("Product Deleted Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Product Not Deleted");
    }
  };

  const TABLE_HEAD = [
    "PRODUCT",
    "RENT",
    "CITY",
    "CONTACT",
    "CONDITION",
    "EDIT",
    "DELETE",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-10 my-10">
      <Card className="flex min-w-[600px]">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                ADMIN PANEL
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({
                  image,
                  name,
                  price,
                  timeStamp,
                  city,
                  condition,
                  phoneNo,
                  id,
                }) => {
                  const classes = "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={image}
                            alt={name}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {city}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phoneNo}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {condition}/5
                        </Typography>
                      </td>

                      {/* <td className={classes}>
                        <Fragment>
                          <Tooltip content="Edit User">
                            <Button
                              variant="text"
                              onClick={handleOpen}
                              color="blue-gray"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                          </Tooltip>
                          <Dialog
                            className="w-80 text-center m-auto bg-white"
                            open={open}
                            onClose={handleClose}
                          >
                            <DialogHeader>Edit Product!!</DialogHeader>
                            <DialogBody divider>
                              Are you sure you want to edit product!!
                            </DialogBody>
                            <DialogFooter className="flex-row justify-center">
                              <Button
                                variant="text"
                                className="mr-1 text-white bg-red-600"
                                onClick={handleClose}
                              >
                                <span>Cancel</span>
                              </Button>
                              <Button
                                variant="gradient"
                                className="mr-1 bg-green-600"
                                onClick={() => {
                                  editproduct(
                                    id,
                                    name,
                                    price,
                                    condition,
                                    city,
                                    phoneNo,
                                    image
                                  );
                                }}
                              >
                                <span>Confirm</span>
                              </Button>
                            </DialogFooter>
                          </Dialog>
                        </Fragment>
                      </td> */}

                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <Button
                            variant="text"
                            onClick={() => {
                              editproduct(
                                id,
                                name,
                                price,
                                condition,
                                city,
                                phoneNo,
                                image
                              );
                            }}
                            color="blue-gray"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        </Tooltip>
                      </td>

                      {/* <td className={classes}>
                        <Fragment>
                          <Tooltip content="Delete User">
                            <Button
                              variant="text"
                              onClick={handleDel}
                              color="blue-gray"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </Tooltip>
                          <Dialog
                            className="w-80 text-center m-auto"
                            open={deleteproduct}
                            onClose={handleDel}
                          >
                            <DialogHeader>Delete Product!!</DialogHeader>
                            <DialogBody divider>
                              Are you sure you want to Delete Product!!
                            </DialogBody>
                            <DialogFooter className="flex-row justify-center">
                              <Button
                                variant="text"
                                className="mr-1 bg-amber-100 text-black"
                                onClick={handleclos}
                              >
                                <span>Cancel</span>
                              </Button>
                              <Button
                              key={id}
                                variant="gradient"
                                className="mr-1 text-white bg-red-600"
                                onClick={() => {
                                  handleDelete(id);
                                }}
                              >
                                <span>Confirm</span>
                              </Button>
                            </DialogFooter>
                          </Dialog>
                        </Fragment>
                      </td> */}

                      <td
                        onClick={() => {
                          handleDelete(id);
                        }}
                        className={classes}
                      >
                        <Tooltip content="Delete User">
                          <Button variant="text" color="blue-gray">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>

        <div className="mx-10 my-10">
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-3">
            <Button
              variant="outlined"
              color="blue-gray"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <div className="flex items-center gap-3">
              {/* Render pagination buttons based on the number of pages */}
              {Array.from(
                { length: Math.ceil(data.length / productsPerPage) },
                (_, index) => (
                  <Button
                    key={index}
                    className="flex justify-center p-2"
                    variant="outlined"
                    color="blue-gray"
                    size="sm"
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </Button>
                )
              )}
            </div>
            <Button
              variant="outlined"
              color="blue-gray"
              size="sm"
              disabled={
                currentPage === Math.ceil(data.length / productsPerPage)
              }
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </CardFooter>
        </div>
        {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-3">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-3">
            <Button
              className="flex justify-center p-2"
              variant="outlined"
              color="blue-gray"
              size="sm"
            >
              1
            </Button>
            <Button variant="text" color="blue-gray" size="sm">
              2
            </Button>
            <Button variant="text" color="blue-gray" size="sm">
              3
            </Button>
          </div>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default AdminDashboard;
