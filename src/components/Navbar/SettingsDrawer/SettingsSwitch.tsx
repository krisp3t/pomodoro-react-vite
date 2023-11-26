import { Switch } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

export default function SettingsSwitch(
  { id, value, onChange } :
  { id: string, value: boolean, onChange: (e: ChangeEvent<HTMLInputElement>) => void },
) {
  return (
    <Switch
      id={id}
      defaultChecked={value}
      isChecked={value}
      onChange={onChange}
    />
  );
}
