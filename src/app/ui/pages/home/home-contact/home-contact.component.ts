import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ParamPostContact } from 'src/app/api/params/contact-param';
import { ApiContactService } from 'src/app/api/repo/api-contact.service';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { DialogProgressComponent } from 'src/app/ui/common/progress/dialog-progress/dialog-progress.component';
import { DialogModelProgress } from 'src/app/ui/common/progress/model';
import { DialogSuccessComponent } from 'src/app/ui/common/success/dialog-success/dialog-success.component';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-contact',
  templateUrl: './home-contact.component.html',
  styleUrls: ['./home-contact.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class HomeContactComponent implements OnInit {


  mDialogSuccessRef?: MatDialogRef<DialogSuccessComponent, any>;
  mDialogProgressRef?: MatDialogRef<DialogProgressComponent, any>;

  _mFormGroup: FormGroup;

  _mInProgress = false;

  private _revealObserver: IntersectionObserver | null = null;
  mOnceAnimated = false;

  _mTriggerAnim?= 'false';

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  @ViewChild("formDirective", { static: true }) private formDirective?: NgForm;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private apiContactService: ApiContactService,
    private formBuilder: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    public dialog: MatDialog) {

    this._mFormGroup = this.formBuilder.group({
      // purpose: [''],
      name: ['', Validators.required],
      email: ['', Validators.email],
      details: ['', Validators.required],
    });

  }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
    // this.openSuccess()
  }

  ngOnDestroy(): void {
    this._revealObserver?.disconnect();
  }

  /* ******************************************************************************
   *                                        Form
   */

  _onSubmit(): void {
    this._mInProgress = true;
 
    this.openProgress();
    const value = this._mFormGroup.getRawValue();
    // value.fromUrl = this.previousRoute;
    // value.source = "Thedroid";
    // console.log("onSubmit Contact: ", value);
    setTimeout(() => {
      // console.log("sd");
      
      this.recaptchaV3Service.execute("importantAction").subscribe(token => {
        this._resolvedCaptcha(token, value);
        // this.addContact(value);
      });
    }, 100);
  }

  _resolvedCaptcha(token: string, value: ParamPostContact) {
    let time = new Date().valueOf();

    console.log("time1: ", time);
    value.token= token;

    if (token) {
   
      time = new Date().valueOf();
      // console.log("time2: ", time);
      console.log("value from resolved:", token);
      this.addContact(value);
      
    } else {
      this.closeProgress();
    }
    // console.log("captcha: ", $event);
  }

  addContact(data: ParamPostContact) {
    
    this.apiContactService.add(data).subscribe({
      next :  (res: ParamPostContact) => {
          // console.log("contact res is: ", res);
          // if (res) {
          //   this.snackBar.open("Contact query successfully send!", null, {
          //     duration: 4000
          //   });
          // }
          this.resetForm();
          this.closeProgress();
          this.openSuccess();
        },

      error: (error) => {
        console.error(error);
        // this.snackBar.open(error.message, null, { duration: 4000 });
        this.closeProgress();
      },
    }
    );
  }


  resetForm(): void {
    this._mFormGroup.reset();
    this.formDirective?.resetForm();
    // const buildRequirements = (<FormArray>(
    //   this._mFormGroup.get("buildRequirements")
    // )) as FormArray;
    // buildRequirements.clear();
   

    // this._mInputLabelImage = null;
    // this.updateLabelActive();
    // this._mModel.txt = null;
    // this.downloadableURL = '';
  }



  /* ***************************************************************************
   *                                  other parts
   */


  public setupAnimation() {
    if (!this.vAnimRefView) return;

    this._revealObserver = UiUtilsView.observeReveal(this.vAnimRefView, () => {
      if (this.mOnceAnimated) return;
      this._ngZone.run(() => {
        this.mOnceAnimated = true;
        this._mTriggerAnim = 'true';
        this.cdr.detectChanges();
      });
    });
  }

  /***************************************************************************************************************
   * 											Progress
   */

  /***************************************************************************************************************
   * 											Progress
   */

  openProgress() {
    this._mInProgress = true;
    let alert: DialogModelProgress = new DialogModelProgress(
      "Sending...",
      "",
      undefined,
      undefined
    );

    this.mDialogProgressRef = this.dialog.open(DialogProgressComponent, {
      data: alert,
      disableClose: true
    });
  }

  closeProgress() {
    this._mInProgress = false;
    if (this.mDialogProgressRef) this.mDialogProgressRef.close();
  }

  openSuccess() {

    this.mDialogSuccessRef = this.dialog.open(DialogSuccessComponent, {
      data: {},
      disableClose: false
    });
    setTimeout(() => {
      this.closeSuccess()


    }, 4000);
  }

  closeSuccess() {
    if (this.mDialogSuccessRef) this.mDialogSuccessRef.close();
  }

}
