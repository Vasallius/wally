export const load = async () => {
  return {
    monthlySummary: await fetch('http://127.0.0.1:3002/dashboards/dashboardCards/getMonthlySummary', {
    method: "GET"
  }).then(res => res.json())
  .then(data => {
    return data
  }),
  wallets: await fetch('http://127.0.0.1:3002/dashboards/dashboardCards/getWallets', {
    method: "GET"
  }).then(res => res.json())
  .then(data => {
    return data
  }),
  records: await fetch('http://127.0.0.1:3002/dashboards/dashboardCards/getAllRecords', {
    method: "GET"
  }).then(res => res.json())
  .then(data => {
    return data
  }),
  }
}