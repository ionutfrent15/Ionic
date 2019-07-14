import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  matches: string[];
  isRecording = false;
  constructor(private speechRecognition: SpeechRecognition,
              private plt: Platform,
              private cd: ChangeDetectorRef) {

  }

  isIos() {
    return this.plt.is('ios');
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }

  getPermission() {
    this.speechRecognition.hasPermission()
        .then((hasPermission: boolean) => {
          if (!hasPermission) {
            this.speechRecognition.requestPermission();
          }
        });
  }

  startListening() {
    const options = {
      language: 'en-US'
    };
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  // isAvailable() {
  //   this.speechRecognition.isRecognitionAvailable()
  //       .then((available: boolean) => console.log(available));
  // }
  //
  //
  // startListening() {
  //   const options = {
  //
  //   };
  //   this.speechRecognition.startListening(options)
  //       .subscribe(
  //           (matches: string[]) => console.log(matches),
  //           (onerror) => console.log('error:', onerror)
  //       );
  // }
  //
  //
  // stopListening() {
  //   this.speechRecognition.stopListening();
  // }
  //
  // getSupportedLanguages() {
  //   this.speechRecognition.getSupportedLanguages()
  //       .then(
  //           (languages: string[]) => console.log(languages),
  //           (error) => console.log(error)
  //       );
  // }
  //
  // hasPermission() {
  //   this.speechRecognition.hasPermission()
  //       .then((hasPermission: boolean) => console.log(hasPermission));
  // }
  //
  // requestPermission() {
  //   this.speechRecognition.requestPermission()
  //       .then(
  //           () => console.log('Granted'),
  //           () => console.log('Denied')
  //       );
  // }

  ngOnInit(): void {
  }
}
