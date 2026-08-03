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
    'popular-willow': 'Popular Willow Bat',
    'rainy-season': 'Rainy Season Bat',
    'bat-covers': 'Bat Covers',
    'tennis-balls': 'Tennis Balls',
    'junior-bats': 'Junior Bats',
    'single-blade': 'Single Blade',
    'double-blade': 'Double Blade',
    'full-cane': 'Full Cane',
    'half-cane': 'Half Cane',
    'batting-gloves': 'Batting Gloves',
    'uniform': 'Uniform',
    'bat-grips': 'Bat Grips',
    'threads': 'Threads',
    'single-bat-cover': 'Single Bat Cover',
    'double-bat-cover': 'Double Bat Cover',

  };
  transform(value: string): string {
    return this.map[value] || value;
  }
}
