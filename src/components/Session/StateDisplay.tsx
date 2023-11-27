import { Tag, useColorModeValue } from '@chakra-ui/react';
import { TaskEnum } from '../../types/types';

export default function StateDisplay({ mode }: { mode: TaskEnum }) {
  const bg = useColorModeValue('gray.200', 'gray.800');
  const capitalizeText = mode.charAt(0).toUpperCase()
    + mode.slice(1).toLowerCase().split('_').join(' ');
  return (
    <Tag letterSpacing="1.5px" mb={3} shadow="sm" bgColor={bg}>
      {mode !== TaskEnum.INITIAL ? capitalizeText : ''}
    </Tag>
  );
}
