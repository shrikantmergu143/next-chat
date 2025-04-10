/* eslint-disable */
import React, { Component, PureComponent } from 'react';

const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

const isStyleObject = (obj) => typeof obj === 'object';

class SingleOtpInput extends PureComponent<any>  {
  input?: React.RefObject<any>;
  constructor(props) {
    super(props);
    this.input = React.createRef<any>();
  }

  componentDidMount() {
    const { focus, shouldAutoFocus }:any = this.props;
    const { current: inputEl }:any = this.input;

    if (inputEl && focus && shouldAutoFocus) {
      inputEl.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const { focus }:any = this.props;
    const { current: inputEl } = this.input;
    if (prevProps.focus !== focus && inputEl && focus) {
      inputEl.focus();
      inputEl.select();
    }
  }

  getClasses = (...classes) => classes.filter((c) => !isStyleObject(c) && c !== false).join(' ');

  getType = () => {
    const { isInputSecure, isInputNum }:any = this.props;

    if (isInputSecure) {
      return 'password';
    }

    if (isInputNum) {
      return 'tel';
    }

    return 'text';
  };

  render() {
    const {
      placeholder,
      separator,
      isLastChild,
      inputStyle,
      focus,
      isDisabled,
      hasErrored,
      errorStyle,
      focusStyle,
      disabledStyle,
      shouldAutoFocus,
      isInputNum,
      index,
      value,
      className,
      isInputSecure,
      ...rest
    }:any = this.props;

    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
        <input
          aria-label={`${index === 0 ? 'Please enter verification code. ' : ''}${isInputNum ? 'Digit' : 'Character'} ${
            index + 1
          }`}
          autoComplete="off"
          style={Object.assign(
            { width: '1em', textAlign: 'center' },
            isStyleObject(inputStyle) && inputStyle,
            focus && isStyleObject(focusStyle) && focusStyle,
            isDisabled && isStyleObject(disabledStyle) && disabledStyle,
            hasErrored && isStyleObject(errorStyle) && errorStyle
          )}
          placeholder={placeholder}
          className={`form-input form-input-placeholder ${this.getClasses(
            inputStyle,
            focus && focusStyle,
            isDisabled && disabledStyle,
            hasErrored && errorStyle
          )}`}
          type={this.getType()}
          maxLength="1"
          ref={this.input}
          disabled={isDisabled}
          value={value ? value : ''}
          {...rest}
        />
        {!isLastChild && separator}
      </div>
    );
  }
}

interface InputOtpProps {
  numInputs?: number;
  onChange?: (otp?: string) => void;
  isDisabled?: boolean;
  shouldAutoFocus?: boolean;
  value?: string;
  isInputSecure?: boolean;
  isInputNum?: boolean;
  placeholder?: string;
  inputStyle?: any;
  focusStyle?: any;
  separator?: React.ReactNode;
  disabledStyle?: any;
  hasErrored?: boolean;
  errorStyle?: any;
  className?: string;
  containerStyle?: any | string;
  'data-cy'?: string;
  'data-testid'?: string;
}

class InputOtp extends Component<InputOtpProps> {
  static defaultProps:any = {
    numInputs: 4,
    onChange: (otp) => console.log(otp),
    isDisabled: false,
    shouldAutoFocus: false,
    value: '',
    isInputSecure: false,
  };

  state:any = {
    activeInput: 0,
  };

  getOtpValue = () => (this.props.value ? this.props.value.toString().split('') : []);

  getPlaceholderValue = () => {
    const { placeholder, numInputs }:any = this.props;

    if (typeof placeholder === 'string') {
      if (placeholder.length === numInputs) {
        return placeholder;
      }

      if (placeholder.length > 0) {
        console.error('Length of the placeholder should be equal to the number of inputs.');
      }
    }
  };

  handleOtpChange = (otp) => {
    const { onChange }:any = this.props;
    const otpValue = otp.join('');

    onChange(otpValue);
  };

  isInputValueValid = (value:any) => {
    const isTypeValid:any = this.props.isInputNum ? !isNaN(parseInt(value, 10)) : typeof value === 'string';

    return isTypeValid && value.trim().length === 1;
  };

