"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { Client, Wallet, convertStringToHex } from "xrpl";

export default function SubmitReport() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const props = { openModal, setOpenModal, emailInputRef, nameInputRef };
  // Self-invoking function to connect to the client
  const client = new Client("wss://s.altnet.rippletest.net:51233/");
  (async () => {
    try {
      await client.connect();
      // Connect to the client
      const test_wallet_seed = nameInputRef.current?.value;
      if (!test_wallet_seed) {
        console.error("No seed provided!");
        return; // Exit the function early
      }
      const wallet = Wallet.fromSeed(test_wallet_seed); // Convert the seed to a wallet : https://xrpl.org/cryptographic-keys.html

      // Subscribe to account transaction stream
      await client.request({
        command: "subscribe",
        accounts: [wallet.address],
      });

    } catch (error) {
      await client.disconnect();
      console.log(error);
    }
  })();

  async function mintOther() {
    const test_wallet_seed = nameInputRef.current?.value;
    const client = new Client("wss://s.altnet.rippletest.net:51233/");
    await client.connect();
    console.log("Connected to xrpl");
    if (!test_wallet_seed) {
      console.error("No seed provided!");
      return; // Exit the function early
    }

    const standbyTokenUrlField = emailInputRef.current?.value;

    if (!standbyTokenUrlField) {
      console.error("No seed provided!");
      return; // Exit the function early
    }
    console.log(standbyTokenUrlField);

    const test_wallet = Wallet.fromSeed(test_wallet_seed);
    console.log(test_wallet);

    // This version adds the "Issuer" field.
    // ------------------------------------------------------------------------
    const tx_json: {
      TransactionType: "NFTokenMint";
      Account: string;
      URI: string;
      Flags: number;
      TransferFee: number;
      Issuer: string;
      NFTokenTaxon: number;
    } = {
      TransactionType: "NFTokenMint",
      Account: test_wallet.address,
      URI: convertStringToHex(standbyTokenUrlField),
      Flags: 8,
      TransferFee: 0,
      NFTokenTaxon: 0,
      Issuer: "rGoFup9kYXFX2SBxXiDMLrPTZaYKddBTqU",
    };

    const tx = await client.submitAndWait(tx_json, { wallet: test_wallet });
    const nfts = await client.request({
      command: "account_nfts",
      account: test_wallet.address,
    });

    // ------------------------------------------------------- Report results
    let transactionResult: string;

    if (
      typeof tx.result.meta === "object" &&
      "TransactionResult" in tx.result.meta
    ) {
      transactionResult = tx.result.meta.TransactionResult;
    } else {
      transactionResult = "Meta is either not defined or not an object";
    }

    let results = "\n\nTransaction result: " + transactionResult;
    results += "\n\nnfts: " + JSON.stringify(nfts, null, 2);

    console.log(results);
    client.disconnect();
  }

  return (
    <>
      <Button
        onClick={() => props.setOpenModal("initial-focus")}
        className="bg-[#00aae4]  hover:bg-[#1f7fd9] w-full"
      >
        Submit a Report
      </Button>
      <Modal
        show={props.openModal === "initial-focus"}
        size="xl"
        popup
        onClose={() => props.setOpenModal(undefined)}
        initialFocus={props.emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Fill in the Report
            </h3>

            {/* Name Field */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Whitelisted Tesnet XRPL Seed" />
              </div>
              <TextInput
                ref={nameInputRef}
                id="name"
                placeholder="sEd........"
                required
              />
            </div>

            {/* NFT URL */}
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value="Your NFT URL (Link to your official report)"
                />
              </div>
              <TextInput
                ref={emailInputRef}
                id="email"
                placeholder="https://ipfs...."
                required
              />
            </div>

            <div className="w-full">
              <Button
                onClick={() => {
                  mintOther();
                }}
              >
                Submit My Report
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
