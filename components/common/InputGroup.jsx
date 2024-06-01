/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Icon from "./Icon";
import Utils from '../utils';

export default function InputGroup(props) {
    const { name, onChange, leftLabel, label, id, size, className, floatStyle, formClassName, iconSize, onClickRightLabel, onClickLeftLabel, rightLabel, leftIcon, rightIcon, error, type, placeholder } = props;
    const uuid = useMemo(()=>Utils.uuidv4(), [name]);
    const InputForm = () =>{
        return(
            <input
                type={type}
                className={`form-control form-control-${size} ${className} ${(leftIcon || leftLabel) &&'ps-0 leftIcon'} ${(rightIcon || rightLabel) &&'pe-0 rightIcon'}`}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                id={`${uuid}`}
                value={props?.value}
                autoComplete=''
            />
        )
    }
    const FormInput = () =>{
        return(
            <div className={`${floatStyle?"form-floating":"input-group"}`}>
                {leftLabel && (
                    <div className="input-group-text" onClick={onClickLeftLabel}>
                        {leftLabel}
                    </div>
                )}
                {leftIcon && (
                    <div className="input-group-text" onClick={onClickLeftLabel}>
                        <Icon className={leftIcon} size={iconSize}/>
                    </div>
                )}
                {InputForm()}
                {rightIcon && (
                    <div className="input-group-text" onClick={onClickLeftLabel}>
                        <Icon className={rightIcon} size={iconSize}/>
                    </div>
                )}
                {rightLabel && (
                    <div className="input-group-text" onClick={onClickRightLabel}>
                        {rightLabel}
                    </div>
                )}
                {label && floatStyle &&( 
                    <label htmlFor={uuid} className='form-label text-muted'>
                        {label}
                    </label>
                )}
            </div>
        )
    }
    return (
        <div className={`form_group ${formClassName}`}>
            {label && !floatStyle &&( 
                <label htmlFor={uuid} className='form-label text-muted'>
                    {label}
                </label>
            )}
           {FormInput()}
            {error &&( 
                <span className='form-text-error text-danger'>
                    {error}
                </span>
            )}
        </div>
  )
}
InputGroup.propTypes = {
    name: PropTypes.any,
    onChange: PropTypes.func,
    onClickRightLabel: PropTypes.func,
    onClickLeftLabel: PropTypes.func,
    label: PropTypes.any,
    leftLabel: PropTypes.any,
    rightLabel: PropTypes.any,
    leftIcon: PropTypes.any,
    rightIcon: PropTypes.any,
    placeholder: PropTypes.any,
    className: PropTypes.any,
    formClassName: PropTypes.any,
    size: PropTypes.any,
    iconSize: PropTypes.any,
    error: PropTypes.any,
    value: PropTypes.any,
    floatStyle: PropTypes.bool
}
InputGroup.defaultProps = {
    name:"",
    onChange:()=>{},
    onClickRightLabel:()=>{},
    onClickLeftLabel:()=>{},
    label:"",
    leftLabel:"",
    rightLabel:"",
    leftIcon:"",
    rightIcon:"",
    placeholder:"",
    className:"",
    size:"md",
    iconSize:"sm",
    formClassName:"",
    type:"text",
    error:"",
    floatStyle:false,
    value:"",
}