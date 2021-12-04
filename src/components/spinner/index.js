import { GridLoader, MoonLoader	} from "react-spinners";
import { css } from "@emotion/react";
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 5;
  border-color: red;
`;
const style = {
  margin: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
}
function App({type = 0}) {

  if(type === 1) {
    return (
      <div style={style}>
        <MoonLoader color="red" css={override} />
      </div>
     
    )
  } else {
    return (
      <div style={style}>
        <GridLoader color="red" css={override} size={20} />
      </div>     
    )
  }

}

export default App;