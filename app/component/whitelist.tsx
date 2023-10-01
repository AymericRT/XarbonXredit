"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { Select } from "flowbite-react";

export default function FormElements() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const props = { openModal, setOpenModal, emailInputRef };

  return (
    <>
      <Button
        onClick={() => props.setOpenModal("initial-focus")}
        className="bg-[#00aae4]  hover:bg-[#1f7fd9] w-full"
      >
        Get Whitelisted !
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
              Fill in the form to get whitelisted!
            </h3>

            {/* Name Field */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Name" />
              </div>
              <TextInput id="name" placeholder="John Doe" required />
            </div>

            {/* Country Field */}
            <div className="max-w-md" id="select">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select your country" />
              </div>
              <Select id="countries" required>
                <option>Indonesia</option>
                <option>Singapore</option>
                <option>France</option>
                <option>Germany</option>
                <option>United States</option>
              </Select>
            </div>

            {/* Number Field */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="number" value="Your Number" />
              </div>
              <TextInput id="number" placeholder="+1234567890" required />
            </div>

            {/* Email Field */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your Email" />
              </div>
              <TextInput id="email" placeholder="name@company.com" required />
            </div>

            {/* Company Name Field */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="companyName" value="Company Name" />
              </div>
              <TextInput
                id="companyName"
                placeholder="Your Company Name"
                required
              />
            </div>

            {/* Wallet Address Field */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="walletAddress" value="Wallet Address" />
              </div>
              <TextInput id="walletAddress" placeholder="0x..." required />
            </div>

            <div className="w-full">
              <Button>Whitelist me!</Button>
            </div>

            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Already whitelisted?&nbsp;
              <a
                href="/modal"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Submit a SDG Report
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
