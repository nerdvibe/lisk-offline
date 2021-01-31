<p align="center"> 
<img src="https://github.com/nerdvibe/lisk-offline/blob/master/meta/lisk-welcome.png?raw=true" width="90%">
  <br/>
  <strong>Lisk offline</strong>
</p>
<hr/>

## <a href="#"><img height="30" width="30" alt="icon" src="https://github.com/nerdvibe/lisk-offline/raw/master/public/icon.png?raw=true"></a> Lisk offline

Lisk offline is a pure offline wallet that includes all the features of Lisk Blockchain. It has been built with security in mind. Lisk Offline is meant to be used in airgapped environments. You can create wallets, make transactions and vote without ever being connected to the internet. 

Once you signed your transaction just hop into the brooadcaster application on your phone and scan the QR codes. The broadcaster will take care of broadcasting the transactions.

## Screenshots

<p float="left">
<img src="https://github.com/nerdvibe/lisk-offline/blob/master/meta/lisk-wallet.png?raw=true" width="40%">
<img src="https://github.com/nerdvibe/lisk-offline/blob/master/meta/lisk-vote.png?raw=true" width="40%">
</p>

## About the App

Lisk-offline is composed by two applications:

- Lisk-offline which signs the transactions and should be used offline in an air-gapped environment.
- lisk-offline-broadcaster which broadcasts the signed transactions

The lisk-offline-broadcaster only works with testnet.

The lisk-offline app only signs transactions and it doesn't care which network you want to use, it will work for both networks (testnet/mainnet), with the excecption of the voting section, where the autofiller is picking for only delegates for mainnet (so far, but testnet delegates autocomplete will be implemented in the future releases).

URL for lisk-offline-broadcaster: https://test-1f089l7eg.now.sh/

Currently this app is not actively mantained.

### Disclaimer:
By using this software you accept the terms and conditions. This software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. in no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
