// import { useRef, useEffect, useState } from 'react'
// import { useAppStore } from '@/stores/useAppStore'
// import { useGSAP } from '@/hooks/useGSAP'
// import { Dataset } from '@/lib/starknet'
// import { CategorySidebar } from '@/components/CategorySidebar'
// import { DatasetCard } from '@/components/DatasetCard'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Search, Filter, Grid, List } from 'lucide-react'

// export const Marketplace = () => {
//   const mainRef = useRef<HTMLDivElement>(null)
//   const gridRef = useRef<HTMLDivElement>(null)
//   const { animatePageEnter, animateGridItems } = useGSAP()

//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
//   const [sortBy, setSortBy] = useState<'newest' | 'price' | 'popular'>('newest')

//   const {
//     datasets,
//     selectedCategory,
//     searchQuery,
//     setSearchQuery,
//     isLoading
//   } = useAppStore()

//   // Mock datasets for demo
//   const mockDatasets: Dataset[] = [
//     {
//       id: BigInt(1),
//       name: 'ImageNet Classification Dataset',
//       owner: '0x1234567890abcdef1234567890abcdef12345678',
//       ipfs_hash: 'QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o',
//       price: BigInt('100000000000000000'), // 0.1 STRK
//       category: 'Computer Vision'
//     },
//     {
//       id: BigInt(2),
//       name: 'Financial Time Series Data',
//       owner: '0xabcdef1234567890abcdef1234567890abcdef12',
//       ipfs_hash: 'QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51',
//       price: BigInt('250000000000000000'), // 0.25 STRK
//       category: 'Financial Data'
//     },
//     {
//       id: BigInt(3),
//       name: 'Medical X-Ray Dataset',
//       owner: '0x567890abcdef1234567890abcdef1234567890ab',
//       ipfs_hash: 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4',
//       price: BigInt('500000000000000000'), // 0.5 STRK
//       category: 'Medical Data'
//     }
//   ]

//   useEffect(() => {
//     if (mainRef.current) {
//       animatePageEnter(mainRef.current)
//     }
//   }, [])

//   useEffect(() => {
//     if (gridRef.current) {
//       const cards = gridRef.current.querySelectorAll('.ainest-dataset-card')
//       if (cards.length > 0) {
//         animateGridItems(cards)
//       }
//     }
//   }, [datasets, selectedCategory, searchQuery])

//   const filteredDatasets = mockDatasets.filter(dataset => {
//     const matchesCategory = selectedCategory === 'All' || dataset.category === selectedCategory
//     const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   const handleDatasetView = (dataset: Dataset) => {
//     console.log('View dataset:', dataset)
//     // Implement dataset preview modal
//   }

//   const handleDatasetPurchase = (dataset: Dataset) => {
//     console.log('Purchase dataset:', dataset)
//     // Implement purchase functionality
//   }

//   return (
//     <div className="flex min-h-screen">
//       <CategorySidebar />

//       <main ref={mainRef} className="flex-1 p-6">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="ainest-section-title mb-4">Dataset Marketplace</h1>

//           {/* Search and Filters */}
//           <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search datasets..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 ainest-input"
//               />
//             </div>

//             <div className="flex items-center space-x-4">
//               {/* Sort */}
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value as any)}
//                 className="ainest-input text-sm"
//               >
//                 <option value="newest">Newest First</option>
//                 <option value="price">Price: Low to High</option>
//                 <option value="popular">Most Popular</option>
//               </select>

//               {/* View Mode */}
//               <div className="flex items-center border border-border rounded-lg p-1">
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('grid')}
//                   className="h-8 w-8 p-0"
//                 >
//                   <Grid className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant={viewMode === 'list' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('list')}
//                   className="h-8 w-8 p-0"
//                 >
//                   <List className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results */}
//         <div className="mb-6">
//           <p className="text-muted-foreground">
//             {filteredDatasets.length} datasets found
//             {selectedCategory !== 'All' && ` in ${selectedCategory}`}
//             {searchQuery && ` matching "${searchQuery}"`}
//           </p>
//         </div>

