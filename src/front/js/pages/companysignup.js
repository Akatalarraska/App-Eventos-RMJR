import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/companysignup.css";

export const CompanySignup = () => {
  const [companyName, setCompanyName] = useState("");
  const [vat, setVat] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const { actions } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.companySignup(
      companyName,
      vat,
      address,
      postCode,
      city,
      phone,
      email
    );
  };

  return (
    <section className="h-custom">
      <form className="signup" onSubmit={handleSubmit}>
        <div className="container py-2">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div className="card card-registration mobile-fix">
                <div className="card-body p-0 border rounded">
                  <div className="row g-0 border rounded">
                  <div className="col-12 bg-indigo text-white border rounded p-5">
                      <h3 className="fw-normal mb-5 text-center text-black">
                        Company registration details
                      </h3>
                      <div className="mb-4 pb-2">
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          className="form-control form-control-lg"
                          placeholder="Company Name"
                          required
                          value={companyName}
                          onChange={(event) =>
                            setCompanyName(event.target.value)
                          }
                        />
                      </div>
                      <div className="mb-4 pb-2">
                        <input
                          type="text"
                            id="vat"
                            name="vat"
                          className="form-control form-control-lg"
                          placeholder="VAT Number"
                          required
                          value={vat}
                          onChange={(event) => setVat(event.target.value)}
                        />
                      </div>
                      <div className="mb-4 pb-2">
                        <input
                          type="text"
                            id="address"
                            name="address"
                          className="form-control form-control-lg"
                          placeholder="Address"
                          autoComplete="address"
                          required
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-5 mb-4 pb-2">
                          <input
                            type="text"
                            id="postCode"
                            name="postCode"
                            className="form-control form-control-lg"
                            placeholder="Post Code"
                            autoComplete="postal-code"
                            required
                            value={postCode}
                            onChange={(event) =>
                              setPostCode(event.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-7 mb-4 pb-2">
                          <input
                            type="text" 
                            id="city"
                            name="city"
                            className="form-control form-control-lg"
                            placeholder="City"
                            required
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-7 mb-4 pb-2">
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control form-control-lg"
                            placeholder="Phone Number"
                            autoComplete="phone"
                            required
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                            id="email"
                            name="email"
                          className="form-control form-control-lg"
                          placeholder="Email Address"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div className="form-check d-flex justify-content-start mb-4 pb-3">
                        <input
                          className="form-check-input me-3"
                          type="checkbox"
                          defaultValue=""
                          id="form-checkbox"
                          
                        />
                        <label
                          className="form-check-label text-white"
                          htmlFor="form-checkbox"
                        >
                          I do accept the{" "}
                          <a href="#!" className="text-white">
                            <u>Terms and Conditions</u>
                          </a>{" "}
                          of the site.
                        </label>
                      </div>
                      <div className="d-grid gap-2">
                        <button
                          type="submit"
                          className="btn btn-dark btn-lg"
                          data-mdb-ripple-color="dark"
                          onClick={handleSubmit}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};



