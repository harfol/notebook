import { Component, OnInit } from '@angular/core';
import { Note } from '../../types/note';
import { File } from '@ionic-native/file/ngx';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  note: Note = {
    title: '',
    subtitle: '',
    content: ''
  }
  dataDir:string =this.file.externalDataDirectory;
  constructor(
    private file: File,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.note.title = params["title"] ?? '';
      this.note.subtitle = params["subtitle"] ?? '';
      this.note.content = params["content"] ?? '';
    });
  }

  saveNote(){
    this.note.subtitle = new Date().toString();
    var fileName = "notes/"+this.note.title.replace(' ', '')+".txt";
    this.file.checkDir(this.dataDir, "notes")
    .then(value => {
      var raw = this.note.subtitle+"\r\n" + this.note.title + "\r\n" + this.note.content;
      var blob  = new Blob([raw], { type: 'text/plain' });
      this.file.writeFile(this.dataDir, fileName, blob, {replace: true, append: false})
      .then(value => {
        this.router.navigate(['/cover']); 
      })
    })
    .catch(err => {
      this.file.createDir(this.dataDir, "notes", true);
    });
  }
}
