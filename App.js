import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GameEngine} from 'react-native-game-engine';
import entities from './src/entities';
import Physics from './src/physics/Physics';

const App = () => {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoint, setCurrentPoint] = useState(0);
  useEffect(() => {
    setRunning(false);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#FFFF8F'}}>
      <Text
        style={{
          elevation: 2,
          fontSize: 30,
          textAlign: 'center',
          margin: 5,
          fontWeight: 'bold',
        }}>
        {currentPoint}
      </Text>
      {currentPoint > 20 ? alert('Won') : null}
      <GameEngine
        ref={ref => setGameEngine(ref)}
        running={running}
        systems={[Physics]}
        entities={entities()}
        onEvent={e => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              gameEngine.stop();

              break;
            case 'new_point':
              setCurrentPoint(currentPoint + 1);
              break;
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}>
        <StatusBar hidden />
      </GameEngine>
      {!running ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setCurrentPoint(0);
              setRunning(true);
              gameEngine.swap(entities());
            }}
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 30,
              paddingVertical: 10,
              opacity: 0.8,
            }}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 25}}>
              Start Game
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default App;
