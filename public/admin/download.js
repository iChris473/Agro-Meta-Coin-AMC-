
const btn = document.querySelector("button")
const select = document.querySelector("select")

let mainCsvFile = {}

const downloadFile = () => {

    btn.innerHTML = "Downloading Data..."
    
    const blob = new Blob([mainCsvFile], {type: "text/csv"});

    const URL = window.URL.createObjectURL(blob);
    const a = document.createElement("a")
    a.setAttribute("hidden", '')
    a.setAttribute("href", URL)
    a.setAttribute("download", `AMCData.csv`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a) 
    btn.innerHTML = "Download"
    
}

const GetCSV = async (value) => {

    btn.innerHTML = "Fetching Data..."
    btn.disabled = true

    fetch(`${url}/user/emails/${admin.id}?page=${value}&limit=20000`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
           token: `Bearer ${admin?.token}`
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
              return response.text().then((text) => {
                btn.innerHTML = "Download"
                return Promise.reject()
              });
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data)
          btn.style.display = 'block'
          btn.innerHTML = "Download"
          btn.disabled = false
          // const newCsvData = data.join("\n");
          const newCsvData = [];

          const headers = Object.keys(data.data[0])

          newCsvData.push(headers.join(','))

          for (const row of data.data){

            const values = headers.map(header => row[header])
            newCsvData.push(values.join(','))
            
          }

          mainCsvFile = newCsvData.join("\n")
          

          Array.from({ length: data.pages }).map((u, i) => {
            const options = document.createElement("option")
            options.className = "bg-transparent"
            options.value = i + 1
            options.innerHTML = i + 1
      
            select.appendChild(options)

          })
  
        })
        .catch(function (error) {
          btn.innerHTML = "Download"
          console.log(error)
          window.alert("An Error Occured")
        })


}

GetCSV(1)

select.addEventListener("change", GetCSV.bind(null, select.value))

btn.addEventListener("click", downloadFile)