
export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    let body = {email, password};
    console.log(body);
    await fetch("http://127.0.0.1:3002/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(dat => {
      if (dat !== null) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userID", dat);
      }
    });
  },
  logout: () => {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userID");
  }
};