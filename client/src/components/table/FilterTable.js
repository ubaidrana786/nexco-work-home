import React, { useEffect, useContext, useState } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NoteContext from "../../RootContext/NoteContext";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Loading } from "../../pages/Spinners/Loading";

const FilterTable = ({ Islamabad }) => {
  const { authToken } = useContext(NoteContext);
  const [studentData, setstudentData] = useState([]);
  const [updateStatus, setupdateStatus] = useState("");
  const [Id, setId] = useState("");
  const [ControlLoading, setControlLoading] = useState(true);

  useEffect(() => {
    FetchStudents();
  }, []);

  const FetchStudents = () => {
    axios
      .get("https://nexco-crm.herokuapp.com/api/students", {
        headers: {
          authorization: authToken,
        },
      })
      .then((response) => {
        setstudentData(response.data);
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setupdateStatus(id.email);
    setId(id._id);

    console.log(Id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows = [
    {
      id: 1,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Pending",
      status: "Approved",
      branch: "NEXCO",
    },
  ];

  const updatedata = (id) => {
    axios
      .put("https://nexco-crm.herokuapp.com/api/students/" + Id, {
        status: updateStatus,
      })
      .then((res) => {
        console.log(res.data);
        alert("Student successfully updated");
        setOpen(false);
        FetchStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Data</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Status"
              type="text"
              fullWidth
              name="SelectStatus"
              style={{ width: "500px" }}
              value={updateStatus}
              onChange={(e) => setupdateStatus(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={updatedata}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell className="tableCell">User</TableCell> */}
              <TableCell className="tableCell">Name</TableCell>
              {/* <TableCell className="tableCell">Email</TableCell> */}
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Citizenship</TableCell>
              <TableCell className="tableCell">Number</TableCell>
              <TableCell className="tableCell">Branch</TableCell>
              <TableCell className="tableCell">Officer</TableCell>

              <TableCell className="tableCell">Application Type</TableCell>
              <TableCell className="tableCell">Application Buy</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {ControlLoading && <Loading />} */}
            {Islamabad &&
              Islamabad.map((list, id) => (
                <TableRow key={list.id}>
                  {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={list.image} alt="" className="image" />
                </div>
              </TableCell> */}
                  <TableCell className="tableCell">{list.fname}</TableCell>
                  {/* <TableCell className="tableCell">{list.email}</TableCell> */}

                  <TableCell className="tableCell">{list.date}</TableCell>
                  <TableCell className="tableCell">{list.city}</TableCell>
                  <TableCell className="tableCell">{list.number}</TableCell>

                  <TableCell className="tableCell">{list.branch}</TableCell>
                  <TableCell className="tableCell">{list.email}</TableCell>
                  <TableCell className="tableCell">{list.type}</TableCell>

                  <TableCell className="tableCell">{list.buy}</TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${list.status}`}>
                      {list.status}
                    </span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <EditIcon
                      variant="outlined"
                      onClick={() => {
                        handleClickOpen(list);
                      }}
                      className="icon"
                      style={{
                        color: "#121212",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FilterTable;
