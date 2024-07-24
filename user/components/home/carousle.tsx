import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { Asset } from 'expo-asset';
const { width: viewportWidth } = Dimensions.get('window');
const images = [
  Asset.fromModule(require('../../assets/images/carousel1.jpeg')).uri,
  Asset.fromModule(require('../../assets/images/carousel2.jpeg')).uri,
  Asset.fromModule(require('../../assets/images/carousel3.jpeg')).uri,
  Asset.fromModule(require('../../assets/images/carousel4.jpeg')).uri,
];
const data = [
  {
    title: 'First Item',
    description: 'Description for first item',
    image: images[0]
  },
  {
    title: 'Second Item',
    description: 'Description for second item',
    image: images[3]
  },
  {
    title: 'Third Item',
    description: 'Description for third item',
    image: images[2]
  }
];

const CustomCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {data.map((item, index) => (
          <View style={styles.card} key={index}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.indicatorContainer}>
        {data.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * viewportWidth,
              index * viewportWidth,
              (index + 1) * viewportWidth
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });
          return <Animated.View key={index} style={[styles.indicator, { opacity }]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:300
  },
  card: {
    width: viewportWidth,
    alignItems: 'center',
    padding: 10,
    marginBottom:10,
    height:300
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#595959',
    margin: 5,
  },
});

export default CustomCarousel;
