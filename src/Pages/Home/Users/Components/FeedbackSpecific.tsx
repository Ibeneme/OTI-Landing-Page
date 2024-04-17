import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../../Redux/Store";
import { FilterFeedback } from "../../../../../Redux/Feedback/Feedback";
import FeedbackList, { Feedback } from "./FeedbackList";
import ShimmerLoaderPage from "../../../Utils/ShimmerLoader/ShimmerLoaderPage";

interface FeedbackSpecificProps {
  projectName: any;
}

const FeedbackSpecific: React.FC<FeedbackSpecificProps> = ({ projectName }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [feedbackForms, setFeedbackForms] = useState<Feedback[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const fetchAcadaboo = async () => {
    setPageLoading(true);
    try {
      const response = await dispatch(
        FilterFeedback({ project_name: projectName })
      );
      setFeedbackForms(response?.payload);
      setPageLoading(false);
      //console.log("Acadaboo:", response?.payload?.length);
    } catch (error) {
      //console.error("Error fetching feedbacks:", error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchAcadaboo(); // Fetch data based on the provided project name
  }, [dispatch, projectName]); // Include projectName in dependencies array

  return (
    <div
      style={{
        backgroundColor: "white",
        paddingTop: 24,
        marginTop: -72,
        borderRadius: 12,
        paddingBottom: 12,
      }}
    >
      {pageLoading ? (
        <ShimmerLoaderPage />
      ) : (
        <FeedbackList feedbacks={feedbackForms} />
      )}
    </div>
  );
};

export default FeedbackSpecific;
