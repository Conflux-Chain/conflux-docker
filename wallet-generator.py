#!/usr/bin/env python3

# pip install ecdsa
# pip install pysha3

from ecdsa import SigningKey, SECP256k1
import sha3

def checksum_encode(addr_str): # Takes a hex (string) address as input
    keccak = sha3.keccak_256()
    out = ''
    addr = addr_str.lower().replace('0x', '')
    keccak.update(addr.encode('ascii'))
    hash_addr = keccak.hexdigest()
    for i, c in enumerate(addr):
        if int(hash_addr[i], 16) >= 8:
            out += c.upper()
        else:
            out += c
    #return '0x' + out
    return out

def genesis(fd,fd2):
    for i in range(10):
      keccak = sha3.keccak_256()
      
      priv = SigningKey.generate(curve=SECP256k1)
      pub = priv.get_verifying_key().to_string()
      
      keccak.update(pub)
      address = keccak.hexdigest()[24:]
      
      #print("Private key:", priv.to_string().hex())
      #print("Public key: ", pub.hex())
      #print("Address:    ", checksum_encode(address))
      fd2.write('\n')
      fd2.write("[index" + str(i) + "]")
      fd2.write('\n')
      fd2.write("PrivateKey = " + priv.to_string().hex())
      fd2.write('\n')
      fd2.write("PublicKey = " + pub.hex())
      fd2.write('\n')

      fd2.write("address = " + "0x" + checksum_encode(address))
      #fd.write(address + "=\"100000000000000000000\"")
      fd.write(priv.to_string().hex())
      fd.write('\n')

fd = open("genesis_secrets.txt", 'w')
fd2 = open("genesis_accounts.toml", 'w')
genesis(fd,fd2)
fd.close()
fd2.close()
