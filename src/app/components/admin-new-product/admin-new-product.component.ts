import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.css']
})
export class AdminNewProductComponent implements OnInit {

  beingLoaded = true
  name = ""
  surname = ""
  street = ""
  tags = new FormControl([])
  newTags = ""

  availableTags= ["jedne", "dwa", "trzy"]

  color: ThemePalette = 'primary';
   disabled: boolean = false;
   accept = "image/*"

   fileControl: FormControl

   public file: FileInput
   maxSize= 16;

   constructor() {
     this.fileControl = new FormControl(this.file, [
       Validators.required,
       MaxSizeValidator(this.maxSize * 1024)
     ])
   }

    ngOnInit() {
     this.fileControl.valueChanges.subscribe((file: any) => {
         this.file = file;
     })
   }

   onDisabledChanged(value: boolean) {
     if (!value) {
       this.fileControl.enable();
     } else {
       this.fileControl.disable();
     }
   }

   saveProduct(){
    console.log(this.file.files)
   }
 }
