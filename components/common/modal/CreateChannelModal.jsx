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
import InputGroup from "../InputGroup";

export default function CreateChannelModal(datas) {
  const props = { ...datas };
  const { ModalPopup } = useSelector(App_url.allReducers);
  const [formData, setFormData] = useState({
    channel_name:"",
    mode:"",
  })
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
  const onChangeHandle = (e) =>{
    setFormData((data)=>({
      ...data,
      [e.target.name]: e.target.value,
    }))
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
        <h5 className="title mb-3">Create a channel</h5>
        <InputGroup
          placeholder={"Name"}
          onChange={onChangeHandle}
          name={"channel_name"}
          value={formData?.channel_name}
        />
        <InputGroup
          placeholder={"Name"}
          onChange={onChangeHandle}
          name={"channel_name"}
          value={formData?.channel_name}
          type={"select"}
        />
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
