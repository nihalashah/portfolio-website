import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expertise-item',
  templateUrl: './expertise-item.component.html',
  styleUrls: ['./expertise-item.component.scss']
})
export class ExpertiseItemComponent implements OnInit {


  @Input('jobType') set jobType(data: String){
    if(data){
      this._mJobType = data;
    }
  };

  // @Input() parts: String[] = [];

  @Input('parts') set parts(data: String[]) {
    if (data && data.length>0) {
      this._mParts = data.join(" | ")
      // this._mIsFullWidth = this._mModel.isWebApp

      // this._setGradient(this._mModel.colors)
      // this._mMeta = data.meta      
    }
  }

  @Input('isColored') set isColored(data: boolean) {
    if (data ==true) {
      this._mIsColored = data 
    }
  }
  @Input('descriptions') set descriptions(data: String[]) { // New input for descriptions
    if (data && data.length > 0) {
      this._mDescriptions = data;
    }
  }
  _mParts: String  = ""
  _mJobType: String = ""
  _mIsColored: boolean = false
  _mDescriptions: String[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
