import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{

  validationError: boolean = false;
  resultError: boolean = false;
  validationMessages: string[] = [];
  resultMessages: string[] = [];

  ngOnInit() {
    this.clearMessages();
  }

  clearMessages() {
    this.resultError = false;
    this.validationError = false;
  }

  setValidationMessages(messages:Array<string>) {
    this.resultError = false;
    this.validationMessages = messages;
    this.validationError = true;
  }

  setResultMessages(messages:Array<string>) {
    this.validationError = false;
    this.resultMessages = messages;
    this.resultError = true;
  }
}
