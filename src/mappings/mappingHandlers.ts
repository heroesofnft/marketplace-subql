// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
import {
  Ask
} from "../types";
import {
  AvalancheBlock,
  AvalancheTransaction,
  AvalancheLog,
} from "@subql/types-avalanche";


export async function handleCreatedAsk(event: AvalancheLog): Promise<void> {
  console.log("*****************************************************************************************");
  console.log("event.args", event.args);
  // const ask = new Ask(event.args.tokenId.toString());
  // ask.tokenID = event.args.tokenId;
  // ask.tokenContract = event.args.tokenContract;
  // ask.seller = event.args.ask.seller;
  // ask.sellerFundsRecipient = event.args.ask.sellerFundsRecipient;
  // ask.askCurrency = event.args.ask.askCurrency;
  // ask.askPrice = event.args.ask.askPrice;
  // ask.createdAtTimestamp = event.block.timestamp;
  // await ask.save();
}
