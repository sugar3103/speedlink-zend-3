import {
    PRI_SPECIAL_UPLOAD_REQUEST,
    PRI_SPECIAL_UPLOAD_PROGRESS,
    PRI_SPECIAL_UPLOAD_SUCCESS,
    PRI_SPECIAL_UPLOAD_FAILURE,
} from '../../../constants/actionTypes';

const INIT_STATE = {
    errors: null,
    uploading: false,
    progress: 0,
    data: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case PRI_SPECIAL_UPLOAD_REQUEST:
            return {
                ...state,
                uploading: true,
                errors: null
            };

        case PRI_SPECIAL_UPLOAD_PROGRESS:
            return {
                ...state,
                uploading: true,
                progress: action.payload
            };

        case PRI_SPECIAL_UPLOAD_SUCCESS:
            return {
                ...state,
                uploading: false,
                data: action.payload,
                errors: null
            };

        case PRI_SPECIAL_UPLOAD_FAILURE:
            return {
                ...state,
                uploading: false,
                errors: action.payload
            };
        default:
            return { ...state };
    }
}
