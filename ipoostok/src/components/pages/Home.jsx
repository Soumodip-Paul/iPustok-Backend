import React from 'react'
import '../../stylesheet/content.css'
import { SignInBtn } from '../utils/SignUp'

export const Home = () => {
    return (
        <>
            <main>
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 className="display-4 fw-normal">Welcome To iPoostak</h1>
                        <p className="lead fw-normal">An online note manager that will handle all of your Notes. Now create, add, manage all of your daily notes for free with us.</p>
                        <SignInBtn className="btn btn-outline-secondary" text="Join Us Now"/>
                    </div>
                    <div className="product-device shadow-sm d-none d-md-block"></div>
                    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                </div>

                <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                    <div className="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                        <div className="my-3 py-3">
                            <h2 className="display-5">WORK ANYWHERE</h2>
                            <p className="lead">Keep important info handy—your notes sync automatically to all your devices.</p>
                        </div>
                        <div className="bg-light shadow-sm mx-auto" style={{width: "80%", height: "300px", borderRadius: "21px 21px 0 0"}}></div>
                    </div>
                    <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                        <div className="my-3 p-3">
                            <h2 className="display-5">TURN TO-DO INTO DONE</h2>
                            <p className="lead">Bring your notes, tasks, and schedules together to get things done more easily.</p>
                        </div>
                        <div className="bg-dark shadow-sm mx-auto" style={{width: "80%", height: "300px", borderRadius: "21px 21px 0 0"}}></div>
                    </div>
                </div>

                <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                    <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                        <div className="my-3 p-3">
                            <h2 className="display-5">PIN YOUR NOTES</h2>
                            <p className="lead">Pin your important notes and don't worry to find it here and there</p>
                        </div>
                        <div className="bg-dark shadow-sm mx-auto" style={{width: "80%", height: "300px", borderRadius: "21px 21px 0 0"}}></div>
                    </div>
                    <div className="bg-primary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                        <div className="my-3 py-3">
                            <h2 className="display-5">TRY IT FOR FREE</h2>
                            <p className="lead">Try it for for absolutely free</p>
                        </div>
                        <div className="bg-light shadow-sm mx-auto" style={{width: "80%", height: "300px", borderRadius: "21px 21px 0 0"}}></div>
                    </div>
                </div>
            </main>
        </>
    )
}
