import { ApiProperty } from '@nestjs/swagger';
// {
//   "Name": "Ninejoe Ninejoe",
//   "Platform": "Facebook",
//   "Sex": "Male",
//   "Categories":[ "Lifestyle"],
//   "Tel": "0998935365",
//   "Link": "https://www.facebook.com/tsomton?mibextid=LQQJ4d",
//   "Followers": "7900",
//   "Photo Cost / Kols": 800,
//   "VDO Cost / Kols": "1000",
//   "ER%": "2.12"
// }
export class CreateKolDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  platform: string;
  @ApiProperty()
  sex: string;
  @ApiProperty()
  Categories: string[];
  @ApiProperty()
  tel: string;
  @ApiProperty()
  link: string;
  @ApiProperty()
  followers: string;
  @ApiProperty()
  'photo_cost_kols': number;
  @ApiProperty()
  'vdo_cost_kols': number;
  @ApiProperty()
  'er%': number;
}

export class UpdateKolDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  platform?: string;
  @ApiProperty()
  sex?: string;
  @ApiProperty()
  Categories?: string[];
  @ApiProperty()
  tel?: string;
  @ApiProperty()
  link?: string;
  @ApiProperty()
  followers?: string;
  @ApiProperty()
  'photo_cost_kols'?: number;
  @ApiProperty()
  'vdo_cost_kols'?: number;
  @ApiProperty()
  'er%'?: number;
}
export class DeleteKolDto {
  @ApiProperty()
  id: string;
}
export class SearchKolDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  platform: string;
  @ApiProperty()
  sex: string;
}
