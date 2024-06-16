/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Icon from "../Icon";
import App_url from "../constant";
import { setShowConfirmModal, setShowModal } from "../../../store/Actions";
import Button from "../Button";

export default function CreateChannelModal(datas) {
  const props = { ...datas };
  const { ModalPopup } = useSelector(App_url.allReducers);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  async function HandleOnClose() {
    if (ModalPopup?.callBackModal && load === false) {
      setLoad(true);
      await ModalPopup?.callBackModal();
      setLoad(false);
    }
    CloseModal();
  }
  function CloseModal(e) {
    dispatch(setShowModal());
  }


  return ModalPopup?.show === "CREATE_CHANNEL" ? (
    <Modal
      centered={true}
      onHide={CloseModal}
      show={ModalPopup?.show === "CREATE_CHANNEL"}
      className={`confirm-modal ${ModalPopup?.variant}`}
    >
      <div className="modal-body" >
        <Icon attrIcon={App_url.icons.Close} className={"hover"} button
          variant={"hover-secondary btn-modal-close"}
          onClick={CloseModal}
          />
        <h3 className="title">Create a channel</h3>
        <div className="modal_details">
          <p className="text-sm text-gray-700 mt-1">
            {ModalPopup?.description}
          </p>
        </div>
      </div>
      <div className="modal-footer">
        <Button
          variant={"secondary"}
          className={"button button-primary  btn-sm"}
          onClick={HandleOnClose}
        >
          Next
        </Button>
      </div>
    </Modal>
  ) : (
    <React.Fragment></React.Fragment>
  );
}
CreateChannelModal.propTypes = {
  closeButton: PropTypes.any,
  variant: PropTypes.any,
};
CreateChannelModal.defaultProps = {
  closeButton: "Cancel",
  variant: "primary",
};
