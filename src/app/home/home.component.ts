import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FirebaseService } from '../service/firebase-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  words: any[];
  constructor(db: AngularFireDatabase, private router: Router,private firebaseService: FirebaseService) {}
  ngOnInit() {
    this.firebaseService.getWordList().subscribe(items => {
      this.words = items;
      //console.log(this.words);
    });
  }


  delWord(data) {
    this.firebaseService.removeWord(data.key);
  }

  editWord(data) {
    this.router.navigate([`/editWord/${data.key}`]);
  }

}
