import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';

const Greeting = ({ name }) => {
    const styles = StyleSheet.create({ text: { fontSize: 16 } });
  return (
    <View>
      {/* This node is tagged with the testID prop */}
      <Text testID="greetingText">Hello {name}!</Text>
      <Text testID="insultingText" 
      onPress={() => console.log('pressed')}
      style={[
        { color: 'black', fontWeight: '600', transform: [{ scale: 2 }, { rotate: '45deg' }] },
        styles.text,
      ]}>You suck {name}!</Text>
    </View>
  );
};

describe('Greeting', () => {
  it('renders a greeting message based on the name prop', () => {
    const { debug, getByTestId, getByText } = render(<Greeting name="Kalle" />);

    debug();

    expect(getByTestId('greetingText')).toHaveTextContent('Hello Kalle!');
    expect(getByTestId('insultingText')).toHaveTextContent('suck');
    expect(getByTestId('insultingText')).toHaveProp('onPress');
    expect(getByText('You suck Kalle!')).toHaveStyle({color: 'black', fontSize: 16, fontWeight: '600'});

  });
});