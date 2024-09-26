
const urlBase = 'https://utn-lubnan-api-2.herokuapp.com/api';

function getData(url){
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.onload = () =>{
            if(request.readyState == 4 && request.status == 200){
                resolve(request.response);
            } else{
                reject(request.status);
            }
        }

        request.send();
        
    })
}
console.log('algoo');
/* getData('https://utn-lubnan-api-2.herokuapp.com/api/Career')
.then((response)=>{
    console.log(response)
})
.catch((resolve)=>{
    console.log('algo no salio bien ' + resolve);
})

getData('https://utn-lubnan-api-2.herokuapp.com/api/Student')
.then((response)=>{
    console.log(response)
})
.catch((resolve)=>{
    console.log('algo no salio bien ' + resolve);
}) */

async function showStudentWithCarrer (){
  
    
    var table = document.getElementById('tableStudent');
    var tbody = table.getElementsByTagName('tbody')[0];

     // esto es para borra la tabla si es que ya hay una
    if(tbody){
        tbody.remove();
    }

    var students = await getData('https://utn-lubnan-api-2.herokuapp.com/api/Student');
    var careers = await getData('https://utn-lubnan-api-2.herokuapp.com/api/Career');

    var studentOrder = orderStudentForLastName(students);
    
    table.appendChild(loadStudentFromTable(studentOrder, careers));

}



function loadStudentFromTable(student, career){


    var tbody = document.createElement('tbody');

    student.forEach((element) => {

        if(element.careerId != null){

               if(career[element.careerId-1].active == true){
                tbody.innerHTML += `
                <tr>
                 <th>${element.studentId}</th>
                 <th>${career[element.careerId-1].name}</th>
                 <th>${element.lastName}</th>
                 <th>${element.firstName}</th>
                 <th>${element.email}</th>
                 <th><button type="button" class="btn btn-danger btn-sm" onclick="deleteStudent(${element.studentId})" >Delete</button></th>
                </tr>
                `
               };
              
        }
       
    });
    return tbody;
}

showStudentWithCarrer();

function orderStudentForLastName (students){
     
    students.sort(function(a,b){
        return a.lastName.localeCompare(b.lastName);
    })

    return students;
} 

  function deleteStudent(id){

    deleteMethod('https://utn-lubnan-api-2.herokuapp.com/api/Student/' + id)
    .then((response)=>{
        var p = document.getElementById('mensagge');
        p.innerHTML = 'Studend delected'
        p.style.color = 'green';
        showStudentWithCarrer();
    })
    .catch((reason)=>{
        var p = document.getElementById('mensagge');
        p.innerHTML = 'ERROR'
        p.style.color = 'red';
    })


  }  

  function deleteMethod(url){
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('DELETE',url);
        request.onload=()=>{
            if(request.status == 200){
                resolve(request.response);
            }else{
                reject(request.status);
            }
        }
        request.send();

    })
  }