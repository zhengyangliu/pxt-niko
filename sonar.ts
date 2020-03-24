/**
 * Sonar and ping utilities
 */
namespace sonar {

    enum Unit{
        //% block="us"
        MicroSeconds,
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }

    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param {DigitalPin} trig - tigger pin
     * @param {DigitalPin} echo - echo pin
     * @param {Unit} unit - desired conversion units
     * @param {number} maxCmDistance - maximum distance in centimeters (default is 500)
     */
<<<<<<< HEAD
    function read(trig: DigitalPin, echo: DigitalPin, unit: Unit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
=======
    function read(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);s
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10)8;
>>>>>>> 02e391aa0f37684b971dbe0f724077256b31ffe0
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
<<<<<<< HEAD
            case Unit.Centimeters: return Math.idiv(d, 58);
            case Unit.Inches: return Math.idiv(d, 148);
=======
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
>>>>>>> 02e391aa0f37684b971dbe0f724077256b31ffe0
            default: return d;
        }
    }
}
