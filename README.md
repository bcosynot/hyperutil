# Hyperutil

This is a small utility script to remap the Caps-Lock key on your Mac to the F18 key to eventually use it as the hyper key.

This only needs to be run once. You will need node installed (I couldn't get a bash script to work well, unfortunately).

To learn more about how to use caps-lock as hyper and escape, check out this blog post at [https://prodlog.xyz/posts/better-caps-lock](https://prodlog.xyz/posts/better-caps-lock)

To run this quickly use

```shell
curl -fSSL https://github.com/bcosynot/hyperutil/raw/refs/heads/main/capsLockOnHyperdrive.js | node
```

or, alternatively with `wget`, run

```shell
wget -q https://github.com/bcosynot/hyperutil/raw/refs/heads/main/capsLockOnHyperdrive.js -O- | node
```

or, lastly, checkout the repo and run 
```shell
node capsLockOnHyperdrive.js
```
