      // catching all html select tag elements
      let filDep = document.querySelector("#fil-depart")
      let filGen = document.querySelector("#fil-gender")
      let filSal = document.querySelector("#fil-salary")
      
      let tbody = document.querySelector("tbody")
      
      
           // async fetching function
      let getData = async (url)=>{
      
          let res = await fetch(url) 
          let data = await res.json()
          console.log(data)
          showData(data)
      }
           //function for display data on dom
      let showData = (arr)=>{
      
          let orignaldata = arr.data;
          console.log(orignaldata)
      
          orignaldata.forEach((ele,i)=>{
      
              let row =document.createElement("tr")
              row.innerHTML=`<td>${i+1}</td>
                             <td>${ele.name}</td>
                             <td>${ele.gender}</td>
                             <td>${ele.department}</td>
                             <td>${ele.salary}</td>
                            ` 
              tbody.append(row)              
          })
      
      }
      
      
      getData('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees')