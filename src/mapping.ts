import { TransferSingle } from '../generated/ERC1155/ERC1155'
import { Gravatar } from '../generated/schema'

export function handleNewGravatar(event: TransferSingle): void {
  let gravatar = new Gravatar(event.transaction.from.toHex())
  gravatar.owner = event.params._from
  gravatar.displayName = "hello"
  gravatar.imageUrl = "hello url"
  gravatar.save()
}
