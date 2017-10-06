class Task
{

    constructor(name, assignee = null) {
        this.name = name;
        this.assignee = assignee;
    }


    render() {
        return this.assignee !== null ? `${this.name} • ${this.assignee}` : this.name;
    }
}

class List
{

    constructor(listName) {
        this.name = listName;
        this.tasks = [];
    }


    addTask(task) {
        this.tasks.push(task);

        return this;
    }


    removeTask(taskName) {
        let task = null;

        for (let item of this.tasks) {
            if (taskName === item.name) {
                task = item;
                this.tasks.splice(this.tasks.indexOf(task, 1));

                break;
            }
        }

        return task;
    }


    render() {
        let renderString = `|------------------\n| ${this.name}\n|------------------\n`;

        for (let i in this.tasks) {
            renderString += `|${i}> ${this.tasks[i].render()}\n`;
        }

        return renderString;
    }


    findTask(taskName) {
        let index = -1;

        for (let i in this.tasks) {
            if (this.tasks[i].name === taskName) {
                index = i; break;
            }
        }

        return index;
    }
}

class Board
{

    constructor(boardName) {
        this.name = boardName;
        this.lists = [];
    }


    addList(list) {
        this.lists.push(list);

        return this;
    }


    removeList(listName) {
        let list = null;

        for (let item of this.lists) {
            if (listName === item.name) {
                list = item;
                this.lists.splice(this.lists.indexOf(list), 1);

                break;
            }
        }

        return list;
    }


    render() {
        let renderString = `*******************\n* ${this.name} *\n*******************\n`;

        for (let item of this.lists) {
            renderString += item.render();
        }

        return renderString;
    }


    moveTaskTo(taskName, fromList, toList) {
        let fromExists = this.findList(fromList);
        let toExists = this.findList(toList);

        if (fromExists > -1 && toExists > -1) {
            let taskExists = this.lists[fromExists].findTask(taskName);

            if (taskExists > -1) {
                let task = this.lists[fromExists].tasks[taskExists];
                this.lists[fromExists].tasks.splice(taskExists, 1);
                this.lists[toExists].tasks.push(task);
            }
        }
    }


    findList(listName) {
        let index = -1;

        for (let i in this.lists) {
            if (this.lists[i].name === listName) {
                index = i; break;
            }
        }

        return index;
    }
}

// Tasks
const myTask = new Task('Clean dishes');
const myTaskWithAssignee = new Task('Wash clothes', 'You');

console.log(myTask.render());
console.log(myTaskWithAssignee.render());


// Lists
const toDoList = new List('To Do');
toDoList
    .addTask(new Task('Laundry', 'You'))
    .addTask(new Task('Buy Apples'))
    .addTask(new Task('Pay Phone Bill', 'Me'))
    .addTask(new Task('Remove Me!'));

console.log(toDoList.render());
toDoList.removeTask('Remove Me!');
console.log(toDoList.render());


// Boards
const doingList = new List('Doing')
    .addTask(new Task('Laundry'))
    .addTask(new Task('Study JavaScript', 'Jill'))
    .addTask(new Task('Study HTML', 'Jill'))
    .addTask(new Task('Study Ruby', 'Me'));

const doneList = new List('Done')
    .addTask(new Task('Laundry'))
    .addTask(new Task('Ruby Exercises Homework'));

const myBoard = new Board('My Board')
    .addList(toDoList)
    .addList(doingList)
    .addList(doneList);

myBoard.addList(new List('Remove Me!'));
console.log(myBoard.render());
myBoard.removeList('Remove Me!');
console.log(myBoard.render());

myBoard.moveTaskTo('Laundry', 'To Do', 'Doing');
myBoard.moveTaskTo('Buy Apples', 'To Do', 'Doing');
console.log(myBoard.render());
