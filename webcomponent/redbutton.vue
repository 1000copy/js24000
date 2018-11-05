<style>
    .wrapper {
      position: relative;
      font-size:2rem;
      background:red;
    }
    input {
      width: 50px;
      font-size:2rem;
    }
    button {
      font-size:2rem;
    }
    /*Can I hide the HTML5 number input’s spin box?*/
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
</style>
<template>
  <span class="wrapper">
    <button id="inc">+</button>
    <input type="number" value="0"/>
    <button id="dec">-</button>
  </span><br>
  <button>milestone MAKE</button>
</template>