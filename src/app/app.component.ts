import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { ServicesService } from './service/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnChanges{
  @ViewChild('name') elementref!:ElementRef
  @ViewChild('age') elementrefs!:ElementRef
  @ViewChild('class') elementref_s!:ElementRef
  p=1
  pageSize:number = 3
  namechq:boolean =false
  upd:boolean =false
  id:any
  forms !: FormGroup
  title = 'angular-june';
  list = [{'Name':"Atlas","designation":"Angular","Salary":35000},{'Name':"Globe","designation":"Fullstack","Salary":35000},{'Name':"Abegal","designation":"Angular","Salary":35000}]
  test:any=["one","two","three"]
  od:any=[]
  dd = [...this.list]
  ono = [...this.list]
  constructor(private fbbuilder:FormBuilder, private service:ServicesService){
    
  }
  ngOnInit(): void {
    console.log(this.cl(this.test),"oniti")
    this.forms = this.fbbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      game: ['', [Validators.required]],
      fame: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    })
    this.service.get().subscribe((data:any) =>{
      for(let i=0;i<data.length;i++){
        this.list.push(data[i])
      }
      
    })
    this.dd = this.list
    console.log(this.list,this.dd,"chioqwh")
    this.loadData()
    
  }
  loadData(): void {
    this.service.get().subscribe((data: any) => {
      this.list =[...this.ono,...data];
      console.log(data,this.ono)
      this.dd = [...this.list];
    });
  }

  cnl(data:any){
    data.name.value = ""
    data.age.value = ""
    data.class.value = ""
    this.upd = false
  }
  cl(data:any){
    console.log(data)
  }
  cle(data:any){
    return "123"
  }

  // in1(data:string){
  //   this.od =[]

  //   if(data){
  //     this.list.filter((va:any)=>{
  //       let res = ""
  //       let ult =""
  //       for(let i=0;i<data.length;i++){
  //         res += data[i]
  //         ult += va.Name[i]
  //       }
  //       if(res.toLocaleLowerCase() === ult.toLocaleLowerCase() && res !== "" && ult !== ""){
  //         this.od.push(va)
  //         console.log(res,va,this.od,"234")
  //       }
  //       else{
  //         this.list = this.dd
  //         console.log(this.list,res,"11111")
          
  //       }
  
        
  //     }
  //   )
  //     if(this.od){
  //       this.list = this.od
  //     }
  //     else{
  //       this.list = this.dd
  //       console.log(this.dd)
  //     }
  //   }
  //   else{
  //     this.list = this.dd
  //   }
  // }
  // in1(data: string) {
  //   // Clear the od array before each filter operation
  //   this.od = [];

  //   if (data) {
  //     this.list.forEach((va: any) => {
  //       let res = va.Name.substring(0, data.length);
  //       if (res.toLocaleLowerCase() === data.toLocaleLowerCase()) {
  //         this.od.push(va);
  //         console.log(res, va, this.od, "234");
  //       }
  //     });

  //     // Update the list based on the filtered results
  //     if (this.od.length > 0) {
  //       this.list = this.od;
  //     } else {
  //       this.list = this.dd;
  //       console.log(this.dd);
  //     }
  //   } else {
  //     this.list = this.dd;
  //   }
  // }
  in1(data: string) {
    // Always start filtering from the original list (dd)
    if (data) {
      this.list = this.dd.filter((va: any) => {
        // Check if the Name starts with the entered data
        return va.Name.toLowerCase().startsWith(data.toLowerCase())
      }
    );
      
      if(this.list.length === 0){

        this.list = this.dd
      }
    } else{
      this.list = this.dd; // Reset to original list when input is empty
    }
    this.p = 1
  }
  chqed(data:any){
    this.elementref.nativeElement.value = data.Name
    this.elementrefs.nativeElement.value = data.Salary
    this.elementref_s.nativeElement.value = data.designation
    console.log(data)
    this.id = data.id
    this.upd = true    
  }
  upn(data:any){
    console.log(data.name.value)
    this.service.put({'Name':data.name.value,'Salary':data.age.value,'designation':data.class.value},this.id)?.subscribe(()=>{
      this.loadData()
    })
    data.name.value = ""
    data.age.value = ""
    data.class.value = ""
    this.upd = false
    // console.log(data,"oigofgwoehfof")

  }
  calfn(data:any){
    if(data.name.value ==""){
      this.namechq = true
      alert("name has to be enter")
      return
    }
    console.log(this.list.push({'Name':data.name.value,'Salary':data.age.value,'designation':data.class.value}))
    this.namechq = false
    this.service.post({'Name':data.name.value,'Salary':data.age.value,'designation':data.class.value}).subscribe(()=>{
      this.loadData()
    })
    data.name.value = ""
    data.age.value = ""
    data.class.value = ""
    console.log(this.list)

  }
  onSubmit(data:NgForm){
    console.log(data.value)
    data.reset()
  }
  onSubmits(data:FormGroup){
    console.log(data.value)
    if (data.valid) {
      console.log('Form Submitted', data.value);
    } else {
      console.log('Form Invalid', data.errors);
      alert("fill it correctly")
      return
    }
    data.reset()
  }
  del(data:any){
    this.service.delete(data.id).subscribe(()=>{
      this.loadData()
    })
  }
  
  ngOnChanges(): void {
    console.log(this.test)
    
  }
  
}


