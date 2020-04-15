import { actions } from './action_strings'

export const setEmployeeState = (employeeObject) => ({
    type: actions.EMPLOYEE_STATE,
    payload: employeeObject
})

export const clearEmployeeState = () => ({
    type: actions.CLEAR_EMPLOYEE_STATE,
})