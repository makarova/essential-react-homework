import { StyleSheet, Text, View } from 'react-native';
import { Lottery } from '../types';
import { colors } from '../colors';

interface LotteryDetailsViewProps {
  lottery: Lottery;
}

const LotteryDetailsView = ({ lottery }: LotteryDetailsViewProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lottery.name}</Text>
      <Text style={styles.text}>ID: {lottery.id}</Text>
      <Text style={styles.text}>Prize: {lottery.prize}</Text>
      <Text style={styles.text}>Status: {lottery.status}</Text>
      <Text style={styles.text}>Type: {lottery.type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    fontSize: 16,
  },
  title: {
    padding: 16,
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default LotteryDetailsView;
