import React from 'react'
import {usePromiseTracker} from "react-promise-tracker";
import Loader from "react-loader-spinner";

function Loading() {
    const {promiseInProgress} = usePromiseTracker();
    return (
        promiseInProgress &&
        <div className="loading-spinner-container">
            <Loader type="TailSpin" className="loading-spinner" color="#1E90FF" height="80" width="80"/>
        </div>
    );
}

export default Loading