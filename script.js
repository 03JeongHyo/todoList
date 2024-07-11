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
let filterList = [];
let mode='all-div'

addButton.addEventListener("click",addTask);
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)});
}



function addTask() {
    if (taskInput.value.trim() === "") {
        alert("할일을 입력해주세요.");
        return;
    }
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    taskInput.value = "";
    console.log(taskList);
    render();
}



function render(){
    if(mode === "all-div"){
        list = taskList;
    }else if(mode === "on-div" || mode === "done-div"){
        list = filterList;
    }

    let resultHTML = "";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
           resultHTML+=`<div class="task task-completed">
            <div class ="task-done">${list[i].taskContent}</div>
            <div>
                <button class="button-check" onclick="toggleComplete('${list[i].id}')">
                    <i class="fa-solid fa-rotate-left" style="color: #ffffff;"></i>
                </button> 
                <button class="button-delete" onclick="deleteTask('${list[i].id}')">
                    <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                </button>
            </div>
        </div>`;
        }else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button class="button-check" onclick="toggleComplete('${list[i].id}')">
                    <i class="fa-solid fa-check" style="color: #ffffff;"></i>
                </button>

                <button class="button-delete" onclick="deleteTask('${list[i].id}')">
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
    filterList = filterList.filter(item => item.id !== id);
    render();
}

let taskElement = document.getElementById(id);
if (taskElement.classList.contains('task-completed')) {
    taskElement.classList.remove('task-completed');
} else {
    taskElement.classList.add('task-completed');
}

function filter(event){
    mode = event.target.id;
    filterList = [];
    if(mode === "all-div"){
        document.getElementById("under-line").style.left = "12px";
        render();
    }else if(mode === "on-div"){
        document.getElementById("under-line").style.left = "82px";
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();
        console.log("진행중",filterList);
    }else if(mode === "done-div"){
        document.getElementById("under-line").style.left = "155px";
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}