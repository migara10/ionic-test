import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { ApiService } from '../api.service';
import { Constants } from '../app-routing.module';
import * as $ from 'jquery';
import {
  NgxOtpInputComponent,
  NgxOtpInputComponentOptions,
  NgxOtpStatus,
} from 'ngx-otp-input';
import { ModalController } from '@ionic/angular';
import { PopupModelPage } from '../popup-model/popup-model.page';
import { Router } from '@angular/router';

interface PhoneNumber {
  number: string;
  internationalNumber: string;
  nationalNumber: string;
  e164Number: string;
  countryCode: string;
  dialCode: string;
}

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
  @ViewChild('ngxOtpInput') ngxOtpInput!: NgxOtpInputComponent;
  otpStatusEnum = NgxOtpStatus;
  showNgxOtpInput = true;
  otpOptions: NgxOtpInputComponentOptions = {
    otpLength: 4,
    autoFocus: true,
    autoBlur: true,
    hideInputValues: false,
    showBlinkingCursor: true,
    regexp: /^[0-9]+$/,
    ariaLabels: ['a', 'b', 'c', 'd', 'e', 'f'],
  };
  regexp = '^[0-9]+$';
  ariaLabels = '';
  disabled = false;
  otpChangeValue = '-';
  otpCompleteValue = '-';

  selectedNumber: String | undefined;
  currentElement: any;
  element_: any;
  firstname: any;
  btnDisabled: boolean = true;
  isSentOpt: boolean = false;
  dataSet: any;

  constructor(
    public ApiProvider: ApiService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {}

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });

  AgreementCheck(event: any) {
    this.btnDisabled = !event.currentTarget.checked;
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: PopupModelPage,
    });
    return await modal.present();
  }

  async openModel(title: string, id: any) {
    const modal = await this.modalController.create({
      component: PopupModelPage,
      componentProps: {
        title: title,
        id: id,
      },
    });
    return await modal.present();
  }

  onOtpChange(otp: string[]) {
    const hasValue = otp.some((value) => value !== '');
    if (hasValue) {
      this.otpChangeValue = otp.join(', ');
    } else {
      this.otpChangeValue = '-';
      this.otpCompleteValue = '-';
    }
  }

  onOtpComplete(otp: string) {
    this.otpCompleteValue = otp;
    console.log(this.otpCompleteValue, 'okk');
    this.VerifyOTP(this.otpCompleteValue);
  }
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.UnitedStates, CountryISO.Canada];
  }

  async SendOTP() {
    const phoneControl = this.phoneForm.controls['phone'];
    const phoneValue = phoneControl.value as unknown as PhoneNumber;
    this.isSentOpt = true;

    if (!phoneControl.errors) {
      console.log(phoneValue.number, 'working');
      this.selectedNumber = phoneValue.number;
      this.SendOTPtoNumber();
    } else {
      console.log('not valid number');
    }
  }

  SendOTPtoNumber() {
    const para = { mobilenumber: this.selectedNumber };

    if (this.selectedNumber === '+94770000000') {
      this.ApiProvider.useLocalServer();
    } else {
      this.ApiProvider.useLiveServer();
    }

    this.ApiProvider.getResponse(
      Constants.METHODS.POST,
      'verification/send',
      Constants.CONTENT_TYPES.APPLICATION_JSON,
      para
    ).subscribe(
      (data) => {
        this.firstname = null;
        console.log(data, 'user data');
      },
      async (error) => {
        console.log(error, 'error');
      }
    );
  }

  VerifyOTP(code: any) {
    const para = {
      mobilenumber: this.selectedNumber,
      code: code,
      firstname: this.firstname,
      deviceid: localStorage.getItem(Constants.DEV_TOKEN),
    };
    this.ApiProvider.getResponse(
      Constants.METHODS.POST,
      'verification/check',
      Constants.CONTENT_TYPES.APPLICATION_JSON,
      para
    ).subscribe(
      (data) => {
        localStorage.setItem(Constants.ACCESS_TOKEN, data.access_token);
      localStorage.setItem(Constants.REFRESH_TOKEN, data.refresh_token);
      localStorage.setItem(Constants.USER_TP_NUMBER, String(this.selectedNumber));
      localStorage.setItem(Constants.SELECTED_USER_NAME, String(this.firstname));
      localStorage.setItem(Constants.USER_FIRST_NAME, data.user.first_name);
      localStorage.setItem(Constants.USER_TYPE, data.user_type);
      localStorage.setItem(Constants.PIN_OBJ, data.pincode ? JSON.stringify(data.pincode) : '');

        this.dataSet = data;
        if (this.dataSet.clients.length === 1) {
          const doctor = this.dataSet.clients[0];
          this.router.navigate(['start-screen'], {
            queryParams: { doctor: JSON.stringify(doctor) },
          });
        } else {
          this.router.navigate(['select-doctor'], {
            queryParams: { doctor: JSON.stringify(data.clients) },
          });
        }
      },
      async (error) => {
        console.log(error);
        this.resetForm();
      }
    );
  }

  resetForm() {
    this.ngxOtpInput.reset();
  }
}

/*   getCodeBoxElement(index: any | null) {
    return document.getElementById('codeBox' + index);
  }

  onFocusEvent(index: any) {
    for (let item = 1; item < index; item++) {
      this.currentElement = this.getCodeBoxElement(item);
    }
  }

  onKeyUpEvent(index: number, event: any) {
    const eventCode = event.which || event.keyCode;

    this.element_ = this.getCodeBoxElement(index);
    if (this.element_.value.length >= 1) {
      if (this.element_.value.length > 1) {
        this.element_.value = this.element_.value.charAt(0);
      }
      if (index !== 4) {
        this.getCodeBoxElement(index + 1).focus();
        $('#codeBox' + (index + 1))
          .focus()
          .select();
      } else {
        let code = '';
        for (let item = 1; item <= 4; item++) {
          this.element_ = this.getCodeBoxElement(item);
          code += '' + this.element_.value;
        }
        this.VerifyOTP(code);
      }
    }

    let isnn = false;
    if (eventCode === 0 || eventCode === 229) {
      isnn = isNaN(
        this.element_.value.charCodeAt(this.element_.value.length - 1)
      );
    }
    if ((eventCode === 8 || isnn) && index !== 1) {
      this.getCodeBoxElement(index - 1).focus();
      $('#codeBox' + (index - 1))
        .focus()
        .select();
    }
  } */
