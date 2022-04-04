import { useQueryClient, useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Caver from "caver-js";
import tokenabi from '@/utils/constant/abi/erc20Abi';
import { contractAddress } from '@/utils/constant/index';

import { putUserBalanceMinus } from '@/api/user/put';
import { successState, errorState } from '@/store/status';

const buttoncss = {
  width: '100%',
  fontWeight: 500,
  borderRadius: '12px',
  padding: '12px',
  marginTop: '1rem',
};

function SwapAST({ userAddress, account, ASTAmount }) {
  const queryClient = useQueryClient();
  const { mutate: balanceMinusMutate } = useMutation(putUserBalanceMinus);
  const setSuccessState = useSetRecoilState(successState);
  const setErrorState = useSetRecoilState(errorState);

  // const caver = new Caver(window.klaytn);
  const swap = async () => {
    // const contractAddress = '0xF1387b4e0Ee7102B2eF9750599A0d304b1FF7427';
    var myContract = new caver.klay.Contract(tokenabi, contractAddress);
    const tx = await myContract.methods
      .sell(userAddress, caver.utils.toPeb(ASTAmount, 'KLAY')) //API) user db address
      .send({
        type: 'SMART_CONTRACT_EXECUTION',
        from: account.toString(),
        gas: 1000000,
      })
      .then((data) => {
        balanceMinusMutate(
          { balance: String(ASTAmount) },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(['user', 'address', 'balance']);
              queryClient.invalidateQueries(['user', 'islogin']);
              setSuccessState(true);
            },
            onError: () => setErrorState(true),
          }
        );
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
