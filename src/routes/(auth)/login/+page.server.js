/* eslint-disable no-unused-vars */
// @ts-nocheck
export const actions = {
  default: async ({request}) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const body = {email, password}
    const loginRequest = await fetch("http://127.0.0.1:3002/login", {
      method: "POST",
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(data => console.log(data))
    // console.log(loginRequest);
  }
}