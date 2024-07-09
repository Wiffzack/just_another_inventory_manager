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
  constructor(public route: ActivatedRoute) { 
    state$: Observable<object>;
  }

  ngOnInit() {
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      console.log("passed parameter: " +params['url'])
      // Defaults to 0 if no query param provided.
      this.current_id = params['serviceId'];
      this.page = +params['serviceId'] || 0;
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
  
  increaseValue(){
    const data = JSON.stringify({ 'id': this.current_id, 'number': "12" });
    axios.post('http://127.0.0.1:8081/decrease', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });


  }

  decreaseValue1(){
      const data = JSON.stringify({ 'id': this.current_id, 'number': "12" });
      axios.post('http://127.0.0.1:8081/decrease', data)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  
  }



  async decreaseValue() {
    const data = JSON.stringify({ "username": "user", "token": "12345" });
    this.xhr = new XMLHttpRequest();
    //this.xhr.withCredentials = true;
    this.xhr.onreadystatechange = this.checkRequest.bind(this);
    this.xhr.open("GET", "http://127.0.0.1:8081/decrease?id=1&number=2");
    this.xhr.setRequestHeader("Content-Type", "application/json");
    this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    this.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    this.xhr.send(data);

  }

}
