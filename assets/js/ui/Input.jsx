import React, { useState } from 'react';
import classNames from 'classnames';

const Input = ({
  type,
  label,
  name,
  getValue,
  regex,
  errors,
  updateErrors,
  placeholder
}) => {
  const [status, updateStatus] = useState(false);
  const onChange = (evt) => {
    if(regex) {
      if(!regex.test(evt.target.value)) {
        errors[`${name}`] = true;
        updateStatus(true);
        updateErrors(errors);
      } else {
        updateStatus(false);
        delete errors[`${name}`]
      }
    }

    const obj = {
      key: evt.target.name,
      value: evt.target.value
    };

    getValue(obj);
  }

  const classes = classNames({
    "input-form": true,
    "input-form--wrong": status
  });

  return(
    <div className="form__section">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        onChange={onChange}
        className={classes}
        type={type}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

Input.defaultProps = {
  placeholder: '',
  regex: false
}

export default Input;
