import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getAllSpecialtys,
  editSpecialtyService,
  getAllClinics,
  editClinicService,
} from "../../services/userService";

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log(error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new user success!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.log(error);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAIDED,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.success("fetch all user error!");
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      toast.success("fetch all user error!");
      dispatch(fetchAllUserFailed());
      console.log(error);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILDED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete user success!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.success("Delete user error!");
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.success("Delete user error!");
      dispatch(deleteUserFailed());
      console.log(error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAIDED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update user success!");
        dispatch(updateUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.success("Update user error!");
        dispatch(updateUserFailed());
      }
    } catch (error) {
      toast.success("Update user error!");
      dispatch(updateUserFailed());
      console.log(error);
    }
  };
};

export const updateUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const updateUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAIDED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("10");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
      });
    }
  };
};
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,
      });
    }
  };
};
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("save info detail doctor success!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("save info detail doctor error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
        });
      }
    } catch (error) {
      toast.error("save info detail doctor error!");
      console.log(error);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
      });
    }
  };
};
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
      });
    }
  };
};
export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START,
      });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialtys("ALL");
      let resClinic = await getAllClinics("ALL");
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.specialties.errCode === 0 &&
        resClinic &&
        resClinic.clinics.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.specialties.data,
          resClinic: resClinic.clinics.data,
        };
        dispatch(fetchRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInfoFailed());
      }
    } catch (error) {
      dispatch(fetchRequiredDoctorInfoFailed());
      console.log(error);
    }
  };
};

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILDED,
});

export const fetchAllSpecialty = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllSpecialtys("ALL");
      console.log("check res: ", res.specialties.data);
      if (res && res.specialties.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
          dataSP: res.specialties.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_SPECIALTY_FAILDED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALL_SPECIALTY_FAILDED,
      });
    }
  };
};

export const UpdateSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editSpecialtyService(data);
      if (res && res.errCode === 0) {
        toast.success("save info specialty success!");
        dispatch({
          type: actionTypes.EDIT_SPECIALTY_SUCCESS,
        });
      } else {
        toast.error("save info specialty error!");
        dispatch({
          type: actionTypes.EDIT_SPECIALTY_FAIDED,
        });
      }
    } catch (error) {
      toast.error("save info specialty error!");
      console.log(error);
      dispatch({
        type: actionTypes.EDIT_SPECIALTY_FAIDED,
      });
    }
  };
};

export const fetchAllClinic = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllClinics("ALL");
      console.log("check res: ", res.clinics.data);
      if (res && res.clinics.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
          dataCL: res.clinics.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_CLINIC_FAILDED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALL_CLINIC_FAILDED,
      });
    }
  };
};

export const UpdateClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editClinicService(data);
      if (res && res.errCode === 0) {
        toast.success("save info clinic success!");
        dispatch({
          type: actionTypes.EDIT_CLINIC_SUCCESS,
        });
      } else {
        toast.error("save info clinic error!");
        dispatch({
          type: actionTypes.EDIT_CLINIC_FAIDED,
        });
      }
    } catch (error) {
      toast.error("save info clinic error!");
      console.log(error);
      dispatch({
        type: actionTypes.EDIT_CLINIC_FAIDED,
      });
    }
  };
};
