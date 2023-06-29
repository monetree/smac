import { useState } from "react";

const Popup = ({
  setIsPopup,
  avatars,
  handleActiveAvatar,
  activeAvatar,
  setApikey,
  handleSubmit,
}) => {
  return (
    <div className="modal block" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              onClick={() => setIsPopup(false)}
              type="button"
              className="btn-close"
              dataBsDismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <h5 className="text-center">Select your avatar ... </h5>
            <div className="avatars">
              {avatars.map((avatar, index) => (
                <div className="avatar" key={index}>
                  <img
                    src={avatar.img}
                    onClick={() => handleActiveAvatar(avatar)}
                    className={
                      activeAvatar.name === avatar.name ? "img-active" : ""
                    }
                  />
                </div>
              ))}
            </div>

            <div className="row mt-5">
              <div className="col-sm-12">
                <p className="text-center">
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
