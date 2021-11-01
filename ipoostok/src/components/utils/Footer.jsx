import React from 'react'

export const Footer = () => {
    return (
        <footer className="p-4 my-md-5 pt-md-5 border-top">
            <div className="row">
                <div className="col-12 col-md ms-4">
                    <img className="mb-2" src="/logo192.png" alt="" width="64" height="64" />
                    <small className="d-block mb-3 text-muted">&copy; 2017–2021</small>
                </div>
                <div className="col-6 col-md">
                    <h5>Features</h5>
                    <ul className="list-unstyled text-small">
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Cool stuff</a></li>
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Random feature</a></li>
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Team feature</a></li>
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Stuff for developers</a></li>
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Another one</a></li>
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Last time</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Resources</h5>
                    <ul className="list-unstyled text-small">
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Resource</a></li>
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Resource name</a></li>
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Another resource</a></li>
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Final resource</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>About</h5>
                    <ul className="list-unstyled text-small">
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Team</a></li>
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">About</a></li>
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Privacy</a></li>
                        <li className="mb-1"><a className="link-secondary text-decoration-none" href="/">Terms</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
