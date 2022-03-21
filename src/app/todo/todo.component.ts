import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  tasks:string[]=[];

  constructor() {
    this.tasks=[
      "task 1",
      "task 2",
      "task 3",
    ]
   }

  ngOnInit(): void {
  }

  handleSubmit(addForm:NgForm){
    let newTask=addForm.value.task;
    this.tasks.push(newTask);
    addForm.resetForm();
  }
  handleRemove(task:string){
    //this.tasks=this.tasks.filter((myTask)=>myTask!=task);
    this.tasks=this.removeFirst(this.tasks,task);
  }
  removeFirst(arr:string[],value:string):string[]{
    let r:string[]=[];
    let removed1=false;
      arr.forEach(element => {
        if(element!=value||removed1)
          r.push(element);
        else 
          removed1=true;
      });
    return r;
  }

}
