"use client";
import Cards from "./component/cards";
import Hero from "./component/hero";
import xrpl from "xrpl";
import { Client, Wallet } from "xrpl";
import { LinearGradient } from "react-text-gradients";

import { useEffect, useState } from "react";

export default function Home() {
  const [testData, setTestData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function getTokens() {
    const client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();
    console.log("Connected to xrpl");
    // ... further code if necessary
    const test_wallet = Wallet.fromSeed("sEdSeFkWXTivEQ7TYdFPXMUQoXq6epW"); // Test secret; don't use for real

    const accountinfo = await client.request({
      command: "account_tx",
      account: test_wallet.address,
    });
    console.log(accountinfo);
    const data = accountinfo.result.transactions;
    console.log(data);
    const nftTokenMinterTransactions = data.filter(
      (transaction) => (transaction.tx as any)?.NFTokenMinter !== undefined
    );

    console.log(nftTokenMinterTransactions);
    const nftMinterValues = nftTokenMinterTransactions.map(
      (transaction) => (transaction.tx as any).NFTokenMinter
    );
    console.log(nftMinterValues);

    const nfts = await client.request({
      command: "account_nfts",
      account: test_wallet.address,
    });

    const URIsArray = extractAndConvertURIs(nfts);

    for (let i of nftMinterValues) {
      const nfts = await client.request({
        command: "account_nfts",
        account: i,
      });

      const URI = extractAndConvertURIs(nfts as any);
      URIsArray.push(...URI); // Spreads the URI array and pushes its values to URIsArray
    }

    console.log(URIsArray);

    function extractAndConvertURIs(data: { result: { account_nfts: any[] } }) {
      return data.result.account_nfts.map((item: { URI: any }) => {
        return hexToString(item.URI);
      });
    }

    function hexToString(hex: string) {
      let str = "";
      for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      return str;
    }

    async function fetchDataFromLinks(links: any[]): Promise<any[]> {
      try {
        const jsonDataArray = await Promise.all(
          links.map(async (link: RequestInfo | URL) => {
            // Create a timeout promise
            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(
                () => reject(new Error("Timeout after 1 second")),
                1000
              )
            );

            try {
              // Race fetch against the timeout
              const response = (await Promise.race([
                fetch(link),
                timeoutPromise,
              ])) as Response;

              if (response.ok) {
                return await response.json();
              } else {
                console.error("Failed to fetch data from:", link);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching data from ${link}:`, error);
              return null;
            }
          })
        );

        // Filter out the null values to return only successful results.
        return jsonDataArray.filter((data) => data !== null);
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    }

    // Test the function:
    fetchDataFromLinks(URIsArray).then((data) => {
      console.log(data); // This will log the array containing the fetched JSON data
      if (data) {
        setTestData(data);
      }
      setLoading(false);
    });

    client.disconnect();
  }
  useEffect(() => {
    // Call the getTokens function
    getTokens().catch((error) => {
      console.error("Error while fetching tokens:", error);
    });
  }, []);

  return (
    <main className="lg:max-w-[1135px] mx-auto px-5 mt-0 mb-5">
      <Hero />
      <h1 className=" font-semibold text-7xl text-center pb-5 ">
        <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
          Listed Entity SDGCS
        </LinearGradient>
      </h1>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          // Skeleton loader (you can adjust this as per your design)
          <div role="status" className="w-full animate-pulse">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>

            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          testData.map((data, index) => <Cards key={index} cardData={data} />)
        )}
      </div>
    </main>
  );
}
