<script>
    import WalletItem from './WalletItem.svelte';

</script>

<div class="flex mx-3 mt-3.5 mb-1.5">
    <div class="text-header5 font-primary font-semibold">Wallets</div>
  </div>
  <!-- note that we must loop over given wallets in a database any not hard code this -->
  <div class="flex carousel mx-3">
    <WalletItem label="CASH" amount="₱2,500" />
    <WalletItem label="BANK" amount="₱2,500" />
    <WalletItem label="CASH" amount="₱2,500" />
  </div>
  