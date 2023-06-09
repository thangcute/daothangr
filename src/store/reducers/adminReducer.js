import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allClinics: [],
  allRequiredDoctorInfo: [],
  allSpecialties: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILDED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILDED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILDED:
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILDED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.dataDr;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILDED:
      state.allDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
      state.allRequiredDoctorInfo = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILDED:
      state.allRequiredDoctorInfo = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
      state.allSpecialties = action.dataSP;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_SPECIALTY_FAILDED:
      state.allSpecialties = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
      state.allClinics = action.dataCL;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CLINIC_FAILDED:
      state.allClinics = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
