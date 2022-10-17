
import React from "react";

export function TokenHelp() {
    return (
        <div>
            <button type="button" className="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#tokenModal">How to get Token</button>
            <div className="modal fade" id="tokenModal" tabIndex={-1} aria-labelledby="tokenHelp" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="tokenHelp">How to get Token</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5> Using network tab</h5>
                            <p>
                                <ul>
                                    <li>Open development console (<span className="badge bg-secondary">F12</span> or <span className="badge bg-secondary">Ctrl + Shift + I</span>)</li>
                                    <li>Switch channel or server in Discord</li>
                                    <li>Go to <strong>Network</strong> tab</li>
                                    <li>Turn on XHR filter</li>
                                    <li>Select any request</li>
                                    <li>Find authorization header</li>
                                </ul>
                                <img src="../static/images/network.png" />
                            </p>
                            <h5> Using application tab (browser only)</h5>
                            <p>
                                <ul>
                                    <li>Open development console (<span className="badge bg-secondary">F12</span> or <span className="badge bg-secondary">Ctrl + Shift + I</span>)</li>
                                    <li>Go to <strong>Application</strong> tab</li>
                                    <li>Select local storage</li>
                                    <li>Search for <span className="badge bg-secondary">token</span> key</li>
                                </ul>
                                <img src="../static/images/application.png" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
