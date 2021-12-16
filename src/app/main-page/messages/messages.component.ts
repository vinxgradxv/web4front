import {Component} from '@angular/core';
import {InteractionService} from "../../shared/services/interaction.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  validationError: boolean = false;
  resultError: boolean = false;
  validationMessages: string[] = [];
  resultMessages: string[] = [];

  constructor(private interactionService: InteractionService) {
    this.interactionService.messages = this;
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
