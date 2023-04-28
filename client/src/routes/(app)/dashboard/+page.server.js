/* eslint-disable no-unused-vars */
// @ts-nocheck
import { userID } from '../../../stores/stores.js';

export const actions = {
  default: async ({request}) => {
    const formData = await request.formData();
    console.log(formData);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = {email, password}
    const loginRequest = await fetch("http://127.0.0.1:3002/users/login", {
      method: "POST",
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(data => {
        if(data[0]){
          userID.set(data[1]);
        }
      })
    
    // console.log(loginRequest);
  }
}