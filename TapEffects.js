import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';

const rayAngles = [45, 80, 115, 150];
const effectDuration = 300;
const maxVisibleEffects = 8;

function TapBurst({ effect, onComplete }) {
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: effectDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    animation.start(({ finished }) => {
      if (finished) {
        onComplete(effect.id);
      }
    });

    return () => animation.stop();
  }, [effect.id, onComplete, progress]);

  return (
    <View
      pointerEvents="none"
      style={[
        styles.burst,
        {
          left: effect.x,
          top: effect.y,
        },
      ]}
    >
      {rayAngles.map((angle) => {
        const radians = (angle * Math.PI) / 180;
        const translateX = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Math.cos(radians) * 38],
        });
        const translateY = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -Math.sin(radians) * 38],
        });

        return (
          <Animated.View
            key={angle}
            style={[
              styles.ray,
              {
                opacity: progress.interpolate({
                  inputRange: [0, 0.65, 1],
                  outputRange: [1, 1, 0],
                }),
                transform: [
                  { rotate: `${angle}deg` },
                  { translateX },
                  { translateY },
                ],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

export default function TapEffects({ children }) {
  const [effects, setEffects] = useState([]);
  const nextId = useRef(0);

  const removeEffect = useCallback((id) => {
    setEffects((currentEffects) =>
      currentEffects.filter((effect) => effect.id !== id),
    );
  }, []);

  const handleTouchStart = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    const id = nextId.current;
    nextId.current += 1;

    setEffects((currentEffects) => [
      ...currentEffects.slice(-(maxVisibleEffects - 1)),
      { id, x: pageX, y: pageY },
    ]);
  };

  return (
    <View style={styles.container} onTouchStart={handleTouchStart}>
      {children}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {effects.map((effect) => (
          <TapBurst
            key={effect.id}
            effect={effect}
            onComplete={removeEffect}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  burst: {
    position: 'absolute',
    width: 2,
    height: 2,
  },
  ray: {
    position: 'absolute',
    left: 5,
    top: 5,
    width: 30,
    height: 5,
    borderRadius: 2,
    backgroundColor: '#fd0d0d',
  },
});
