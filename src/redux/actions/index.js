import axios from 'axios';



export const commonAPI = (url, data, method) => async () => {
  let headers = { 'Content-Type': 'application/json' };
  return await new Promise((resolve, reject) => {
    axios({ method, url, headers, data })
      .then(response => {
        if (response) {
          if (response ) {
            let responseData = response.data
            resolve(responseData);
          }
        }
      })
      .catch((error) => {
        console.log("error is ", error);
        reject(error);
      });
  })
}



export const REG = 'reg';
export const login = (body, callback) => dispatch => {
  let payload = {
    userDetails: body
  }
  dispatch({
    type: REG,
    payload
  });
}


export const REC_LISTING = 'rec_listing';
export const rec_Listing = (body, callback) => dispatch => {
  let payload = {
    newtask: body
  }
  dispatch({
    type: REC_LISTING,
    payload
  });
}



export const EDITTASK = 'edittask';
export const task_edit = (body, callback) => dispatch => {
  console.log('body', body);
  let payload = {
    newtask: body
  }
  dispatch({
    type: EDITTASK,
    payload
  });
}



