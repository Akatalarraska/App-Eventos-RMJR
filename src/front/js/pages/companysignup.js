import React from "react";

import "../../styles/companysignup.css";


export const CompanySignup = () => {
    return (
        <section className="h-custom gradient-custom-2">
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
                                            // id="form3Examplea2" 
                                            placeholder="Company Name" />
                                        </div>
                                        <div className="mb-4 pb-2">
                                            <input 
                                            type="text" 
                                            className="form-control form-control-lg" 
                                            // id="form3Examplea3" 
                                            placeholder="VAT Number" />
                                        </div>
                                        <div className="mb-4 pb-2">
                                            <input 
                                            type="text" 
                                            className="form-control form-control-lg" 
                                            // id="form3Examplea3" 
                                            placeholder="Address" />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5 mb-4 pb-2">
                                                <input 
                                                type="text" 
                                                className="form-control form-control-lg" 
                                                // id="form3Examplea4" 
                                                placeholder="Post Code" />
                                            </div>
                                            <div className="col-md-7 mb-4 pb-2">
                                                <input 
                                                type="text" 
                                                className="form-control form-control-lg" 
                                                // id="form3Examplea5" 
                                                placeholder="City" />
                                            </div>
                                        </div>
                                        <div className="mb-4 pb-2">
                                            <input 
                                            type="text" 
                                            className="form-control form-control-lg" 
                                            // id="form3Examplea6" 
                                            placeholder="Country" />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-7 mb-4 pb-2">
                                                <input 
                                                type="text" 
                                                className="form-control form-control-lg" 
                                                // id="form3Examplea8" 
                                                placeholder="Phone Number" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <input 
                                            type="text" 
                                            className="form-control form-control-lg" 
                                            // id="form3Examplea9" 
                                            placeholder="Email Address" />
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
                                        <button type="button" className="btn btn-dark btn-lg" data-mdb-ripple-color="dark">
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
        </section>
    );
};
