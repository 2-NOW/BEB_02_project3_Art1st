import { useQueryClient, useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import tokenabi from '@/utils/constant/abi/erc20Abi';
import { contractAddress } from '@/utils/constant/index';

import { putUserBalancePlus } from '@/api/user/put';
import { successState, errorState } from '@/store/status';

const buttoncss = {
  width: '100%',
  fontWeight: 500,
  borderRadius: '12px',
  padding: '12px',
  marginTop: '1rem',
};

function SwapKlay({ userAddress, account, klayAmount }) {
  const queryClient = useQueryClient();
  const { mutate: balancePlusMutate } = useMutation(putUserBalancePlus);
  const setSuccessState = useSetRecoilState(successState);
  const setErrorState = useSetRecoilState(errorState);
  console.log(userAddress);

  const swap = async () => {
    // const contractAddress = '0xF1387b4e0Ee7102B2eF9750599A0d304b1FF7427'; // env에 배포된 erc20 컨트랙트 주소
    var myContract = new caver.klay.Contract(tokenabi, contractAddress);
    const tx = await myContract.methods
      .buy(userAddress) // user의 db address로 바꿔야함
      .send({
        type: 'SMART_CONTRACT_EXECUTION',
        from: account.toString(),
        value: caver.utils.toPeb(klayAmount, 'KLAY'),
        gas: 1000000,
      })
      .then((data) => {
        balancePlusMutate(
          { balance: String(klayAmount * 15) },
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

export default SwapKlay;
