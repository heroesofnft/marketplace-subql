// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
import {
  Ask,
  BlockEntity
} from "../types";
import {
  AvalancheBlock,
  AvalancheTransaction,
  AvalancheLog,
} from "@subql/types-avalanche";
import assert from "assert";


export async function handleAskCreated(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const ask = new Ask(event.args.tokenId.toString() + "-" + event.args.tokenContract.toString());
    ask.tokenID = event.args.tokenId;
    ask.tokenContract = event.args.tokenContract;
    ask.seller = event.args.ask.seller;
    ask.sellerFundsRecipient = event.args.ask.sellerFundsRecipient;
    ask.askCurrency = event.args.ask.askCurrency;
    ask.askPrice = event.args.ask.askPrice;
    ask.createdAtTimestamp = event.block.timestamp;
    // logger.info("Ask created: " + event.args.tokenId.toString() + " and tokenContract: " + event.args.tokenContract.toString());
    await ask.save();
  }
}

export async function handleAskPriceUpdated(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const ask = await Ask.get(event.args.tokenId.toString() + "-" + event.args.tokenContract.toString());
    ask.askCurrency = event.args.ask.askCurrency;
    ask.askPrice = event.args.ask.askPrice;
    await ask.save();
  }
}

export async function handleAskCanceled(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const id = event.args.tokenId.toString() + "-" + event.args.tokenContract.toString();
    // logger.info("Deleting ask with id: " + id);
    await Ask.remove(id);
  }
}

export async function handleAskFilled(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const id = event.args.tokenId.toString() + "-" + event.args.tokenContract.toString();
    // logger.info("Deleting ask with id: " + id);
    await store.remove('Ask', id);
  }
}


// export async function handleBlock(block: AvalancheBlock): Promise<void> {
//   const record = new BlockEntity(block.hash);
//   record.height = BigInt(block.number);
//   await record.save();
// }