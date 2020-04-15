import React, { useState } from 'react'
import './employee_form.style.scss'
import { formHeading, formFields, buttonText } from '../../constants'
import DatePicker from 'react-date-picker';
import add_icon from '../../assets/add_icon.svg'
import ButtonComponent from '../button'
import { setEmployeeState } from '../../redux/actions'
import { useDispatch } from "react-redux";


const EmployeeDetailsForm = () => {
    const [name, setName] = useState("")
    const [designation, setDesignation] = useState("")
    const [contactType, setContactType] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [contactDetails, setContactDetails] = useState([])
    const [skill, setSkill] = useState("")
    const [skills, setSkills] = useState([])
    const [defaultDate, setDefaultDate] = useState(new Date())
    const [buttonActiveState, setButtonActiveState] = useState(false)
    const dispatch = useDispatch()

    const updateNewSkills = (event) => {
        if (skills.includes(skill)) {
            alert(`${skill} is already added. Please add a new skill`)
        } else {
            setSkills([...skills, skill])
            setSkill("")
        }
        event.preventDefault()
    }

    const updateContactDetails = (event) => {
        if (contactDetails.length > 3) {
            alert("maximum 4 contacts can be added")
        } else {
            if (!((contactType.length > 0) && (contactNumber.length > 9))) {
                alert("phone number should be of 10 digits")
            } else {
                setContactDetails([...contactDetails, {
                    type: contactType,
                    number: contactNumber
                }])
            }
            setContactType("")
            setContactNumber("")
        }
        event.preventDefault()
    }


    //Read the changes in the input fields and enable the button once all required fields are filled
    React.useEffect(() => {
        if (name.length > 0 &&
            designation.length > 0 &&
            contactNumber.length > 9 && 
            contactType.length > 0 && 
            (skill.length > 0) || skills.length>0 ) {
            setButtonActiveState(true)
        } else {
            if (contactDetails.length > 0) {
                setButtonActiveState(true)
            }else{
                setButtonActiveState(false)
            }
        }
    }, [name, designation, contactDetails, skills, skill, contactType, contactNumber]);

    const updateEmployeeDataInStore = () => {
        //If any value is present phone and skills input fields record the value
        let skillsArray = skills
        let contactDetailsArray = contactDetails

        //Read skills input field and record the values
        console.log(skills)
        if ((!skills.includes(skill)) && skill.length > 0) {
            skillsArray = [...skillsArray, skill]
        }

        //Read Contact details inputs and record the values
        if (!(contactDetails.length > 3) && (contactNumber.length > 9 && contactType.length > 0)) {
            contactDetailsArray = [...contactDetailsArray, {
                type: contactType,
                number: contactNumber
            }]
        }

        //Format the date in dd-Mon-yyyy format
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(defaultDate)
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(defaultDate)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(defaultDate)

        const employeeObject = {
            name: name,
            designation: designation,
            contact: contactDetailsArray,
            skills: skillsArray,
            dob: `${da}-${mo}-${ye}`
        }

        //Dispatch an action with employee object to update the redux store
        dispatch(setEmployeeState(employeeObject))

        //Disable the button
        setButtonActiveState(false)

        // Set all states to default
        setName("")
        setDesignation("")
        setContactNumber("")
        setContactType("")
        setSkill("")
        setContactDetails([])
        setSkills([])
        setDefaultDate(new Date())

    }


    return (
        <div className="employee-form-body">
            <div className="employee-form-heading">{formHeading}</div>
            <div className="employee-form-fields">
                <div className="field-element">
                    <div className="field-element-label">
                        <div>{formFields.name}</div>
                    </div>
                    <div className="field-element-input">
                        <input value={name} onChange={(event) => setName(event.target.value)} className="input-field" type="text" />
                    </div>
                </div>

                <div className="field-element">
                    <div className="field-element-label">
                        <div>{formFields.designation}</div>
                    </div>
                    <div className="field-element-input">
                        <input value={designation} onChange={(event) => setDesignation(event.target.value)} className="input-field" type="text" />
                    </div>
                </div>

                <form className="field-element">
                    <div className="field-element-label">
                        <div>{formFields.contactDetails.label}</div>
                    </div>
                    <div className="field-element-input">
                        <input value={contactType} onChange={(event) => setContactType(event.target.value)} placeholder={formFields.contactDetails.type} className="input-field" type="text" />
                        <input value={contactNumber} onChange={(event) => setContactNumber(event.target.value)} placeholder={formFields.contactDetails.phone} className="input-field" type="number" />
                        <button onClick={updateContactDetails} className="add-icon-field">
                            <img className="add-icon" src={add_icon} />
                        </button>
                    </div>
                </form>

                {contactDetails.length > 0 &&
                    <div className="field-element">
                        <div className="phone-number-enterred-preview">
                            {contactDetails.map((contact, index) => (
                                <div key={index}>{`${contact.number} - ${contact.type}`}</div>
                            ))}
                        </div>
                    </div>}
                <form className="field-element">
                    <label htmlFor="employee-skills" className="field-element-label">
                        <div>{formFields.skills}</div>
                    </label>
                    <div className="field-element-input">
                        <input id="employee-skills" value={skill} onChange={(event) => setSkill(event.target.value)} className="input-field-skills" type="text" />
                        <button disabled={skill.length <= 0} onClick={updateNewSkills} className="add-icon-field">
                            <img className="add-icon" src={add_icon} />
                        </button>
                        <div>{`${skills}`}</div>
                    </div>
                </form>

                <div className="field-element">
                    <div className="field-element-label">
                        <div>{formFields.dob}</div>
                    </div>
                    <div className="field-element-input">
                        <DatePicker value={defaultDate} onChange={date => setDefaultDate(date)} />
                    </div>
                </div>
            </div>
            <ButtonComponent text={buttonText.addEmployee} active={buttonActiveState} clickFunction={updateEmployeeDataInStore} />
        </div>
    );
}

export default EmployeeDetailsForm;