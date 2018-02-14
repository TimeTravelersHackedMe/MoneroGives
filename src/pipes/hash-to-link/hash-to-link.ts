import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hashToLink',
})
export class HashToLinkPipe implements PipeTransform {

  transform(hash: string, ...args) {
    const link = (hash == undefined) ? 'none' : "<a class=\"hash-link\" target=\"" + args[0] + "\" href=\"https://xmrchain.net/" + args[0] + "/" + hash + "\">" + hash + "</a>";    
    return link;
  }
}
