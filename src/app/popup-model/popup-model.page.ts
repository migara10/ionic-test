import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-popup-model',
  templateUrl: './popup-model.page.html',
  styleUrls: ['./popup-model.page.scss'],
})
export class PopupModelPage implements OnInit {

  title: any;
  id: any;
  html_content: any;
  isStartProgress: boolean | undefined;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

}


