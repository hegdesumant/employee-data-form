import React from 'react'
import './form.style.scss'
import EmployeeDetailsForm from '../components/form/employee_form'
import ReviewComponent from '../components/review/review'
import ButtonComponent from '../components/button'
import { clearEmployeeState } from '../redux/actions'

import { useSelector, useDispatch } from 'react-redux'

const FormPageComponent = () => {
    const employeeDetailsArray = useSelector(state => state.employeeDetails)
    const [viewDataButton, setViewDataButton] = React.useState(false)
    const [renderForm, setRenderForm] = React.useState(true)
    const [buttonText, setButtonText] = React.useState("View Data")

    const dispatch = useDispatch()
    React.useEffect(() => {
        (employeeDetailsArray.length > 0) ? (
            setViewDataButton(true)
        ):(
            setViewDataButton(false)
        )
    }, [employeeDetailsArray])

    const toggleRenderOnPress = () => {
        if (renderForm) {
            setButtonText('Download Json')
            setRenderForm(false)
        }else{
            setButtonText('View Data')
            downloadJson()
        }
    }

    const downloadJson = async () => {
        const data = JSON.stringify(employeeDetailsArray)
        const blob = new Blob([data], { type: "application/json" })
        const href = await URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = href;
        link.download = "employee-details.json"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        dispatch(clearEmployeeState())
        setRenderForm(true)

    }
    return ( 
        <div className="form-page">
            {renderForm ? (<EmployeeDetailsForm />): (
                <ReviewComponent />
            )}
            <ButtonComponent text={buttonText} active={viewDataButton}  clickFunction={toggleRenderOnPress}/>
        </div>
     );
}
 
export default FormPageComponent;