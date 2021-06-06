
class Task {
    constructor(taskTitle,taskDesc,taskDate) {
        this.title = taskTitle;
        this.desc = taskDesc;
        this.date = taskDate;
    }

    get title() {
        return this._title;
    }
    get desc() {
        return this._desc;
    }
    get date() {
        return this._date;
    }
    set title(val) {
        this._title = val;
    }
    set desc(val) {
        this._desc = val;
    }
    set date(val) {
        this._date = val;
    }
    
};



var app = new Vue({
    el : "#app",
    data : {
        title : "",
        desc : "",
        date : "",
        tasks : [
        ]
    },
    methods : {
        clearTasks() {
            this.tasks = []
        },
        addTask(title,desc,date) {
            this.tasks.push(new Task(title,desc,new Date(date)))
            this.sortTasks()
        },
        deleteTask(title) {
            this.tasks = this.tasks.filter( (ele) => {
                return ele.title !== title
            })
            this.sortTasks()
        },
        sortTasks() {
            this.tasks.sort((fir,sec)=> { 
                if(fir.date < sec.date) {
                    return -1
                }
                if(fir.date > sec.date) {
                    return 1
                }
                return 0
            })
        },
        importTasks() {
            let data = JSON.parse(localStorage.getItem("data"))
            for (task in data) {
                this.tasks.push(new Task(data[task]._title,data[task]._desc,new Date(data[task]._date)))
            }
            this.sortTasks()
        },
        saveTasks() {
            localStorage.setItem("data",JSON.stringify(this.tasks))
        }

    }
})
