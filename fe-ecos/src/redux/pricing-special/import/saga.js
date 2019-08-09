import axios from "axios";
import { eventChannel, END } from 'redux-saga';
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import { apiUrl, EC_SUCCESS, EC_FAILURE, EC_FAILURE_AUTHENCATION } from '../../../constants/defaultValues';
import { authHeader } from '../../../util/auth-header';
import { uploadProgress, uploadSuccess, uploadFailure } from '../../actions';
import { PRI_SPECIAL_UPLOAD_REQUEST } from '../../../constants/actionTypes';
import history from '../../../util/history';

function uploadZoneApi(file, onProgress) {
    return axios.request({
        method: 'post',
        url: `${apiUrl}pricing/special/zone/import`,
        headers: authHeader(),
        data: file,
        onUploadProgress: onProgress
    });
}

const getUploadZoneRequest = async (file, onProgress) => {
    return await uploadZoneApi(file, onProgress).then(res => res.data).catch(err => err)
};

function createUploader(payload) {
    let emit;
    const chan = eventChannel(emitter => {
        emit = emitter;
        return () => { };
    });

    const uploadPromise = getUploadZoneRequest(payload, (event) => {
        const percentage = Math.round((event.loaded * 100) / event.total)
        emit(percentage);
        if (percentage === 100) {
            emit(END);
        }
    });

    return [uploadPromise, chan];
}

function* watchOnProgress(chan) {
    while (true) {
        const progress = yield take(chan);
        yield put(uploadProgress(progress));
    }
}

function* uploadZone({ payload }) {
    const { pathname } = history.location;
    const [uploadPromise, chan] = createUploader(payload);
    yield fork(watchOnProgress, chan);

    try {
        const response = yield call(() => uploadPromise);
        switch (response.error_code) {
            case EC_SUCCESS:
                yield put(uploadSuccess(response.data));
                break;

            case EC_FAILURE:
                yield put(uploadFailure(response.data));
                break;

            case EC_FAILURE_AUTHENCATION:
                localStorage.removeItem('authUser');
                yield call(history.push, '/login', { from: pathname });
                break;
            default:
                break;
        }

    } catch (err) {
        console.log(err);
    }
}

export function* watchDestWardSpecialGetList() {
    yield takeEvery(PRI_SPECIAL_UPLOAD_REQUEST, uploadZone);
}

export default function* rootSaga() {
    yield all([
        fork(watchDestWardSpecialGetList),
    ]);
}