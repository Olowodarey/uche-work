import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { Dataset } from "@/lib/starknet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DatasetPreviewModal } from "@/components/DatasetPreviewModal";
import { Download, Eye, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContracts, STRK_ADDRESS, AINEST_ADDRESS } from "@/utils/contracts";
import { uint256 } from "starknet";

interface DatasetCardProps {
  dataset: Dataset;
  onView?: (dataset: Dataset) => void;
  onPurchase?: (dataset: Dataset) => void;
}

export const DatasetCard = ({
  dataset,
  onView,
  onPurchase,
}: DatasetCardProps) => {
  const { account } = useContracts();
  const cardRef = useRef<HTMLDivElement>(null);
  const { animateCardHover } = useGSAP();
  const { toast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDatasetName = (name: string): string => {
    console.log(`DatasetCard formatDatasetName - received name: "${name}" for dataset ${dataset.id}`);
    
    // Only fall back to generic name if truly empty, null, or undefined
    if (!name || name.trim() === "") {
      console.log(`Using fallback name for dataset ${dataset.id} - name was empty`);
      return `Dataset #${dataset.id.toString()}`;
    }
    
    // Clean up the name and use it directly
    const cleanName = name.trim();
    console.log(`Using decoded name: "${cleanName}" for dataset ${dataset.id}`);
    return cleanName;
  };

  const formatCategory = (category: string): string => {
    if (!category || category.trim() === "") {
      return "Uncategorized";
    }
    
    const cleanCategory = category.trim();
    
    // If it looks like raw data, use fallback
    if (/^0x[0-9a-fA-F]+$/.test(cleanCategory)) {
      return "Uncategorized";
    }
    
    // Capitalize first letter of each word for better display
    return cleanCategory
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formatPrice = (price: bigint) => {
    // Convert wei to STRK with proper formatting
    const priceInStrk = Number(price) / 1e18;
    
    // Handle very small numbers and format appropriately
    if (priceInStrk === 0) {
      return "Free";
    } else if (priceInStrk < 0.001) {
      // For very small amounts, show more decimal places
      return `${priceInStrk.toFixed(6)} STRK`;
    } else if (priceInStrk < 1) {
      // For amounts less than 1, show 4 decimal places
      return `${priceInStrk.toFixed(4)} STRK`;
    } else {
      // For amounts 1 and above, show 2 decimal places
      return `${priceInStrk.toFixed(2)} STRK`;
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      animateCardHover(cardRef.current, true);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      animateCardHover(cardRef.current, false);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
    onView?.(dataset);
  };

  // const handlePurchase = async () => {
  //   setIsPurchasing(true);
  //   try {
  //     // Mock purchase process
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     toast({
  //       title: "Purchase successful!",
  //       description: `You have successfully purchased ${dataset.name}`,
  //     });

  //     onPurchase?.(dataset);
  //   } catch (error) {
  //     toast({
  //       title: "Purchase failed",
  //       description: "There was an error processing your purchase",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsPurchasing(false);
  //   }
  // };

  // inside DatasetCard
  // const handlePurchase = async () => {
  //   setIsPurchasing(true);
  //   try {
  //     // const { account } = useContracts();
  //     const { uint256 } = await import("starknet");

  //     const priceUint = uint256.bnToUint256(dataset.price);
  //     await account.execute([
  //       {
  //         contractAddress: STRK_ADDRESS,
  //         entrypoint: "approve",
  //         calldata: [AINEST_ADDRESS, priceUint.low, priceUint.high],
  //       },
  //       {
  //         contractAddress: AINEST_ADDRESS,
  //         entrypoint: "purchase_dataset",
  //         calldata: [dataset.id],
  //       },
  //     ]);

  //     toast({
  //       title: "Purchase successful!",
  //       description: `You purchased ${dataset.name}`,
  //     });
  //     onPurchase?.(dataset);
  //   } catch (error: any) {
  //     toast({
  //       title: "Purchase failed",
  //       description: error?.message || "Error",
  //       variant: "destructive",
  //     });
  //     console.log(error.message);
  //   } finally {
  //     setIsPurchasing(false);
  //   }
  // };

  const handlePurchase = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Starknet wallet before purchasing",
        variant: "destructive",
      });
      return;
    }

    setIsPurchasing(true);
    try {
      const priceUint = uint256.bnToUint256(dataset.price);

      await account.execute([
        {
          contractAddress: STRK_ADDRESS,
          entrypoint: "approve",
          calldata: [AINEST_ADDRESS, priceUint.low, priceUint.high],
        },
        {
          contractAddress: AINEST_ADDRESS,
          entrypoint: "purchase_dataset",
          calldata: [dataset.id],
        },
      ]);

      toast({ title: "Purchase successful!" });
      onPurchase?.(dataset);
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div
      ref={cardRef}
      className="ainest-dataset-card group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg mb-2 truncate">
            {formatDatasetName(dataset.name)}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{formatAddress(dataset.owner)}</span>
          </div>
        </div>
        <Badge variant="secondary" className="ml-2">
          {formatCategory(dataset.category)}
        </Badge>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="text-2xl font-bold text-foreground">
          {formatPrice(dataset.price)}
        </div>
        <div className="text-sm text-muted-foreground">
          Dataset #{dataset.id.toString()}
        </div>
      </div>

      {/* IPFS Hash */}
      {/* <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-1">IPFS Hash</div>
        <div className="font-mono text-xs bg-muted p-2 rounded border truncate">
          {dataset.ipfs_hash}
        </div>
      </div> */}

      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreview}
          className="flex-1 flex items-center justify-center space-x-1"
        >
          <Eye className="h-4 w-4" />
          <span>Preview</span>
        </Button>
        <Button
          size="sm"
          onClick={handlePurchase}
          disabled={isPurchasing}
          className="flex-1 flex items-center justify-center space-x-1 ainest-btn-primary"
        >
          {isPurchasing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span>{isPurchasing ? "Purchasing..." : "Purchase"}</span>
        </Button>
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 border border-ring opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300 pointer-events-none" />

      {/* Preview Modal */}
      <DatasetPreviewModal
        dataset={dataset}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onPurchase={handlePurchase}
      />
    </div>
  );
};
