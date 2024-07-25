import { Component, OnInit, NgZone } from '@angular/core';
import {
  ModalController,
  NavParams,
  ToastController,
  AlertController,
} from '@ionic/angular';
// import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
// import { VideoEditor, CreateThumbnailOptions } from '@ionic-native/video-editor/ngx';
import * as $ from 'jquery';
import { Constants } from '../app-routing.module';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.page.html',
  styleUrls: ['./new-message.page.scss'],
})
export class NewMessagePage implements OnInit {
  isfinished = false;
  thumbnail: any;

  /* v_options: StreamingVideoOptions = {
    successCallback: () => { this.videoEnded(); },
    errorCallback: (e) => { this.streamError(); },
    shouldAutoClose: true,
    controls: true
  }; */
  isStream: any = true;
  selectedVideo: any;
  user: any;
  userType: any;
  isRead: any = false;

  uploadedFiles = [];
  txtMsg: any;

  constructor(
    public modalCtrl: ModalController /* private streamingMedia: StreamingMedia, */,
    private navParams: NavParams /* private videoEditor: VideoEditor, */,
    public toastCtrl: ToastController,
    private zone: NgZone,
    private router: Router,
    public alertCtrl: AlertController,
    public ApiProvider: ApiService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.user = this.navParams.get('user');
    this.userType = this.navParams.get('type');

    this.selectedVideo = this.user.message_info.video_file;

    if (this.selectedVideo) {
      const filename = this.selectedVideo.substr(
        this.selectedVideo.lastIndexOf('/') + 1
      );
      const lastfilename = filename.substr(filename.length - 5);
      if (lastfilename.includes('.mp4')) {
        this.isStream = false;
      }
    }

    const modal = $('.new-message-modal');

    if (!this.selectedVideo) {
      modal.attr('style', '--height: 15rem !important');
    }

    if (this.user.message_info.message_text) {
      let pattern = /<br>/;
      let uploads = {};

      if (
        pattern.test(this.user.message_info.message_text) ||
        this.user.message_info.message_text.charAt(5) === '/'
      ) {
        if (this.user.message_info.message_text.charAt(5) === '/') {
          this.txtMsg = '';
          const textv2 = this.user.message_info.message_text.split(',');
          textv2.pop();
          textv2.forEach((x: any, index: any) => {
            uploads = {
              fileName: 'Attachment ' + (index + 1),
              url: 'https://visitchecklist-assets.s3.amazonaws.com/' + x,
            };
            // this.uploadedFiles.push(uploads ||)
          });
        } else {
          this.txtMsg = this.user.message_info.message_text.substring(
            0,
            this.user.message_info.message_text.indexOf('<br>')
          );
          const textv1 = this.user.message_info.message_text.split('<br>');
          textv1.shift();
          const textv2 = textv1[0].split(',');
          textv2.pop();
          textv2.forEach((x: any, index: any) => {
            uploads = {
              fileName: 'Attachment ' + (index + 1),
              url: 'https://visitchecklist-assets.s3.amazonaws.com/' + x,
            };
            // this.uploadedFiles.push(uploads)
          });
        }
      } else {
        this.txtMsg = this.user.message_info.message_text;
      }
    }

    if (!this.user.message_info.message_text) {
      modal.attr('style', '--height: 25rem !important');
      if (!this.isStream) {
        modal.attr('style', '--height: 30rem !important');
      }
    }

    if (this.uploadedFiles.length > 0) {
      modal.attr('style', '--height: 26rem !important');
    }

    if (
      this.user.message_info.message_type === 'text' &&
      !this.user.message_info.is_viewed &&
      this.userType === Constants.USER_TYPES.PATIENT
    ) {
      const ref_ = this;
      setTimeout(function () {
        ref_.read();
      }, 2000);
    }
  }

  async streamError() {
    const toast = await this.toastCtrl.create({
      message: 'cant streaming this video, Please try again',
      duration: 1500,
      position: 'bottom',
    });
    toast.present();
    this.isStream = false;
  }

  async deleteMsg() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Message',
      message: 'Are you sure you want to delete this message?',
      buttons: [
        { text: 'No' },
        {
          text: 'Yes',
          handler: () => {
            this.startProgress(true);
            this.ApiProvider.getResponse(
              Constants.METHODS.DELETE,
              `delete-patient-message/${this.user.message_info.id}`,
              Constants.CONTENT_TYPES.APPLICATION_JSON,
              {}
            ).subscribe(
              (data) => {
                this.startProgress(false);
                this.dismissC(true);
              },
              async (error) => {
                this.startProgress(false);
                const toast = await this.toastCtrl.create({
                  message: 'Internal Server error, Please Try again',
                  duration: 1500,
                  position: 'bottom',
                });
                toast.present();
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  dismissC(val: any) {
    if (this.isRead) {
      val = true;
    }
    const para = { isdelete: val };
    this.modalCtrl.dismiss(para);
  }

  videoEnded() {
    if (this.userType === Constants.USER_TYPES.PATIENT) {
      const ref_ = this;
      setTimeout(function () {
        ref_.read();
      }, 1000);
    }
  }

  async read() {
    this.startProgress(true);
    this.ApiProvider.getResponse(
      Constants.METHODS.PUT,
      `view-patient-message/${this.user.message_info.id}`,
      Constants.CONTENT_TYPES.APPLICATION_JSON,
      {}
    ).subscribe(
      (data) => {
        this.user.message_info.is_viewed = true;
        this.isRead = true;
        this.startProgress(false);
        this.zone.run(() => {
          console.log('force update the screen');
        });
      },
      async (error) => {
        this.startProgress(false);
        const toast = await this.toastCtrl.create({
          message: 'Internal Server error, Please Try again',
          duration: 1500,
          position: 'bottom',
        });
        toast.present();
      }
    );
  }

  play() {
    // this.streamingMedia.playVideo(this.selectedVideo, this.v_options);
  }

  startProgress(isStart: boolean) {
    // Update the progress start logic according to your needs
  }

  async download(url: string) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const base64 = await this.convertBlobToBase64(blob);

      await Filesystem.writeFile({
        path: 'downloaded_file', // Provide a proper path here
        data: base64 as string,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      const toast = await this.toastCtrl.create({
        message: 'File downloaded successfully',
        duration: 1500,
        position: 'bottom',
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Error downloading file',
        duration: 1500,
        position: 'bottom',
      });
      toast.present();
    }
  }

  private convertBlobToBase64(
    blob: Blob
  ): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }
}
