/**
* A driver for WS2812B programmable LEDs in MakeCode
* @note This package disables BLE as the real time requirements of the WS2812 conflict with the BLE stack.
* @author ArthurZheng
*/
namespace rgbled {

    let _bufr: Buffer;
    let _len = 0;
    let _pin = 0;

    export enum Color {
        //% block=Red
        Red = 0xFF0000,
        //% block=Orange
        Orange = 0xFFA500,
        //% block=Yellow
        Yellow = 0xFFFF00,
        //% block=Green
        Green = 0x00FF00,
        //% block=Blue
        Blue = 0x0000FF,
        //% block=Indigo
        Indigo = 0x4b0082,
        //% block=Violet
        Violet = 0x8a2be2,
        //% block=Purple
        Purple = 0xFF00FF,
        //% block=White
        White = 0xFFFFFF,
        //% block=Black
        Black = 0x000000
    }

    //% shim=sendBufferAsm
    export function sendBuffer(buf: Buffer, pin: DigitalPin) {
    }

    /**
     * configure led strip data pin and length
     * @param {DigitalPin} pin - pin at which the WS2812B data line is connected
     * @param {number} len - the number of led in the strip
     */
    export function configStrip(pin: DigitalPin, len: number) {
        _pin = pin;
        _len = len;
        _bufr = pins.createBuffer(len * 3);
        clear();
    }

    /**
     * configure the led by RGB value
     * @param {number} offset - sequence number of the led
     * @param {number} red - the brightness of red
     * @param {number} green - the brightness of green
     * @param {number} blue - the brightness of blue
     */
    export function setPixelRGB(offset: number, red: number, green: number, blue: number) {
        _bufr[offset * 3 + 0] = red;
        _bufr[offset * 3 + 1] = green;
        _bufr[offset * 3 + 2] = blue;
    }

    /**
     * configure the led by color
     * @param {number} offset - sequence number of the led
     * @param {Color} color - color
     */
    export function setPixelColor(offset: number, color: Color) {
        setPixelRGB(offset, ((color & 0xff0000) >> 16), ((color & 0x00ff00) >> 8), (color & 0x0000ff));
    }

    /**
     * show the set color
     */
    export function show() {
        sendBuffer(_bufr, _pin);
    }

    /**
     * clear buffer
     */
    export function clear() {
        _bufr.fill(0, 0, _len * 3);
        show();
    }
}
