import {
  BRANCH_TOGGLE_MODAL,
  BRANCH_GET_LIST,
  BRANCH_GET_LIST_SUCCESS,
  BRANCH_GET_LIST_ERROR,
  BRANCH_ADD_ITEM,
  BRANCH_ADD_ITEM_SUCCESS,
  BRANCH_ADD_ITEM_ERROR,
  BRANCH_UPDATE_ITEM,
  BRANCH_UPDATE_ITEM_SUCCESS,
  BRANCH_UPDATE_ITEM_ERROR,
  BRANCH_DELETE_ITEM,
  BRANCH_DELETE_ITEM_SUCCESS,
  BRANCH_DELETE_ITEM_ERROR,
  BRANCH_CHANGE_TYPE_MODAL,
  BRANCH_COUNTRY_GET_LIST,
  BRANCH_COUNTRY_GET_LIST_SUCCESS,
  BRANCH_COUNTRY_GET_LIST_ERROR,
  BRANCH_CITY_GET_LIST,
  BRANCH_CITY_GET_LIST_SUCCESS,
  BRANCH_CITY_GET_LIST_ERROR,
  BRANCH_DISTRICT_GET_LIST,
  BRANCH_DISTRICT_GET_LIST_SUCCESS,
  BRANCH_DISTRICT_GET_LIST_ERROR,
  BRANCH_WARD_GET_LIST,
  BRANCH_WARD_GET_LIST_SUCCESS,
  BRANCH_WARD_GET_LIST_ERROR,
  HUB_BRANCH_GET_LIST,
  HUB_BRANCH_GET_LIST_SUCCESS,
  HUB_BRANCH_GET_LIST_ERROR,

} from '../../../constants/actionTypes';

export const toggleBranchModal = (type, data) => ({
  type: BRANCH_TOGGLE_MODAL,
  payload: { type, data }
})

export const changeTypeBranchModal = (type) => ({
  type: BRANCH_CHANGE_TYPE_MODAL,
  payload: type
})

export const getBranchList = (params) => ({
  type: BRANCH_GET_LIST,
  payload: { params }
});

export const getBranchListSuccess = (items, total) => ({
  type: BRANCH_GET_LIST_SUCCESS,
  payload: { items, total }
});

export const getBranchListError = (error) => ({
  type: BRANCH_GET_LIST_ERROR,
  payload: error
});

export const addBranchItem = (item) => ({
  type: BRANCH_ADD_ITEM,
  payload: { item }
});

export const addBranchItemSuccess = () => ({
  type: BRANCH_ADD_ITEM_SUCCESS,
});

export const addBranchItemError = (error) => ({
  type: BRANCH_ADD_ITEM_ERROR,
  payload: error
});

export const updateBranchItem = (item) => ({
  type: BRANCH_UPDATE_ITEM,
  payload: { item }
});

export const updateBranchItemSuccess = () => ({
  type: BRANCH_UPDATE_ITEM_SUCCESS,
});

export const updateBranchItemError = (error) => ({
  type: BRANCH_UPDATE_ITEM_ERROR,
  payload: error
});

export const deleteBranchItem = (ids) => ({
  type: BRANCH_DELETE_ITEM,
  payload: { ids }
});

export const deleteBranchItemSuccess = () => ({
  type: BRANCH_DELETE_ITEM_SUCCESS,
});

export const deleteBranchItemError = (error) => ({
  type: BRANCH_DELETE_ITEM_ERROR,
  payload: error
});

export const getCountryBranchList = (params, types) => ({
  type: BRANCH_COUNTRY_GET_LIST,
  payload: { params, types }
});

export const getCountryBranchListSuccess = (countries) => ({
  type: BRANCH_COUNTRY_GET_LIST_SUCCESS,
  payload: { countries }
});

export const getCountryBranchListError = (error) => ({
  type: BRANCH_COUNTRY_GET_LIST_ERROR,
  payload: error
});

export const getCityBranchList = (params, types) => ({
  type: BRANCH_CITY_GET_LIST,
  payload: { params, types }
});

export const getCityBranchListSuccess = (cities, types) => ({
  type: BRANCH_CITY_GET_LIST_SUCCESS,
  payload: { cities, types }
});

export const getCityBranchListError = (error) => ({
  type: BRANCH_CITY_GET_LIST_ERROR,
  payload: error
});

export const getDistrictBranchList = (params, types) => ({
  type: BRANCH_DISTRICT_GET_LIST,
  payload: { params, types }
});

export const getDistrictBranchListSuccess = (districts, types) => ({
  type: BRANCH_DISTRICT_GET_LIST_SUCCESS,
  payload: { districts, types }
});

export const getDistrictBranchListError = (error) => ({
  type: BRANCH_DISTRICT_GET_LIST_ERROR,
  payload: error
});

export const getWardBranchList = (params, types) => ({
  type: BRANCH_WARD_GET_LIST,
  payload: { params, types }
});

export const getWardBranchListSuccess = (wards, types) => ({
  type: BRANCH_WARD_GET_LIST_SUCCESS,
  payload: { wards, types }
});

export const getWardBranchListError = (error) => ({
  type: BRANCH_WARD_GET_LIST_ERROR,
  payload: error
});

export const getHubBranchList = (params, types) => ({
  type: HUB_BRANCH_GET_LIST,
  payload: { params, types }
});

export const getHubBranchListSuccess = (hubs) => ({
  type: HUB_BRANCH_GET_LIST_SUCCESS,
  payload: { hubs }
});

export const getHubBranchListError = (error) => ({
  type: HUB_BRANCH_GET_LIST_ERROR,
  payload: error
});
