import React, { useState } from "react";
import ErrorList from "../layout/ErrorList";
import FormError from "../layout/FormError";
import config from "../../config";
import translateServerErrors from "../../services/translateServerErrors"

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    username: "",
    zipCode: ""
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation, username, zipCode } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    const zipCodeRegexp = config.validation.zipCode.regexp.zipCodeRegex;
    let newErrors = {};

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (username.trim() == "") {
      newErrors = {
        ...newErrors,
        username: "is required",
      };
    }

    if (!zipCode.match(zipCodeRegexp)) {
      newErrors = {
        ...newErrors,
        zipCode: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        if (Object.keys(errors).length === 0) {
          const response = await fetch("/api/v1/users", {
            method: "post",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
          if (!response.ok) {
            if (response.status === 422) {
              const errorBody = await response.json()
              const newServerErrors = translateServerErrors(errorBody.errors)
              setServerErrors(newServerErrors)
            }
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
          const userData = await response.json();
          setShouldRedirect(true);
        }
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/lists/new";
  }

  return (
    <div className="registration-form x-grid">
      <h1 className="registration-form-header">Register</h1>
      <ErrorList errors={serverErrors} />
      <form onSubmit={onSubmit}>
        <label className="registration-form-label">
          Email
          <input
            className="registration-form-input" 
            type="text" 
            name="email" 
            value={userPayload.email} 
            onChange={onInputChange} 
          />
          <FormError error={errors.email} />
        </label>
        <label className="registration-form-label">
          Username
          <input
            className="registration-form-input" 
            type="text"
            name="username"
            value={userPayload.username}
            onChange={onInputChange}
          />
          <FormError error={errors.username} />
        </label>
        <label className="registration-form-label">
          Zip Code
          <input
            className="registration-form-input" 
            type="text"
            name="zipCode"
            value={userPayload.zipCode}
            onChange={onInputChange}
          />
          <FormError error={errors.zipCode} />
        </label>
        <label className="registration-form-label">
          Password
          <input
            className="registration-form-input" 
            type="password"
            name="password"
            value={userPayload.password}
            onChange={onInputChange}
          />
          <FormError error={errors.password} />
        </label>
        <label className="registration-form-label">
          Password Confirmation
          <input
            className="registration-form-input" 
            type="password"
            name="passwordConfirmation"
            value={userPayload.passwordConfirmation}
            onChange={onInputChange}
          />
          <FormError error={errors.passwordConfirmation} />
        </label>
          <input 
            className="registration-form-button" 
            type="submit" 
            value="Register" 
          />
      </form>
    </div>
  );
};

export default RegistrationForm;