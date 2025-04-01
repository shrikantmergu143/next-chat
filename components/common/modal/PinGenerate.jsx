import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "../Button";
import InputGroup from "../InputGroup";
import { setPin, verifyPin } from "../../../store/Actions";
import usePosterReducers from "../../context/usePosterReducers";

export default function PinGenerate() {
    const dispatch = useDispatch();
    const { ModalPopup, savedPin, pinVerified, access_token } = usePosterReducers();

    const [pin, setPinState] = useState("");
    const [isSettingPin, setIsSettingPin] = useState(savedPin === undefined); // If no PIN, set it first
    const [showModal, setShowModalState] = useState(access_token && !pinVerified);

    // Listen for tab visibility change
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!access_token) return;
            if (!document.hidden && !pinVerified) {
                setShowModalState(true);
            }
            if (document.hidden) {
                setShowModalState(true);
                dispatch(verifyPin(false)); // Reset PIN verification on tab switch
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [pinVerified, access_token]);

    const handlePinSubmit = (pin) => {
        if (pin?.length === 4) {
            if (isSettingPin) {
                dispatch(setPin(pin)); // Save PIN
                setIsSettingPin(false);
            } else if (pin === savedPin) {
                dispatch(verifyPin(true)); // Verify PIN
            } else {
                alert("Incorrect PIN. Try again.");
                return;
            }
            setShowModalState(false);
            setPinState("");
          } else {
            setPinState("");
            alert("Enter a valid 4-digit PIN");
        }
    };
    const onChangeHandle = (e) =>{
      setPinState(e?.target?.value);
      if(e?.target?.value?.length === 4){
        setTimeout(()=>handlePinSubmit(e?.target?.value), 1000);
      }
    }

    return (
        <Modal centered show={showModal} onHide={() => {}} backdrop="static">
            <div className="modal-body p-4">
                <h5 className="fs-18 mb-3">{isSettingPin ? "Set Your PIN" : "Enter PIN"}</h5>
                <InputGroup
                    type="password"
                    value={pin}
                    onChange={onChangeHandle}
                    otp
                    formClassName="col-8 mx-auto"
                />
            </div>
            <div className="modal-footer">
                <Button onClick={()=>handlePinSubmit(pin)} disabled={pin?.length !== 4}>
                    {isSettingPin ? "Set PIN" : "Verify PIN"}
                </Button>
            </div>
        </Modal>
    );
}

PinGenerate.propTypes = {
    closeButton: PropTypes.any,
    variant: PropTypes.any,
};

PinGenerate.defaultProps = {
    closeButton: "Cancel",
    variant: "primary",
};
