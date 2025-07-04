
import { Component, Input } from '@angular/core';
import { LucideAngularModule,Search } from 'lucide-angular';
import { FormsModule } from '@angular/forms'; 

const icons = Search;
@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Search';
  @Input() hidden: boolean = false;
  @Input() icon: string = 'search'; // Nombre del icono en minúsculas
  value: string = '';
}
