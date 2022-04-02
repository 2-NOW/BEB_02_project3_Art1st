import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Caver from "caver-js";
import tokenabi from "../../../../../../back/src/api/abi/erc20Abi";

const buttoncss = {
  width: "100%",
  fontWeight: 500,
  borderRadius: "12px",
  padding: "12px",
  marginTop: "1rem",
};

function SwapAST({ account, ASTAmount }) {
  // const caver = new Caver(window.klaytn);
  const swap = async () => {
    const contractAddress = "0x44c61a776eb3C5e6670C38ffc2C705bed5a049bc";
    var myContract = new caver.klay.Contract(tokenabi, contractAddress);
    const tx = await myContract.methods
      .buy("0x924a78d1e170e0c408996ce73e9f9ebf9ec09614")
      .send({
        type: "SMART_CONTRACT_EXECUTION",
        from: account,
        value: caver.utils.toPeb(ASTAmount, "AST"),
        gas: 1000000,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Button variant="contained" sx={buttoncss} onClick={swap}>
        Swap
      </Button>
    </Box>
  );
}

export default SwapAST;
