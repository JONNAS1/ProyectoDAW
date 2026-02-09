// src/app/ficha-item/ficha-item.ts
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ficha } from '../../models/ficha.model';

@Component({
  selector: 'app-ficha-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ficha-item.html',
  styleUrls: ['./ficha-item.scss'],
})
export class FichaItemComponent {
  @Input({ required: true }) ficha!: Ficha;
}
