import * as React from "react";
import { SpinnerIcon } from "@iconicicons/react";
import { ProgressBar } from "@lemonsqueezy/wedges";

export function Example() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((value) => {
        if (value < 100) {
          return value + 1;
        } else {
          
          clearInterval(interval);
          return value;
        }
      });
      
    }, 70);

    // Limpiar el intervalo si el valor es 100
    if (value >= 100) {
      //clearInterval(interval);
      window.location.href = "/chat";
    }
    return () => clearInterval(interval);
  }, [value]); // Agregar 'value' como dependencia

  return (
    <div className="flex items-center justify-center p-5" style={{marginTop:"15%"}}>

    <div className="inline-block w-full max-w-[400px]">
      <ProgressBar
        afterIndicator={<SpinnerIcon className="animate-spin" />}
        indicator={value + "%"}
        color='secondary'
        value={value}
        max={100}
      />
    </div>
    </div>
  );
}

export default Example;