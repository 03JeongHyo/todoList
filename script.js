//유저가 값을 입력한다.
//+버튼을 누르면 할일에 추가된다.
//delete버튼을 누르면 할일에서 삭제된다.
//check버튼을 누르면 할일이 완료된 상태 -> 밑줄이 표시된다.
//1.check누르면 false -> true
//2.true이면 끝난걸로 간주하고, 밑줄 뜨기
//3.false이면 안 끝난걸로 간주하고 그대로 
//진행중, 끝남 칸을 누르면 언더바가 이동함
//진행중을 누르면 진행 item만 뜨고, 끝남을 누르면 끝남 item만 나온다
//전체탭을 누르면 전체 item이 뜨도록 돌아옴
//onclick 버튼이 생성되는 순간 
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
addButton.addEventListener("click",addTask);

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)});
}



function addTask() {
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
}



function render(){
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
           resultHTML+=`<div class="task task-completed">
            <div class ="task-done">${taskList[i].taskContent}</div>
            <div>
                <button class="button-check" onclick="toggleComplete('${taskList[i].id}')">
                    <i class="fa-solid fa-rotate-left" style="color: #ffffff;"></i>
                </button> 
                <button class="button-delete" onclick="deleteTask('${taskList[i].id}')">
                    <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                </button>
            </div>
        </div>`;
        }else{
            resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button class="button-check" onclick="toggleComplete('${taskList[i].id}')">
                    <i class="fa-solid fa-check" style="color: #ffffff;"></i>
                </button>

                <button class="button-delete" onclick="deleteTask('${taskList[i].id}')">
                    <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                </button>
            </div>
        </div>`;
        }
    }
        
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete=!taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}
function deleteTask(id){
    for(let i = 0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    render();   
}

let taskElement = document.getElementById(id);
if (taskElement.classList.contains('task-completed')) {
    taskElement.classList.remove('task-completed');
} else {
    taskElement.classList.add('task-completed');
}

function filter(event){
    console.log("filter", event.target);
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

