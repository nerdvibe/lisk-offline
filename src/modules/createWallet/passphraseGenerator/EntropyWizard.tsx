import React, {useState, useEffect} from "react";
import Byte from "./Byte";
import {
    generateSeed,
    generatePassphrase,
    emptyByte, generateWallet, Wallet
} from "../../../utils/wallet";
import "./passphrase.scss";

export interface Data {
    byte: string[]
    percentage: number
    seed: string[]
    step: number
}
export interface Props {
    setWallet: (wallet: Wallet) => void
}

export default function PassphraseGenerator({setWallet}: Props) {

    const [lastCaptured, setLastCaptured] = useState<{x: number; y: number}>({
        x: 0,
        y: 0
    });

    const zeroSeed = emptyByte("00");
    const [seedDiff, setSeedDiff] = useState(emptyByte(0));
    const [data, setData] = useState<Data | undefined>(undefined);
    const [passphrase, setPassphrase] = useState<string | undefined>(undefined);


    useEffect(() => {
        document.addEventListener("mousemove", seedGenerator as any, true);
        return function cleanup() {
            document.removeEventListener(
                "mousemove",
                seedGenerator as any,
                true
            );
        };
    });

    // /**
    //  * Tests useragent with a regexp and defines if the account is mobile device
    //  *
    //  * @returns {Boolean} - whether the agent represents a mobile device or not
    //  */
    // isTouchDevice() {
    //     return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
    //         navigator.userAgent || navigator.vendor || window.opera
    //     );
    // }

    const seedGenerator = async (nativeEvent: MouseEvent) => {
        let shouldTrigger;
        if (typeof nativeEvent === "string") {
            shouldTrigger = true;
        } else {
            const distance = Math.sqrt(
                (nativeEvent.pageX - lastCaptured.x) ** 2 +
                (nativeEvent.pageY - lastCaptured.y) ** 2
            );
            shouldTrigger = distance > 50;
        }

        if (
            shouldTrigger &&
            (!data || data.percentage < 100)
        ) {
            let localData = data;
            setLastCaptured({
                x: nativeEvent.pageX,
                y: nativeEvent.pageY
            });

            // defining diffSeed to use for animating HEX numbers
            // note: in the first iteration data is undefined
            const oldSeed = localData
                ? localData.seed
                : zeroSeed;

            localData = generateSeed(localData);
            const seedDiff = oldSeed
                .map((item, index) => (item !== localData!.seed[index] ? index : null))
                .filter((item) => item !== null);
            setData(localData);
            setSeedDiff(seedDiff)
        } else if (
            data &&
            data.percentage >= 100 &&
            !passphrase
        ) {
            const phrase = generatePassphrase(data);
            setPassphrase(
                 phrase
            );
            const wallet = await generateWallet(phrase);
            if(wallet.error) {
                throw new Error(wallet.reason)
            }
            setWallet(wallet);
        }
    };

        // const isTouch = false; // isTouchDevice(this.props.agent);
        const percentage = () => {
            const number = data
                ? parseFloat(data.percentage + '').toFixed(1)
                : 0;
            return number >= 100 ? 100 : number
        };
        return (
            <div>
                <div className="columns">
                    <div className="column is-8 is-offset-2">
                        <h1 className="title">Create new wallet</h1>
                        {/*{isTouch*/}
                            {/*? <div>*/}
                                {/*<p className="title-seed-message">*/}
                                    {/*Enter text below to generate random bytes*/}
                                {/*</p>*/}
                                {/*<input*/}
                                    {/*className="input message-input"*/}
                                    {/*type="text"*/}
                                    {/*placeholder="Enter random text"*/}
                                    {/*onChange={event =>*/}
                                        {/*seedGenerator(event.target.value)}*/}
                                {/*/>*/}
                            {/*</div>*/}
                            {/*: */}
                            <p className="">
                                Move your mouse to generate random bytes, this will help making your wallet safer.
                            </p>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-8 is-offset-2">
                        Progress:{" "}
                        {percentage()}{" "}
                        %
                        <progress className="progress is-success" value={percentage()} max="100">75%</progress>

                    </div>
                </div>
                <div className="columns">
                    <div className="column is-8 is-offset-2">
                        {/*{(data && data.seed*/}
                            {/*? data.seed*/}
                            {/*: zeroSeed).map((byte, index: number) =>*/}
                            {/*<Byte*/}
                                {/*value={byte}*/}
                                {/*key={index}*/}
                                {/*diff={seedDiff.indexOf(index) >= 0}*/}
                            {/*/>*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>
        );
}
