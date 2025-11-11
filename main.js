const inputtask = document.querySelector('.inputtask');
const addbtn = document.querySelector('.addbtn');
const taskContainer = document.querySelector('.tasks-container');

let tasks = [];

addbtn.addEventListener('click', () => {
    const tasktext = inputtask.value.trim();
    if (tasktext !== "") {
        tasks.push({ description: tasktext, completed: false });
        inputtask.value = "";
        tasks.sort((a,b) =>Number(a.completed)-Number(b.completed))
        RenderTask();
    }
})

function RenderTask() {
    taskContainer.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskEl = document.createElement('div');
        taskEl.className = 'task-item';

        const textEl = document.createElement('span');
        textEl.className = 'task-text';
        textEl.textContent = task.description;

        const checkEl = document.createElement('input');
        checkEl.type = 'checkbox';
        checkEl.className = 'checkbtn';
        checkEl.checked = task.completed;

        checkEl.addEventListener('change', () => {
            task.completed = !task.completed;
            tasks.sort((a, b) => Number(a.completed) - (b.completed));
            RenderTask();
        })

        const deleteEl = document.createElement('button');
        deleteEl.className = 'deletebtn';

        deleteEl.innerHTML = '<i class="fas fa-trash-alt"></i>';

        deleteEl.addEventListener('click', () => {
            tasks.splice(index, 1);
            RenderTask();
        });


        if (task.completed) {
            taskEl.style.textDecoration = "line-through";
            taskEl.style.opacity = "0.6";
        }
        taskContainer.appendChild(taskEl);
        taskEl.appendChild(textEl);
        taskEl.prepend(checkEl);
        taskEl.appendChild(deleteEl);
    })
}
