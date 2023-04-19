import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useSnackbar } from "notistack";

import { useAccount } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import {
  useErc20Name,
  useErc20BalanceOf,
  useErc20Allowance,
  usePrepareErc20Approve,
  useErc20Approve,
} from "@/generated";
import { useMounted } from "@/hooks/use-mounted";
import { utils } from "ethers";

const address = "0x4038191eFb39Fe1d21a48E061F8F14cF4981A0aF" as `0x${string}`; // https://testnet.bscscan.com/token/0x4038191efb39fe1d21a48e061f8f14cf4981a0af
const spender = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

export default function DappPage() {
  const { enqueueSnackbar } = useSnackbar();

  const mounted = useMounted();
  const account = useAccount();
  const accountAddrese = account.address;

  // simple read
  const erc20Name = useErc20Name({ address, chainId: bscTestnet.id });

  // read with args
  const erc20BalanceOf = useErc20BalanceOf({
    address,
    chainId: bscTestnet.id,
    args: accountAddrese ? [accountAddrese] : undefined,
  });

  const erc20Allowance = useErc20Allowance({
    address,
    chainId: bscTestnet.id,
    args: accountAddrese ? [accountAddrese, spender] : undefined,
  });

  // whrite
  const { config } = usePrepareErc20Approve({
    address,
    chainId: bscTestnet.id,
    args: [spender, utils.parseEther("1") as any], // todo: bigint?
    // args: [spender, utils.parseEther("1").toBigInt()],
  });
  const { write, status: mintStatus } = useErc20Approve({
    ...config,
    onSuccess(data) {
      erc20Allowance.refetch();
      enqueueSnackbar("ok", { variant: "success" });
    },
  });

  if (!mounted) return null;

  return (
    <Box>
      <p>erc20Name: {erc20Name.data}</p>
      <p>account: {accountAddrese}</p>
      <p>erc20BalanceOf: {erc20BalanceOf.data?.toString()}</p>
      <p>erc20Allowance: {erc20Allowance.data?.toString()}</p>

      <Button onClick={() => write?.()}>Approve</Button>
    </Box>
  );
}
