/* eslint-disable */
import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  FloatingLabel,
  Form,
  FormSelect,
  InputGroup as ReactInputGroup,
} from "react-bootstrap";
import InputOtp from "./InputOtp";
import ReactSelect, { components } from "react-select";
import App_url from "./constant";
import Icon from "./Icon";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import Utils from "../utils";

const removeWhitespace = (value) => {
  let formattedText = value;
  formattedText = formattedText.replace(/\s/g, "");
  return formattedText;
};

const removeMultipleBlankSpace = (string, substring) => {
  string = string.replace(/\s+/g, " ");
  return string;
};

export const FormGroupControl = (props) => {
  if (props?.labelFloat) {
    return (
      <FloatingLabel
        label={props?.label}
        labelFloat={props?.labelFloat}
        className={props?.className}
        controlId={props?.controlId}
      >
        {props?.children}
      </FloatingLabel>
    );
  }
  return (
    <Form.Group className={props?.className} controlId={props?.controlId}>
      {props?.children}
    </Form.Group>
  );
};
const validate = (value, rules, label, path) => {
  if (rules.required) {
    if (!value) {
      return rules.required;
    }
  }

  if (typeof rules.validate === 'function') {
    const customValidationResult = rules.validate(value, path);
    if (customValidationResult !== true) {
      return customValidationResult;
    }
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Minimum length is ${rules.minLength}`;
  }
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Maximum length is ${rules.maxLength}`;
  }
  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Invalid format';
  }

  return null;
};
export default function InputGroup(props) {
  const {
    className,
    label,
    Label,
    error,
    name,
    type,
    id,
    formClassName,
    labelClassName,
    errorClassName,
    placeholder,
    value,
    icon_circle,
    circle,
    floatStyle,
    rules
  } = props;
  let ids = useMemo(() => props?.id != "" ? props?.id : Utils.uuidv4(), []); // removed name dependency from here
  const [errors, setErrors] = useState({});

  const callSelectedValue = () => {
    if (props?.value !== undefined) {
      if(!props?.isMultiple &&  props?.option){
        const FindData = props?.option?.find((item) => item?.value === props?.value);
        if (FindData) {
          return FindData;
        } else {
          return null;
        }
      }else {
        const FindData = props?.option?.filter((item) =>{
          const checkFind = props?.value?.find((item1) => item?.value === item1);
          if(checkFind){
            return true;
          }else{
            return false
          }
        });
        if (FindData) {
          return FindData;
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  }
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;
    // setFormValues((prevValues) => ({ ...prevValues, [name]: updatedValue }));

    if (rules && rules[name]) {
      const error = validate(updatedValue, rules[name], props?.label);
      console.log("error",error)
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }

    props?.onChange(e);
  };
  const selectValue = useMemo(callSelectedValue, [props?.value, props?.value?.length])
  // let FormGroupControl = Form.Group
  const data = {};
  if (props?.as) {
    data.as = props?.as;
  }
  if (props?.rows) {
    data.rows = props?.rows;
  }
  const handleEmailChange = (value) => {
    let email = value;

    // Remove spaces and special characters
    email = email.replace(/\s/g, "");
    email = email.replace(/[^a-zA-Z0-9@.-]/g, "");

    // Convert to lowercase
    email = email.toLowerCase();

    // Restrict to one '@' character
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      const beforeAt = email.slice(0, atIndex + 1);
      const afterAt = email.slice(atIndex + 1).replace(/@/g, "");
      email = beforeAt + afterAt;
    }

    return email;
  };
  useEffect(() => {
    if (props?.autoFocus) {
      const FocusData = document.getElementById(ids);
      if (FocusData) {
        FocusData.focus();
      }
    }
  }, [props?.autoFocus])
  function removeSpaces(input) {
    let trimmedValue = input.trim();
    let cleanedValue = trimmedValue;

    if (trimmedValue.length > 2 && trimmedValue[0] === ' ' && trimmedValue[trimmedValue.length - 1] === ' ') {
      cleanedValue = trimmedValue.slice(1, -1);
    }
    if (input.charAt(input.length - 1) === ' ') {
      // If it does, update the state without the last character
      cleanedValue = input.slice(0, -1)
    }
    return cleanedValue;
  }
  function changeHandler(e) {
    if (props?.inputType !== "select" && props?.type !== "textarea") {
      const substring = "";
      if (e.target.value != " ") {
        e.target.value = removeMultipleBlankSpace(e.target.value, substring);
      } else {
        e.target.value = "";
      }
    }
    if (props?.number) {
      let { value } = e.target;
      value = value.replace(/^0+(?=\d)/, '');
      const dotCount = (value.match(/\./g) || []).length;
      if (dotCount > 1) {
        const firstDotIndex = value.indexOf('.');
        const lastDotIndex = value.lastIndexOf('.');
        value = value.slice(0, lastDotIndex) + value.slice(lastDotIndex).replace(/\./g, '');
      }
      const allowDot = props?.allowDot || false;
      const regex = allowDot ? /^[0-9]*\.?[0-9]{0,2}$/ : /^\d*$/;
      const isValid = regex.test(value);
      if (e.target.value === "") {
        e.target.value = '';
      } else if (isValid) {
        e.target.value = value;
      } else if (props?.value) {
        e.target.value = parseFloat(props?.value);
      } else {
        e.target.value = "";
      }
    }
    if (props?.phone) {
      e.target.value = e.target.value.replace(/\./g, '');
    }
    if (e.target.name === "email") {
      e.target.value = removeSpaces(e.target.value);
      e.target.value = handleEmailChange(e.target.value);
    }
    if (props?.validLength && e.target.value?.length > 200) {
      e.target.value = props?.value
    }
    if(props?.type == "textarea"){
      // Resize the textarea based on the content
      e.target.style.height = 'auto!important';  // Reset height to auto to shrink back
      e.target.style.height = `${e.target.scrollHeight}px!important`;  // Set height to scrollHeight
    }
    onChange(e);
  }

  function changeOtpHandler(e) {
    const data = {
      target: {
        name: props?.name,
        value: e,
      }
    }
    props?.onChange(data);
  }
  function onSelect(e, data1) {
    if(!props?.isMultiple){
      const data = {
        target: {
          name: props?.name,
          value: e?.value === undefined ? null : e.value,
        }
      }
      props?.onChange(data, e);
    }else{
      const data = {
        target: {
          name: props?.name,
        }
      }
      if(e?.length>0){
        data.target.value = e?.map((item)=>item?.value);
      }else{
        data.target.value = [];
      }
      props?.onChange(data, e);
    }
  }
  function onTextChange(e) {
    const data = {
      target: {
        name: props?.name,
        value: e,
      }
    }
    props?.onChange(data, e);
  }
  const onKeyDown = (e) =>{
    if(e.keyCode == 13 && e.key == "Enter" && !e.shiftKey && !e.ctrlKey){
      if(props?.onSubmit){
        e.preventDefault();
        props?.onSubmit(props?.value);
      }
    }
  }
  const InputForm = () => {

    const getTranslation = (item) => {
      return item?.title || item?.label;
    }
    const SelectControl = () => {
      const LeftIconView = () => {
        return (
          <React.Fragment>
            {props?.leftLabel && (
              <ReactInputGroup.Text
                id={`left_icon_${id}`}
                className={` ${props?.leftIconClick ? "cursor-pointer" : ""}`}
                onClick={props?.leftIconClick}
              >
                {props?.leftLabel}
              </ReactInputGroup.Text>
            )}
          </React.Fragment>
        )
      }
      const Control = ({ children, ...props }) => {
        return (
          <components.Control {...props}>
            <LeftIconView />
            {children}
          </components.Control>
        );
      };
      const CustomOption = (props1) => {
        const { children, ...props } = props1;
        return (
          <components.Option {...props}>
            {circle && (
            <span className={`circle ${props?.value != "" && value === props1?.value ? "selected select" : ""}`}>
              {props?.value != "" && props?.value === props1?.value && (
                <Icon className='xsm white' attrIcon={icon_circle} />
              )}
            </span>
            )}
            {children}
          </components.Option>
        )
      }

      if (props?.select) {
        return (
          <ReactSelect
            classNamePrefix="custom-select"
            className="custom-select"
            components={{ Control, Option: CustomOption }}
            isSearchable
            name={props?.name}
            value={selectValue}
            options={props?.option}
            onChange={onSelect}
            placeholder={props?.placeholder}
            isClearable={props?.isClearable}
            isMulti={props?.isMultiple}
          />
        )
      }
      return (
        <React.Fragment>
          {LeftIconView()}
          <FormSelect
            multiple={props?.multiple}
            name={name}
            id={id}
            className={className}
            value={props?.value}
            isInvalid={error ? true : false}
            onChange={onChange}
            disabled={props?.disabled}
          >
            {props?.option?.length === 0 ? (
              <option disabled={true} value={""}>
                {"No data found"}
              </option>
            ) : (
              props?.option?.map((item, index) => (
                <option
                  key={index?.toString()}
                  disabled={item?.disabled}
                  value={item?.value}
                >
                  {getTranslation(item)}
                </option>
              ))
            )}
          </FormSelect>
        </React.Fragment>
      )
    }
    if (props?.inputType === "select" || props?.type === "select") {
      return (
        <ReactInputGroup className={`${error ? "is-invalid" : ""}`}>
          {SelectControl()}
          {props?.rightLabel && (
            <ReactInputGroup.Text
              id={`left_icon_${id}`}
              className={` ${props?.rightIconClick ? "cursor-pointer" : ""}`}
              onClick={props?.rightIconClick}
            >
              {props?.rightLabel}
            </ReactInputGroup.Text>
          )}
        </ReactInputGroup>
      );
    }
    const FormControl = () => {
      if (props?.otp) {
        return (
          <InputOtp
            inputStyle="form-control otp"
            numInputs={4}
            isDisabled={false}
            hasErrored={false}
            errorStyle="error"
            onChange={changeOtpHandler}
            separator={<span></span>}
            isInputNum={true}
            isInputSecure={false}
            shouldAutoFocus
            value={props?.value}
            placeholder={""}
            containerStyle={` ${props?.rightLabel || props?.rightLabel1 ? "right-input" : ""}  ${props?.leftLabel ? "left-input" : ""} ${className} ${error ? "is-invalid" : ""}`}
          />
        )
      }
      if (props?.type === "checkbox" || props?.type === "switch" || props?.type === "switch-1") {
        if(props?.type === "switch-1"){
          return(
            <div class="ios-toggle-mega-label-wrap">
              <span class="ios-toggle ios-toggle-reverse">
                <input type="checkbox" id={`include-forks-${ids}`}
                  onChange={props?.onCheck}
                  checked={props?.checked}
                  name={name}
                  className={`${className}`}
                  disabled={props?.disabled}
                  isInvalid={error ? true : false}
                />
                <label for={`include-forks-${ids}`}></label>
              </span>
              {props?.label && <label for={`include-forks-${ids}`} className="form-check-label">{props?.label}</label>}
            </div>
          )
        }
        return (
          <Form.Check // prettier-ignore
            type={props?.type}
            id={`default-${ids}`}
            label={props?.label}
            onChange={props?.onCheck}
            checked={props?.checked}
            name={name}
            isInvalid={error ? true : false}
            disabled={props?.disabled}
            className={`${className}`}
          />
        )
      }
      if(props?.type == "textarea"){
        return (
          <Form.Control
            // id={id}
            type={props?.number ? "text" : type}
            onWheel={(e) => e.target.blur()}
            placeholder={placeholder}
            name={name}
            as={props?.type == "textarea"?"textarea":"input"}
            onChange={changeHandler}
            className={` ${props?.rightLabel || props?.rightLabel1 ? "right-input" : ""}  ${props?.leftLabel ? "left-input" : ""} ${className}`}
            onClick={props?.onClick}
            {...data}
            // onKeyDown={(e) => EmptySpaceFieldValid(e, props, changeHandler)}
            value={props?.value}
            isInvalid={error ? true : false}
            disabled={props?.disabled}
            autoFocus={props?.autoFocus}
            onKeyDown={onKeyDown}
            onBlur={props?.onBlur}
            onFocus={props?.onFocus}
            style={{ resize: 'none', overflow: 'hidden' }} // Disable manual resizing and hide scrollbars
            rows={2}
          />
        )
      }
      return (
        <Form.Control
          // id={id}
          type={props?.number ? "text" : type}
          onWheel={(e) => e.target.blur()}
          placeholder={placeholder}
          name={name}
          as={props?.type == "textarea"?"textarea":"input"}
          onChange={changeHandler}
          className={` ${props?.rightLabel || props?.rightLabel1 ? "right-input" : ""}  ${props?.leftLabel ? "left-input" : ""} ${className}`}
          onClick={props?.onClick}
          {...data}
          // onKeyDown={(e) => EmptySpaceFieldValid(e, props, changeHandler)}
          value={props?.value}
          isInvalid={error ? true : false}
          disabled={props?.disabled}
          autoFocus={props?.autoFocus}
          onKeyDown={onKeyDown}
          onBlur={props?.onBlur}
          onFocus={props?.onFocus}
        />
      );
    };
    if (props?.leftLabel || props?.rightLabel || props?.rightLabel1) {
      return (
        <ReactInputGroup className={error ? "is-invalid" : ""} >
          {props?.leftLabel && (
            <ReactInputGroup.Text
              id={`left_icon_${id}`}
              className={`left_text ${props?.leftIconClick ? "cursor-pointer" : ""}`}
              onClick={props?.leftIconClick}
            >
              {props?.leftLabel}
            </ReactInputGroup.Text>
          )}
          {FormControl()}
          {props?.rightLabel && (
            <ReactInputGroup.Text
              id={`left_icon_${id}`}
              className={`right_text ${props?.rightIconClick ? "cursor-pointer" : ""}`}
              onClick={props?.rightIconClick}
            >
              {props?.rightLabel}
            </ReactInputGroup.Text>
          )}
          {props?.rightLabel1 && (
            <ReactInputGroup.Text
              id={`left_icon_${id}`}
              className={`right_text ${props?.rightIconClick1 ? "cursor-pointer" : ""}`}
              onClick={props?.rightIconClick1}
            >
              {props?.rightLabel1}
            </ReactInputGroup.Text>
          )}
        </ReactInputGroup>
      );
    }
    // if(props?.textEditor){
    //   return(
    //     <ReactQuill
    //       className={`${error ? "is-invalid" : ""}`}
    //       theme="snow"
    //       value={value}
    //       onChange={onTextChange}
    //       modules={{
    //         toolbar: [
    //           [{ 'header': [1, 2, false] }],
    //           ['bold', 'italic', 'underline','strike', 'blockquote'],
    //           [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    //           ['link', 'image'],
    //           ['clean']
    //         ]
    //       }}
    //       formats={[
    //         'header',
    //         'bold', 'italic', 'underline', 'strike', 'blockquote',
    //         'list', 'bullet', 'indent',
    //         'link', 'image'
    //       ]}
    //       placeholder={props?.placeholder}
    //     />
    //   )
    // }
    return FormControl();
  };
  const LabelForm = () => {
    return (label || Label) && (!props?.labelFloat && props?.type !== "checkbox" && props?.type !== "switch" && props?.type !== "switch-1") ? (
      <React.Fragment>
        <Form.Label className={`${labelClassName}`}>
          {Label}
          {label} {props?.required && <span className="form-required">*</span>}
        </Form.Label>
      </React.Fragment>
    ) : (
      <React.Fragment></React.Fragment>
    );
  };
  const ErrorForm = () => {
    return error ? (
      <React.Fragment>
        <Form.Control.Feedback type="invalid" className={`${errorClassName}`}>
          {error}
        </Form.Control.Feedback>
      </React.Fragment>
    ) : (
      <React.Fragment></React.Fragment>
    );
  };
  const HightLightForm = () => {
    return props.highlight ? (
      <React.Fragment>
        <span className={`highlight`}>
          {props.highlight}
        </span>
      </React.Fragment>
    ) : (
      <React.Fragment></React.Fragment>
    );
  };

  const InputFormGroup = () =>{
        return(
            <input
                type={type}
                className={`form-control form-control-${props?.size} ${className} ${(props?.leftIcon || props?.leftLabel) &&'ps-0 leftIcon'} ${(props?.rightIcon || props?.rightLabel) &&'pe-0 rightIcon'}`}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                id={`${ids}`}
                value={props?.value}
                autoComplete=''
            />
        )
    }
    const FormInput = () =>{
        return(
            <div className={`${floatStyle?"form-floating":"input-group"}`}>
                {InputFormGroup()}
                {label && floatStyle &&( 
                    <label htmlFor={ids} className='form-label text-muted'>
                        {label}
                    </label>
                )}
            </div>
        )
    }
    if(props?.floatStyle){
        return (
            <div className={`form_group ${formClassName}`}>
                {label && !floatStyle &&( 
                    <label htmlFor={ids} className='form-label text-muted'>
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
  return (
    <FormGroupControl
      label={label}
      labelFloat={props?.labelFloat}
      className={`form_group common-input ${props?.otp ? "form-group-otp" : ""} ${props?.leftIcon ||
        props?.rightIcon ||
        props?.rightLabel1 ||
        props?.rightLabel ||
        props?.leftLabel ||
        props?.inputType === "select" ||
        props?.type === "select"
        ? "input_group_icon"
        : "normal-control"
        } mt-0 form_style_${props?.formStyle} form-size-${props?.size} ${props?.inline ? "d-inline-block" : ""} radius-${props?.radius
        } ${formClassName} ${error ? "form-validate" : ""} form_variate ${(props?.type === "time" || props?.type === "date") && "date_time_icon"}`}
      controlId={ids}
    >
      {LabelForm()}
      {InputForm()}
      {ErrorForm()}
      {HightLightForm()}
    </FormGroupControl>
  );
}
InputGroup.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.any,
  Label: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  error: PropTypes.any,
  name: PropTypes.string,
  highlight: PropTypes.any,
  type: PropTypes.string,
  id: PropTypes.string,
  formClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  as: PropTypes.any,
  radius: PropTypes.number,
  size: PropTypes.any,
  rules: PropTypes.object,
  number: PropTypes?.bool,
  phone: PropTypes?.bool,
  labelFloat: PropTypes?.bool,
  value: PropTypes?.any,
  formStyle: PropTypes.any,
  required: PropTypes?.bool,
  inputType: PropTypes?.string,
  option: PropTypes?.array,
  leftIcon: PropTypes?.any,
  rightIcon: PropTypes?.any,
  leftLabel: PropTypes?.any,
  rightLabel1: PropTypes?.any,
  rightLabel: PropTypes?.any,
  onKeyDown: PropTypes?.func,
  onSubmit: PropTypes?.func,
  country_isocode: PropTypes?.any,
  leftIconClass: PropTypes?.any,
  rightIconClass: PropTypes?.any,
  onEditorChange: PropTypes.func,
  rightIconClick1: PropTypes.func,
  rightIconClick: PropTypes.func,
  leftIconClick: PropTypes.func,
  multiple: PropTypes?.bool,
  inline: PropTypes?.bool,
  disabled: PropTypes?.bool,
  validLength: PropTypes?.bool,
  digit: PropTypes?.bool,
  otp: PropTypes?.bool,
  autoFocus: PropTypes?.bool,
  isClearable: PropTypes?.bool,
  checked: PropTypes?.bool,
  textEditor: PropTypes?.bool,
  isMultiple: PropTypes?.bool,
  onCheck: PropTypes?.func,
  icon_circle: PropTypes?.any,
  circle: PropTypes?.bool,
    floatStyle: PropTypes?.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};
InputGroup.defaultProps = {
  className: "",
  label: "",
  placeholder: "",
  onChange: () => { },
  onClick: () => { },
  onEditorChange: () => { },
  error: "",
  name: "name",
  highlight: "",
  type: "text",
  id: "",
  formClassName: "",
  labelClassName: "",
  errorClassName: "",
  as: "",
  radius: 1,
  size: 1,
  number: false,
  phone: false,
  labelFloat: false,
  value: "",
  formStyle: "normal",
  disabled: false,
  required: false,
  inputType: "input",
  option: [],
  leftIcon: "",
  rightIcon: "",
  leftIconClass: "",
  rightIconClass: "",
  country_isocode: "",
  leftLabel: "",
  rightLabel1: "",
  rightLabel: "",
  onKeyDown: () => { },
  multiple: false,
  inline: false,
  digit: false,
  otp: false,
  autoFocus: false,
  Label: null,
  validLength: false,
  rows: "",
  isClearable: false,
  checked: false,
  textEditor: false,
  isMultiple: false,
  onCheck: ()=>{},
  icon_circle: App_url.icons.Check,
  circle: false,
    floatStyle: false,
  onBlur: ()=>{},
  onFocus: ()=>{},
};
