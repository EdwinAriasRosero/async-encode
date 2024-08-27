import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Base64ConverterService } from './conversion.service';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  form: FormGroup;
  convertedText = signal<string[]>([]);
  inProgress = signal(false);
  convertSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    public base64ConverterService: Base64ConverterService) {

    this.form = this.fb.group({
      inputText: ['', [Validators.required]],
    });

    this.form.get("inputText")?.valueChanges.subscribe(value => {
      if (!value) {
        this.convertedText.set([]);
      }
    })
  }

  convertInput() {
    if (this.inProgress()) {
      this.convertSubscription?.unsubscribe();
      this.inProgress.set(false);
      this.form.get("inputText")?.enable();
      
    } else {
      this.inProgress.set(true);
      this.form.get("inputText")?.disable();

      this.convertSubscription = this.base64ConverterService.startConversionBuffer(this.form.value.inputText)
        .subscribe({
          next: data => this.convertedText.set(data),
          complete: () => {
            this.inProgress.set(false);
            this.form.get("inputText")?.enable();
          },

        });
    }
  }
}
