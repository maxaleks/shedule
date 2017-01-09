import http from '../../utils/http';

const initState = {
    faculties: [],
    showManagePopup: false,
};

export function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_FACULTIES': {
            return { ...state, faculties: action.payload };
        }
        case 'OPEN_FACULTIES_POPUP': {
            return { ...state, showManagePopup: true };
        }
        case 'CLOSE_FACULTIES_POPUP': {
            return { ...state, showManagePopup: false };
        }
        default:
            return state;
    }
}

export function loadFaculties() {
    return (dispatch, getState) => {
        const id = getState().router.params.universityId;
        return http.post(`http://www.schedulea.h1n.ru/universities/admin/faculties/${id}`).then(data => {
            dispatch({ type: 'SET_FACULTIES', payload: data.data });
        }, data => {
        });
    };
}

export function addFaculty(name) {
    return (dispatch, getState) => {
        const idUniversity = getState().router.params.universityId;
        return http.post('http://www.schedulea.h1n.ru/universities/admin/addFaculty', { name, idUniversity }).then(data => {
            dispatch(loadFaculties());
        }, data => {
        });
    };
}

export function openManagePopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'OPEN_FACULTIES_POPUP' });
    };
}

export function closeManagePopup() {
    return (dispatch, getState) => {
        dispatch({ type: 'CLOSE_FACULTIES_POPUP' });
    };
}
