import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';
import { FileInput } from 'ngx-material-file-input';
import { ProductService } from 'src/app/services/product.service';
import { productData, tag } from 'src/app/interfaces';

@Component({
  selector: 'app-admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.css']
})
export class AdminNewProductComponent implements OnInit {

  beingLoaded = true
  name = ""
  quantity = ""
  price = ""
  tags = new FormControl([])
  newTags = ""
  description = ""

  availableTags : Array<string> = []

  color: ThemePalette = 'primary';
   disabled: boolean = false;
   accept = "image/*"

   fileControl: FormControl

   public file: FileInput
   maxSize= 16;

   constructor(private productsService: ProductService) {
     this.fileControl = new FormControl(this.file, [
       Validators.required,
       MaxSizeValidator(this.maxSize * 1024)
     ])
   }

    ngOnInit() {
     this.fileControl.valueChanges.subscribe((file: any) => {
         this.file = file;
     })

     this.productsService.getAllTags().subscribe(res => {
       console.log(res)
       this.availableTags = res.map(t => t.tag.name)       
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
    const file =this.file.files[0]

    const formData = new FormData()
    formData.append('file', file)
    const tags : Array<string> = this.tags.value

    const productData = {
      name: this.name,
      price: this.price,
      description: this.description,
      quantity: this.quantity,
      tags: tags.concat(this.newTags.split(' ')),
    }

    this.productsService.uploadProduct(productData, formData).then(
      res => {
        console.log(res)
      }
    )

   }
 }
