

// const airFB = document.querySelector('.airFB');
const airTele = document.querySelector('.airTele');
const airDisc = document.querySelector('.airDisc');
const airTwi = document.querySelector('.airTwi');
const airYt = document.querySelector('.airYt');


// airFB.addEventListener("submit",  (e) => {

//   e.preventDefault()
//     const defUser = {
//         facebook: true
//     }

//     fetch(`${url}/user/update/${user._id}`, {
//       method: "PUT",
//       body: JSON.stringify(defUser),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then(function (response) {
//         if (response.ok) {
//           return response.json();
//         } else {
//             return response.text().then((text) => {
//               return Promise.reject()
//             });
//         }
//         return Promise.reject(response);
//       })
//       .then(function (data) {
//         console.log(data);
//         // window.location.href = "https://m.facebook.com/agrometaverse";
//         window.open('https://twitter.com/agro_coin', '_blank')

//       })
//       .catch(function (error) {
//         console.log(error)
//       })

// })

airTele.addEventListener("submit",  (e) => {

  e.preventDefault()
    const defUser = {
        telegram: true
    }

    fetch(`${url}/user/update/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(defUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
            return response.text().then((text) => {
              return Promise.reject()
            });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        // window.location.href = "https://t.me/+ZQAX4vzcCKRlODlk";
        window.open('https://t.me/agrometacoin', '_blank')
      })
      .catch(function (error) {
        console.log(error)
      })

})

airDisc.addEventListener("submit",  (e) => {

  e.preventDefault()
    const defUser = {
        telegram: true
    }

    fetch(`${url}/user/update/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(defUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
            return response.text().then((text) => {
              return Promise.reject()
            });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        // window.location.href = "https://t.me/+ZQAX4vzcCKRlODlk";
        window.open('https://discord.gg/jBcyeTAHjA', '_blank')
      })
      .catch(function (error) {
        console.log(error)
      })

})

airTwi.addEventListener("submit",  (e) => {

  e.preventDefault()
    const defUser = {
        twitter: true
    }

    console.log(defUser)

    fetch(`${url}/user/update/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(defUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
            return response.text().then((text) => {
              return Promise.reject()
            });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        window.open('https://twitter.com/agro_coin?t=iuG0L3qqL5p1VtEj8A7aDQ&s=08', '_blank')
        // window.location.href = "https://mobile.twitter.com/agro_meta";

      })
      .catch(function (error) {
        console.log(error)
      })

})

airYt.addEventListener("submit",  (e) => {

    e.preventDefault()
    const defUser = {
        twitter: true
    }

    console.log(defUser)

    fetch(`${url}/user/update/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(defUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
            return response.text().then((text) => {
              return Promise.reject()
            });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        window.open('https://youtube.com/channel/UCJjkmvXmprgLJWEh4v0Ecqg', '_blank')
        // window.location.href = "https://mobile.twitter.com/agro_meta";

      })
      .catch(function (error) {
        console.log(error)
      })

})
