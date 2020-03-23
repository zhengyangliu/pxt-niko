/**
* Program box package
* @author ArthurZheng
*/
//% weight=10 icon="\uf135" color=#2896ff
namespace niko {

    enum Motor{
        M1 = 0,
        M2 = 0,
        M3 = 0,
        M4 = 0
    }

    const MOTOR0_DIR = pcf8574x.IO.P2;
    const MOTOR1_DIR = pcf8574x.IO.P3;
    const MOTOR_BRK = pcf8574x.IO.P4;
    const MOTOR2_DIR = pcf8574x.IO.P5;
    const MOTOR3_DIR = pcf8574x.IO.P6;
    const GUN_EN = pcf8574x.IO.P7;

    const MOTOR0_EN = AnalogPin.P4;
    const MOTOR1_EN = AnalogPin.P5;
    const MOTOR2_EN = AnalogPin.P6;
    const MOTOR3_EN = AnalogPin.P7;

    // 10Khz 100us
    const MOTOR_PWM_PERIOD = 100;
    
    export function init() {

        pcf8574x.configAddress(0x20);
        pcf8574x.writeMode(0);

        pins.analogSetPeriod(MOTOR0_EN, MOTOR_PWM_PERIOD);
        pins.analogSetPeriod(MOTOR0_EN, MOTOR_PWM_PERIOD);
        pins.analogSetPeriod(MOTOR0_EN, MOTOR_PWM_PERIOD);
        pins.analogSetPeriod(MOTOR0_EN, MOTOR_PWM_PERIOD);

        initPS2();
    }

    /**
     * Initialize ps2 controller and set pins, should run at first
     */
    //% blockId=initPS2 block="initialize ps2 controller"
    //% subcategory="PS2"
    function initPS2() {
        ps2.initGamepad(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13, DigitalPin.P16);
    }

    /**
     * read data from ps2 controller 
     */
    //% blockId=readPS2 block="read data from ps2 controller"
    //% subcategory="PS2"
    export function readPS2() {
        ps2.readGamepad();
    }

    /**
     * calculate ps2 controller's digital button's state.
     * @param {DigitalButton} button - digital button name, eg: ps2.DigitalButton.Select
     * @return {boolean} digital button's state
     */
    //% blockId=calcPS2ButtonDigital block="calculate digital button"
    //% subcategory="PS2"
    export function ps2ButtonDigital(button: ps2.DigitalButton): boolean {
        return ps2.buttonDigital(button);
    }

    /**
     * calculate ps2 controller's digital button's state.
     * @param {DigitalButton} button - digital button name, eg: ps2.DigitalButton.Select
     * @return {number} digital button's state
     */
    //% blockId=calcPS2ButtonAnalog block="calculate analog button"
    //% subcategory="PS2"
    export function ps2ButtonAnalog(button: ps2.AnalogButton): number {
        return ps2.buttonAnalog(button);
    }

    export function setMotorSpeed(m: Motor, speed: number) {
        if (m == Motor.M1) { 
            if (speed > 0) {
                pcf8574x.writePinMode(MOTOR0_DIR, pcf8574x.Mode.High);
                pins.analogWritePin(MOTOR0_EN, speed);
            }
            else {
                pcf8574x.writePinMode(MOTOR0_DIR, pcf8574x.Mode.Low);
                pins.analogWritePin(MOTOR0_EN, -speed);
            }
        }
        else if (m == Motor.M2) { 
            if (speed > 0) {
                pcf8574x.writePinMode(MOTOR1_DIR, pcf8574x.Mode.High);
                pins.analogWritePin(MOTOR1_EN, speed);
            }
            else {
                pcf8574x.writePinMode(MOTOR1_DIR, pcf8574x.Mode.Low);
                pins.analogWritePin(MOTOR1_EN, -speed);
            }
        }
        else if (m == Motor.M3) { 
            if (speed > 0) {
                pcf8574x.writePinMode(MOTOR2_DIR, pcf8574x.Mode.High);
                pins.analogWritePin(MOTOR2_EN, speed);
            }
            else {
                pcf8574x.writePinMode(MOTOR2_DIR, pcf8574x.Mode.Low);
                pins.analogWritePin(MOTOR2_EN, -speed);
            }
        }
        else { 
            if (speed > 0) {
                pcf8574x.writePinMode(MOTOR3_DIR, pcf8574x.Mode.High);
                pins.analogWritePin(MOTOR3_EN, speed);
            }
            else {
                pcf8574x.writePinMode(MOTOR3_DIR, pcf8574x.Mode.Low);
                pins.analogWritePin(MOTOR3_EN, -speed);
            }
        }
    }

    export function breakMotor(){
        pins.analogWritePin(MOTOR0_EN, 0);
        pins.analogWritePin(MOTOR1_EN, 0);
        pins.analogWritePin(MOTOR2_EN, 0);
        pins.analogWritePin(MOTOR3_EN, 0);
        pcf8574x.writePinMode(MOTOR_BRK, pcf8574x.Mode.High);
    }

    export function setMachineGunState(state: boolean) {
        if (state == true) {
            pcf8574x.writePinMode(GUN_EN, pcf8574x.Mode.High);
        }
        else {
            pcf8574x.writePinMode(GUN_EN, pcf8574x.Mode.Low);
        }
    }

}