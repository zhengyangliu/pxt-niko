/**
* A driver of DHT11 in MakeCode
* @author ArthurZheng
*/

namespace dht11 {

    let _pin = 0;
    let _data = [0];

    const TIME_INTERVAL = 2000;
    let lastReadtime = -TIME_INTERVAL;

    /**
     * Set pin at which the DHT data line is connected
     * @param {DigitalPin} pin - pin at which the DHT data line is connected, eg: DigitalPin.P0
     */
    export function setPin(pin: DigitalPin) {
        _pin = pin;
    }

    /**
     * read data from dht11
     * @return {number} 0 ok, 1 check sum failed
     */
    export function read(): number {

        let temp = input.runningTime() - lastReadtime;

        if (temp < TIME_INTERVAL) {      // waited too short
            return 1;
        }

        // empty variable 
        _data = [0, 0, 0, 0, 0];

        // send start signal to dht11
        pins.digitalWritePin(_pin, 0);
        basic.pause(18);

        // release bus
        pins.setPull(_pin, PinPullMode.PullUp);
        pins.digitalReadPin(_pin);

        // wait for response header to finish
        while (pins.digitalReadPin(_pin) == 1);
        while (pins.digitalReadPin(_pin) == 0);
        while (pins.digitalReadPin(_pin) == 1);

        // read data (5 bytes)
        for (let j = 0; j < 5; j++) {
            for (let k = 0; k < 8; k++) {
                while (pins.digitalReadPin(_pin) == 1);
                while (pins.digitalReadPin(_pin) == 0);

                control.waitMicros(28);

                // if sensor pull up data pin for more than 28 us it means 1, otherwise 0
                if (pins.digitalReadPin(_pin) == 1) {
                    _data[j] |= 1 << (7 - k);
                }
            }
        }

        lastReadtime = input.runningTime();

        // success
        if (_data[4] == ((_data[0] + _data[1] + _data[2] + _data[3]) & 0xff))
            return 0;

        // check sum error
        return 2;
    }

    /**
     * calculate temperature from lastest data 
     * @return {number} 255 error, others ok
     */
    export function temperature(): number {

        let tmp = _data[2] + _data[3] / 100;

        // when temperature is lower than 0, the _data[3] 8th bit is 1
        if (_data[3] >= 0x80) {
            tmp = -tmp;
        }

        return tmp;
    }

    /**
     * calculate temperature from lastest data 
     * @return {number} 255 error, others ok
     */
    export function humidity(): number {
        return (_data[0] + _data[1] / 100);
    }
}