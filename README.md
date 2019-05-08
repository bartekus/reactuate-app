# reactuate-app
reactuate-cli template app

![Alt Text](https://raw.githubusercontent.com/bartekus/reactuate-app/master/reactuate-app.gif)

## Api
### Scaling Functions
```js
import { scale, verticalScale, moderateScale } from '/**/utils/scaling';

const Component = props =>
    <View style={{
        width: scale(30),
        height: verticalScale(50),
        padding: moderateScale(5)
    }}/>;
```


* `scale(size: number)`
Will return linear scaled result of the provided size, based on your device's screen width.
* `verticalScale(size: number)`
Will return linear scaled result of the provided size, based on your device's screen height.

* `moderateScale(size: number, factor?: number)`
Sometimes you don't want to scale everything in a linear manner, that's where moderate scale comes in.
The cool thing about it is that you can control the resize factor (default is 0.5).
If normal scale will increase your size by +2X, moderateScale will only increase it by +X, for example:
➡️ scale(10) = 20
➡️ moderateScale(10) = 15
➡️ moderateScale(10, 0.1) = 11

