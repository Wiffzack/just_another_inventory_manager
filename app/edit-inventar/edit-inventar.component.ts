import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component'; 
import axios from 'axios';
@Component({
  selector: 'app-edit-inventar',
  templateUrl: './edit-inventar.component.html',
  styleUrl: './edit-inventar.component.css',
})
export class EditInventarComponent implements OnInit{
  state$:any;
  sub:any;
  page:any;
  xhr:any;
  current_id:number;
  input_value:any=1;
  first_input:any;
  current_value_change_selection:string;


  constructor(public route: ActivatedRoute) { 
    state$: Observable<object>;
  }

  decreaseInput(){
    this.input_value = this.input_value - 1;
  }

  increaseInput(){
    this.input_value = this.input_value + 1;
  }

  ngAfterViewInit() {
    this.first_input = document.getElementById("first_popup");
  }

  PopUp() {
    this.first_input.classList.toggle('is-visible');
  }

  
  reload(){
    location.reload();
  }

  ngOnInit() {
    this.first_input = document.getElementById("first_popup");
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      console.log("passed parameter: " +params['id'])
      // Defaults to 0 if no query param provided.
      this.current_id = params['id'];
      this.page = +params['id'] || 0;
    });

    this.state$ = this.route.paramMap
      .pipe(map(() => window.history.state))
  }


  checkRequest() {
    if (this.xhr.readyState == 0) {
      //window.alert("Uninitialized");
    }
    if (this.xhr.readyState == 1) {
      //window.alert("loading");
    }
    if (this.xhr.readyState == 2) {
      //window.alert("loaded");
    }
    if (this.xhr.readyState == 3) {
      //window.alert("waiting");
    }
    if (this.xhr.readyState == 4) {
      //window.alert("completed");
      try {
        var y = JSON.parse(this.xhr.responseText);
        console.log(y)
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  send(){
    if(this.current_value_change_selection=="inc"){
      this.sendIncrease();
    }else{
      this.sendDecrease();
    }
  }

  sendIncrease(){
    const data = JSON.stringify({ 'id': this.current_id, 'number': this.input_value });
    console.log(data)
    axios.post('http://127.0.0.1:8081/increase', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  sendDecrease(){
    const data = JSON.stringify({ 'id': this.current_id, 'number': this.input_value });
    console.log(data)
    axios.post('http://127.0.0.1:8081/decrease', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  increaseValue(){
    this.current_value_change_selection ="inc"
    this.PopUp();
  }

  decreaseValue(){
    this.current_value_change_selection ="dec"
    this.PopUp();
  }

}
