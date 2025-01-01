import { useEffect, useRef, useState } from "react";
import "./style.css";

type Props = {
  length: number;
  onSubmit: (otp: string) => void;
};

export default function OTPInput(props: Props) {
//   const [phoneNumber, setphoneNumber] = useState<string>("");
  const [otp, setOtp] = useState(new Array(props.length).fill(""));
  const inputRef = useRef<(HTMLInputElement | null)[]>(
    new Array(props.length).fill(null)
  );

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const handleOptChange = (index: number, e: any) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1); // Corrected 'lenght' to 'length'
    setOtp(newOtp);

    // submit
    const combineOtp = newOtp.join("");
    combineOtp.length === props.length && props.onSubmit(combineOtp);

    //move next if current field is filled up
    // if next is empty
    if (!newOtp[index + 1]) {
      if (value && index < props.length - 1 && inputRef.current[index + 1]) {
        inputRef.current[index + 1]?.focus();
      }
    } else {
      inputRef.current[otp.indexOf("")]?.focus();
    }
  };
  const handleOnClick = (index: number) => {
    inputRef.current[index]?.setSelectionRange(1, 1);

    // move to previous if empty
    if (index > 0 && !otp[index - 1]) {
      inputRef.current[otp.indexOf("")]?.focus();
    }
  };
  const onKeydownHandle = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus the previous input if the current input is empty
      inputRef.current[index - 1]?.focus();
    }
  };

//   console.log(inputRef);

  return (
    <div>
      <div className="text-center py-5 text-2xl">Enter OPT</div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            value={value}
            ref={(input) => (inputRef.current[index] = input)}
            onChange={(e) => handleOptChange(index, e)}
            onClick={() => handleOnClick(index)}
            onKeyDown={(e) => onKeydownHandle(index, e)}
            type="text"
            className="otpInput"
          />
        );
      })}
    </div>
  );
}
