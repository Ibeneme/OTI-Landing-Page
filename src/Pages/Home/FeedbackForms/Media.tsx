import React from "react";

// interface MediaItem {
//   type: string;
//   location: string;
// }

// interface Feedback {
//   feedback_media: MediaItem[];
//   // Other properties from Feedback interface
// }

interface FeedbackMediaProps {
  feedbackMedia: any;
}

const FeedbackMediaComponent: React.FC<FeedbackMediaProps> = ({
  feedbackMedia,
}) => {
  const handleImageClick = (imageUrl: string) => {
    window.open(imageUrl, "_blank");
  };

  const handleImageDownload = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>Feedback Images</h2>
      {feedbackMedia?.map((imageItem: any, index: number) => (
        <div key={index}>
          <img
            src={imageItem.location}
            alt={`Image ${index}`}
            onClick={() => handleImageClick(imageItem.location)}
            style={{ cursor: "zoom-in" }}
          />
          <button onClick={() => handleImageDownload(imageItem.location)}>
            Download
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default FeedbackMediaComponent;
