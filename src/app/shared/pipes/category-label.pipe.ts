import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'categoryLabel', standalone: true })
export class CategoryLabelPipe implements PipeTransform {
  private map: Record<string, string> = {
    'english-willow': 'English Willow',
    'kashmir-willow': 'Kashmir Willow',
    'tennis-ball': 'Tennis Ball',
    'junior': 'Junior',
    'limited-edition': 'Limited Edition',
    'accessories': 'Accessories',
    'professional': 'Professional',
    'leather-ball': 'Leather Ball',
  };
  transform(value: string): string {
    return this.map[value] || value;
  }
}
