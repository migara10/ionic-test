import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import * as moment from 'moment-timezone';
import { Constants } from '../app-routing.module';
import { ModalController } from '@ionic/angular';
import { BioModelPage } from "../bio-model/bio-model.page";
import { DatePipe } from '@angular/common';

interface Payload {
  id: string | null;
  timezone: string;
  mobilenumber?: string;
}

@Component({
  selector: 'app-date-list',
  templateUrl: './date-list.page.html',
  styleUrls: ['./date-list.page.scss'],
  providers: [DatePipe],
})
export class DateListPage implements OnInit {
  isLoad = false;
  data_list: any;
  doctor: any;
  IsAnimate = false;

  constructor(
    private router: Router,
    public ApiProvider: ApiService,
    private zone: NgZone,
    public modalController: ModalController,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.getAllContents();
  }

  doRefresh(event: any) {
    this.getAllContents();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

   // shrinking header function
   logScrolling(event: any) {
    const scroll_level = 100;
    if (event.detail.scrollTop >= scroll_level) {
      $(".header-profile").addClass("shrink");
      $(".avatar-header").hide();
      setTimeout(() => {
        this.IsAnimate = true;
      }, 500);
    } else {
      if (this.IsAnimate) {
        $(".header-profile").removeClass("shrink");
        $(".avatar-header").show();
        this.IsAnimate = false;
      }
    }
  }

  goToInsurance(date: any, event: MouseEvent) {
    event.stopPropagation(); // Prevent event from bubbling up
    console.log(date);
    this.router.navigate(["insurance-data"], { queryParams: { id: date.id } });
  }

  getTypeorDate(date: any) {
    if (date.dates && date.dates[0].subcategory && date.dates[0].subcategory.name) {
      return date.dates[0].subcategory.name;
    } else {
      const d = this.datePipe.transform(date.dates[0].date, "yyyy-MM-dd");
      const dateC = moment(d, "YYYYMMDD").fromNow();
      return dateC;
    }
  }

  goToContentList(date: any) {
    if (date.contents.length == 1) {
      this.goToContent(date.contents[0]);
    } else {
      // this.startProgress(true);
      this.router.navigate(["home"], { queryParams: { id: date.id } });
    }
  }

  goToContent(content: any) {
    this.router.navigate(["content"], {
      queryParams: { content: JSON.stringify({ content, data_list: this.data_list }) },
    });
  }

  Getdate(date_: any, type: any) {
    const date = date_.dates[0].date;
    let dd;
    if (type == "d") {
      dd = this.datePipe.transform(date, "dd");
    } else if (type == "m") {
      dd = this.datePipe.transform(date, "MMM");
    } else {
      dd = Number(this.datePipe.transform(date, "yyyy"));
    }

    return dd;
  }

  ionViewWillEnter() {
    this.data_list = null;
    this.getAllContents();
    // document.documentElement.style.setProperty('--min-height', '55px');
    this.doctor = JSON.parse(localStorage.getItem(Constants.SELECTED_TENANT_OBJ) || '{}');

    /* this.events.subscribe(Constants.EVENT_REFRESH, (isrefesh) => {
      console.log("---------isrefesh", isrefesh);
      this.getAllContents();
    }); */
  }

  getAllContents() {
    const payload: Payload = {
      id: null,
      timezone: moment.tz.guess(),
    };

    this.ApiProvider.getResponse(
      Constants.METHODS.POST,
      'customercontentdetails',
      Constants.CONTENT_TYPES.APPLICATION_JSON,
      payload
    ).subscribe(
      (data) => {
        this.data_list = this.createBackColor(data);
        // this.startProgress(false);
        this.isLoad = true;

        this.zone.run(() => {
          console.log('force update the screen');
        });
      },
      async (error) => {
        console.log(error);
        // this.startProgress(false);
        /*  const toast = await this.toastCtrl.create({
          message: "Internal Server error, Please Try again",
          duration: 1500,
          position: "bottom",
        });
        toast.present(); */
      }
    );
  }

  // making button list color combination dynamically
  createBackColor(list: any) {
    const colors_list = JSON.parse(
      localStorage.getItem(Constants.PRIMARY_COLOR) || '{}'
    );
    if (list.datescontent.length == 2) {
      list.datescontent[0].back_groundcolor = colors_list.color_8;
      list.datescontent[1].back_groundcolor = colors_list.color_1;
      return list;
    } else {
      list.datescontent.forEach((prop: any, index: any) => {
        prop.back_groundcolor =
          colors_list['color_' + this.getArrayIndex(index)];
      });
      return list;
    }
  }

  getArrayIndex(index: number): number {
    // Assuming you have a function that returns an appropriate index
    return index % 10; // Example: returns a number from 0 to 9
  }

  async openModel() {
    const modal = await this.modalController.create({
      component: BioModelPage,
      componentProps: {
        title: 'Bio',
        html: '',
      },
    });
    return await modal.present();
  }

  openFMLAForm() {
    console.log('object')
    const url = "https://form.jotform.com/CWCAshburn/fmla-request-form";
    window.open(url, "_blank");
  }

  Logout() {
    // this.router.navigate(["settings"], {});
  }
}
