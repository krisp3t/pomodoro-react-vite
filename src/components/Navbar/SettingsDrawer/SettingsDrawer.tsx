// Library imports
import { ChangeEvent, useContext, useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  VStack,
} from '@chakra-ui/react';

// App imports
import SettingsNumberInput from './SettingsNumberInput';
import SettingsSlider from './SettingsSlider';
import SettingsSwitch from './SettingsSwitch';

// Context imports
import { SettingsContext, SettingsDispatchContext } from '../../../store/SettingsContext';

export default function SettingsDrawer({ isOpen, onClose } : {
  isOpen: boolean,
  onClose: () => void,
}) {
  const settingsCtx = useContext(SettingsContext);
  const settingsDispatchCtx = useContext(SettingsDispatchContext);

  // Used to store the settings while the drawer is open but not saved yet
  // Initial value is the current settings
  const [settingsCandidate, setSettingsCandidate] = useState(settingsCtx);

  function onChangeCandidate(newSettings: object) {
    setSettingsCandidate((prev) => ({ ...prev, ...newSettings }));
  }

  function updateSettings() {
    settingsDispatchCtx({ type: 'UPDATE', payload: settingsCandidate });
  }

  return (
    <Drawer
      placement="right"
      isOpen={isOpen}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Configure Pomodoro</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} align="left">
            <FormControl>
              <FormLabel>Pomodoro length (minutes)</FormLabel>
              <SettingsNumberInput
                value={settingsCandidate.pomodoroDuration}
                min={5}
                max={120}
                onChange={(value: number) => onChangeCandidate({ pomodoroDuration: +val * 60000 })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Short break length (minutes)</FormLabel>
              <SettingsNumberInput
                value={settingsCandidate.shortBreakDuration}
                min={1}
                max={15}
                onChange={(val: number) => onChangeCandidate({ shortBreakDuration: +val * 60000 })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Long break length (minutes)</FormLabel>
              <SettingsNumberInput
                value={settingsCandidate.longBreakDuration}
                min={1}
                max={60}
                onChange={(val: number) => onChangeCandidate({ longBreakDuration: +val * 60000 })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ignore breaks shorter than (minutes)</FormLabel>
              <SettingsNumberInput
                value={settingsCandidate.ignoreShorter}
                min={1}
                max={10}
                onChange={(val : number) => onChangeCandidate({ ignoreShorter: +val * 60000 })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Display statistics</FormLabel>
              <SettingsSwitch
                id="isStatistics"
                value={settingsCandidate.isStatistics}
                onChange={(e : ChangeEvent<HTMLInputElement>) => onChangeCandidate(
                  { isStatistics: e.target.checked },
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Display log</FormLabel>
              <SettingsSwitch
                id="isLog"
                value={settingsCandidate.isLog}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeCandidate(
                  { isLog: e.target.checked },
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Display notifications</FormLabel>
              <SettingsSwitch
                id="isNotifications"
                value={settingsCandidate.isNotifications}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeCandidate(
                  { isNotifications: e.target.checked },
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Alarm volume</FormLabel>
              <SettingsSlider
                value={settingsCandidate.audioVolume}
                onChange={(val: number) => onChangeCandidate(
                  { audioVolume: val },
                )}
              />
            </FormControl>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="black"
            onClick={() => {
              updateSettings();
              onClose();
            }}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
