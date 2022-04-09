import React, { useEffect, useContext, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import FilterTable from "../../components/table/FilterTable";
import NoteContext from "../../RootContext/NoteContext";
import axios from "axios";
import { Loading } from "../Spinners/Loading";

const Home = () => {

  const { authToken,totalData } = useContext(NoteContext);
  const [FilterData, setFilterData] = useState([]);
  const [AllData, setAllData] = useState(true);
  const [ControlData, setControlData] = useState(false);
  const [ControlLoading, setControlLoading] = useState(true);
  const [TotalCounting, setTotalCounting] = useState("");


  const FetchStudents = (test) => {
   

    axios.get(`https://nexco-crm.herokuapp.com/api/students/filter?branch=${test}`, {
      headers: {
        authorization: authToken
      }
    })
      .then((response) => {
        setControlLoading(false)
        setFilterData(response.data)
        TotalCounting(response.data.length)
        setControlData(true);
        setAllData(false)
      })
  }

  const FetchAllStudents = () => {
    axios.get('https://nexco-crm.herokuapp.com/api/students', {
      headers: {
        authorization: authToken
      }
    })
      .then((response) => {

        setControlLoading(false)
        setFilterData(response.data)
      })
  }





  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" amount={totalData} filteredData={FetchAllStudents}  />
          <Widget type="order" amount={totalData} filteredData={FetchStudents} />
          <Widget type="earning" amount={totalData} filteredData={FetchStudents} />
          <Widget type="balance" amount={totalData} filteredData={FetchStudents} />
        </div>
        {/* <div className="charts">
        <Featured />
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
      </div> */}
        <div className="listContainer">
          <div className="listTitle">Latest Applications</div>
         
          {AllData && <Table />}
          
          {ControlData && <FilterTable Islamabad={FilterData} />}

        </div>
      </div>
    </div>
  );
};

export default Home;
