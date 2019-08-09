import {
    PRI_SPECIAL_UPLOAD_REQUEST,
    PRI_SPECIAL_UPLOAD_PROGRESS,
    PRI_SPECIAL_UPLOAD_SUCCESS,
    PRI_SPECIAL_UPLOAD_FAILURE,
} from '../../../constants/actionTypes';


export const uploadRequest = (file) => ({
    type: PRI_SPECIAL_UPLOAD_REQUEST,
    payload: file,
});

export const uploadProgress = (progress) => ({
    type: PRI_SPECIAL_UPLOAD_PROGRESS,
    payload: progress,
});

export const uploadSuccess = (data) => ({
    type: PRI_SPECIAL_UPLOAD_SUCCESS,
    payload: data
});

export const uploadFailure = (err) => ({
    type: PRI_SPECIAL_UPLOAD_FAILURE,
    payload: err,
});