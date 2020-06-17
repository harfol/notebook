import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotePageRoutingModule } from './note-routing.module';
import { File } from '@ionic-native/file/ngx';
import { NotePage } from './note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotePageRoutingModule
  ],
  providers:[
    File,
  ],
  declarations: [NotePage]
})
export class NotePageModule {}
