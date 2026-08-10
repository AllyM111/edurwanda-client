import api from "./api";


// ======================================
// GET SETTINGS
// ======================================

export const getSettings = async () => {

  const response = await api.get(
    "/settings"
  );

  return response.data;

};





// ======================================
// UPDATE SETTINGS
// ======================================

export const updateSettings = async (
  settingsData
) => {


  const response =
    await api.put(
      "/settings",
      settingsData
    );


  return response.data;


};





// ======================================
// UPLOAD LOGO
// ======================================

export const uploadLogo = async (
  file
) => {


  const formData =
    new FormData();


  formData.append(
    "logo",
    file
  );


  const response =
    await api.post(
      "/settings/logo",
      formData,
      {
        headers:{
          "Content-Type":
          "multipart/form-data",
        },
      }
    );


  return response.data;


};






// ======================================
// UPLOAD FAVICON
// ======================================

export const uploadFavicon = async (
  file
) => {


  const formData =
    new FormData();


  formData.append(
    "favicon",
    file
  );


  const response =
    await api.post(
      "/settings/favicon",
      formData,
      {
        headers:{
          "Content-Type":
          "multipart/form-data",
        },
      }
    );


  return response.data;


};