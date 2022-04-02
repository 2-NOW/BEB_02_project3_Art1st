import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const buttoncss = {
  width: "100%",
  fontWeight: 500,
  borderRadius: "12px",
  padding: "12px",
  marginTop: "1rem",
};

function ConnectWallet() {
  const kaikasLogin = async () => {
    if (typeof window.klaytn !== "undefined") {
      const provider = window["klaytn"];
    }
    try {
      const wallet = await window.klaytn.enable();
      dispatch({ type: "ON_CONNECT", account: wallet });
      getUserId(wallet);
    } catch (ex) {
      console.log(ex);
    }
  };

  const connect = () => {
    if (typeof window.klaytn !== "undefined") {
      const provider = window["klaytn"];
      kaikasLogin();
    } else {
      console.log("connectwallet else");
    }
  };

  return (
    <Box>
      <Button variant="contained" sx={buttoncss} onClick={connect}>
        Connect Wallet
      </Button>
    </Box>
  );
}

export default ConnectWallet;
//connect wallet: enter an amount: insufficent balance: swap