//         {/* Dataset Grid */}
//         {isLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div key={i} className="ainest-card animate-pulse">
//                 <div className="h-4 bg-muted rounded mb-2"></div>
//                 <div className="h-3 bg-muted rounded w-3/4 mb-4"></div>
//                 <div className="h-8 bg-muted rounded mb-4"></div>
//                 <div className="flex space-x-2">
//                   <div className="h-8 bg-muted rounded flex-1"></div>
//                   <div className="h-8 bg-muted rounded flex-1"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : filteredDatasets.length > 0 ? (
//           <div
//             ref={gridRef}
//             className={
//               viewMode === 'grid'
//                 ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
//                 : 'space-y-4'
//             }
//           >
//             {filteredDatasets.map((dataset) => (
//               <DatasetCard
//                 key={dataset.id.toString()}
//                 dataset={dataset}
//                 onView={handleDatasetView}
//                 onPurchase={handleDatasetPurchase}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="h-8 w-8 text-muted-foreground" />
//             </div>
//             <h3 className="text-xl font-semibold text-foreground mb-2">No datasets found</h3>
//             <p className="text-muted-foreground mb-6">
//               Try adjusting your search criteria or browse different categories.
//             </p>
//             <Button
//               onClick={() => {
//                 setSearchQuery('')
//               }}
//               variant="outline"
//             >
//               Clear Filters
//             </Button>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }

import { useRef, useEffect, useState } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { useGSAP } from "@/hooks/useGSAP";
import { Dataset, DatasetCategory } from "@/lib/starknet";
import { CategorySidebar } from "@/components/CategorySidebar";
import { DatasetCard } from "@/components/DatasetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid, List } from "lucide-react";
import { useAccount, useContract } from "@starknet-react/core";
import AINEST_ABI from "@/utils/AINEST_ABI.json";
import { AINEST_ADDRESS, STRK_ADDRESS } from "@/utils/contracts";
import { decodeByteArray, ipfsHashToFelt252 } from "@/utils/cairo";

/** Helpers for u256 <-> bigint */
const toU256 = (n: number | bigint) => ({
  low: BigInt(n) & ((1n << 128n) - 1n),
  high: BigInt(n) >> 128n,
});
const fromU256 = (u: any): bigint => {
  if (!u) return 0n;
  if (typeof u === "bigint") return u;
  if (typeof u === "string") return BigInt(u);
  if (Array.isArray(u) && u.length >= 2) {
    return (BigInt(u[1]) << 128n) + BigInt(u[0]);
  }
  if ("low" in u && "high" in u) {
    return (BigInt(u.high) << 128n) + BigInt(u.low);
  }
  return 0n;
};

/** VERY simple fallback for ByteArray -> string (shows a friendly placeholder) */
const safeName = (id: number) => `Dataset #${id}`;

