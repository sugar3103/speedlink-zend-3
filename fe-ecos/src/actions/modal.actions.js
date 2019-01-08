import { modalConstants } from '../constants';

export const modalActions = {
    toggle,
    open,
    close
};

function toggle() {
    return { type: modalConstants.TOGGLE };
}

function open(id) {
    return { type: modalConstants.OPEN, id };
}

function close() {
    return { type: modalConstants.CLOSE };
}