  focusInput = (input:any) => {
    const { numInputs }:any = this.props;
    const activeInput = Math.max(Math.min(numInputs - 1, input), 0);

    this.setState({ activeInput });
  };

  focusNextInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput + 1);
  };

  focusPrevInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput - 1);
  };

  changeCodeAtFocus = (value) => {
    const { activeInput } = this.state;
    const otp = this.getOtpValue();
    otp[activeInput] = value[0];

    this.handleOtpChange(otp);
  };

  handleOnPaste = (e) => {
    e.preventDefault();

    const { activeInput } = this.state;
    const { numInputs, isDisabled }:any = this.props;

    if (isDisabled) {
      return;
    }

    const otp = this.getOtpValue();
    let nextActiveInput = activeInput;

    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('');

    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift();
        nextActiveInput++;
      }
    }

    this.setState({ activeInput: nextActiveInput }, () => {
      this.focusInput(nextActiveInput);
      this.handleOtpChange(otp);
    });
  };

  handleOnChange = (e) => {
    const { value } = e.target;

    if (this.isInputValueValid(value)) {
      this.changeCodeAtFocus(value);
    }
  };

  handleOnKeyDown = (e) => {
    if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
      e.preventDefault();
      this.changeCodeAtFocus('');
      this.focusPrevInput();
    } else if (e.keyCode === DELETE || e.key === 'Delete') {
      e.preventDefault();
      this.changeCodeAtFocus('');
    } else if (e.keyCode === LEFT_ARROW || e.key === 'ArrowLeft') {
      e.preventDefault();
      this.focusPrevInput();
    } else if (e.keyCode === RIGHT_ARROW || e.key === 'ArrowRight') {
      e.preventDefault();
      this.focusNextInput();
    } else if (e.keyCode === SPACEBAR || e.key === ' ' || e.key === 'Spacebar' || e.key === 'Space') {
      e.preventDefault();
    }
  };

  handleOnInput = (e) => {
    if (this.isInputValueValid(e.target.value)) {
      this.focusNextInput();
    } else {
      if (!this.props.isInputNum) {
        const { nativeEvent } = e;

        if (nativeEvent.data === null && nativeEvent.inputType === 'deleteContentBackward') {
          e.preventDefault();
          this.changeCodeAtFocus('');
          this.focusPrevInput();
        }
      }
    }
  };

  renderInputs = () => {
    const { activeInput } = this.state;
    const {
      numInputs,
      inputStyle,
      focusStyle,
      separator,
      isDisabled,
      disabledStyle,
      hasErrored,
      errorStyle,
      shouldAutoFocus,
      isInputNum,
      isInputSecure,
      className,
    }:any = this.props;

    const inputs = [];
    const otp = this.getOtpValue();
    const placeholder = this.getPlaceholderValue();
    const dataCy = this.props['data-cy'];
    const dataTestId = this.props['data-testid'];

    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <SingleOtpInput
          placeholder={placeholder && placeholder[i]}
          key={i}
          index={i}
          focus={activeInput === i}
          value={otp && otp[i]}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          onInput={this.handleOnInput}
          onPaste={this.handleOnPaste}
          onFocus={(e) => {
            this.setState({ activeInput: i });
            e.target.select();
          }}
          onBlur={() => this.setState({ activeInput: -1 })}
          separator={separator}
          inputStyle={inputStyle}
          focusStyle={focusStyle}
          isLastChild={i === numInputs - 1}
          isDisabled={isDisabled}
          disabledStyle={disabledStyle}
          hasErrored={hasErrored}
          errorStyle={errorStyle}
          shouldAutoFocus={shouldAutoFocus}
          isInputNum={isInputNum}
          isInputSecure={isInputSecure}
          className={className}
          data-cy={dataCy && `${dataCy}-${i}`}
          data-testid={dataTestId && `${dataTestId}-${i}`}
        />
      );
    }

    return inputs;
  };

  render() {
    const { containerStyle }:any = this.props;

    return (
      <div
        style={Object.assign({ display: 'flex' }, isStyleObject(containerStyle) && containerStyle)}
        className={`justify-content-between ${!isStyleObject(containerStyle) ? containerStyle : ''}`}
      >
        {this.renderInputs()}
      </div>
    );
  }
}

export default InputOtp;