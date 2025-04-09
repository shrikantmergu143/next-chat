/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import App_url from "./constant";
import { setShowConfirmModal } from "../../store/Actions";
import Icon from "./Icon";
type IConfirmModal = {
  closeButton?:any,
  variant?:any,
};

export default function ConfirmModal(datas: IConfirmModal) {
  const props = { ...datas };
  const { ConfirmPopup } = useSelector(App_url.allReducers);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  async function HandleOnClose() {
    if (ConfirmPopup?.callBackModal && load === false) {
      setLoad(true);
      await ConfirmPopup?.callBackModal();
      setLoad(false);
    }
    CloseModal();
  }
  function CloseModal() {
    dispatch(setShowConfirmModal());
  }

  if (ConfirmPopup?.variant) {
    props.variant = ConfirmPopup?.variant;
  }
  return ConfirmPopup?.show === "CONFIRM" ? (
    <Modal
      centered={true}
      onHide={CloseModal}
      show={ConfirmPopup?.show === "CONFIRM"}
      className={`confirm-modal ${ConfirmPopup?.variant}`}
    >
      <div className="modal_body">
        <div className="modal_icon">
          <Icon attrIcon={App_url?.icons?.ClockIcon} className="lg" />
        </div>
        <div className="modal_details">
          <h3 className="title">{ConfirmPopup?.title}</h3>
          <p className="text-sm text-gray-700 mt-1">
            {ConfirmPopup?.description}
          </p>
        </div>
      </div>
      <div className="modal_footer">
        <Button
          variant={"secondary"}
          className="button button-cancel btn-sm"
          onClick={CloseModal}
        >
          {ConfirmPopup?.closeButton
            ? ConfirmPopup?.closeButton
            : props?.closeButton}
        </Button>
        <Button
          variant={props.variant}
          className={"button button-submit  btn-sm"}
          onClick={HandleOnClose}
        >
          {ConfirmPopup?.buttonSuccess}
        </Button>
      </div>
    </Modal>
  ) : (
    <React.Fragment></React.Fragment>
  );
}

