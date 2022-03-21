import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Task{
  name:string;
  isUpdated:boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {


  tasks:Task[]=[];

  constructor() {
    this.tasks=[
      {name:'task 1',isUpdated:false},
      {name:'task 2',isUpdated:false},
      {name:'task 3',isUpdated:false}
    ]
   }

  ngOnInit(): void {
  }

  handleSubmit(addForm:NgForm){
    let newTask=addForm.value.task;
    this.tasks.push({name:newTask,isUpdated: false});
    addForm.resetForm();
  }
  handleRemove(task:Task){
    //this.tasks=this.tasks.filter((myTask)=>myTask!=task);
    this.tasks=this.removeFirst(this.tasks,task);
  }
  removeFirst(arr:any[],value:any):any[]{
    let r:any[]=[];
    let removed1=false;
      arr.forEach(element => {
        if(element!=value||removed1)
          r.push(element);
        else 
          removed1=true;
      });
    return r;
  }
  handleUpdate(task:Task){
    task.isUpdated=true;
  }
  handleUpdating(text:string,task:Task){
    task.isUpdated=false;
    task.name=text;
  }

}
