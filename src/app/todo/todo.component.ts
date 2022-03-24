import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Task{
  name:string;
  isUpdated:boolean;
  isVisible:boolean;
}
enum SortOptions{
  Ascending="asc",
  Descending="dsc",
  None="none"
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {

  SortEnum=SortOptions;
  tasks:Task[]=[];
  sortState=SortOptions.None;
  LastButtonClicked:any=null;
  readonly TASK_KEY='tasks';

  constructor() {
    
   }

  ngOnInit(): void {
    let tasksJSON=localStorage.getItem(this.TASK_KEY);
    if(tasksJSON!=null)
    this.tasks=JSON.parse(tasksJSON);
    this.handleSearch('');
  }

  handleSubmit(addForm:NgForm){
    let newTask=addForm.value.task;
    this.tasks.push({name:newTask,isUpdated: false,isVisible:true});
    addForm.resetForm();
    let button:any=document.getElementById("searchTB");
    this.handleSearch(button.value);
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
  handleSort(sortD:SortOptions, button:HTMLButtonElement){
    if(button==this.LastButtonClicked)
      {
        button.style.backgroundColor="";
        this.sortState=SortOptions.None;
        return;
      }
    if(this.LastButtonClicked!=null){
      this.LastButtonClicked.style.backgroundColor="";
    }
    if(button!=this.LastButtonClicked)
      this.LastButtonClicked=button;

    button.style.backgroundColor="green";
    
    this.sortState=sortD;
    switch (sortD) {
      case SortOptions.Ascending:
        this.tasks=this.tasks.sort((a,b)=>{
          let aLower=a.name.toLowerCase();
          let bLower=b.name.toLowerCase();

          if(aLower<bLower)
            return -1;
          if(aLower>bLower)
            return 1;
          return 0;
        });
        break;
      case SortOptions.Descending:
        this.tasks=this.tasks.sort((a,b)=>{
          let aLower=a.name.toLowerCase();
          let bLower=b.name.toLowerCase();

          if(aLower>bLower)
            return -1;
          if(aLower<bLower)
            return 1;
          return 0;
        });
        break;
        case SortOptions.None:

      default: //SortOptions.None
        break;
    }

  }
  handleSearch(text:string){
    this.tasks.map((task)=>{
      task.isVisible=(task.name.includes(text));
    });
  }
  handleSave():void{
    localStorage.setItem(this.TASK_KEY,JSON.stringify(this.tasks));
  }

}
