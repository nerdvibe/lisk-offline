# Lisk offline

### Disclaimer: This is a preview of Lisk Offline.

Lisk-offline is composed by two applications:

- Lisk-offline which signs the transactions and should be used offline in an air-gapped environment.
- lisk-offline-broadcaster which broadcasts the signed transactions

The lisk-offline-broadcaster only works with testnet so far.

The lisk-offline app only signs transactions and it doesn't care which network you want to use, it will work for both networks (testnet/mainnet), with the excecption of the voting section, where the autofiller is picking for only delegates for mainnet (so far, but testnet delegates autocomplete will be implemented in the future releases).

URL for lisk-offline-broadcaster: https://test-1f089l7eg.now.sh/