export const Marketplace = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { animatePageEnter, animateGridItems } = useGSAP();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "price" | "popular">(
    "newest"
  );
  const [contractDatasets, setContractDatasets] = useState<Dataset[]>([]);

  const {
    selectedCategory,
    searchQuery,
    setSearchQuery,
    isLoading,
    setLoading,
  } = useAppStore();

  const { account } = useAccount();

  // Create a Contract instance (uses account when connected, otherwise provider)
  const { contract } = useContract({
    abi: AINEST_ABI as any,
    address: AINEST_ADDRESS,
  });

  // Load all datasets
  useEffect(() => {
    const load = async () => {
      if (!contract) return;

      setLoading(true);
      try {
        // 1) read dataset count
        const countRes: any = await (contract as any).get_dataset_count();
        const count = Number(fromU256(countRes));

        const results: Dataset[] = [];

        // 2) read each dataset
        for (let id = 1; id <= count; id++) {
          try {
            console.log(`\n=== Loading Dataset ${id} ===`);
            const d: any = await (contract as any).get_dataset(toU256(id));
            console.log(`Dataset ${id} full contract response:`, d);

            const owner = d.owner ?? d[0];
            const ipfs_hash = d.ipfs_hash ?? d[2];
            const priceU256 = d.price ?? d[3];
            const category = d.category ?? d[4];

            const price = Number(fromU256(priceU256)); // Raw u256 in Wei
            
            // Debug the raw name data from contract
            const rawNameData = d.name ?? d[1];
            console.log(`Dataset ${id} raw name data:`, rawNameData);
            console.log(`Dataset ${id} raw name data type:`, typeof rawNameData);
            
            let name: string;
            
            // since is  already coming as  a string, use it directly
            if (typeof rawNameData === 'string' && rawNameData.trim() !== '') {
              name = rawNameData.trim();
              console.log(`Dataset ${id} using raw string name: "${name}"`);
            } else {
              // Only decode if it's not a string (
              const decodedName = decodeByteArray(rawNameData);
              console.log(`Dataset ${id} decoded name: "${decodedName}"`);
              name = decodedName || safeName(id);
              console.log(`Dataset ${id} using decoded/fallback name: "${name}"`);
            }
            
            // Category is  coming as a string, use it directly no need to decode 
            let categoryStr: string;
            if (typeof category === 'string' && category.trim() !== '') {
              categoryStr = category.trim();
              console.log(`Dataset ${id} using raw string category: "${categoryStr}"`);
            } else {
              // Only decode if it's not a string 
              const decodedCategory = decodeByteArray(category);
              categoryStr = decodedCategory || "Uncategorized";
              console.log(`Dataset ${id} using decoded/fallback category: "${categoryStr}"`);
            }
            
            const datasetObj = {
              id: BigInt(id),
              name,
              owner:
                typeof owner === "string"
                  ? owner
                  : `0x${BigInt(owner).toString(16)}`,
              ipfs_hash:
                typeof ipfs_hash === "string"
                  ? ipfs_hash
                  : `0x${BigInt(ipfs_hash).toString(16)}`,
              price: BigInt(price), // Convert to bigint for DatasetCard
              category: categoryStr as DatasetCategory,
            };
            
            console.log(`Dataset ${id} final object:`, datasetObj);
            console.log(`=== End Dataset ${id} ===\n`);

            results.push(datasetObj);
          } catch (e) {
            // Skip missing IDs gracefully
            console.log(`get_dataset(${id}) failed`, e);
          }
        }

        setContractDatasets(results);
      } catch (e) {
        console.error("Failed to load datasets:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [contract, account, setLoading]);

  // Filter and sort for UI
  const filteredDatasets = contractDatasets
    .filter((dataset) => {
      const matchesCategory =
        selectedCategory === "All" || dataset.category === selectedCategory;
      const matchesSearch = dataset.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price") return Number(a.price - b.price);
      if (sortBy === "newest") return Number(b.id - a.id);
      return 0; // TODO: Implement popularity
    });

  // Implement purchase
  const handleDatasetPurchase = async (dataset: Dataset) => {
    if (!account || !contract) {
      console.log("Wallet not connected or contract not loaded");
      return;
    }

    try {
      const priceInWei = dataset.price; // Use raw bigint
      const calls = [
        {
          contractAddress: STRK_ADDRESS,
          entrypoint: "approve",
          calldata: [AINEST_ADDRESS, priceInWei.toString(), "0"],
        },
        {
          contractAddress: AINEST_ADDRESS,
          entrypoint: "purchase_dataset",
          calldata: [dataset.id.toString(), "0"],
        },
      ];
      await account.execute(calls);
      console.log("Purchase successful:", dataset);
    } catch (e) {
      console.error("Purchase failed:", e);
    }
  };

  // Animations
  useEffect(() => {
    if (mainRef.current) animatePageEnter(mainRef.current);
  }, [animatePageEnter]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".ainest-dataset-card");
    if (cards.length > 0) animateGridItems(cards);
  }, [filteredDatasets, selectedCategory, searchQuery, animateGridItems]);

  return (
    <div className="flex min-h-screen">
      <CategorySidebar />

      <main ref={mainRef} className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="ainest-section-title mb-4">Dataset Marketplace</h1>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 ainest-input"
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="ainest-input text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="price">Price: Low to High</option>
                <option value="popular">Most Popular</option>
              </select>

              <div className="flex items-center border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredDatasets.length} datasets found
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Dataset Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="ainest-card animate-pulse">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-muted rounded mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-muted rounded flex-1"></div>
                  <div className="h-8 bg-muted rounded flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredDatasets.length > 0 ? (
          <div
            ref={gridRef}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredDatasets.map((dataset) => (
              <DatasetCard
                key={dataset.id.toString()}
                dataset={dataset}
                onView={() => console.log("View", dataset)}
                onPurchase={() => handleDatasetPurchase(dataset)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No datasets found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse different categories.
            </p>
            <Button onClick={() => setSearchQuery("")} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};
