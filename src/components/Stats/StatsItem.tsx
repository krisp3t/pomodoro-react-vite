import {
  Stat, StatLabel, StatNumber, StatHelpText,
} from '@chakra-ui/react';

export default function StatsItem({ label, color, number }: {
  label: string,
  color: string,
  number: number,
}) {
  return (
    <Stat textAlign="center">
      <StatLabel fontWeight={600} mb={1}>{label}</StatLabel>
      <StatNumber color={color}>{number}</StatNumber>
      <StatHelpText fontWeight={500}>minutes</StatHelpText>
    </Stat>
  );
}
