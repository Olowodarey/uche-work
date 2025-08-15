import { useConnect, Connector } from "@starknet-react/core";
import {
  useStarknetkitConnectModal,
  type StarknetkitConnector,
} from "starknetkit";
import { connectors } from "@/lib/starknet";

export const WalletConnectionModal = () => {
  const { connect } = useConnect();

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[],
  });

  const connectWallet = async () => {
    try {
      const { connector } = await starknetkitConnectModal();

      if (!connector) {
        console.log("No connector selected");
        return;
      }

      connect({ connector: connector as Connector });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return { connectWallet };
};
