import { useState, useEffect } from "react";
import { getAllTickets } from "../../../../../Redux/Tickets/Tickets";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../../Redux/Store";

 const useFetchAllTickets = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [allTickets, setAllTickets] = useState([]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        setLoading(true); // Set loading to true when effect starts
        const result = await dispatch(getAllTickets());
        setAllTickets(result.payload);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); // Set loading to false when effect finishes
      }
    };

    fetchAllTickets();
  }, [dispatch, loading]); // Include loading in the dependency array

  return { loading, error, allTickets };
};

export default useFetchAllTickets;
