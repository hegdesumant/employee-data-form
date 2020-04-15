import React from 'react';
import './review.style.scss'

import { useSelector } from 'react-redux'

const ReviewComponent = () => {
    const employeeDetailsArray = useSelector(state => state.employeeDetails)
    return (
        <div className="review-layout">
            {employeeDetailsArray.map((detail, index) => (
                <div key={index} className="review-layout-display-area">
                    <div className="field-elements-holder">{`Employee #${parseInt(index) + 1}`}</div>
                    {Object.keys(detail).map((key, value) => (
                        <div key={value} className="field-elements-holder">
                            <div className="field-label">{key}</div>
                            <div className="field-elements">
                                {
                                    (key === "contact") ?
                                        (detail[key].map((mapElement, mapIndex) => (
                                            <div key={mapIndex}>{`${mapElement["type"]} - ${mapElement["number"]}`}</div>
                                        ))) : (
                                            <div>{`${detail[key]}`}</div>
                                        )
                                }
                            </div>
                        </div>
                    ))}
                </div>

            ))}
        </div>
    );
}

export default ReviewComponent;