import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../service/firebase-service.service';



@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {
  word:any[] = ["",[""],"",[""],""]; //วันที่ล่าสุด, ความหมาย, หมายเหตุ, ประโยค, คำ
  wordRef: AngularFireList<any>;
  title: string = "เพิ่มคำ";
  id;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private router: Router, private firebaseService: FirebaseService) { }

  myCustomTrackBy(index, item) { return index; }

  addMean(){
    this.word[1].length++;
    
    console.log(this.word);
    
  }

  addWord(data) {
    console.log(this.word);
    
    /* if (this.id) {
      this.firebaseService.editWord(this.id,data.value).then(this.goToHome);
    } else {
      this.firebaseService.addWord(data.value).then(this.goToHome);
    } */
  }

  ngOnInit() {
    console.log(this.word);
    
    this.id = this.route.snapshot.paramMap.get("id");

    if (this.id) {
      this.title = "แก้ไขคำ";
      this.getWordByKey(this.id);
    }


  }

  getWordByKey(id) {
    this.firebaseService.getWord(id).subscribe(data => {
      this.word = data;
      console.log(this.word);

    }

    );
  }

  goToHome = () => {
    this.router.navigate(['/']);
  }

}
