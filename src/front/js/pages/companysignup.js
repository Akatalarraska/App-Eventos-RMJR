import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/companysignup.css";

export const CompanySignup = () => {

    const [companyName, setCompanyName] = useState("")
    const [vat, setVat] = useState("")
    const [address, setAddress] = useState("")
    const [postcode, setPostcode] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const { actions } = useContext(Context);



    const handleCompanySignup = (event) => {
        event.preventDefault();
        actions.handleCompanySignup(companyName, vat, address, postcode, city, country, phone, email);
    }
    



    return (
        <section className="h-custom gradient-custom-2">
            <form className="signup"
                onSubmit={handleCompanySignup}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2">
                                <div className="card-body p-0 border rounded">
                                    <div className="row g-0 border rounded">
                                        <div className="col-lg-12 bg-indigo text-white border rounded p-5">
                                            <h3 className="fw-normal mb-5 text-center text-black">Company registration details</h3>
                                            <div className="mb-4 pb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Company Name" 
                                                    required
                                                    value={companyName}
                                                    onChange={(event) => setCompanyName(event.target.value)}
                                                    />
                                            </div>
                                            <div className="mb-4 pb-2">
                                                <input
                                                    type="text"
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
                                                    className="form-control form-control-lg"
                                                    placeholder="Address"
                                                    required
                                                    value={address}
                                                    onChange={(event) => setAddress(event.target.value)}
                                                    />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-5 mb-4 pb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg"
                                                        placeholder="Post Code" 
                                                        required
                                                        value={postcode}
                                                        onChange={(event) => setPostcode(event.target.value)}
                                                        />
                                                </div>
                                                <div className="col-md-7 mb-4 pb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg"
                                                        placeholder="City" 
                                                        required
                                                        value={city}
                                                        onChange={(event) => setCity(event.target.value)}
                                                        />
                                                </div>
                                            </div>
                                            <div className="mb-4 pb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Country" 
                                                    required
                                                    value={country}
                                                    onChange={(event) => setCountry(event.target.value)}
                                                    />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-7 mb-4 pb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg"
                                                        placeholder="Phone Number" 
                                                        required
                                                        value={phone}
                                                        onChange={(event) => setPhone(event.target.value)}
                                                        />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Email Address" 
                                                    required
                                                    value={email}
                                                    onChange={(event) => setEmail(event.target.value)}
                                                    />
                                            </div>
                                            <div className="form-check d-flex justify-content-start mb-4 pb-3">
                                                <input className="form-check-input me-3" type="checkbox" defaultValue="" id="form2Example3c" />
                                                <label className="form-check-label text-white" htmlFor="form2Example3">
                                                    I do accept the{" "}
                                                    <a href="#!" className="text-white">
                                                        <u>Terms and Conditions</u>
                                                    </a>{" "}
                                                    of the site.
                                                </label>
                                            </div>
                                            <div className="d-grid gap-2">
                                                <button type="submit" className="btn btn-dark btn-lg" data-mdb-ripple-color="dark" onClick={handleCompanySignup}>
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
