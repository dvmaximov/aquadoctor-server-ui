export class Setting {
  id?: number;
  name: String = 'unknown';
  value: String = '';
  editable?: number = 1;
  settingType?: 'text' | 'number' = 'text';
  lang: String = 'en-US';
}

export type Settings = Setting[];
