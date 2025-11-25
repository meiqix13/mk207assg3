import React from 'react';
import './FormInput.css';

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  options = []
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>

      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-input form-select ${error ? 'error' : ''}`}
          required={required}
        >
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-input form-textarea ${error ? 'error' : ''}`}
          placeholder={placeholder}
          required={required}
          rows="4"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`form-input ${error ? 'error' : ''}`}
          placeholder={placeholder}
          required={required}
        />
      )}

      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default FormInput;
