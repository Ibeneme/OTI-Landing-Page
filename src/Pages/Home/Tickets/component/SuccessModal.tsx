import { FC, ReactElement } from "react";
import success_image from "../../../../assets/Illustrations/AuthSuccessImage.png";

interface SuccessModalPopProps {
  title: string;
  message: string;
  buttonText?: string;
  onClose?: () => void;
  onBack?: () => void;
}

const SuccessModalPop: FC<SuccessModalPopProps> = ({
  title,
  message,
  buttonText,
  onClose,
  onBack,
}): ReactElement => (
  <div className="form_content_display">
    <div className="form_content-orange-background">
      <img
        className="form_content-orange-background-image"
        src={success_image}
        alt={success_image}
      />
    </div>
    <div>
      <h2 className="form_content-h2">{title}</h2>
      <p className="form_content-p">{message}</p>
    </div>
    <div>
      {onBack ? (
        <button
          onClick={onBack}
          className="form_content_button"
          style={{
            marginRight: 12,
            border: "1px solid var(--darkBlue)",
            backgroundColor: "white",
            color: "var(--darkBlue)",
          }}
        >
          Go Back
        </button>
      ) : null}
      {buttonText ? (
        <button onClick={onClose} className="form_content_button">
          {buttonText}
        </button>
      ) : null}
    </div>
  </div>
);

export default SuccessModalPop;
