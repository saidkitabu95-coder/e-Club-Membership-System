async function loadStudents(){


try{


const response = await fetch(
"http://127.0.0.1:8000/api/students/"
);



const students = await response.json();



let html = "";



students.forEach(student=>{


html += `

<div class="card">


<h3>
${student.full_name}
</h3>


<p>
Email:
${student.email}
</p>


<p>
Year:
${student.year_of_study}
</p>


</div>


`;


});



document.getElementById(
"studentsContainer"
).innerHTML = html;



}

catch(error){


console.log(error);


document.getElementById(
"studentsContainer"
).innerHTML =
"Failed to load students";


}



}



loadStudents();