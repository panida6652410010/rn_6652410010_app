import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Svg, { Line } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export function FlowerLoader({ size = 32, color = "#fff" }) {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const petals = 8;

  return (
    <AnimatedSvg
      width={size}
      height={size}
      style={{ transform: [{ rotate: spin }] }}
      viewBox="0 0 100 100"
    >
      {Array.from({ length: petals }).map((_, i) => (
        <Line
          key={i}
          x1="50"
          y1="10"
          x2="50"
          y2="30"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          transform={`rotate(${(360 / petals) * i} 50 50)`}
          opacity={(i + 1) / petals}
        />
      ))}
    </AnimatedSvg>
  );
}
