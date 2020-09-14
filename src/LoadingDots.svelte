<!-- Based on SpinKit: https://tobiasahlin.com/spinkit/ -->

<span class="spinner">
  <span class="bounce1"></span>
  <span class="bounce2"></span>
  <span class="bounce3"></span>
</span>

<style>
  .spinner {
    width: 70px;
    text-align: center;
    display: inline-block;
  }

  .spinner > span {
    width: 11px;
    height: 11px;
    background-color: var(--primary-text-color);

    border-radius: 100%;
    display: inline-block;
    margin: 0 2.5px;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
</style>