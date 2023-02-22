import { TransferSingle } from '../generated/ERC1155/ERC1155'
import { Transfer } from '../generated/ERC721/ERC721'
import { NftOwner, Nft } from '../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts';

export function handleNewTransfer(event: TransferSingle): void {
  let id = event.params._to.toHex()
  let entity = NftOwner.load(id)
  if (entity == null) {
    entity = new NftOwner(id)
    entity.owner = event.params._to
    entity.tokenId = event.params._id
    entity.save()
  }
  

  let nftId = event.params._to.toHex() + '-' + event.params._id.toHex()
  let nft = Nft.load(nftId)
  let nftAmount = BigInt.fromI32(0)
  if (nft == null) {
    nft = new Nft(nftId)
  }
  else {
    nftAmount = nft.amount
  }
  nft.tokenId = event.params._id
  nft.amount = nftAmount.plus(event.params._value)
  nft.save()

}

export function handleNewTransfer721(event: Transfer): void {
  let id = event.params._to.toHex()
  let entity = NftOwner.load(id)
  if (entity == null) {
    entity = new NftOwner(id)
    entity.owner = event.params._to
    entity.tokenId = event.params._tokenId
    entity.save()
  }
  
  let nftId = event.params._tokenId.toHex()
  let nft = Nft.load(nftId)
  let nftAmount = BigInt.fromI32(0)
  if (nft == null) {
    nft = new Nft(nftId)
  }
  else {
    nftAmount = nft.amount
  }
  nft.tokenId = event.params._tokenId
  nft.amount = nftAmount.plus(BigInt.fromI32(1))
  nft.save()
}