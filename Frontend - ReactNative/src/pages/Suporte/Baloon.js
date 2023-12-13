import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  bubbleWrapper: {
    flexDirection: 'column',
  },
  bubbleWrapperSent: {
    alignSelf: 'flex-end',
    marginLeft: 40,
  },
  bubbleWrapperReceived: {
    alignSelf: 'flex-start',
    marginRight: 40,
  },
  baloon: {
    padding: 8,
    borderRadius: 16,
  },
  baloonSent: {
    backgroundColor: Colors.black,
  },
  baloonReceived: {
    backgroundColor: Colors.white,
  },
  baloonText: {
    fontSize: 18,
  },
  baloonTextSent: {
    color: Colors.white,
  },
  balloonTextReceived: {
    color: Colors.black,
  },
});

const Baloon = ({ message, currentUser }) => {
  console.log('Rendering Baloon:', message, currentUser);

  if (!message) {
    console.log('No message provided.');
    return <View style={{ borderWidth: 1, borderColor: 'red' }}></View>;
  }

  console.log('Message content:', message.content);

  const isSentByCurrentUser = currentUser === message.sentBy;
  const balloonColor = isSentByCurrentUser ? styles.balloonSent : styles.balloonReceived;
  const balloonTextColor = isSentByCurrentUser ? styles.balloonTextSent : styles.balloonTextReceived;
  const bubbleWrapperStyle = isSentByCurrentUser ? styles.bubbleWrapperSent : styles.bubbleWrapperReceived;

  return (
    <View style={{}}>
      <View style={{ ...styles.bubbleWrapper, ...bubbleWrapperStyle }}>
        <Text>{message.sentBy}</Text>
        <Text style={{ ...styles.balloonText, ...balloonTextColor }}>
          {message.content}
        </Text>
      </View>
    </View>
  );
};

export default Baloon;
