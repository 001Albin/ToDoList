let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ''; // Clear the input after adding the task
        updateTasksList();
        updateProgress();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "taskItem";

        const taskDiv = document.createElement("div");
        taskDiv.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskCompletion(index));

        const taskText = document.createElement("p");
        taskText.textContent = task.text;
        taskText.style.textDecoration = task.completed ? "line-through" : "none";

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskText);
        listItem.appendChild(taskDiv);
        taskList.appendChild(listItem);
    });
};

const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateProgress();
};

const updateProgress = () => {
    const progress = document.getElementById("progress");
    const numbers = document.getElementById("numbers");
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const percentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    progress.style.width = `${percentage}%`;
    numbers.textContent = `${completedTasks}/${totalTasks}`;
};

document.getElementById("newtask").addEventListener("click", function(e) {
    e.preventDefault();
    addTask();
});

// Initial call to display an empty task list
updateTasksList();
