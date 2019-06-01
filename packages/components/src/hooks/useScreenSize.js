import React, { useState, useEffect } from 'react';
import { Dimensions } from "react-native";

export function useScreenSize() {
  function getSize() {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  }

  const [screenSize, setScreenSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setScreenSize(getSize());
    }

    Dimensions.addEventListener('change', handleResize);

    return () => Dimensions.removeEventListener('change', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return screenSize;
}
