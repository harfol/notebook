import { Component, OnInit, OnDestroy } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Note } from '../../types/note'
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.page.html',
  styleUrls: ['./cover.page.scss'],
})
export class CoverPage implements OnDestroy {
  notes: Note[] = [];
  dataDir:string = this.file.externalDataDirectory;
  navigationSubscription;

  constructor(private file:File, private router: Router) { 
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.notes = [];
        this.file.checkDir(this.dataDir, "notes")
        .then(value => {
          this.file.listDir(this.dataDir, "notes")
          .then(fileEntry => {
            (fileEntry).forEach( (entry) => {
              this.file.readAsText(this.dataDir, "notes/"+entry.name)
              .then(raw => {
                var des = raw.split("\r\n");
                var note: Note = {
                  subtitle: des[0],
                  title: des[1],
                  content: des[2]
                }
                this.notes.push(note);
              });
            })
          });
        });
      }
    });
  }      
  
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
    
  onClick(path: string, note: Note = {title: '',subtitle: '',content: ''} ): void{
    this.router.navigate([path], {
      queryParams: {
        title: note.title,
        subtitle: note.subtitle,
        content: note.content
      }
    }); 
  }

  onDelete(note: Note){
  var fileName = "notes/"+note.title+".txt";
    this.file.removeFile(this.dataDir, fileName)
    .then(value => {
      this.notes = this.notes.filter(n => n.title !== note.title);
    });
  }
}