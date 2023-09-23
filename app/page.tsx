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

  async function main() {
    // Define the network client
    const client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();
    console.log("Connected to xrpl");
    // ... further code if necessary
    const test_wallet = Wallet.fromSeed("sEdSeFkWXTivEQ7TYdFPXMUQoXq6epW"); // Test secret; don't use for real
    const response = await client.request({
      command: "account_info",
      account: test_wallet.address,
      ledger_index: "validated",
    });
    console.log(response);
    console.log("Secondphase");

    // Disconnect when done (If you omit this, Node.js won't end the process)
    await client.disconnect();
  }

  async function getTokens() {
    const client = new Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();
    console.log("Connected to xrpl");
    // ... further code if necessary
    const test_wallet = Wallet.fromSeed("sEdSeFkWXTivEQ7TYdFPXMUQoXq6epW"); // Test secret; don't use for real

    const nfts = await client.request({
      command: "account_nfts",
      account: test_wallet.address,
    });
    const results = JSON.stringify(nfts, null, 2);
    console.log(results);
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

    const URIsArray = extractAndConvertURIs(nfts);
    console.log(URIsArray);

    async function fetchDataFromLinks(links: any[]) {
      try {
        const jsonDataArray = await Promise.all(
          links.map(async (link: RequestInfo | URL) => {
            const response = await fetch(link);
            if (response.ok) {
              return await response.json();
            } else {
              console.error("Failed to fetch data from:", link);
              return null; // You can adjust this to throw an error or return a specific value if preferred
            }
          })
        );

        return jsonDataArray;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    }

    // Test the function:
    fetchDataFromLinks(URIsArray).then((data) => {
      console.log(data); // This will log the array containing the fetched JSON data
      setTestData(data);
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
          Listed Entity Carbon Rating
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
