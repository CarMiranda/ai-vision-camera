import { Skia } from '@shopify/react-native-skia';
import { useRef } from 'react';
import { StyleSheet, Image, Platform } from 'react-native';

import { Camera, Code, useCameraDevice, useCameraFormat, useCameraPermission, useCodeScanner, useSkiaFrameProcessor } from 'react-native-vision-camera';


export default function TabTwoScreen() {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");
  const { hasPermission } = useCameraPermission();
  const format = useCameraFormat(device, [
    { photoResolution: { height: 1280, width: 720 } }
  ]);
  const detectedCodes = useRef<Code[]>([]);

  const frameProcessor = null;
  // const frameProcessor = useSkiaFrameProcessor((frame) => {
  //   "worklet"
  //   frame.render()
  //
  //   if (!detectedCodes.current) return;
  //
  //   for (let code of detectedCodes.current) {
  //     if (code.frame === null || code.frame === undefined) continue;
  //
  //     const paint = Skia.Paint();
  //     paint.setColor(Skia.Color("red"));
  //     frame.drawRect(code.frame, paint);
  //   }
  // }, [detectedCodes]);

  // if (!hasPermission) return <PermissionsPage />
  if (device == null) return <NoCameraDeviceError />


  // const codeScanner = null;
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'data-matrix', 'ean-13'],
    onCodeScanned(codes) {
      if (codes.length) {
        console.log(codes);
        detectedCodes.current = codes;
      }
    },
  });

  return (
    <Camera 
      style={StyleSheet.absoluteFill}
      ref={camera}
      device={device}
      isActive={true}
      photo={true}
      codeScanner={codeScanner}
      format={format}
      frameProcessor={frameProcessor}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
