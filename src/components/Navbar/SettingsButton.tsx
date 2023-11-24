import { Button } from '@chakra-ui/react';
import { VscSettingsGear } from 'react-icons/vsc';

export default function SettingsButton({ onClick } : { onClick: () => void }) {
  return (
    <Button
      leftIcon={<VscSettingsGear />}
      variant="solid"
      colorScheme="black"
      fontWeight="500"
      shadow="md"
      onClick={onClick}
    >
      Settings
    </Button>
  );
}
