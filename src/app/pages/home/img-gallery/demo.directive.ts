import { Directive ,HostListener ,ElementRef} from '@angular/core';

@Directive({
  selector: '[appDemo]'
})
export class DemoDirective {

  constructor(private el:ElementRef){}
  @HostListener('click')
  imageChange(){
    var src:any=this.el.nativeElement.src;
    var pre:any= document.getElementById("preview");
 pre.src=src;
 var imgSlide=document.getElementsByClassName("img-slide");
 for(let i=0; i<imgSlide.length;i++){
  imgSlide[i].classList.remove('active')
 }
 this.el.nativeElement.parentElement.classList.add('active')
  }

}
