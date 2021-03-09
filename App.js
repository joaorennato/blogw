import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Main from './src/stacks/Main';

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}