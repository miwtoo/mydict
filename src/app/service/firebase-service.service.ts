import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  wordList: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.wordList = db.list('dictionary');
  }

  getWordList(): Observable<any[]> {
    return this.wordList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
  }
  

  getWord(id): Observable<any> {
     var wordRef = this.db.list('dictionary' + '/' + id);
     return wordRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => (c.payload.val() ))
      )
    )
  }

  addWord(data) {
    return this.wordList.push(data);
  }
  editWord(id, data) {
    return this.wordList.update(id, data);
  }
  removeWord(id): void {
    this.wordList.remove(id);
  }
}
