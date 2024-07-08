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
//obclick 버튼이 생성되는 순간 
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click",addTask);

function addTask(){
    let task = {
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    console.log(taskList)
    render();

}

function render(){
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++){
        resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button>check</button> 
            <button>delete</button>
        </div>
    </div>`;
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}
