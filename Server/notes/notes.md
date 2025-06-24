🧠 Example Comparison
🔹 Using fetch:

fetch('/api/user', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));



🔹 Using axios:

axios.post('/api/user', data)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));


## ✅ Benefits of Using Axios over fetch()

| Feature                                           | `fetch()`                             | `axios`              |
|---------------------------------------------------|---------------------------------------|----------------------|
| ✅ Automatic JSON parsing                        | ❌ (you must use `.json()`)           | ✅                  |
| ✅ Request cancellation                          | ❌ (needs `AbortController`)          | ✅ (built-in)       |
| ✅ Supports older browsers                       | ❌                                    | ✅                  |
| ✅ Built-in XSRF/CSRF protection                 | ❌                                    | ✅                  |
| ✅ Handles timeouts easily                       | ❌ (custom logic)                     | ✅                  |
| ✅ Intercept requests/responses                  | ❌                                    | ✅                  |
| ✅ Automatically send cookies (`withCredentials`) | ❌ (needs manual config)             | ✅                  |






