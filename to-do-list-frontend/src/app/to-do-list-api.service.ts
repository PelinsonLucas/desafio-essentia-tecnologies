import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ToDoListAPIService {

  // Define the api parameters
  private apiUrl = 'http://localhost:3000/toDoItem';
  private headers = {
    'Access-Control-Allow-Origin': '*'
  };

  constructor() { }

  // Get all the items in the task list
  getToDoList() {
    return axios.get(this.apiUrl+"/all", 
    { headers: this.headers
    });
  }

  // Create a new task on the list
  createToDoItem(item: any) {
    return axios.post(this.apiUrl, item,  { headers: this.headers });
  }

  // Update a task on the list
  updateItem(item: any) {
    return axios.put(this.apiUrl+"/"+item.id, item,  { headers: this.headers });
  }

  // Delete a task from the list
  deleteItem(item: any) {
      return axios.delete(this.apiUrl+"/"+item.id, { headers: this.headers });
  }
}
