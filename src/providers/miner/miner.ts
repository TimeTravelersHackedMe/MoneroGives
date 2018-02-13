import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare const CryptoNoter;

@Injectable()
export class MinerProvider {
  minerStats = new BehaviorSubject<object>({
    hashesPerSecond: 0,
    totalHashes: 0,
    acceptedHashes: 0
  });

  constructor() { }

  start() {
    if (typeof CryptoNoter !== 'undefined') {
      const miner = new CryptoNoter.User('CryptoNoter', { throttle: 0.5, autoThreads: true });
      if (!miner.isMobile()) {
        miner.start();
        setInterval(() => {
          console.log({
            hashesPerSecond: miner.getHashesPerSecond(),
            totalHashes: miner.getTotalHashes(),
            acceptedHashes: miner.getAcceptedHashes()
          });
          this.minerStats.next({
            hashesPerSecond: miner.getHashesPerSecond(),
            totalHashes: miner.getTotalHashes(),
            acceptedHashes: miner.getAcceptedHashes()
          });
        }, 5000);
      }
    }
  }

  stats() {
    if (typeof CryptoNoter !== 'undefined') {
      return this.minerStats.asObservable();
    }
  }

}
