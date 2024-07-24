import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Constants } from '../app-routing.module';
import * as $ from 'jquery';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-bio-model',
  templateUrl: './bio-model.page.html',
  styleUrls: ['./bio-model.page.scss'],
})
export class BioModelPage implements OnInit {
  title: any;
  html_content: any;
  isStartProgress: any;
  constructor(public ApiProvider: ApiService, private modalController: ModalController,  private navParams: NavParams) {
    $(document).ready(() => {
      var iframeBody = $('#my-iframe').contents().find('body');

      //center loading spinner
      iframeBody.css('display', 'flex');
      iframeBody.css('align-items', 'center');
      iframeBody.css('justify-content', 'center');
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    // this.startProgress(true);
    this.ApiProvider.getResponse(
      Constants.METHODS.GET,
      'bio/',
      Constants.CONTENT_TYPES.APPLICATION_JSON,
      {}
    ).subscribe(
      (data) => {
        // this.html_content = 'https://app.visitchecklist.com/media/doctors/bio/1604001474/bio/index.html'
        if (data.bio_details) {
          this.html_content = data.bio_details;
        } else {
          this.html_content =
            'https://hawa.visitchecklist.com/media/www/1567883582925/index/index.html';
        }
        if ($('#my-iframe').attr('data-loaded') == 'false') {
          $('#my-iframe').attr(
            'src',
            this.html_content + '?timestamp=' + new Date().getTime()
          );
          //testing purpose
          // $('#my-iframe').attr('src', '../../assets/checklist.html' + '?timestamp=' + new Date().getTime())
          $('#my-iframe').attr('data-loaded', 'true');
          $('#my-iframe').on('load', () => {
            console.log('iframe is completely loaded');
            $('#myloader').css('display', 'none');
          });
        }
        this.startProgress(false);
      },
      (error) => {
        this.startProgress(false);
      }
    );
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  startProgress(isStart: boolean) {
    this.isStartProgress = isStart;
  }

  ionViewWillEnter() {
    this.title = this.navParams.get('title');
    // this.html_content = JSON.parse(localStorage.getItem(Constants.SELECTED_TENANT_OBJ)).bio
  }
}
