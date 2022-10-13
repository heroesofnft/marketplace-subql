// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
import {
  Ask,
  ReserveAuction,
  Offer
} from "../types";
import {
  AvalancheBlock,
  AvalancheTransaction,
  AvalancheLog,
} from "@subql/types-avalanche";
import assert from "assert";

// ASK HANDLERS
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

// AUCTION HANDLERS

export async function handleAuctionCreated(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const reserveAuction = new ReserveAuction(event.args.tokenId.toString() + "-" + event.args.tokenContract.toString());
    reserveAuction.tokenID = event.args.tokenId;
    reserveAuction.tokenContract = event.args.tokenContract;
    reserveAuction.seller = event.args.auction.seller;
    reserveAuction.sellerFundsRecipient = event.args.auction.sellerFundsRecipient;
    reserveAuction.currency = event.args.auction.currency;
    reserveAuction.reservePrice = event.args.auction.reservePrice;
    reserveAuction.duration = event.args.auction.duration;
    reserveAuction.startTime = event.args.auction.startTime;
    reserveAuction.createdAtTimestamp = event.block.timestamp;
    // logger.info("Ask created: " + event.args.tokenId.toString() + " and tokenContract: " + event.args.tokenContract.toString());
    await reserveAuction.save();
  }
}

export async function handleAuctionReservePriceUpdated(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const reserveAuction = await ReserveAuction.get(event.args.tokenId.toString() + "-" + event.args.tokenContract.toString());
    reserveAuction.reservePrice = event.args.auction.reservePrice;
    // logger.info("Ask created: " + event.args.tokenId.toString() + " and tokenContract: " + event.args.tokenContract.toString());
    await reserveAuction.save();
  }
}

export async function handleAuctionCanceled(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const id = event.args.tokenId.toString() + "-" + event.args.tokenContract.toString();
    // logger.info("Ask created: " + event.args.tokenId.toString() + " and tokenContract: " + event.args.tokenContract.toString());
    await ReserveAuction.remove(id);
  }
}

export async function handleAuctionBid(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const reserveAuction = new ReserveAuction(event.args.tokenId.toString() + "-" + event.args.tokenContract.toString());
    reserveAuction.duration = event.args.auction.duration;
    reserveAuction.highestBid = event.args.auction.highestBid;
    reserveAuction.highestBidder = event.args.auction.highestBidder;
    reserveAuction.firstBidTime = event.args.auction.firstBidTime;
    reserveAuction.updatedAtTimestamp = event.block.timestamp;
    // logger.info("Ask created: " + event.args.tokenId.toString() + " and tokenContract: " + event.args.tokenContract.toString());
    await reserveAuction.save();
  }
}

export async function handleAuctionEnded(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const id = event.args.tokenId.toString() + "-" + event.args.tokenContract.toString();
    // logger.info("Ask created: " + event.args.tokenId.toString() + " and tokenContract: " + event.args.tokenContract.toString());
    await ReserveAuction.remove(id);

  }
}

// OFFER HANDLERS

export async function handleOfferCreated(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const offer = new Offer(event.args.id.toString());
    offer.tokenID = event.args.tokenId;
    offer.tokenContract = event.args.tokenContract;
    offer.currency = event.args.offer.currency;
    offer.offerPrice = event.args.offer.amount;
    offer.maker = event.args.offer.maker;
    offer.findersFeeBps = event.args.offer.findersFeeBps;
    offer.createdAtTimestamp = event.block.timestamp;
    // logger.info("Ask created: " + event.args.tokenId.toString() + " and tokenContract: " + event.args.tokenContract.toString());
    await offer.save();
  }
}

export async function handleOfferUpdated(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const offer = await Offer.get(event.args.id.toString());
    offer.currency = event.args.offer.currency;
    offer.offerPrice = event.args.offer.amount;
    await offer.save();
  }
}

export async function handleOfferCanceled(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const id = event.args.id.toString();
    await Offer.remove(id);
  }
}

export async function handleOfferFilled(event: AvalancheLog): Promise<void> {
  assert(event.args, 'No event args');

  if (event.args.tokenId){
    const id = event.args.id.toString();
    await Offer.remove(id);
  }
}

