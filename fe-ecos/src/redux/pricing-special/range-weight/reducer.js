import {
  PRI_SPECIAL_RANGE_WEIGHT_ERROR,

  PRI_SPECIAL_RANGE_WEIGHT_GET_LIST,
  PRI_SPECIAL_RANGE_WEIGHT_GET_LIST_SUCCESS,

  PRI_SPECIAL_RANGE_WEIGHT_ADD_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_ADD_ITEM_SUCCESS,

  PRI_SPECIAL_RANGE_WEIGHT_REQUEST_UPDATE_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_REQUEST_UPDATE_ITEM_SUCCESS,

  PRI_SPECIAL_RANGE_WEIGHT_UPDATE_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_UPDATE_ITEM_SUCCESS,

  PRI_SPECIAL_RANGE_WEIGHT_DELETE_ITEM,
  PRI_SPECIAL_RANGE_WEIGHT_DELETE_ITEM_SUCCESS,

  PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_REQUEST,
  PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_PROGRESS,
  PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_SUCCESS,
  PRI_SPECIAL_RANGE_WEIGHT_RESET_DATA_IMPORT,
  PRI_SPECIAL_RANGE_WEIGHT_GET_DATA_IMPORT,
  PRI_SPECIAL_RANGE_WEIGHT_GET_DATA_IMPORT_SUCCESS,
  PRI_SPECIAL_RANGE_WEIGHT_SAVE_DATA_IMPORT,
  PRI_SPECIAL_RANGE_WEIGHT_SAVE_DATA_IMPORT_SUCCESS
} from '../../../constants/actionTypes';

const INIT_STATE = {
  errors: null,
  loading: false,
  items: [],
  itemEditting: {},
  total: 0,
  paramSearch: null,
  uploading: false,
  progress: 0,
  dataImport: [],
  totalImport: 0,
  loadingDataImport: false,
  savingDataImport: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRI_SPECIAL_RANGE_WEIGHT_ERROR:
      return {
        ...state,
        savingDataImport: false,
        errors: action.payload
      };

    case PRI_SPECIAL_RANGE_WEIGHT_GET_LIST:
      const { params } = action.payload;
      return {
        ...state,
        loading: true,
        paramSearch: (params && params.query) ? params.query : null
      };

    case PRI_SPECIAL_RANGE_WEIGHT_GET_LIST_SUCCESS:
      const { items, total } = action.payload;
      return {
        ...state,
        loading: false,
        items,
        total
      };

    case PRI_SPECIAL_RANGE_WEIGHT_REQUEST_UPDATE_ITEM:
      return {
        ...state,
        loading: true
      };

    case PRI_SPECIAL_RANGE_WEIGHT_REQUEST_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        itemEditting: action.payload
      };

    case PRI_SPECIAL_RANGE_WEIGHT_ADD_ITEM:
      return {
        ...state,
        loading: false
      };

    case PRI_SPECIAL_RANGE_WEIGHT_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case PRI_SPECIAL_RANGE_WEIGHT_UPDATE_ITEM:
      return {
        ...state,
        loading: false
      };

    case PRI_SPECIAL_RANGE_WEIGHT_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null
      };

    case PRI_SPECIAL_RANGE_WEIGHT_DELETE_ITEM:
      return {
        ...state,
        loading: false
      };

    case PRI_SPECIAL_RANGE_WEIGHT_DELETE_ITEM_SUCCESS:
      return {
        ...state,
      };

    case PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_REQUEST:
      return {
        ...state,
        uploading: true,
        progress: 0,
        errors: null,
        loadingDataImport: true
      };

    case PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_PROGRESS:
      return {
        ...state,
        uploading: true,
        progress: action.payload
      };

    case PRI_SPECIAL_RANGE_WEIGHT_UPLOAD_SUCCESS:
      const { dataImport, totalImport } = action.payload;
      return {
        ...state,
        uploading: false,
        dataImport,
        totalImport,
        progress: 0,
        errors: null,
        loadingDataImport: false
      };

    case PRI_SPECIAL_RANGE_WEIGHT_RESET_DATA_IMPORT:
      return {
        ...state,
        uploading: false,
        progress: 0,
        dataImport: [],
        totalImport: 0,
        loadingDataImport: false,
        savingDataImport: false
      };

    case PRI_SPECIAL_RANGE_WEIGHT_GET_DATA_IMPORT:
      return {
        ...state,
        loadingDataImport: true,
      };

    case PRI_SPECIAL_RANGE_WEIGHT_GET_DATA_IMPORT_SUCCESS:
      const { dataImportGet, totalImportGet } = action.payload;
      return {
        ...state,
        loadingDataImport: false,
        dataImport: dataImportGet,
        totalImport: totalImportGet
      };

    case PRI_SPECIAL_RANGE_WEIGHT_SAVE_DATA_IMPORT:
      return {
        ...state,
        savingDataImport: true
      }
    case PRI_SPECIAL_RANGE_WEIGHT_SAVE_DATA_IMPORT_SUCCESS:
      return {
        ...state,
        savingDataImport: false,
        error: null
      }

    default:
      return { ...state };
  }
}
