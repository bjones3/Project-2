/*This is where the center of the game where all the game actions happen.
This is sequentially what happens after the gameGeneration.js
In this file, the frame by frame is controlled and student object is kept track of.*/

function gameStart(student){

  let studentModifications = [];

/*---------------------Player Controlled Button Listeners--------------------*/
  document.getElementById("smallCommitMH").addEventListener("click", () =>
  {studentModifications.push(new commitment("small", "MH", student))});
  document.getElementById("smallCommitPH").addEventListener("click", () =>
  {studentModifications.push(new commitment("small", "PH", student))});
  document.getElementById("smallCommitSleep").addEventListener("click", () =>
  {studentModifications.push(new commitment("small", "sleep", student))});
  document.getElementById("smallCommitSocial").addEventListener("click", () =>
  {studentModifications.push(new commitment("small", "social", student))});
  document.getElementById("smallCommitStudy").addEventListener("click", () =>
  {studentModifications.push(new commitment("small", "study", student))});

  document.getElementById("mediumCommitMH").addEventListener("click", () =>
  {studentModifications.push(new commitment("medium", "MH", student));});
  document.getElementById("mediumCommitPH").addEventListener("click", () =>
  {studentModifications.push(new commitment("medium", "PH", student));});
  document.getElementById("mediumCommitSleep").addEventListener("click", () =>
  {studentModifications.push(new commitment("medium", "sleep", student));});
  document.getElementById("mediumCommitSocial").addEventListener("click", () =>
  {studentModifications.push(new commitment("medium", "social", student));});
  document.getElementById("mediumCommitStudy").addEventListener("click", () =>
  {studentModifications.push(new commitment("medium", "study", student));});

  document.getElementById("bigCommitMH").addEventListener("click", () =>
  {studentModifications.push(new commitment("big", "MH", student));});
  document.getElementById("bigCommitPH").addEventListener("click", () =>
  {studentModifications.push(new commitment("big", "MH", student));});
  document.getElementById("bigCommitSleep").addEventListener("click", () =>
  {studentModifications.push(new commitment("big", "MH", student));});
  document.getElementById("bigCommitSocial").addEventListener("click", () =>
  {studentModifications.push(new commitment("big", "MH", student));});
  document.getElementById("bigCommitStudy").addEventListener("click", () =>
  {studentModifications.push(new commitment("big", "MH", student));});
/*----------------------------------------------------------------------------*/


  for(let i = 0; i<75; i++)
  {
    for(let j = 0; j<5; j++)
    {
      wait(1000);
      frameEvent(studentModifications, student);
    }
    if(getRandomInt(100)==42)
    {
      studentModifications.push(new lifeEvent(student));
    }
    console.log(studentModifications.length + " " + i);
    console.log(student);
  }



}

function wait(ms)
{
  //I didn't use setTimeout or setInterval because it did not work properly
  //Therefore I went this round about way
  let d = new Date();
  let d2 = null;
  do { d2 = new Date(); }
  while(d2-d < ms);
}

function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

/*
Pre: The student object in the game will be pased to get its stats updated.
Post: All the functions in studentModifications[] get executed and adjusted.
Param: Student object
*/
function frameEvent(studentModifications, student){

console.log(studentModifications);

  for(let i = 0; i<studentModifications.length; i++)
  {
    if(studentModifications[i] == "commitment")
    {
      console.log('commit');
      if(studentModifications[i].length == 0)
      {
        studentModifications.splice(i,1);
        console.log("success");
        //TODO: Find a replacement for splice
      }
      else
      {
        studentModifications[i].fulfill();
      }
    }
    else if(studentModifications[i].modType == "adversaries")
    {
      //console.log('adver');
      if(studentModifications[i].location == 1)
      {
        debugger;
        studentModifications[i].modifyStudent;
        studentModifications.splice(i,1);
        console.log("success");

      }
      else if(studentModifications[i].deterioration <= 0)
      {
        debugger;
        studentModifications.splice(i, 1);
      }
      else
      {
        studentModifications[i].moveNextBlock();
        //updateAdvesaryPosition([i]);
      }
    }
    else if(studentModifications[i].modType == "lifeEvent")
    {
      console.log('life');
      if(studentModifications[i].length == 0)
      {
        studentModifications.splice(i,1);
        console.log("success");

        student.modifyStudent(10, "willpower");
      }
      else
      {
        studentModifications[i].modifyStudent();
      }
    }
  }


  if(student.type == "Engineering Student")
  {
    studentModifications.push(new adversaries(student));
  }
  else
  {
    if(getRandomInt(4)==1)
    {
      studentModifications.push(new adversaries(student));
    }
  }



}

function announceGrade(student){
  alert("Congratulations! You ended the semester with a " + student.grade);
}
