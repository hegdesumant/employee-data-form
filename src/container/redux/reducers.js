import { createStore } from 'redux'
import { actions } from './action_strings'

const initialState = {
    employeeDetails: []
}

const appRedcers = (state, { type, payload }) => {
    switch (type) {
        case actions.EMPLOYEE_STATE: return {
            ...state,
            employeeDetails: [...state.employeeDetails, payload]

        }
        case actions.CLEAR_EMPLOYEE_STATE: return {
            ...state,
            employeeDetails: []

        }
        default: return {
            ...state
        }
    }
}

export const store = createStore(appRedcers, initialState)